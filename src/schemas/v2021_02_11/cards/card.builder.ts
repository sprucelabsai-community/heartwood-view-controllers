import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from '../button.builder'
import cardBodyBuilder from './cardBody.builder'
import cardFooterBuilder from './cardFooter.builder'
import cardHeaderBuilder from './cardHeader.builder'

export default buildSchema({
    id: 'card',
    name: 'Card',
    description: '',
    fields: {
        id: {
            type: 'id',
        },
        className: {
            type: 'text',
            isPrivate: true,
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.CardViewController',
            },
        },
        header: {
            type: 'schema',
            label: 'Header',
            options: {
                schema: cardHeaderBuilder,
            },
        },
        criticalError: {
            type: 'schema',
            label: 'Critical error',
            options: {
                schema: {
                    id: 'criticalError',
                    fields: {
                        title: {
                            type: 'text',
                        },
                        message: {
                            type: 'text',
                        },
                        buttons: {
                            type: 'schema',
                            isArray: true,
                            options: {
                                schema: buttonBuilder,
                            },
                        },
                    },
                },
            },
        },
        shouldFadeIn: {
            type: 'boolean',
            label: 'Fade in',
            defaultValue: true,
        },
        style: {
            type: 'select',
            label: 'Style',
            options: {
                choices: [
                    { value: 'standard', label: 'Standard' },
                    { value: 'informational', label: 'Informational' },
                    { value: 'visual', label: 'Visual' },
                    { value: 'heading', label: 'Heading' },
                ],
            },
        },
        backgroundImage: {
            type: 'text',
            label: 'Background image',
            hint: 'The URL of an image to use as the background of the card.',
        },
        backgroundImageSize: {
            type: 'select',
            label: 'Background image size',
            options: {
                choices: [
                    { value: 'cover', label: 'Cover' },
                    { value: 'contain', label: 'Contain' },
                ],
            },
        },
        onClick: {
            type: 'raw',
            label: 'Click handler',
            options: {
                valueType: '() => Promise<any> | any',
            },
        },
        body: {
            type: 'schema',
            label: 'Body',
            hint: 'Card bodies are comprised of sections. You will want at least 1 to get started.',
            options: {
                schema: cardBodyBuilder,
            },
        },
        footer: {
            type: 'schema',
            label: 'Footer',
            options: {
                schema: cardFooterBuilder,
            },
        },
    },
})
