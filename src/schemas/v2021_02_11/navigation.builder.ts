import { buildSchema, pickFields } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'
import dropdownBuilder from './dropdown.builder'

export default buildSchema({
    id: 'navigation',
    name: 'Navigation',
    fields: {
        shouldRenderButtonLabels: {
            type: 'boolean',
            label: 'Render button labels',
            hint: 'Should the button labels be rendered?',
        },
        isVisible: {
            type: 'boolean',
            label: 'Is visible',
            hint: 'Should the navigation be visible? Defaults to true.',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>',
            },
        },
        buttons: {
            type: 'schema',
            isArray: true,
            options: {
                schema: buildSchema({
                    id: 'navigationButton',
                    fields: {
                        lineIcon: {
                            ...buttonFields.lineIcon,
                            isRequired: true,
                        },
                        id: {
                            type: 'id',
                            isRequired: true,
                        },
                        destination: {
                            type: 'schema',
                            label: 'Destination skill view controller',
                            options: {
                                schema: buildSchema({
                                    id: 'destinationSkillViewController',
                                    fields: {
                                        id: {
                                            type: 'raw',
                                            isRequired: true,
                                            options: {
                                                valueType:
                                                    'HeartwoodTypes.SkillViewControllerId',
                                            },
                                        },
                                        args: {
                                            type: 'raw',
                                            options: {
                                                valueType:
                                                    'Record<string, any>',
                                            },
                                        },
                                    },
                                }),
                            },
                        },
                        ...pickFields(buttonFields, [
                            'isEnabled',
                            'label',
                            'onClick',
                        ]),
                        dropdown: {
                            type: 'schema',
                            label: 'Dropdown',
                            options: {
                                schema: dropdownBuilder,
                            },
                        },
                    },
                }),
            },
        },
    },
})
