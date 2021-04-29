import { buildSchema, SelectChoice } from '@sprucelabs/schema'

export const sizeChoices: SelectChoice[] = [
	{
		value: 'small',
		label: 'Small',
	},
	{
		value: 'medium',
		label: 'Medium',
	},
	{
		value: 'large',
		label: 'Large',
	},
]

export default buildSchema({
	id: 'sprucebotAvatar',
	name: 'Sprucebot avatar',
	description: '',
	fields: {
		size: {
			type: 'select',
			label: 'Size',
			isRequired: true,
			defaultValue: 'medium',
			options: {
				choices: sizeChoices,
			},
		},
		stateOfMind: {
			type: 'select',
			label: 'State of mind',
			isRequired: true,
			defaultValue: 'chill',
			options: {
				choices: [
					{
						value: 'chill',
						label:
							'Chill - Sprucebot is saying something informative or a salutation',
					},
					{
						value: 'contemplative',
						label: 'Contemplative - Sprucebot is loading or sending data',
					},
					// {
					// 	value: 'curious',
					// 	label:
					// 		'Curious - Sprucebot is asking a question or waiting for input',
					// },
					{
						value: 'accomplished',
						label:
							'Accomplished - Sprucebot is celebrating because a process has finished',
					},
				],
			},
		},
	},
})
