import { Schema, IFieldDefinition } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { FieldRenderOptions } from '../../types/heartwood.types'
import { EditFieldValues } from './EditFormBuilderFieldCard.vc'

export default class FieldUpdater {
    public static Updater() {
        return new this()
    }

    public update(
        name: string,
        field: Partial<IFieldDefinition>,
        updates: Partial<EditFieldValues>
    ) {
        debugger
        const { selectOptions, ...changes } = updates
        delete changes.name

        const newDefinition = {
            ...field,
            ...changes,
        }

        if (selectOptions) {
            newDefinition.options = {
                ...field.options,
                choices: selectOptions.split('\n').map((label) => ({
                    label: label.trim(),
                    value: namesUtil.toCamel(label),
                })),
            }
        }

        const renderOptions: FieldRenderOptions<Schema> = {
            name: name as never,
        }

        if (updates.type === 'signature') {
            newDefinition.type = 'image'
            renderOptions.renderAs = 'signature'
        }

        return [newDefinition, renderOptions]
    }
}
