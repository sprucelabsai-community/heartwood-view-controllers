import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'receipt',
	name: 'Receipt',
	fields: {
		header: {
			type: 'schema',
			options: {
				schema: buildSchema({
					id: 'receiptHeader',
					fields: {
						title: {
							type: 'text',
						},
						subtitle: {
							type: 'text',
						},
					},
				}),
			},
		},
		sections: {
			type: 'schema',
			isArray: true,
			options: {
				schema: buildSchema({
					id: 'receiptSection',
					fields: {
						title: {
							type: 'text',
						},
						lineItems: {
							type: 'schema',
							isArray: true,
							options: {
								schema: buildSchema({
									id: 'receiptLineItem',
									fields: {
										name: {
											type: 'text',
											isRequired: true,
										},
										description: {
											type: 'text',
										},
										quantity: {
											type: 'text',
											isRequired: true,
										},
										totalPrice: {
											type: 'text',
											isRequired: true,
										},
									},
								}),
							},
						},
					},
				}),
			},
		},
		totals: {
			type: 'schema',
			isArray: true,
			options: {
				schema: buildSchema({
					id: 'receiptTotal',
					fields: {
						label: {
							type: 'text',
							isRequired: true,
						},
						value: {
							type: 'text',
							isRequired: true,
						},
					},
				}),
			},
		},
	},
})
