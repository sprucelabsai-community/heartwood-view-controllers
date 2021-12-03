import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import {
	CardViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import '@sprucelabs/mercury-core-events'
import ListViewController from './list/List.vc'

export type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
export type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow

export interface ActiveRecordCardViewControllerOptions {
	eventName: string
	responseKey: string
	rowTransformer: (record: Record<string, any>) => Row
	noResultsRow?: Row
	payload?: Record<string, any>
	target?: Record<string, any>
	header?: Card['header']
	footer?: Card['footer']
	id?: string
	columnWidths?: string[]
	shouldRenderRowDividers?: boolean
	defaultRowHeight?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List['defaultRowHeight']
	filter?: (record: Record<string, any>) => boolean
}

export default class ActiveRecordCardViewController extends AbstractViewController<Card> {
	private cardVc: CardViewController
	private listVc: ListViewController
	private noResultsRow?: Row
	private rowTransformer: (record: Record<string, any>) => Row
	private eventName: string
	private responseKey: string
	private emitPayload?: Record<string, any>
	private emitTarget?: Record<string, any>
	private isLoaded = false
	private filter?: (record: Record<string, any>) => boolean

	private static shouldThrowOnResponseError = false

	public static setShouldThrowOnResponseError(shouldThrow: boolean) {
		this.shouldThrowOnResponseError = shouldThrow
	}

	public constructor(
		options: ViewControllerOptions & ActiveRecordCardViewControllerOptions
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

		this.listVc = this.Controller('list', {
			columnWidths: options.columnWidths as any,
			defaultRowHeight: options.defaultRowHeight,
			shouldRenderRowDividers: options.shouldRenderRowDividers,
		})

		this.cardVc = this.Controller('card', {
			id: options.id,
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
		})

		//@ts-ignore
		this.cardVc.__isActiveRecord = true
		//@ts-ignore
		this.cardVc.__activeRecordParent = this
	}

	public async load() {
		if (this.isLoaded) {
			throw new Error(`You can't load your active record card twice!`)
		}

		await this.fetchResults()
	}

	private async fetchResults() {
		let responseKeyError: any

		try {
			const client = await this.connectToApi()

			const results = await client.emit(
				this.eventName as any,
				this.buildTargetAndPayload()
			)

			const responsePayload = eventResponseUtil.getFirstResponseOrThrow(results)
			const records = responsePayload[this.responseKey]

			if (!records) {
				responseKeyError = true
			} else {
				if (records.length === 0) {
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
					for (const record of records) {
						if (!this.filter || this.filter?.(record)) {
							this.listVc.addRow(this.rowTransformer(record))
						}
					}
				}
			}
		} catch (err: any) {
			if (ActiveRecordCardViewController.shouldThrowOnResponseError) {
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
		this.cardVc.setIsBusy(false)
	}

	private buildErrorRow(err: any): Row {
		return {
			id: 'error',
			height: 'content',
			cells: [
				{
					text: {
						content: 'Oh no! Something went wrong!',
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

	public setIsBusy(isBusy: boolean) {
		this.cardVc.setIsBusy(isBusy)
	}

	public getCardVc() {
		return this.cardVc
	}

	public async refresh() {
		if (!this.isLoaded) {
			throw new Error(
				`You can't refresh your active record card until it's been loaded.`
			)
		}

		this.listVc.deleteAllRows()

		await this.fetchResults()
	}

	public getListVc() {
		return this.listVc
	}

	public render(): Card {
		return this.cardVc.render()
	}
}
