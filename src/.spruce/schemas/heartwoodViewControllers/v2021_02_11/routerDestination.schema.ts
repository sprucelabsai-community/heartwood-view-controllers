import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const routerDestinationSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestinationSchema  = {
	id: 'routerDestination',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'router destination',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `HeartwoodTypes.SkillViewControllerId`,}
	            },
	            /** . */
	            'args': {
	                type: 'raw',
	                options: {valueType: `Record<string, any>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(routerDestinationSchema)

export default routerDestinationSchema
