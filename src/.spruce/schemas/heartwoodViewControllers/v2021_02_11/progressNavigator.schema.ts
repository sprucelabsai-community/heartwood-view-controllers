import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import progressNavigatorStepSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/progressNavigatorStep.schema'

const progressNavigatorSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorSchema  = {
	id: 'progressNavigator',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Progress Navigator',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'currentStepId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'processLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** Line icon. */
	            'lineIcon': {
	                label: 'Line icon',
	                type: 'select',
	                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.ProgressNavigator>`,}
	            },
	            /** . */
	            'steps': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: progressNavigatorStepSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(progressNavigatorSchema)

export default progressNavigatorSchema
