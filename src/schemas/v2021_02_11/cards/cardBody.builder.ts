import { buildSchema } from '@sprucelabs/schema'
import cardSectionBuilder from './cardSection.builder'

export default buildSchema({
	id: 'cardBody',
	fields: {
		shouldShowSectionSeparators: {
			type: 'boolean',
			label: 'Show section separators',
			hint: 'This will make each section render with a border.',
		},
		isBusy: {
			type: 'boolean',
			label: 'Busy',
		},
		swipeController: {
			type: 'raw',
			label: 'Swipe controller',
			options: {
				valueType: '(controller: HeartwoodTypes.SwipeController) => void',
			},
		},
		shouldEnableSectionSwiping: {
			type: 'boolean',
			label: 'Swipe',
		},
		onSelectSlideTitle: {
			type: 'raw',
			label: 'Select slide title handler',
			options: {
				valueType: '(id: number) => void',
			},
		},
		onChangeSlide: {
			type: 'raw',
			label: 'Slide change callback',
			options: {
				valueType: '(slide: number) => void',
			},
		},
		sections: {
			type: 'schema',
			label: 'Sections',
			isArray: true,
			options: {
				schema: cardSectionBuilder,
			},
		},
	},
})
