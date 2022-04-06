import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import { SkillViewControllerLoadOptions } from '../../types/heartwood.types'
import DialogVc, { DialogOptions } from '../../viewControllers/Dialog.vc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		dialogTest: DialogTestSkillViewController
	}
}

export default class DialogTestSkillViewController extends AbstractSkillViewController {
	private readonly dialog = { header: { title: 'coming soon' } }
	public loadInvocations: SkillViewControllerLoadOptions[] = []

	public async showTermsOfService() {
		setupController(this.renderInDialog(this.dialog))
	}

	public async hideTermsOfService() {
		await this.hideDialog()
	}

	public renderInDialogAndGetDlgVc(dialog?: Partial<DialogOptions>) {
		const controller = this.renderInDialog(dialog ?? this.dialog)

		setupController(controller)

		return controller
	}

	public async load(options: SkillViewControllerLoadOptions) {
		this.loadInvocations.push(options)
	}

	public invokesOnCloseCallback(onClose: () => void) {
		return setupController(this.renderInDialog({ ...this.dialog, onClose }))
	}

	public render() {
		return {
			layouts: [],
		}
	}
}

function setupController(controller: DialogVc) {
	controller.triggerRender = () => {}
	return controller
}
