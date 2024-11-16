import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'permissionContractReference',
    name: 'Permission contract reference',
    fields: {
        id: {
            type: 'raw',
            options: {
                valueType: 'MercuryTypes.PermissionContractId',
            },
        },
    },
})
