import { buildSchema, SchemaError } from '@sprucelabs/schema'
import buildForm from '../../builders/buildForm'
import {
    ActiveRecordPagingOptions,
    Card,
    CardFooter,
    CardHeader,
    CardViewController,
    CriticalError,
    FormViewController,
    ListRow,
    SwipeCardViewController,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import { CardViewControllerOptions } from '../card/Card.vc'
import ListViewController from '../list/List.vc'
import PagerViewController from '../pagers/Pager.vc'
import ActiveRecordFetcherImpl from './ActiveRecordFetcher'
import ActiveRecordListViewController, {
    ActiveRecordListViewControllerOptions,
    NoResultsRow,
} from './ActiveRecordList.vc'

export default class ActiveRecordCardViewController extends AbstractViewController<Card> {
    protected cardVc: Pick<
        CardViewController,
        | 'setCriticalError'
        | 'setIsBusy'
        | 'getHasCriticalError'
        | 'clearCriticalError'
        | 'setHeaderTitle'
        | 'setHeaderSubtitle'
        | 'disableFooter'
        | 'enableFooter'
        | 'render'
        | 'setFooter'
        | 'isBusy'
        | 'getHeaderTitle'
        | 'getHeaderSubtitle'
        | 'setTriggerRenderHandler'
        | 'triggerRender'
        | 'getFooter'
    >
    public static searchDebounceMs = 200
    protected listVc?: ActiveRecordListViewController
    protected listVcs: ListViewController[] = []
    protected pagerVc?: PagerViewController
    protected swipeVc?: SwipeCardViewController
    protected pagingOptions?: ActiveRecordPagingOptions
    protected searchFormVc?: FormViewController<SearchFormSchema>
    private changedBy: string | null = null
    private fetcher?: ActiveRecordFetcherImpl
    private rowTransformer: (record: Record<string, any>) => ListRow
    private isLoaded = false
    private records: Record<string, any>[] = []
    private noResultsRow: NoResultsRow = {
        cells: [
            {
                text: {
                    content: 'No results found!',
                },
            },
        ],
    }
    private allRecords: Record<string, any>[] = []
    private searchTimeout?: any
    private footer?: CardFooter | null

    public static setShouldThrowOnResponseError(shouldThrow: boolean) {
        ActiveRecordListViewController.shouldThrowOnResponseError = shouldThrow
    }

    public constructor(
        options: ViewControllerOptions & ActiveRecordCardViewControllerOptions
    ) {
        super(options)

        const {
            paging,
            rowTransformer,
            noResultsRow,
            shouldRenderSearch,
            searchPlaceholder,
            footer,
        } = options

        this.rowTransformer = rowTransformer
        this.pagingOptions = paging
        this.fetcher = ActiveRecordFetcherImpl.Fetcher(options)
        this.noResultsRow = noResultsRow ?? this.noResultsRow
        this.footer = footer

        if (shouldRenderSearch) {
            this.searchFormVc = this.SearchFormVc(searchPlaceholder)
        }

        if (paging) {
            this.pagerVc = this.PagerVc()
            this.swipeVc = this.SwipeVc(options)
            this.cardVc = this.swipeVc
        } else {
            this.listVc = this.ActiveRecordListVc(options)
            this.cardVc = this.CardVc(options)
        }

        //@ts-ignore
        this.cardVc.__isActiveRecord = true

        //@ts-ignore
        this.cardVc.__activeRecordParent = this
    }

    private SearchFormVc(searchPlaceholder?: string) {
        return this.Controller(
            'form',
            buildForm({
                id: 'search',
                schema: searchFormSchema,
                onChange: this.handleChangeSearchForm.bind(this),
                sections: [
                    {
                        fields: [
                            {
                                name: 'search',
                                renderAs: 'search',
                                placeholder: searchPlaceholder,
                            },
                        ],
                    },
                ],
            })
        )
    }

    private async handleChangeSearchForm() {
        clearTimeout(this.searchTimeout)

        this.searchTimeout = setTimeout(() => {
            this.executeSearch()
        }, ActiveRecordCardViewController.searchDebounceMs)
    }

    private executeSearch() {
        const search = this.searchFormVc?.getValue('search')
        if (search) {
            this.filterRecords(search)
        } else {
            this.records = this.allRecords ?? []
        }

        this.listVc?.setRecords(this.records)
        this.rebuildSlidesForPaging()
    }

    private filterRecords(search: string) {
        const matches = []

        for (const record of this.allRecords) {
            const doesMatch = this.doesRecordMatch(record, search)
            if (doesMatch) {
                matches.push(record)
            }
        }
        this.records = matches
    }

    private doesRecordMatch(record: Record<string, any>, search: string) {
        const searchable = Object.values(record).join('').toLowerCase()
        const doesMatch = searchable.includes(search.toLowerCase())
        return doesMatch
    }

    private SwipeVc(options: {
        header?: CardHeader | null
        id?: string
        footer?: CardFooter | null
    }): SwipeCardViewController {
        const { footer, header, ...rest } = options

        return this.Controller('swipe-card', {
            slides: [],
            onSlideChange: this.handleSlideChange.bind(this),
            header: {
                ...header,
                form: this.searchFormVc?.render(),
            },
            footer: {
                ...footer,
                pager: this.pagerVc?.render(),
            },
            ...rest,
        })
    }

    private async handleSlideChange(slide: number) {
        if (this.changedBy === 'pager') {
            this.changedBy = null
            return
        }
        this.changedBy = 'slide'
        this.pagerVc?.setCurrentPage(slide)
    }

    private PagerVc(): PagerViewController {
        return this.Controller('pager', {
            id: 'active-pager',
            onChangePage: this.handlePageChange.bind(this),
        })
    }

    private async handlePageChange(page: number) {
        if (this.changedBy === 'slide') {
            this.changedBy = null
            return
        }

        this.changedBy = 'pager'
        await this.swipeVc?.jumpToSlide(page)
        this.changedBy = null
    }

    private CardVc(
        options: Pick<
            ActiveRecordCardViewControllerOptions,
            'header' | 'footer' | 'id'
        >
    ): CardViewController {
        const { header, footer, id } = options
        const model: CardViewControllerOptions = {
            header,
            footer,
            body: {
                isBusy: true,
                sections: [
                    {
                        list: this.listVc!.render(),
                    },
                ],
            },
        }

        if (id) {
            model.id = id
        }

        return this.Controller('card', model)
    }

    private ActiveRecordListVc(
        options: ActiveRecordCardViewControllerOptions
    ): ActiveRecordListViewController {
        return this.Controller('active-record-list', {
            ...options,
            onWillFetch: () => this.cardVc.setIsBusy(true),
            onDidFetch: () => this.cardVc.setIsBusy(false),
        })
    }

    public setCriticalError(error: CriticalError) {
        this.cardVc.setCriticalError(error)
    }

    public getHasCriticalError(): boolean {
        return this.cardVc.getHasCriticalError()
    }

    public async load() {
        this.isLoaded = true
        if (this.fetcher) {
            await this.swipeVc?.renderOnce(async () => {
                await this.fetchRecordsAndDropInRows()
            })
        }

        if (this.listVc) {
            await this.listVc?.load()
            this.allRecords = this.listVc.getRecords()
        }
    }

    private async fetchRecordsAndDropInRows() {
        try {
            this.records = await this.fetcher!.fetchRecords()
            this.allRecords = [...this.records]
            this.rebuildSlidesForPaging()
        } catch (err: any) {
            if (ActiveRecordListViewController.shouldThrowOnResponseError) {
                throw err
            }

            this.pagerVc?.clear()
            this.clearFooterIfNoButtons()
            this.dropInErrorRow(err)
            this.log.error('Failed to load paged results', err.stack ?? err)
        }
    }

    private clearFooterIfNoButtons() {
        if (!this.cardVc.getFooter()?.buttons) {
            this.clearFooter()
        }
    }

    private clearFooter() {
        this.swipeVc?.setFooter(null)
    }

    private dropInErrorRow(err: any) {
        this.clear()
        const listVc = this.addList(0)
        listVc.addRow({
            id: 'error',
            height: 'content',
            cells: [
                {
                    text: {
                        content: err.message ?? 'Failed to load paged results',
                    },
                },
            ],
        })
    }

    protected rebuildSlidesForPaging() {
        if (!this.pagerVc) {
            return
        }

        this.clear()

        const totalPages = Math.max(
            1,
            Math.ceil(this.records.length / this.pageSize!)
        )
        const chunkedRecords = chunkArray(this.records, this.pageSize!)

        for (let i = 0; i < totalPages; i++) {
            const records = chunkedRecords[i] ?? []
            const listVc = this.addList(i)

            for (const record of records) {
                listVc.addRow(this.rowTransformer(record))
            }
        }

        if (this.records.length === 0) {
            this.listVcs[0].addRow({
                id: 'no-records',
                ...this.noResultsRow,
            })
        }

        if (totalPages === 1) {
            this.clearFooterIfNoButtons()
            this.pagerVc?.clear()
        } else {
            this.swipeVc?.setFooter({
                pager: this.pagerVc?.render(),
                ...this.footer,
            })
            this.pagerVc?.setTotalPages(totalPages)
            const currentPage = this.pagerVc!.getCurrentPage()
            this.pagerVc?.setCurrentPage(currentPage === -1 ? 0 : currentPage)
        }
    }

    private clear() {
        this.swipeVc?.setSections([])
        this.listVcs = []
    }

    private get pageSize() {
        return this.pagingOptions?.pageSize
    }

    private addList(i: number) {
        const listVc = this.Controller('list', {
            id: `list-${i}`,
        })

        this.listVcs.push(listVc)

        this.swipeVc?.addSlide({
            list: listVc.render(),
        })
        return listVc
    }

    public getIsLoaded() {
        return this.isLoaded
    }

    public clearCriticalError() {
        this.cardVc.clearCriticalError()
    }

    public getRecords() {
        if (!this.getIsLoaded()) {
            throw new Error(
                `You have to load your activeRecordCard before you can get records from it.`
            )
        }
        return this.listVc?.getRecords() ?? this.records
    }

    public upsertRow(id: string, row: Omit<ListRow, 'id'>) {
        if (!this.getIsLoaded()) {
            throw new Error(
                `You have to load your activeRecordCard before you can upsert a row.`
            )
        }

        this.listVc?.upsertRow(id, { ...row })

        for (const listVc of this.listVcs) {
            if (listVc.doesRowExist(id)) {
                listVc.upsertRow(id, { ...row })
                return
            }
        }

        this.lastListVc?.addRow({
            id,
            ...row,
        })
    }

    public getTarget() {
        return this.listVc?.getTarget() ?? this.fetcher?.getTarget()
    }

    public setTarget(target?: Record<string, any>) {
        this.listVc?.setTarget(target)
        this.fetcher?.setTarget(target)
    }

    public setPayload(payload?: Record<string, any>) {
        this.listVc?.setPayload(payload)
        this.fetcher?.setPayload(payload)
    }

    public deleteRow(id: string) {
        this.listVc?.deleteRow(id)
        this.records = this.records.filter((r) => r.id !== id)
        this.swipeVc?.renderOnceSync(() => this.rebuildSlidesForPaging())
    }

    public setIsBusy(isBusy: boolean) {
        this.cardVc.setIsBusy(isBusy)
    }

    public async refresh() {
        if (!this.getIsLoaded()) {
            throw new Error(
                `You can't refresh your active record card until it's been loaded.`
            )
        }

        await this.swipeVc?.renderOnce(async () => {
            await this.fetchRecordsAndDropInRows()
        })

        await this.listVc?.refresh()
    }

    public setHeaderTitle(title: string) {
        this.cardVc.setHeaderTitle(title)
    }

    public setHeaderSubtitle(subtitle: string) {
        this.cardVc.setHeaderSubtitle(subtitle)
    }

    public selectRow(row: string | number) {
        this.listVc?.selectRow(row)
        for (const listVc of this.listVcs) {
            if (listVc.doesRowExist(row)) {
                listVc.selectRow(row)
                break
            }
        }
    }

    public deselectRow(row: string | number) {
        this.listVc?.deselectRow(row)
        for (const listVc of this.listVcs) {
            if (listVc.doesRowExist(row)) {
                listVc.deselectRow(row)
                break
            }
        }
    }

    public addRow(row: ListRow) {
        this.listVc?.addRow(row)
        this.addToLastRow(row)
    }

    private addToLastRow(row: ListRow) {
        this.lastListVc?.addRow(row)
    }

    private get lastListVc() {
        return this.listVcs[this.listVcs.length - 1]
    }

    public setSelectedRows(rows: (string | number)[]) {
        this.listVc?.setSelectedRows(rows)
        for (const listVc of this.listVcs) {
            listVc.setSelectedRows([])
            for (const row of rows) {
                if (listVc.doesRowExist(row)) {
                    listVc.selectRow(row)
                }
            }
        }
    }

    public getRowVc(row: string | number) {
        if (this.listVc) {
            return this.listVc.getRowVc(row)
        }
        for (const vc of this.listVcs) {
            if (vc.doesRowExist(row)) {
                return vc.getRowVc(row)
            }
        }

        throw new SchemaError({
            code: 'INVALID_PARAMETERS',
            parameters: ['rowId'],
            friendlyMessage: `Could not find row with id ${row}`,
        })
    }

    public getValues() {
        return (
            this.listVc?.getValues() ?? [
                ...this.listVcs.map((vc) => vc.getValues()).flat(),
            ]
        )
    }

    public async setValue(rowId: string, name: string, value: any) {
        await this.getRowVc(rowId).setValue(name, value)
    }

    public getValue(rowId: string, name: string) {
        return this.getRowVc(rowId).getValue(name)
    }

    public getPayload() {
        return this.listVc?.getPayload() ?? this.fetcher?.getPayload()
    }

    public setFooter(footer: CardFooter | null) {
        this.cardVc.setFooter(footer)
    }

    public disableFooter() {
        this.cardVc.disableFooter()
    }

    public enableFooter() {
        this.cardVc.enableFooter()
    }

    // @deprecated - use MockActiveCard to get access to the listVc,
    // this may not be set based on certain configurations.
    // you can use getRowVc() or setValue/getValue to interact with the list
    public getListVc() {
        if (!this.listVc) {
            throw new Error(
                `You cannot call getListVc() on your ActiveRecordCard when paging is enabled. Consider using the MockActiveCard to make assertions on your card.`
            )
        }
        return this.listVc!.getListVc()
    }

    public getCardVc() {
        return this.cardVc!
    }

    public render(): Card {
        return this.swipeVc?.render() ?? this.cardVc.render()
    }
}

export interface ActiveRecordCardViewControllerOptions
    extends ActiveRecordListViewControllerOptions {
    header?: Card['header']
    footer?: Card['footer']
    criticalError?: Card['criticalError']
}

const chunkArray = <T>(arr: T[], chunkSize: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
        arr.slice(i * chunkSize, (i + 1) * chunkSize)
    )

const searchFormSchema = buildSchema({
    id: 'activeRecordSearch',
    fields: {
        search: {
            type: 'text',
        },
    },
})

export type SearchFormSchema = typeof searchFormSchema
