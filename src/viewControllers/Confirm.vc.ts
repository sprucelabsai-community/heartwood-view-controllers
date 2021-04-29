import { DialogOptions } from '../components/dialogs/Dialog'
import { ConfirmOptions, ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import DialogViewController from './Dialog.vc'

export type Dialog = DialogOptions
export type ConfirmViewControllerOptions = ConfirmOptions & {
	onAccept: () => void
	onDecline: () => void
}

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

		this.dialogVc = this.vcFactory.Controller('dialog', {
			isVisible: true,
			shouldShowCloseButton: false,
			header:
				options.title || options.subtitle
					? {
							title: options.title,
							subtitle: options.subtitle,
					  }
					: null,
			body: {
				sections: [
					{
						title: options.message,
					},
				],
			},
			footer: {
				buttons: [
					{
						type: 'primary',
						label: 'Yes',
						onClick: this.handleAccept.bind(this),
					},
					{
						type: 'secondary',
						label: 'No',
						onClick: this.handleDecline.bind(this),
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

	public render(): DialogOptions {
		return this.dialogVc.render()
	}
}
