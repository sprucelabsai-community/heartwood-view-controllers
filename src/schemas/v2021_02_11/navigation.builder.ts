import { buildSchema, pickFields } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'

export default buildSchema({
	id: 'navigation',
	name: 'Navigation',
	fields: {
		shouldRenderButtonLabels: {
			type: 'boolean',
			label: 'Render button labels',
			hint: 'Should the button labels be rendered?',
		},
		isVisible: {
			type: 'boolean',
			label: 'Is visible',
			hint: 'Should the navigation be visible? Defaults to true.',
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>',
			},
		},
		buttons: {
			type: 'schema',
			isArray: true,
			options: {
				schema: buildSchema({
					id: 'navigationButton',
					fields: {
						...pickFields(buttonFields, [
							'id',
							'lineIcon',
							'isEnabled',
							'label',
							'onClick',
						]),
					},
				}),
			},
		},
	},
})
