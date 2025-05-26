import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const statusIndicatorColorsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorColorsSchema  = {
	id: 'statusIndicatorColors',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Status indicator colors',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Color 1. */
	            'color1': {
	                label: 'Color 1',
	                type: 'text',
	                options: undefined
	            },
	            /** Color 2. */
	            'color2': {
	                label: 'Color 2',
	                type: 'text',
	                options: undefined
	            },
	            /** Color 3. */
	            'color3': {
	                label: 'Color 3',
	                type: 'text',
	                options: undefined
	            },
	            /** Color 4. */
	            'color4': {
	                label: 'Color 4',
	                type: 'text',
	                options: undefined
	            },
	            /** Color 5. */
	            'color5': {
	                label: 'Color 5',
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(statusIndicatorColorsSchema)

export default statusIndicatorColorsSchema
