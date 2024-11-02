import { buildSchema } from '@sprucelabs/schema'
import barChartBuilder from '../barChart.builder'
import buttonBuilder from '../button.builder'
import buttonBarBuilder from '../buttonBar.builder'
import calendarBuilder from '../calendar.builder'
import countdownTimerBuilder from '../countdownTimer.builder'
import feedBuilder from '../feed.builder'
import bigFormBuilder from '../forms/bigForm.builder'
import formBuilder from '../forms/form.builder'
import listBuilder from '../list.builder'
import mapBuilder from '../map.builder'
import pagerBuilder from '../pager.builder'
import polarAreaBuilder from '../polarArea.builder'
import progressBuilder from '../progress.builder'
import ratingsBuilder from '../ratings.builder'
import receiptBuilder from '../receipt.builder'
import statsBuilder from '../stats.builder'
import talkingSprucebotBuilder from '../talkingSprucebot.builder'
import textBuilder from '../text.builder'

export default buildSchema({
    id: 'cardSection',
    fields: {
        id: {
            type: 'id',
        },
        title: {
            type: 'text',
            label: 'Title',
        },
        isComplete: {
            type: 'boolean',
            label: 'Complete',
            hint: 'When being rendered as a slide, this will signify the step is complete.',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            isPrivate: true,
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>',
            },
        },
        shouldBePadded: {
            type: 'boolean',
            label: 'Padding',
            defaultValue: true,
        },
        shouldContentBeCentered: {
            type: 'boolean',
            label: 'Center content',
            defaultValue: false,
        },
        text: {
            type: 'schema',
            label: 'Card section item',
            options: {
                schema: textBuilder,
            },
        },
        image: {
            type: 'text',
            label: 'Image',
        },
        avatar: {
            type: 'text',
            label: 'Avatar',
        },
        form: {
            type: 'schema',
            label: 'Form',
            options: {
                typeSuffix: '<any>',
                schema: formBuilder,
            },
        },
        talkingSprucebot: {
            type: 'schema',
            label: 'Talking Sprucebot',
            options: {
                schema: talkingSprucebotBuilder,
            },
        },
        bigForm: {
            type: 'schema',
            label: 'Big form',
            options: {
                typeSuffix: '<any>',
                schema: bigFormBuilder,
            },
        },
        map: {
            type: 'schema',
            label: 'Map',
            options: {
                schema: mapBuilder,
            },
        },
        buttons: {
            type: 'schema',
            label: 'Buttons',
            isArray: true,
            options: {
                schema: buttonBuilder,
            },
        },
        buttonBar: {
            type: 'schema',
            label: 'Button bar',
            options: {
                schema: buttonBarBuilder,
            },
        },
        list: {
            type: 'schema',
            label: 'List',
            options: {
                schema: listBuilder,
            },
        },
        calendar: {
            type: 'schema',
            label: 'Calendar',
            options: {
                schema: calendarBuilder,
            },
        },
        stats: {
            type: 'schema',
            label: 'Stats',
            options: {
                schema: statsBuilder,
            },
        },
        countdownTimer: {
            type: 'schema',
            label: 'Countdown timer',
            options: {
                schema: countdownTimerBuilder,
            },
        },
        progress: {
            type: 'schema',
            label: 'Progress',
            options: {
                schema: progressBuilder,
            },
        },
        ratings: {
            type: 'schema',
            label: 'Ratings',
            options: {
                schema: ratingsBuilder,
            },
        },
        receipt: {
            type: 'schema',
            label: 'Receipt',
            options: {
                schema: receiptBuilder,
            },
        },
        polarArea: {
            type: 'schema',
            label: 'Polar radar',
            options: {
                schema: polarAreaBuilder,
            },
        },
        feed: {
            type: 'schema',
            label: 'Feed',
            options: {
                schema: feedBuilder,
            },
        },
        pager: {
            type: 'schema',
            label: 'Pager',
            options: {
                schema: pagerBuilder,
            },
        },
        barChart: {
            type: 'schema',
            label: 'Bar chart',
            options: {
                schema: barChartBuilder,
            },
        },
        shouldRenderContentsAsGrid: {
            type: 'boolean',
            label: 'Grid',
            defaultValue: false,
        },
        gridSize: {
            type: 'select',
            label: 'Grid size',
            options: {
                choices: [
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
                ],
            },
        },
        portal: {
            type: 'schema',
            hint: 'Will render content in an iframe in the body of the card.',
            options: {
                schema: buildSchema({
                    id: 'portal',
                    fields: {
                        html: {
                            type: 'text',
                            label: 'HTML',
                        },
                        uri: {
                            type: 'text',
                            label: 'URI',
                        },
                    },
                }),
            },
        },
        alignment: {
            type: 'select',
            label: 'Alignment',
            defaultValue: 'left',
            options: {
                choices: [
                    {
                        value: 'left',
                        label: 'Left',
                    },
                    {
                        value: 'center',
                        label: 'Center',
                    },
                    {
                        value: 'right',
                        label: 'Right',
                    },
                ],
            },
        },
    },
})
