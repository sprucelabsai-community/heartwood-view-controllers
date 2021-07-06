import { buildSchema } from '@sprucelabs/schema'
import { lineIconFields } from '../../constants'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../utilities/importBuilder'
import buttonBuilder from './button.builder'
import textInputBuilder from './forms/textInput.builder'
import selectInputBuilder from './selectInput.builder'
import textBuilder from './text.builder'

export default buildSchema({
	id: 'listCell',
	name: 'List Cell',
	description: '',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
	fields: {
		text: {
			type: 'schema',
			label: 'Text',
			options: {
				schema: textBuilder,
			},
		},
		subText: {
			type: 'schema',
			label: 'Subtext',
			options: {
				schema: textBuilder,
			},
		},
		image: {
			type: 'text',
			label: 'Image url',
		},
		button: {
			type: 'schema',
			label: 'Button',
			options: {
				schema: {
					id: 'listCellButton',
					fields: {
						...buttonBuilder.fields,
						onClick: {
							type: 'raw',
							label: 'Cell button click handler',
							options: {
								valueType:
									'(options: { rowVc: HeartwoodTypes.ListRowViewController }) => void | Promise<void>',
							},
						},
						onKeyDown: {
							type: 'raw',
							label: 'Cell button key down handler',
							options: {
								valueType:
									'(options: { rowVc: HeartwoodTypes.ListRowViewController, key: HeartwoodTypes.KeyboardKey }) => void | Promise<void>',
							},
						},
					},
				},
			},
		},
		lineIcon: {
			type: 'select',
			label: 'Line icon',
			options: {
				...(lineIconFields.name.options as any),
			},
		},
		textInput: {
			type: 'schema',
			label: 'Text input',
			options: {
				schema: {
					id: 'listTextInput',
					fields: {
						...textInputBuilder.fields,
						setValue: {
							type: 'raw',
							options: {
								valueType: '(name: string, value: any) => void',
							},
						},
					},
				},
			},
		},
		selectInput: {
			type: 'schema',
			label: 'Select input',
			options: {
				schema: {
					id: 'listSelectInput',
					fields: {
						...selectInputBuilder.fields,
						setValue: {
							type: 'raw',
							options: {
								valueType: '(name: string, value: any) => void',
							},
						},
					},
				},
			},
		},
	},
})
