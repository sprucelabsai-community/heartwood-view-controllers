import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'

export default buildSchema({
    id: 'dropdownButton',
    name: 'Dropdown button',
    fields: {
        ...buttonFields,
        onClick: {
            type: 'raw',
            label: 'Click handler',
            options: {
                valueType:
                    '(dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void',
            },
        },
    },
})
