import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from '../button.builder'
import bigFormBuilder from '../forms/bigForm.builder'
import formBuilder from '../forms/form.builder'
import listBuilder from '../list.builder'
import talkingSprucebotBuilder from '../talkingSprucebot.builder'
import textBuilder from '../text.builder'

export default buildSchema({
	id: 'cardSection',
	fields: {
		title: {
			type: 'text',
			label: 'Title',
		},
		isComplete: {
			type: 'boolean',
			label: 'Complete',
			hint: 'When being rendered as a slide, this will signify the step is complete.',
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			isPrivate: true,
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.CardSection>',
			},
		},
		shouldBePadded: {
			type: 'boolean',
			label: 'Padding',
			defaultValue: true,
		},
		shouldContentBeCentered: {
			type: 'boolean',
			label: 'Center content',
			defaultValue: false,
		},
		text: {
			type: 'schema',
			label: 'Card section item',
			options: {
				schema: textBuilder,
			},
		},
		image: {
			type: 'text',
			label: 'Image',
		},
		form: {
			type: 'schema',
			label: 'Form',
			options: {
				typeSuffix: '<SpruceSchema.Schema>',
				schema: formBuilder,
			},
		},
		talkingSprucebot: {
			type: 'schema',
			label: 'Talking Sprucebot',
			options: {
				schema: talkingSprucebotBuilder,
			},
		},
		bigForm: {
			type: 'schema',
			label: 'Big form',
			options: {
				typeSuffix: '<SpruceSchema.Schema>',
				schema: bigFormBuilder,
			},
		},
		buttons: {
			type: 'schema',
			label: 'Buttons',
			isArray: true,
			options: {
				schema: buttonBuilder,
			},
		},
		list: {
			type: 'schema',
			label: 'List',
			options: {
				schema: listBuilder,
			},
		},
		shouldRenderContentsAsGrid: {
			type: 'boolean',
			label: 'Grid',
			defaultValue: false,
		},
		alignment: {
			type: 'select',
			label: 'Alignment',
			defaultValue: 'left',
			options: {
				choices: [
					{
						value: 'left',
						label: 'Left',
					},
					{
						value: 'center',
						label: 'Center',
					},
					{
						value: 'right',
						label: 'Right',
					},
				],
			},
		},
	},
})
