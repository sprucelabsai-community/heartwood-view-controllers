import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardSectionSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardSection.schema'

const cardBodySchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBodySchema  = {
	id: 'cardBody',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Show section separators. This will make each section render with a border. */
	            'shouldShowSectionSeparators': {
	                label: 'Show section separators',
	                type: 'boolean',
	                hint: 'This will make each section render with a border.',
	                options: undefined
	            },
	            /** Busy. */
	            'isBusy': {
	                label: 'Busy',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Swipe controller. */
	            'swipeController': {
	                label: 'Swipe controller',
	                type: 'raw',
	                options: {valueType: `(controller: HeartwoodTypes.SwipeController) => void`,}
	            },
	            /** Swipe. */
	            'shouldEnableSectionSwiping': {
	                label: 'Swipe',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Select slide title handler. */
	            'onSelectSlideTitle': {
	                label: 'Select slide title handler',
	                type: 'raw',
	                options: {valueType: `(id: number) => void`,}
	            },
	            /** Slide change callback. */
	            'onChangeSlide': {
	                label: 'Slide change callback',
	                type: 'raw',
	                options: {valueType: `(slide: number) => void`,}
	            },
	            /** Sections. */
	            'sections': {
	                label: 'Sections',
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSectionSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardBodySchema)

export default cardBodySchema
