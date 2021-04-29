import { buildSchema } from '@sprucelabs/schema'
import { fancyIcons } from '../../../constants'

export default buildSchema({
	id: 'cardHeader',
	fields: {
		title: {
			type: 'text',
			label: 'Title',
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.CardHeader>',
			},
		},
		subtitle: {
			type: 'text',
			label: 'Subtitle',
		},
		icon: {
			type: 'select',
			label: 'Icon',
			options: {
				choices: fancyIcons.map((i) => ({
					value: i,
					label: i,
				})),
			},
		},
		image: {
			type: 'text',
			label: 'Image',
			hint: 'The absolute url to any image you want shown in the header.',
		},
		closeHandler: {
			type: 'raw',
			label: 'Close handler',
			isPrivate: true,
			hint: 'Meant for use inside React components directly.',
			options: {
				valueType: '() => Promise<void> | void',
			},
		},
	},
})
