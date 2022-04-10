import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import { ViewControllerOptions } from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import ListViewController, { ListRow } from '../list/List.vc'

type List = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List
export type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow

export interface ActiveRecordListViewControllerOptions {
	eventName: string
	responseKey: string
	rowTransformer: (record: Record<string, any>) => Row
	noResultsRow?: Omit<Row, 'id'>
	payload?: Record<string, any>
	target?: Record<string, any>
	id?: string
	columnWidths?: string[]
	shouldRenderRowDividers?: boolean
	defaultRowHeight?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List['defaultRowHeight']
	filter?: (record: Record<string, any>) => boolean
	onWillFetch?: () => Promise<void> | void
	onDidFetch?: () => Promise<void> | void
}

export default class ActiveRecordListViewController extends AbstractViewController<List> {
	private listVc: ListViewController
	private noResultsRow?: Omit<Row, 'id'>
	private rowTransformer: (record: Record<string, any>) => Row
	private eventName: string
	private responseKey: string
	private emitPayload?: Record<string, any>
	private emitTarget?: Record<string, any>
	private isLoaded = false
	private filter?: (record: Record<string, any>) => boolean

	private static shouldThrowOnResponseError = false
	private willFetchHandler?: () => void | Promise<void>
	private didFetchHandler?: () => void | Promise<void>
	public static setShouldThrowOnResponseError(shouldThrow: boolean) {
		this.shouldThrowOnResponseError = shouldThrow
	}

	private records: any[] = []

	public constructor(
		options: ViewControllerOptions & ActiveRecordListViewControllerOptions
	) {
		super(options)

		assertOptions(options, ['eventName', 'rowTransformer', 'responseKey'])

		this.noResultsRow = options.noResultsRow
		this.rowTransformer = options.rowTransformer
		this.eventName = options.eventName
		this.responseKey = options.responseKey
		this.emitPayload = options.payload
		this.emitTarget = options.target
		this.filter = options.filter
		this.willFetchHandler = options.onWillFetch
		this.didFetchHandler = options.onDidFetch

		this.listVc = this.ListVc(options)
	}

	private ListVc(
		options: ActiveRecordListViewControllerOptions
	): ListViewController {
		return this.Controller('list', {
			id: options.id,
			columnWidths: options.columnWidths as any,
			defaultRowHeight: options.defaultRowHeight,
			shouldRenderRowDividers: options.shouldRenderRowDividers,
		})
	}

	public async load() {
		if (this.isLoaded) {
			throw new Error(`You can't load your active record twice!`)
		}

		await this.listVc.renderOnce(() => this.fetchResults())
	}

	private async fetchResults() {
		let responseKeyError: any

		await this.willFetchHandler?.()

		try {
			const client = await this.connectToApi()

			const [responsePayload] = await client.emitAndFlattenResponses(
				this.eventName as any,
				this.buildTargetAndPayload()
			)

			const records = responsePayload[this.responseKey]

			if (!records) {
				responseKeyError = true
			} else {
				this.records = records.filter(
					(r: any) => !this.filter || this.filter(r)
				)

				if (this.records.length === 0) {
					this.listVc.addRow({
						id: 'no-results',
						cells: [
							{
								text: {
									content: 'No results found!',
								},
							},
						],
						...this.noResultsRow,
					})
				} else {
					for (const record of this.records) {
						this.listVc.addRow(this.rowTransformer(record))
					}
				}
			}
		} catch (err: any) {
			if (ActiveRecordListViewController.shouldThrowOnResponseError) {
				throw err
			}
			this.listVc.addRow(this.buildErrorRow(err))
		}

		if (responseKeyError) {
			throw new Error(
				`The key '${responseKeyError}' was not found in response!`
			)
		}

		this.isLoaded = true
		await this.didFetchHandler?.()
	}

	private buildErrorRow(err: any): Row {
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

	public getRecords() {
		if (!this.isLoaded) {
			throw new Error(
				`You have to load your activeRecordList before you can get records from it.`
			)
		}
		return this.records
	}

	public render(): List {
		return this.listVc.render()
	}

	public upsertRow(id: string, row: Omit<ListRow, 'id'>) {
		if (!this.isLoaded) {
			throw new Error(
				`You have to load your activeRecordCard before you can upsert a row.`
			)
		}

		this.listVc.upsertRow(id, { ...row })
	}
	private buildTargetAndPayload() {
		const targetAndPayload: Record<string, any> = {}

		if (this.emitTarget) {
			//@ts-ignore
			targetAndPayload.target = this.emitTarget
		}

		if (this.emitPayload) {
			//@ts-ignore
			targetAndPayload.payload = this.emitPayload
		}
		return targetAndPayload
	}

	public getTarget() {
		return this.emitTarget
	}

	public setTarget(target?: Record<string, any>) {
		this.emitTarget = target
	}

	public deleteRow(id: string | number) {
		this.listVc.deleteRow(id)
	}

	public async refresh() {
		if (!this.isLoaded) {
			throw new Error(
				`You can't refresh your active record card until it's been loaded.`
			)
		}

		await this.listVc.renderOnce(async () => {
			this.listVc.deleteAllRows()
			await this.fetchResults()
		})
	}

	public addRow(
		row: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
	) {
		this.listVc.addRow(row)
	}

	public getListVc() {
		return this.listVc
	}
}
