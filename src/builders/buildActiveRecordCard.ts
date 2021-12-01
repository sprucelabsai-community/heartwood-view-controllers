import {
	EventContract,
	EventNames,
	EventSignature,
	SkillEventContract,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import {
	Row,
	Card,
	ActiveRecordCardViewControllerOptions,
} from '../viewControllers/ActiveRecordCard.vc'

type List = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List

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
		id?: string
		eventName: EventName
		responseKey: ResponseKey
		rowTransformer: (record: Response[ResponseKey][number]) => Row
		noResultsRow?: Row
		/** @ts-ignore */
		payload?: SchemaValues<EmitSchema>['payload']
		/** @ts-ignore */
		target?: SchemaValues<EmitSchema>['target']
		header?: Card['header']
		footer?: Card['footer']
		columnWidths?: List['columnWidths']
		shouldRenderRowDividers?: boolean
		filter?: (record: Response[ResponseKey][number]) => boolean
		defaultRowHeight?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List['defaultRowHeight']
	}): ActiveRecordCardViewControllerOptions
}

/** @ts-ignore */
const buildActiveRecordCard: ActiveRecordCardBuilder<SkillEventContract> = (
	options
) => {
	return options
}

export default buildActiveRecordCard
