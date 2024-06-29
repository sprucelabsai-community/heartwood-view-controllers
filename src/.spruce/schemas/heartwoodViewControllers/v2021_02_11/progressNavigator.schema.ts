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
	                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
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
