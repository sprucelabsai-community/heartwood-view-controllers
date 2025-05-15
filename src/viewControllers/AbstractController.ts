import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import {
    AlertOptions,
    ControllerOptions,
    Device,
    RenderInDialogHandler,
    ToastHandler,
    ToastOptions,
    ViewController,
    ViewControllerId,
    ViewControllerMap,
    ViewControllerOptions,
    VoteHandler,
    VoteOptions,
} from '../types/heartwood.types'
import { DialogViewControllerOptions } from './Dialog.vc'
import ViewControllerFactory from './ViewControllerFactory'

export default abstract class AbstractController {
    private renderInDialogHandler: RenderInDialogHandler
    private voteHandler: VoteHandler
    private activeDialog?: any
    private children: ViewController<any>[] = []
    private toastHandler: ToastHandler
    private activeAlert?: AlertOptions
    private wasDestroyed = false

    protected device: Device
    protected connectToApi: () => Promise<MercuryClient>
    protected views: ViewControllerFactory

    public constructor(options: ViewControllerOptions) {
        const {
            renderInDialogHandler,
            connectToApi,
            toastHandler,
            voteHandler,
            vcFactory,
            device,
        } = options

        this.renderInDialogHandler = renderInDialogHandler
        this.connectToApi = connectToApi
        this.voteHandler = voteHandler
        this.toastHandler = toastHandler
        this.views = vcFactory
        this.device = device
    }

    protected async askForAVote(options: VoteOptions) {
        await this.voteHandler(options)
    }

    protected renderInDialog(dialog: DialogViewControllerOptions) {
        const controller = this.Controller('dialog', {
            ...dialog,
            isVisible: true,
        })

        this.renderInDialogHandler(controller.render())

        this.activeDialog = controller

        return controller
    }

    protected async hideDialog() {
        await this.activeDialog?.hide()
    }

    public Controller<
        N extends ViewControllerId,
        O extends ControllerOptions<N>,
    >(name: N, options: O): ViewControllerMap[N] {
        const vc = this.views.Controller(name, options)

        if (vc) {
            //@ts-ignore
            vc.getParent = () => this
        }

        this.children.push(vc as any)

        return vc
    }

    protected mixinControllers(map: Record<string, any>) {
        this.views.mixinControllers(map as any)
    }

    protected toast(options: ToastOptions) {
        this.toastHandler(options)
    }

    protected async alert(options: AlertOptions) {
        const { title = 'Alert!', message, style, okButtonLabel } = options

        const header = {
            title,
        }

        if (
            this.activeAlert?.message === message &&
            this.activeAlert?.title === title &&
            this.activeAlert?.style === style
        ) {
            return
        }

        this.activeAlert = { ...options, title }

        const text: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text = {}
        const isHtml = message.includes('</')

        if (isHtml) {
            text.html = message
        } else {
            text.content = message
        }

        const dlg = this.renderInDialog({
            header,
            body: {
                sections: [
                    {
                        text,
                    },
                ],
            },
            footer: {
                buttons: [
                    {
                        label: okButtonLabel ?? 'Ok',
                        type: buttonStyleToType(style),
                        onClick: () => {
                            void dlg.hide()
                        },
                    },
                ],
            },
        })

        this.device.vibrate()
        await dlg.wait()
        this.activeAlert = undefined
    }

    public async destroy() {
        if (this.wasDestroyed) {
            throw new SpruceError({
                code: 'VIEW_ALREADY_DESTROYED',
                //@ts-ignore
                viewId: this.id,
            })
        }
        await Promise.all(
            //@ts-ignore
            this.children.map((c) => !c.wasDestroyed && c.destroy?.())
        )
        this.wasDestroyed = true
    }
}

function buttonStyleToType(
    style: AlertOptions['style']
): 'primary' | 'secondary' | 'destructive' {
    switch (style) {
        case 'error':
        case undefined:
            return 'destructive'
        case 'success':
            return 'primary'
        default:
            return 'primary'
    }
}
