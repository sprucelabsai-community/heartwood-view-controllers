import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import {
    LayoutWidth,
    SkillViewControllerLoadOptions,
} from '../../types/heartwood.types'
import DialogVc, { DialogOptions } from '../../viewControllers/Dialog.vc'

declare module '../../types/heartwood.types' {
    interface ViewControllerMap {
        dialogTest: DialogTestSkillViewController
    }
}

export default class DialogTestSkillViewController extends AbstractSkillViewController {
    private readonly dialog = { header: { title: 'coming soon' } }
    public wasDidHideHit = false

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

    public async renderCardInDialog(width?: LayoutWidth) {
        const controller = this.Controller('card', {})
        return this.renderInDialog({ width, ...controller.render() })
    }

    public async renderInDialogAndWait() {
        const dlgVc = this.renderInDialogAndGetDlgVc()
        await dlgVc.wait()
    }

    public async didHide() {
        this.wasDidHideHit = true
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
    return controller
}
