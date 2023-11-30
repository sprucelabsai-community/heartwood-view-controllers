import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'

export default buildSchema({
	id: 'progressNavigator',
	name: 'Progress Navigator',
	fields: {
		currentStepId: {
			type: 'id',
		},
		processLabel: {
			type: 'text',
		},
		lineIcon: {
			...buttonFields.lineIcon,
		},
		controller: {
			type: 'raw',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<HeartwoodTypes.ProgressNavigator>',
			},
		},
		steps: {
			type: 'schema',
			isArray: true,
			isRequired: true,
			options: {
				schema: buildSchema({
					id: 'progressNavigatorStep',
					fields: {
						id: {
							type: 'id',
							isRequired: true,
						},
						label: {
							type: 'text',
							isRequired: true,
						},
						isComplete: {
							type: 'boolean',
						},
						hasError: {
							type: 'boolean',
						},
					},
				}),
			},
		},
	},
})
