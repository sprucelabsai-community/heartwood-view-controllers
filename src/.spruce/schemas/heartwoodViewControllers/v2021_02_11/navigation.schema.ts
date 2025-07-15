import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import navigationRouteSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/navigationRoute.schema'

const navigationSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationSchema  = {
	id: 'navigation',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Navigation',
	importsWhenRemote: ['import * as MercuryTypes from \'@sprucelabs/mercury-types\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Render button labels. Should the button labels be rendered? */
	            'shouldRenderButtonLabels': {
	                label: 'Render button labels',
	                type: 'boolean',
	                hint: 'Should the button labels be rendered?',
	                options: undefined
	            },
	            /** Is visible. Should the navigation be visible? Defaults to true. */
	            'isVisible': {
	                label: 'Is visible',
	                type: 'boolean',
	                hint: 'Should the navigation be visible? Defaults to true.',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>`,}
	            },
	            /** . */
	            'buttons': {
	                type: 'raw',
	                isArray: true,
	                options: {valueType: `HeartwoodTypes.NavigationItem`,}
	            },
	            /** . */
	            'additionalValidRoutes': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: navigationRouteSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(navigationSchema)

export default navigationSchema
