import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import textSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/text.schema'
import formSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import talkingSprucebotSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/talkingSprucebot.schema'
import bigFormSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/bigForm.schema'
import buttonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/button.schema'
import buttonBarSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/buttonBar.schema'
import listSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/list.schema'
import calendarSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'

const cardSectionSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema  = {
	id: 'cardSection',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Title. */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                options: undefined
	            },
	            /** Complete. When being rendered as a slide, this will signify the step is complete. */
	            'isComplete': {
	                label: 'Complete',
	                type: 'boolean',
	                hint: 'When being rendered as a slide, this will signify the step is complete.',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                isPrivate: true,
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>`,}
	            },
	            /** Padding. */
	            'shouldBePadded': {
	                label: 'Padding',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Center content. */
	            'shouldContentBeCentered': {
	                label: 'Center content',
	                type: 'boolean',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Card section item. */
	            'text': {
	                label: 'Card section item',
	                type: 'schema',
	                options: {schema: textSchema_v2021_02_11,}
	            },
	            /** Image. */
	            'image': {
	                label: 'Image',
	                type: 'text',
	                options: undefined
	            },
	            /** Form. */
	            'form': {
	                label: 'Form',
	                type: 'schema',
	                options: {typeSuffix: `<SpruceSchema.Schema>`,schema: formSchema_v2021_02_11,}
	            },
	            /** Talking Sprucebot. */
	            'talkingSprucebot': {
	                label: 'Talking Sprucebot',
	                type: 'schema',
	                options: {schema: talkingSprucebotSchema_v2021_02_11,}
	            },
	            /** Big form. */
	            'bigForm': {
	                label: 'Big form',
	                type: 'schema',
	                options: {typeSuffix: `<SpruceSchema.Schema>`,schema: bigFormSchema_v2021_02_11,}
	            },
	            /** Buttons. */
	            'buttons': {
	                label: 'Buttons',
	                type: 'schema',
	                isArray: true,
	                options: {schema: buttonSchema_v2021_02_11,}
	            },
	            /** Button bar. */
	            'buttonBar': {
	                label: 'Button bar',
	                type: 'schema',
	                options: {schema: buttonBarSchema_v2021_02_11,}
	            },
	            /** List. */
	            'list': {
	                label: 'List',
	                type: 'schema',
	                options: {schema: listSchema_v2021_02_11,}
	            },
	            /** Calendar. */
	            'calendar': {
	                label: 'Calendar',
	                type: 'schema',
	                options: {schema: calendarSchema_v2021_02_11,}
	            },
	            /** Grid. */
	            'shouldRenderContentsAsGrid': {
	                label: 'Grid',
	                type: 'boolean',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Alignment. */
	            'alignment': {
	                label: 'Alignment',
	                type: 'select',
	                defaultValue: "left",
	                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardSectionSchema)

export default cardSectionSchema
