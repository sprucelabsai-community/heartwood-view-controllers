import {
    EventContract,
    EventName,
    EventSignature,
    SkillEventContract,
    SpruceSchemas,
} from '@sprucelabs/mercury-types'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import {
    ActiveRecordPagingOptions,
    Card,
    List,
    ListRow,
} from '../types/heartwood.types'
import { ActiveRecordSearchOptions } from '../types/heartwood.types'
import { ActiveRecordCardViewControllerOptions } from '../viewControllers/activeRecord/ActiveRecordCard.vc'

type ActiveRecordCardBuilder<Contract extends EventContract> = <
    Fqen extends EventName<Contract> = EventName<Contract>,
    IEventSignature extends EventSignature = Contract['eventSignatures'][Fqen],
    EmitSchema extends Schema =
        IEventSignature['emitPayloadSchema'] extends Schema
            ? IEventSignature['emitPayloadSchema']
            : never,
    ResponseSchema extends Schema =
        IEventSignature['responsePayloadSchema'] extends Schema
            ? IEventSignature['responsePayloadSchema']
            : never,
    Response extends SchemaValues<ResponseSchema> =
        SchemaValues<ResponseSchema>,
    ResponseKey extends keyof Response = keyof Response,
>(options: {
    id?: string
    eventName: Fqen
    responseKey: ResponseKey
    rowTransformer: (record: Response[ResponseKey][number]) => ListRow
    noResultsRow?: Omit<ListRow, 'id'>
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
    search?: ActiveRecordSearchOptions
    paging?: ActiveRecordPagingOptions
}) => ActiveRecordCardViewControllerOptions

/** @ts-ignore */
const buildActiveRecordCard: ActiveRecordCardBuilder<SkillEventContract> = (
    options
) => {
    return options
}

export default buildActiveRecordCard
