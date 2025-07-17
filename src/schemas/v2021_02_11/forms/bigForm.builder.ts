import { buildSchema } from '@sprucelabs/schema'
import {
    buildLocalTypesImport,
    buildRemoteTypesImport,
} from '../../../utilities/importBuilder'
import formSectionBuilder from '../formSection.builder'
import sprucebotAvatarBuilder from '../sprucebotAvatar.builder'
import talkingSprucebotBuilder from '../talkingSprucebot.builder'
import formBuilder from './form.builder'

export default buildSchema({
    id: 'bigForm',
    name: 'Big form',
    importsWhenLocal: buildLocalTypesImport(),
    importsWhenRemote: buildRemoteTypesImport(),
    typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
    fields: {
        ...formBuilder.fields,
        sprucebotAvatar: {
            type: 'schema',
            options: {
                schema: sprucebotAvatarBuilder,
            },
        },
        shouldRenderFirstFieldsLabel: {
            type: 'boolean',
        },
        talkingSprucebot: {
            type: 'schema',
            options: {
                schema: talkingSprucebotBuilder,
            },
        },
        sections: {
            ...formBuilder.fields.sections,
            options: {
                ...formBuilder.fields.sections.options,
                schema: {
                    ...formSectionBuilder,
                    id: 'bigFormSection',
                    fields: {
                        ...formSectionBuilder.fields,
                        shouldRenderSubmitButton: {
                            type: 'boolean',
                        },
                    },
                },
            },
        },
        slideTitleRenderPosition: {
            type: 'select',
            options: {
                choices: [
                    { value: 'topOfSlide', label: 'Top of slide' },
                    {
                        value: 'headerAltTitle',
                        label: 'Header alternative title',
                    },
                ],
            },
            hint: 'Where should the slide title render? By default it is at the top of each slide using a Talking Sprucebot. If you set to "Header alternative title", it will render in the header as an alternative title.',
            defaultValue: 'topOfSlide',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.BigFormViewController<S>',
            },
        },
        presentSlide: {
            type: 'number',
            label: 'Present slide',
            hint: 'The slide showing now!',
            defaultValue: 0,
        },
        onSubmitSlide: {
            type: 'raw',
            label: 'Submit handler',
            options: {
                valueType: 'HeartwoodTypes.SubmitSlideHandler<S>',
            },
        },
    },
})
