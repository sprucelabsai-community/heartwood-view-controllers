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
						lineIcon: {
							...buttonFields.lineIcon,
							isRequired: true,
						},
						id: {
							type: 'id',
							isRequired: true,
						},
						destinationSVc: {
							type: 'schema',
							label: 'Destination skill view controller',
							options: {
								schema: buildSchema({
									id: 'destinationSkillViewController',
									fields: {
										id: {
											type: 'id',
											isRequired: true,
										},
										args: {
											type: 'raw',
											options: {
												valueType: 'Record<string, any>',
											},
										},
									},
								}),
							},
						},
						...pickFields(buttonFields, ['isEnabled', 'label', 'onClick']),
					},
				}),
			},
		},
	},
})
