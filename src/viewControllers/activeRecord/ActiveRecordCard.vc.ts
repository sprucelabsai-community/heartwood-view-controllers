import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
    CardFooter,
    CardViewController,
    CriticalError,
    ListRow,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import { CardViewControllerOptions } from '../card/Card.vc'
import ActiveRecordListViewController, {
    ActiveRecordListViewControllerOptions,
} from './ActiveRecordList.vc'

export default class ActiveRecordCardViewController extends AbstractViewController<Card> {
    protected cardVc: CardViewController
    protected listVc: ActiveRecordListViewController

    public static setShouldThrowOnResponseError(shouldThrow: boolean) {
        ActiveRecordListViewController.setShouldThrowOnResponseError(
            shouldThrow
        )
    }

    public constructor(
        options: ViewControllerOptions & ActiveRecordCardViewControllerOptions
    ) {
        super(options)

        this.listVc = this.ListVc(options)
        this.cardVc = this.CardVc(options)

        //@ts-ignore
        this.cardVc.__isActiveRecord = true
        //@ts-ignore
        this.cardVc.__activeRecordParent = this
    }

    private CardVc(
        options: ActiveRecordCardViewControllerOptions
    ): CardViewController {
        const model: CardViewControllerOptions = {
            header: options.header,
            footer: options.footer,
            body: {
                isBusy: true,
                sections: [
                    {
                        list: this.listVc.render(),
                    },
                ],
            },
        }
        if (options.id) {
            model.id = options.id
        }
        return this.Controller('card', model)
    }

    private ListVc(
        options: ActiveRecordCardViewControllerOptions
    ): ActiveRecordListViewController {
        return this.Controller('active-record-list', {
            ...options,
            onWillFetch: () => this.cardVc.setIsBusy(true),
            onDidFetch: () => this.cardVc.setIsBusy(false),
        })
    }

    public doesRowExist(id: string): boolean {
        return this.listVc.doesRowExist(id)
    }

    public setCriticalError(error: CriticalError) {
        this.cardVc.setCriticalError(error)
    }

    public getHasCriticalError(): boolean {
        return this.cardVc.getHasCriticalError()
    }

    public async load() {
        await this.listVc.load()
    }

    public getIsLoaded() {
        return this.listVc.getIsLoaded()
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
        return this.listVc.getRecords()
    }

    public upsertRow(id: string, row: Omit<ListRow, 'id'>) {
        if (!this.getIsLoaded()) {
            throw new Error(
                `You have to load your activeRecordCard before you can upsert a row.`
            )
        }

        this.listVc.upsertRow(id, { ...row })
    }

    public getTarget() {
        return this.listVc.getTarget()
    }

    public setTarget(target?: Record<string, any>) {
        this.listVc.setTarget(target)
    }

    public setPayload(payload?: Record<string, any>) {
        this.listVc.setPayload(payload)
    }

    public deleteRow(id: string | number) {
        this.listVc.deleteRow(id)
    }

    public setIsBusy(isBusy: boolean) {
        this.cardVc.setIsBusy(isBusy)
    }

    public getCardVc() {
        return this.cardVc
    }

    public async refresh() {
        if (!this.getIsLoaded()) {
            throw new Error(
                `You can't refresh your active record card until it's been loaded.`
            )
        }

        await this.listVc.refresh()
    }

    public setHeaderTitle(title: string) {
        this.cardVc.setHeaderTitle(title)
    }

    public setHeaderSubtitle(subtitle: string) {
        this.cardVc.setHeaderSubtitle(subtitle)
    }

    public getListVc() {
        return this.listVc.getListVc()
    }

    public selectRow(row: string | number) {
        this.listVc.selectRow(row)
    }

    public deselectRow(row: string | number) {
        this.listVc.deselectRow(row)
    }

    public isRowSelected(row: string | number): boolean {
        return this.listVc.isRowSelected(row)
    }

    public addRow(
        row: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
    ) {
        this.listVc.addRow(row)
    }

    public setSelectedRows(rows: (string | number)[]) {
        this.listVc.setSelectedRows(rows)
    }

    public getValues() {
        return this.listVc.getValues()
    }

    public getPayload() {
        return this.listVc.getPayload()
    }

    public getRowVc(row: string | number) {
        return this.listVc.getRowVc(row)
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

    public render(): Card {
        return this.cardVc.render()
    }
}

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

export interface ActiveRecordCardViewControllerOptions
    extends ActiveRecordListViewControllerOptions {
    header?: Card['header']
    footer?: Card['footer']
    criticalError?: Card['criticalError']
}
