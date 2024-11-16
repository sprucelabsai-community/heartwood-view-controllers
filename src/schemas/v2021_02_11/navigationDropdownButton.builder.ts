import { buildSchema } from '@sprucelabs/schema'
import dropdownButtonBuilder from './dropdownButton.builder'
import permissionContractReferenceBuilder from './permissionContractReference.builder'

export default buildSchema({
    id: 'navigationDropdownButton',
    name: 'Navigation dropdown button',
    fields: {
        ...dropdownButtonBuilder.fields,
        viewPermissionContract: {
            type: 'schema',
            options: {
                schema: permissionContractReferenceBuilder,
            },
        },
    },
})
