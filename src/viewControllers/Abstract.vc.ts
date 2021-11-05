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
} from '../types/heartwood.types'
import { DialogViewControllerOptions } from './Dialog.vc'
import ViewControllerFactory from './ViewControllerFactory'

export default abstract class AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	protected vcFactory: ViewControllerFactory
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler

	private activeDialog?: any
	protected connectToApi: () => Promise<Client>

	public constructor(options: ViewControllerOptions) {
		this.vcFactory = options.vcFactory
		this.renderInDialogHandler = options.renderInDialogHandler
		this.confirmHandler = options.confirmHandler
		this.connectToApi = options.connectToApi
	}

	public abstract render(): ViewModel
	public triggerRender() {}

	public Controller<N extends ViewControllerId, O extends ControllerOptions<N>>(
		name: N,
		options: O
	): ViewControllerMap[N] {
		return this.vcFactory.Controller(name, options)
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

	protected async alert(options: { title?: string; message: string }) {
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
						type: 'destructive',
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
