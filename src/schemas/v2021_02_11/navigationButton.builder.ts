import { buildSchema, pickFields } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'
import dropdownBuilder from './dropdown.builder'
import navigationDropdownButtonBuilder from './navigationDropdownButton.builder'
import permissionContractReferenceBuilder from './permissionContractReference.builder'

export default buildSchema({
    id: 'navigationButton',
    name: 'Navigation button',
    fields: {
        lineIcon: {
            ...buttonFields.lineIcon,
            isRequired: true,
        },
        id: {
            type: 'id',
            isRequired: true,
        },
        viewPermissionContract: {
            type: 'schema',
            options: {
                schema: permissionContractReferenceBuilder,
            },
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
                                valueType: 'Record<string, any>',
                            },
                        },
                    },
                }),
            },
        },
        ...pickFields(buttonFields, ['isEnabled', 'label', 'onClick']),
        dropdown: {
            type: 'schema',
            label: 'Dropdown',
            options: {
                schema: buildSchema({
                    id: 'navigationButtonDropdown',
                    fields: {
                        ...dropdownBuilder.fields,
                        items: {
                            type: 'schema',
                            isArray: true,
                            options: {
                                schema: navigationDropdownButtonBuilder,
                            },
                        },
                    },
                }),
            },
        },
    },
})
