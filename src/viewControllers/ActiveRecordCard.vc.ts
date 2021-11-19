import {
	EventContract,
	EventNames,
	EventSignature,
	SkillEventContract,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import { assertOptions, Schema, SchemaValues } from '@sprucelabs/schema'
import {
	CardViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import '@sprucelabs/mercury-core-events'
import ListViewController from './list/List.vc'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow

export interface ActiveRecordCardViewControllerOptions {
	eventName: string
	responseKey: string
	rowTransformer: any
	noResultsRow?: Row
}

interface ActiveRecordCardBuilder<Contract extends EventContract> {
	<
		EventName extends EventNames<Contract> = EventNames<Contract>,
		IEventSignature extends EventSignature = Contract['eventSignatures'][EventName],
		ResponseSchema extends Schema = IEventSignature['responsePayloadSchema'] extends Schema
			? IEventSignature['responsePayloadSchema']
			: never,
		Records extends SchemaValues<ResponseSchema> = SchemaValues<ResponseSchema>,
		Key extends keyof Records = keyof Records
	>(options: {
		eventName: EventName
		responseKey: Key
		rowTransformer: (record: Records[Key][number]) => Row
		noResultsRow?: Row
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

	public constructor(
		options: ViewControllerOptions & ActiveRecordCardViewControllerOptions
	) {
		super(options)

		assertOptions(options, ['eventName', 'rowTransformer', 'responseKey'])

		this.noResultsRow = options.noResultsRow

		this.listVc = this.Controller('list', {})
		this.cardVc = this.Controller('card', {
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
		const client = await this.connectToApi()

		try {
			const results = await client.emit('list-organizations::v2020_12_25')
			debugger
			eventResponseUtil.getFirstResponseOrThrow(results)
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

		this.cardVc.setIsBusy(false)
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
