import { assert, test, suite } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import dialogTestPatcher from '../../../tests/utilities/dialogTestPatcher'
import vcAssert from '../../../tests/utilities/vcAssert'
import DialogTestSkillViewController from '../../support/DialogTest.svc'

@suite()
export default class AssertingDialogsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        dialogTest: DialogTestSkillViewController,
    }
    private vc!: DialogTestSkillViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.PatchedVc()
    }

    @test()
    protected async canBePathedToThrowWhenRenderingDialog() {
        await assert.doesThrowAsync(() => this.vc.renderInDialogAndGetDlgVc())
    }

    @test()
    protected async assertingDoesRenderWorksAsExpected() {
        await this.assertRendersDialog()
    }

    @test()
    protected async callsOriginalDialogHandler() {
        let wasHit = false
        this.vc = this.PatchedVc()

        //@ts-ignore
        this.vc.renderInDialogHandler = () => {
            wasHit = true
        }

        await this.assertRendersDialog()

        assert.isTruthy(wasHit)
    }

    @test()
    protected async renderingMoreThanOneDialogPerAssertionThrows() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersDialog(this.vc, async () => {
                await Promise.all([
                    this.vc.renderInDialogAndGetDlgVc(),
                    this.vc.renderInDialogAndGetDlgVc(),
                ])
            })
        )
    }

    @test()
    protected async canTestMultipleTimesInOneTest() {
        const dlg = await vcAssert.assertRendersDialog(this.vc, async () => {
            await this.vc.renderInDialogAndWait()
        })

        await dlg.hide()

        await vcAssert.assertRendersDialog(this.vc, async () => {
            await this.vc.renderInDialogAndWait()
        })
    }

    private async assertRendersDialog() {
        await vcAssert.assertRendersDialog(
            this.vc,
            () => this.vc.renderInDialogAndGetDlgVc() as any
        )
    }

    private PatchedVc() {
        const vc = this.Controller('dialogTest', {})
        dialogTestPatcher.patchDialogToThrow(vc)
        return vc
    }
}
