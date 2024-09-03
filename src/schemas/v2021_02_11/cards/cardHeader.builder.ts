import { buildSchema } from '@sprucelabs/schema'
import { fancyIcons } from '../../../constants'
import formBuilder from '../forms/form.builder'

export default buildSchema({
    id: 'cardHeader',
    fields: {
        title: {
            type: 'text',
            label: 'Title',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader>',
            },
        },
        subtitle: {
            type: 'text',
            label: 'Subtitle',
        },
        icon: {
            type: 'select',
            label: 'Icon',
            options: {
                choices: fancyIcons.map((i) => ({
                    value: i,
                    label: i,
                })),
            },
        },
        image: {
            type: 'text',
            label: 'Image',
            hint: 'The absolute url to any image you want shown in the header.',
        },
        imageSize: {
            type: 'select',
            label: 'Image size',
            hint: 'How should the header image be rendered',
            defaultValue: 'cover',
            options: {
                choices: [
                    {
                        value: 'cover',
                        label: 'Cover',
                    },
                    {
                        value: 'contain',
                        label: 'Contain',
                    },
                ],
            },
        },
        form: {
            type: 'schema',
            label: 'Form',
            options: {
                typeSuffix: '<any>',
                schema: formBuilder,
            },
        },
        closeHandler: {
            type: 'raw',
            label: 'Close handler',
            isPrivate: true,
            hint: 'Meant for use inside React components directly.',
            options: {
                valueType: '() => Promise<void> | void',
            },
        },
    },
})
