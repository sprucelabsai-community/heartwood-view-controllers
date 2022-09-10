import { generateId } from '@sprucelabs/test-utils'
import { MapPin } from '../../../types/heartwood.types'

export default function generatePinValues(): MapPin {
	return {
		subtitle: generateId(),
		title: generateId(),
		address: {
			city: generateId(),
			country: generateId(),
			street1: generateId(),
			province: generateId(),
			zip: generateId(),
		},
	}
}
