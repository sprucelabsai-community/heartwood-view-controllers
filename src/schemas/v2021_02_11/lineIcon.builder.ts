import { buildSchema } from '@sprucelabs/schema'
import { lineIconFields } from '../../constants'

export default buildSchema({
	id: 'lineIcon',
	name: 'Line icon',
	description: '',
	fields: {
		...lineIconFields,
	},
})
