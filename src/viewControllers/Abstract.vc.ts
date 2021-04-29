import {
	Client,
	ConfirmHandler,
	RenderInDialogHandler,
	ViewController,
	ViewControllerOptions,
	ConfirmOptions,
} from '../types/heartwood.types'
import { DialogViewControllerOptions } from './Dialog.vc'
import ViewControllerFactory from './ViewControllerFactory'

export default abstract class AbstractViewController<ViewModel>
	implements ViewController<ViewModel> {
	protected vcFactory: ViewControllerFactory<any>
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

	protected async confirm(options: ConfirmOptions) {
		return this.confirmHandler(options)
	}
}
