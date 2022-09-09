import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from './button.builder'

export default buildSchema({
	id: 'map',
	name: 'Map',
	fields: {
		center: {
			type: 'schema',
			options: {
				schema: buildSchema({
					id: 'latLng',
					fields: {
						lat: { type: 'number', isRequired: true },
						lng: { type: 'number', isRequired: true },
					},
				}),
			},
		},
		pins: {
			type: 'schema',
			isArray: true,
			minArrayLength: 0,
			options: {
				schema: buildSchema({
					id: 'mapPin',
					fields: {
						title: {
							type: 'text',
						},
						subtitle: {
							type: 'text',
						},
						address: {
							type: 'address',
							isRequired: true,
						},
						buttons: {
							type: 'schema',
							isArray: true,
							minArrayLength: 0,
							options: {
								schema: buttonBuilder,
							},
						},
					},
				}),
			},
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.MapViewController',
			},
		},
	},
})
