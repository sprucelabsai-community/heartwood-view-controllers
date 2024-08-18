import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import textSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/text.schema'
import formSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import talkingSprucebotSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/talkingSprucebot.schema'
import bigFormSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/bigForm.schema'
import mapSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/map.schema'
import buttonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/button.schema'
import buttonBarSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/buttonBar.schema'
import listSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/list.schema'
import calendarSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'
import statsSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/stats.schema'
import countdownTimerSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/countdownTimer.schema'
import progressSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/progress.schema'
import ratingsSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/ratings.schema'
import receiptSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/receipt.schema'
import polarAreaSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/polarArea.schema'
import feedSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/feed.schema'
import pagerSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/pager.schema'
import portalSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/portal.schema'

const cardSectionSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema  = {
	id: 'cardSection',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** Title. */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                options: undefined
	            },
	            /** Complete. When being rendered as a slide, this will signify the step is complete. */
	            'isComplete': {
	                label: 'Complete',
	                type: 'boolean',
	                hint: 'When being rendered as a slide, this will signify the step is complete.',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                isPrivate: true,
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>`,}
	            },
	            /** Padding. */
	            'shouldBePadded': {
	                label: 'Padding',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Center content. */
	            'shouldContentBeCentered': {
	                label: 'Center content',
	                type: 'boolean',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Card section item. */
	            'text': {
	                label: 'Card section item',
	                type: 'schema',
	                options: {schema: textSchema_v2021_02_11,}
	            },
	            /** Image. */
	            'image': {
	                label: 'Image',
	                type: 'text',
	                options: undefined
	            },
	            /** Avatar. */
	            'avatar': {
	                label: 'Avatar',
	                type: 'text',
	                options: undefined
	            },
	            /** Form. */
	            'form': {
	                label: 'Form',
	                type: 'schema',
	                options: {typeSuffix: `<any>`,schema: formSchema_v2021_02_11,}
	            },
	            /** Talking Sprucebot. */
	            'talkingSprucebot': {
	                label: 'Talking Sprucebot',
	                type: 'schema',
	                options: {schema: talkingSprucebotSchema_v2021_02_11,}
	            },
	            /** Big form. */
	            'bigForm': {
	                label: 'Big form',
	                type: 'schema',
	                options: {typeSuffix: `<any>`,schema: bigFormSchema_v2021_02_11,}
	            },
	            /** Map. */
	            'map': {
	                label: 'Map',
	                type: 'schema',
	                options: {schema: mapSchema_v2021_02_11,}
	            },
	            /** Buttons. */
	            'buttons': {
	                label: 'Buttons',
	                type: 'schema',
	                isArray: true,
	                options: {schema: buttonSchema_v2021_02_11,}
	            },
	            /** Button bar. */
	            'buttonBar': {
	                label: 'Button bar',
	                type: 'schema',
	                options: {schema: buttonBarSchema_v2021_02_11,}
	            },
	            /** List. */
	            'list': {
	                label: 'List',
	                type: 'schema',
	                options: {schema: listSchema_v2021_02_11,}
	            },
	            /** Calendar. */
	            'calendar': {
	                label: 'Calendar',
	                type: 'schema',
	                options: {schema: calendarSchema_v2021_02_11,}
	            },
	            /** Stats. */
	            'stats': {
	                label: 'Stats',
	                type: 'schema',
	                options: {schema: statsSchema_v2021_02_11,}
	            },
	            /** Countdown timer. */
	            'countdownTimer': {
	                label: 'Countdown timer',
	                type: 'schema',
	                options: {schema: countdownTimerSchema_v2021_02_11,}
	            },
	            /** Progress. */
	            'progress': {
	                label: 'Progress',
	                type: 'schema',
	                options: {schema: progressSchema_v2021_02_11,}
	            },
	            /** Ratings. */
	            'ratings': {
	                label: 'Ratings',
	                type: 'schema',
	                options: {schema: ratingsSchema_v2021_02_11,}
	            },
	            /** Receipt. */
	            'receipt': {
	                label: 'Receipt',
	                type: 'schema',
	                options: {schema: receiptSchema_v2021_02_11,}
	            },
	            /** Polar radar. */
	            'polarArea': {
	                label: 'Polar radar',
	                type: 'schema',
	                options: {schema: polarAreaSchema_v2021_02_11,}
	            },
	            /** Feed. */
	            'feed': {
	                label: 'Feed',
	                type: 'schema',
	                options: {schema: feedSchema_v2021_02_11,}
	            },
	            /** Pager. */
	            'pager': {
	                label: 'Pager',
	                type: 'schema',
	                options: {schema: pagerSchema_v2021_02_11,}
	            },
	            /** Grid. */
	            'shouldRenderContentsAsGrid': {
	                label: 'Grid',
	                type: 'boolean',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Grid size. */
	            'gridSize': {
	                label: 'Grid size',
	                type: 'select',
	                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
	            },
	            /** . Will render content in an iframe in the body of the card. */
	            'portal': {
	                type: 'schema',
	                hint: 'Will render content in an iframe in the body of the card.',
	                options: {schema: portalSchema_v2021_02_11,}
	            },
	            /** Alignment. */
	            'alignment': {
	                label: 'Alignment',
	                type: 'select',
	                defaultValue: "left",
	                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardSectionSchema)

export default cardSectionSchema
