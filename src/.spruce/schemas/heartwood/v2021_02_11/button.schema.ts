import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import dropdownSchema from '#spruce/schemas/heartwood/v2021_02_11/dropdown.schema'

const buttonSchema: SpruceSchemas.Heartwood.v2021_02_11.ButtonSchema  = {
	id: 'button',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Button',
	    fields: {
	            /** Label. */
	            'label': {
	                label: 'Label',
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ButtonController`,}
	            },
	            /** Selected. */
	            'isSelected': {
	                label: 'Selected',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Selected. */
	            'isEnabled': {
	                label: 'Selected',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Add to fade-in queue.. Fade in effect could change. */
	            'shouldQueueShow': {
	                label: 'Add to fade-in queue.',
	                type: 'boolean',
	                hint: 'Fade in effect could change.',
	                options: undefined
	            },
	            /** Type. */
	            'type': {
	                label: 'Type',
	                type: 'select',
	                defaultValue: "secondary",
	                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"}],}
	            },
	            /** Image. */
	            'image': {
	                label: 'Image',
	                type: 'text',
	                options: undefined
	            },
	            /** Dropdown. */
	            'dropdown': {
	                label: 'Dropdown',
	                type: 'schema',
	                options: {schema: dropdownSchema,}
	            },
	            /** Click handler. */
	            'onClick': {
	                label: 'Click handler',
	                type: 'raw',
	                options: {valueType: `() => Promise<void> | void`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(buttonSchema)

export default buttonSchema
