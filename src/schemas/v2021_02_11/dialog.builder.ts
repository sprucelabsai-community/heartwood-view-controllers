import { buildSchema } from '@sprucelabs/schema'
import cardBuilder from './cards/card.builder'
import skillViewBuilder from './skillView.builder'

export default buildSchema({
    id: 'dialog',
    name: 'Dialog',
    description: '',
    fields: {
        ...cardBuilder.fields,
        isVisible: {
            type: 'boolean',
            label: 'Visible',
        },
        shouldShowCloseButton: {
            type: 'boolean',
            label: 'Show close button',
        },
        width: skillViewBuilder.fields.width,
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog>',
            },
        },
        cardController: {
            type: 'raw',
            label: 'Card controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>',
            },
        },
        onClose: {
            type: 'raw',
            label: 'Close callback',
            hint: 'Called when the dialog is closed',
            options: {
                valueType: '() => Promise<void | boolean> | void | boolean',
            },
        },
        closeHandler: {
            type: 'raw',
            label: 'Close handler',
            hint: 'Called to actually close the dialog',
            options: {
                valueType: '() => Promise<void | boolean> | void | boolean',
            },
        },
    },
})
