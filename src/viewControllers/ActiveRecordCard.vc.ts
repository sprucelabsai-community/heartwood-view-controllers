import {
	EventContract,
	EventNames,
	EventSignature,
	SkillEventContract,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import { assertOptions, Schema, SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import {
	CardViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import '@sprucelabs/mercury-core-events'
import ListViewController from './list/List.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow

export interface ActiveRecordCardViewControllerOptions {
	eventName: string
	responseKey: string
	rowTransformer: (record: Record<string, any>) => Row
	noResultsRow?: Row
	payload?: Record<string, any>
	target?: Record<string, any>
	header?: Card['header']
	footer?: Card['footer']
}

interface ActiveRecordCardBuilder<Contract extends EventContract> {
	<
		EventName extends EventNames<Contract> = EventNames<Contract>,
		IEventSignature extends EventSignature = Contract['eventSignatures'][EventName],
		EmitSchema extends Schema = IEventSignature['emitPayloadSchema'] extends Schema
			? IEventSignature['emitPayloadSchema']
			: never,
		ResponseSchema extends Schema = IEventSignature['responsePayloadSchema'] extends Schema
			? IEventSignature['responsePayloadSchema']
			: never,
		Response extends SchemaValues<ResponseSchema> = SchemaValues<ResponseSchema>,
		ResponseKey extends keyof Response = keyof Response
	>(options: {
		eventName: EventName
		responseKey: ResponseKey
		rowTransformer: (record: Response[ResponseKey][number]) => Row
		noResultsRow?: Row
		//@ts-ignore
		payload?: SchemaValues<EmitSchema>['payload']
		//@ts-ignore
		target?: SchemaValues<EmitSchema>['target']
		header?: Card['header']
		footer?: Card['footer']
	}): ActiveRecordCardViewControllerOptions
}

//@ts-ignore
export const buildActiveRecord: ActiveRecordCardBuilder<SkillEventContract> = (
	options
) => {
	return options
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

		this.listVc = this.Controller('list', {})
		this.cardVc = this.Controller('card', {
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
	}

	public async start() {
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
						this.listVc.addRow(this.rowTransformer(record))
					}
				}
			}
		} catch (err: any) {
			this.listVc.addRow({
				id: 'error',
				cells: [
					{
						text: {
							content: err.message,
						},
					},
				],
				...this.noResultsRow,
			})
		}

		if (responseKeyError) {
			throw new Error('oops')
		}

		this.cardVc.setIsBusy(false)
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

	public getCardVc() {
		return this.cardVc
	}

	public getListVc() {
		return this.listVc
	}

	public render(): Card {
		return this.cardVc.render()
	}
}
