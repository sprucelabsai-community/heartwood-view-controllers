import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'

export default buildSchema({
	id: 'buttonBar',
	name: 'Button bar',
	fields: {
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.ButtonBarViewController',
			},
		},
		buttons: {
			type: 'schema',
			label: 'Buttons',
			isRequired: true,
			isArray: true,
			options: {
				schema: {
					id: 'buttonBarButton',
					fields: {
						...buttonFields,
					},
				},
			},
		},
	},
})
