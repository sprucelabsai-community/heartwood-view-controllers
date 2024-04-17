import { calendarEventSchema } from '@sprucelabs/calendar-utils'
import { SchemaFieldsByName, buildSchema } from '@sprucelabs/schema'

const styles: SchemaFieldsByName = {}

calendarEventSchema.fields.style.options.choices.map((choice) => {
    styles[choice.value + 'ForegroundColor'] = {
        type: 'text',
        label: `${choice.label} foreground color`,
    }

    styles[choice.value + 'BackgroundColor'] = {
        type: 'text',
        label: `${choice.label} background color`,
    }
})

export default buildSchema({
    id: 'calendarEventColors',
    name: 'calendarEventColors',
    fields: styles,
})
