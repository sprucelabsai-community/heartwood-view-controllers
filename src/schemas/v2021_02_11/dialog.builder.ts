import { buildSchema } from '@sprucelabs/schema'
import cardBuilder from './cards/card.builder'

export default buildSchema({
	id: 'dialog',
	name: 'Dialog',
	description: '',
	fields: {
		...cardBuilder.fields,
		isVisible: {
			type: 'boolean',
			label: 'Visible',
		},
		shouldShowCloseButton: {
			type: 'boolean',
			label: 'Show close button',
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.Dialog>',
			},
		},
		cardController: {
			type: 'raw',
			label: 'Card controller',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.Card>',
			},
		},
		onClose: {
			type: 'raw',
			label: 'Close callback',
			options: {
				valueType: '() => Promise<void | boolean> | void | boolean',
			},
		},
	},
})
