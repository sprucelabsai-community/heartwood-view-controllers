import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../../constants'

export default buildSchema({
	id: 'cardFooter',
	fields: {
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>',
			},
		},
		buttons: {
			type: 'schema',
			label: 'Buttons',
			isArray: true,
			options: {
				schema: {
					id: 'cardFooterButton',
					fields: {
						...buttonFields,
					},
				},
			},
		},
		isLoading: {
			type: 'boolean',
			label: 'Loading',
		},
		isEnabled: {
			type: 'boolean',
			label: 'Loading',
			defaultValue: true,
		},
		shouldRenderBorder: {
			type: 'boolean',
			label: 'Show border',
			defaultValue: true,
		},
	},
})
