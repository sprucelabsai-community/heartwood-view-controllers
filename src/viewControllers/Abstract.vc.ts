import SpruceError from '../errors/SpruceError'
import {
	Client,
	ConfirmHandler,
	RenderInDialogHandler,
	ViewController,
	ViewControllerOptions,
	ConfirmOptions,
	ViewControllerId,
	ViewControllerMap,
	ControllerOptions,
	VoteHandler,
	VoteOptions,
} from '../types/heartwood.types'
import { DialogViewControllerOptions } from './Dialog.vc'
import ViewControllerFactory from './ViewControllerFactory'

export interface AlertOptions {
	title?: string
	message: string
	style?: 'info' | 'error' | 'success'
}

export default abstract class AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	private vcFactory: ViewControllerFactory
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private wasDestroyed = false

	private activeDialog?: any
	protected connectToApi: () => Promise<Client>
	private voteHandler: VoteHandler
	private children: ViewController<any>[] = []
	private _suspendendRender?: () => void

	public constructor(options: ViewControllerOptions) {
		this.vcFactory = options.vcFactory
		this.renderInDialogHandler = options.renderInDialogHandler
		this.confirmHandler = options.confirmHandler
		this.connectToApi = options.connectToApi
		this.voteHandler = options.voteHandler
	}

	public abstract render(): ViewModel
	public triggerRender() {}

	protected mixinControllers(map: Record<string, any>) {
		this.vcFactory.mixinControllers(map as any)
	}

	public Controller<N extends ViewControllerId, O extends ControllerOptions<N>>(
		name: N,
		options: O
	): ViewControllerMap[N] {
		const vc = this.vcFactory.Controller(name, options)

		if (vc) {
			//@ts-ignore
			vc.getParent = () => this
		}

		this.children.push(vc as any)

		return vc
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

	protected async askForAVote(options: VoteOptions) {
		await this.voteHandler(options)
	}

	private suspendRendering() {
		this._suspendendRender = this.triggerRender.bind(this)
		this.triggerRender = () => {}
	}

	private restoreRendering() {
		if (this._suspendendRender) {
			this.triggerRender = this._suspendendRender
		}
	}

	public async renderOnce(cb: () => any | Promise<any>) {
		this.suspendRendering()

		await cb()

		this.restoreRendering()
		this.triggerRender()
	}

	public async destroy() {
		if (this.wasDestroyed) {
			//@ts-ignore
			throw new SpruceError({ code: 'VIEW_ALREADY_DESTROYED', viewId: this.id })
		}
		await Promise.all(this.children.map((c) => c.destroy?.()))
		this.wasDestroyed = true
	}

	protected async alert(options: AlertOptions) {
		const { title = 'Alert! 🌲🤖' } = options

		const header = {
			title,
		}

		const dlg = this.renderInDialog({
			header,
			body: {
				sections: [
					{
						text: {
							content: options.message,
						},
					},
				],
			},
			footer: {
				buttons: [
					{
						label: 'Ok',
						type: this.styleToButtonType(options.style),
						onClick: () => {
							void dlg.hide()
						},
					},
				],
			},
		})

		await dlg.wait()
	}

	private styleToButtonType(
		style: AlertOptions['style']
	): 'primary' | 'secondary' | 'destructive' {
		switch (style) {
			case 'error':
			case undefined:
				return 'destructive'
			case 'success':
				return 'primary'
			default:
				return 'secondary'
		}
	}

	protected async confirm(options: ConfirmOptions) {
		return this.confirmHandler(options)
	}

	protected async waitForRender() {
		await new Promise<void>((resolve) => setTimeout(resolve, 0))
	}
}
