import { buildSchema } from '@sprucelabs/schema'
import dropdownButtonBuilder from './dropdownButton.builder'
import permissionContractReferenceBuilder from './permissionContractReference.builder'
import routerDestinationBuilder from './routerDestination.builder'

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
        destination: {
            type: 'schema',
            label: 'Destination skill view controller',
            options: {
                schema: routerDestinationBuilder,
            },
        },
    },
})
