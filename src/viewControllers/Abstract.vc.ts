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

	public constructor(options: ViewControllerOptions) {
		this.vcFactory = options.vcFactory
		this.renderInDialogHandler = options.renderInDialogHandler
		this.confirmHandler = options.confirmHandler
		this.connectToApi = options.connectToApi
		this.voteHandler = options.voteHandler
	}

	public abstract render(): ViewModel
	public triggerRender() {}

	public mixinControllers(map: Record<string, any>) {
		this.vcFactory.mixinControllers(map as any)
	}

	public Controller<N extends ViewControllerId, O extends ControllerOptions<N>>(
		name: N,
		options: O
	): ViewControllerMap[N] {
		const vc = this.vcFactory.Controller(name, options)
		this.children.push(vc as any)

		return vc
	}

	protected renderInDialog(dialog: DialogViewControllerOptions) {
		const controller = this.vcFactory.Controller('dialog', {
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

	public async destroy() {
		if (this.wasDestroyed) {
			//@ts-ignore
			throw new SpruceError({ code: 'VIEW_ALREADY_DESTROYED', viewId: this.id })
		}
		await Promise.all(this.children.map((c) => c.destroy?.()))
		this.wasDestroyed = true
	}

	protected async alert(options: {
		title?: string
		message: string
		style?: 'info' | 'error'
	}) {
		const header = options.title
			? {
					title: options.title,
			  }
			: undefined

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
						type: options.style === 'info' ? 'primary' : 'destructive',
						onClick: () => {
							void dlg.hide()
						},
					},
				],
			},
		})

		await dlg.wait()
	}

	protected async confirm(options: ConfirmOptions) {
		return this.confirmHandler(options)
	}

	protected async waitForRender() {
		await new Promise<void>((resolve) => setTimeout(resolve, 0))
	}
}
