import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../../constants'
import pagerBuilder from '../pager.builder'

export default buildSchema({
    id: 'cardFooter',
    fields: {
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>',
            },
        },
        buttons: {
            type: 'schema',
            label: 'Buttons',
            isArray: true,
            options: {
                schema: {
                    id: 'cardFooterButton',
                    fields: {
                        ...buttonFields,
                    },
                },
            },
        },
        isBusy: {
            type: 'boolean',
            label: 'Loading',
        },
        isSticky: {
            type: 'boolean',
            label: 'Sticky',
        },
        isEnabled: {
            type: 'boolean',
            label: 'Loading',
            defaultValue: true,
        },
        pager: {
            type: 'schema',
            label: 'Pager',
            options: {
                schema: pagerBuilder,
            },
        },
        shouldRenderBorder: {
            type: 'boolean',
            label: 'Show border',
            defaultValue: true,
        },
        layout: {
            type: 'select',
            label: 'Layout',
            options: {
                choices: [
                    { value: 'vertical', label: 'Vertical' },
                    { value: 'horizontal', label: 'Horizontal' },
                ],
            },
        },
    },
})
