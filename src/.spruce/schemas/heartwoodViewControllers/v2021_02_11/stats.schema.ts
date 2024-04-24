import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import statsStatSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/statsStat.schema'

const statsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsSchema  = {
	id: 'stats',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Stats',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Prefix. Will be rendered before the value. Could be a $ or something else. */
	            'valuePrefix': {
	                label: 'Prefix',
	                type: 'text',
	                hint: 'Will be rendered before the value. Could be a $ or something else.',
	                options: undefined
	            },
	            /** Format values. Add commas to numbers. */
	            'shouldFormatValues': {
	                label: 'Format values',
	                type: 'boolean',
	                hint: 'Add commas to numbers.',
	                options: undefined
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats>`,}
	            },
	            /** Stats. */
	            'stats': {
	                label: 'Stats',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: statsStatSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(statsSchema)

export default statsSchema
