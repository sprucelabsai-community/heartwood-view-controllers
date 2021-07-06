import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const cardBuilderSchema: SpruceSchemas.Heartwood.v2021_02_11.CardBuilderSchema  = {
	id: 'cardBuilder',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: ''}

SchemaRegistry.getInstance().trackSchema(cardBuilderSchema)

export default cardBuilderSchema
