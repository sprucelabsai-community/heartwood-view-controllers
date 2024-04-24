import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const calendarEventColorsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorsSchema  = {
	id: 'calendarEventColors',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'calendarEventColors',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Draft foreground color. */
	            'draftForegroundColor': {
	                label: 'Draft foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Draft background color. */
	            'draftBackgroundColor': {
	                label: 'Draft background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Tentative foreground color. */
	            'tentativeForegroundColor': {
	                label: 'Tentative foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Tentative background color. */
	            'tentativeBackgroundColor': {
	                label: 'Tentative background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Upcoming foreground color. */
	            'upcomingForegroundColor': {
	                label: 'Upcoming foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Upcoming background color. */
	            'upcomingBackgroundColor': {
	                label: 'Upcoming background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Unavailable foreground color. */
	            'unavailableForegroundColor': {
	                label: 'Unavailable foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Unavailable background color. */
	            'unavailableBackgroundColor': {
	                label: 'Unavailable background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Blocked foreground color. */
	            'blockedForegroundColor': {
	                label: 'Blocked foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Blocked background color. */
	            'blockedBackgroundColor': {
	                label: 'Blocked background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Active foreground color. */
	            'activeForegroundColor': {
	                label: 'Active foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Active background color. */
	            'activeBackgroundColor': {
	                label: 'Active background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Past foreground color. */
	            'pastForegroundColor': {
	                label: 'Past foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Past background color. */
	            'pastBackgroundColor': {
	                label: 'Past background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Warning foreground color. */
	            'warnForegroundColor': {
	                label: 'Warning foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Warning background color. */
	            'warnBackgroundColor': {
	                label: 'Warning background color',
	                type: 'text',
	                options: undefined
	            },
	            /** Critical foreground color. */
	            'criticalForegroundColor': {
	                label: 'Critical foreground color',
	                type: 'text',
	                options: undefined
	            },
	            /** Critical background color. */
	            'criticalBackgroundColor': {
	                label: 'Critical background color',
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarEventColorsSchema)

export default calendarEventColorsSchema
