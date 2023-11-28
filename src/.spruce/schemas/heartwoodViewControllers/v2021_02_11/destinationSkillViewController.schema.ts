import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const destinationSkillViewControllerSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DestinationSkillViewControllerSchema  = {
	id: 'destinationSkillViewController',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `HeartwoodTypes.ViewControllerId`,}
	            },
	            /** . */
	            'args': {
	                type: 'raw',
	                options: {valueType: `Record<string, any>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(destinationSkillViewControllerSchema)

export default destinationSkillViewControllerSchema
