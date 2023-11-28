import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'countdownTimer',
	name: 'Countdown Timer',
	fields: {
		controller: {
			type: 'raw',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<HeartwoodTypes.CountdownTimer>',
			},
		},
		onComplete: {
			type: 'raw',
			options: {
				valueType: '() => void',
			},
		},
		setStartHandler: {
			type: 'raw',
			isRequired: true,
			options: {
				valueType: '(handler: (to: number) => void) => void',
			},
		},
	},
})
