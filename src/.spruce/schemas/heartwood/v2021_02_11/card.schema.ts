import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const cardSchema: SpruceSchemas.Heartwood.v2021_02_11.CardSchema  = {
	id: 'card',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',}

SchemaRegistry.getInstance().trackSchema(cardSchema)

export default cardSchema
