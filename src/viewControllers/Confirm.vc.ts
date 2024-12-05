import {
    CardBody,
    ConfirmOptions,
    Dialog,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import DialogViewController from './Dialog.vc'

export default class ConfirmViewController extends AbstractViewController<Dialog> {
    private dialogVc: DialogViewController
    private acceptHandler: () => void
    private declineHandler: () => void

    public constructor(
        options: ConfirmOptions &
            ViewControllerOptions &
            ConfirmViewControllerOptions
    ) {
        super(options)

        this.acceptHandler = options.onAccept
        this.declineHandler = options.onDecline

        let body: any

        if (options.body) {
            body = options.body
        }

        if (options.message) {
            if (!body) {
                body = {
                    sections: [],
                }
            }

            body.sections.unshift({
                title: options.message,
            })
        }

        this.dialogVc = this.DialogVc(options, body)
    }

    private DialogVc(
        options: ConfirmOptions &
            ViewControllerOptions & {
                onAccept: () => void
                onDecline: () => void
            },
        body?: CardBody
    ): DialogViewController {
        return this.Controller('dialog', {
            isVisible: true,
            shouldShowCloseButton: false,
            header:
                options.title || options.subtitle
                    ? {
                          title: options.title,
                          subtitle: options.subtitle,
                      }
                    : null,
            body,
            footer: {
                buttons: [
                    {
                        type: 'secondary',
                        label: 'No',
                        onClick: this.handleDecline.bind(this),
                    },
                    {
                        label: 'Yes',
                        type: options.isDestructive ? 'destructive' : 'primary',
                        onClick: this.handleAccept.bind(this),
                    },
                ],
            },
        })
    }

    public handleDecline() {
        this.declineHandler()
    }

    public handleAccept() {
        this.acceptHandler()
    }

    public async hide() {
        return this.dialogVc.hide()
    }

    public render(): Dialog {
        return this.dialogVc.render()
    }
}

export type ConfirmViewControllerOptions = ConfirmOptions & {
    onAccept: () => void
    onDecline: () => void
}
