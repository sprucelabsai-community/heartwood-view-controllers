import { EventName, SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import { ActiveRecordPagingOptions } from '../../builders/buildActiveRecordCard'
import {
    List,
    ListRow,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import ListViewController from '../list/List.vc'
import ActiveRecordFetcherImpl, {
    ActiveRecordFetcher,
} from './ActiveRecordFetcher'

export default class ActiveRecordListViewController extends AbstractViewController<List> {
    private listVc: ListViewController
    private noResultsRow?: Omit<ListRow, 'id'>
    private rowTransformer: (record: Record<string, any>) => ListRow
    private isLoaded = false
    private static shouldThrowOnResponseError = false
    private willFetchHandler?: () => void | Promise<void>
    private didFetchHandler?: () => void | Promise<void>
    private fetcher: ActiveRecordFetcher
    public static setShouldThrowOnResponseError(shouldThrow: boolean) {
        this.shouldThrowOnResponseError = shouldThrow
    }

    private records: any[] = []

    public constructor(
        options: ViewControllerOptions & ActiveRecordListViewControllerOptions
    ) {
        super(options)

        const { noResultsRow, onWillFetch, onDidFetch, rowTransformer } =
            assertOptions(options, [
                'eventName',
                'rowTransformer',
                'responseKey',
            ])

        this.fetcher = ActiveRecordFetcherImpl.Fetcher(options)

        this.noResultsRow = noResultsRow
        this.rowTransformer = rowTransformer
        this.willFetchHandler = onWillFetch
        this.didFetchHandler = onDidFetch

        this.listVc = this.ListVc(options)
    }

    private ListVc(options: Omit<List, 'rows'>): ListViewController {
        const { id, columnWidths, shouldRenderRowDividers, defaultRowHeight } =
            options

        return this.Controller('list', {
            id,
            columnWidths,
            defaultRowHeight,
            shouldRenderRowDividers,
        })
    }

    public async load() {
        if (this.isLoaded) {
            throw new Error(`You can't load your active record twice!`)
        }

        await this.listVc.renderOnce(() => this.fetchResults())
    }

    public doesRowExist(id: string) {
        return this.listVc.doesRowExist(id)
    }

    private async fetchResults() {
        await this.willFetchHandler?.()

        try {
            this.records = await this.fetcher.fetchRecords()

            if (this.records.length === 0) {
                this.listVc.setRows([this.renderNoResultsRow()])
            } else {
                this.listVc.setRows(
                    this.records.map((record) => this.rowTransformer(record))
                )
            }
        } catch (err: any) {
            if (err.options?.code === 'INVALID_PARAMETERS') {
                throw err
            }

            if (ActiveRecordListViewController.shouldThrowOnResponseError) {
                throw err
            }
            this.listVc.setRows([this.buildErrorRow(err)])
        }

        this.isLoaded = true
        await this.didFetchHandler?.()
    }

    private renderNoResultsRow(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow & {
        atIndex?: number | undefined
    } {
        return {
            id: 'no-results',
            cells: [
                {
                    text: {
                        content: 'No results found!',
                    },
                },
            ],
            ...this.noResultsRow,
        }
    }

    private buildErrorRow(err: any): ListRow {
        return {
            id: 'error',
            height: 'content',
            cells: [
                {
                    text: {
                        content: randomUtil.rand([
                            'Oh no! Something is not right!',
                            "Hmm, this isn't great.",
                            'Oops! Major error!',
                            'Error. Error. Error',
                            'Something went wrong! 🤬',
                        ]),
                    },
                    subText: {
                        content: err.message,
                    },
                },
            ],
        }
    }

    public getIsLoaded() {
        return this.isLoaded
    }

    public isRowSelected(id: string | number) {
        return this.listVc.isRowSelected(id)
    }

    public selectRow(id: string | number) {
        this.listVc.selectRow(id)
    }

    public setSelectedRows(rows: (string | number)[]) {
        this.listVc.setSelectedRows(rows)
    }

    public deselectRow(id: string | number) {
        this.listVc.deselectRow(id)
    }

    public getRecords() {
        if (!this.isLoaded) {
            throw new Error(
                `You have to load your activeRecordList before you can get records from it.`
            )
        }
        return this.records
    }

    public upsertRow(id: string, row: Omit<ListRow, 'id'>) {
        if (!this.isLoaded) {
            throw new Error(
                `You have to load your activeRecordCard before you can upsert a row.`
            )
        }

        this.listVc.upsertRow(id, { ...row })
    }

    public getTarget() {
        return this.fetcher.getTarget()
    }

    public setTarget(target?: Record<string, any>) {
        this.fetcher.setTarget(target)
    }

    public setPayload(payload?: Record<string, any>) {
        this.fetcher.setPayload(payload)
    }

    public deleteRow(id: string | number) {
        this.listVc.deleteRow(id)
        if (this.listVc.getTotalRows() === 0) {
            this.listVc.addRow(this.renderNoResultsRow())
        }
    }

    public async refresh() {
        if (!this.isLoaded) {
            throw new Error(
                `You can't refresh your active record card until it's been loaded.`
            )
        }

        await this.listVc.renderOnce(async () => {
            await this.fetchResults()
        })
    }

    public getValues() {
        return this.listVc.getValues()
    }

    public addRow(
        row: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
    ) {
        this.listVc.addRow(row)
    }

    public getRowVc(row: number | string) {
        return this.listVc.getRowVc(row)
    }

    public getPayload() {
        return this.fetcher.getPayload()
    }

    public getListVc() {
        return this.listVc
    }

    public render(): List {
        return this.listVc.render()
    }
}

export interface ActiveRecordListViewControllerOptions {
    eventName: EventName
    responseKey: string
    rowTransformer: (record: Record<string, any>) => ListRow
    noResultsRow?: Omit<ListRow, 'id'>
    payload?: Record<string, any>
    target?: Record<string, any>
    id?: string
    columnWidths?: List['columnWidths']
    shouldRenderRowDividers?: boolean
    defaultRowHeight?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List['defaultRowHeight']
    filter?: (record: Record<string, any>) => boolean
    onWillFetch?: () => Promise<void> | void
    onDidFetch?: () => Promise<void> | void
    paging?: ActiveRecordPagingOptions
}
