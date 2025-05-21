import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import ProgressViewController, {
    ProgressViewControllerOptions,
} from '../../../viewControllers/reporting/Progress.vc'

@suite()
export default class ControllingAProgressViewTest extends AbstractViewControllerTest {
    private vc!: ProgressViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected canBeRenderedWithNoOptions() {
        const model = this.render(this.vc)
        assert.isUndefined(model.percentComplete)
    }

    @test('throws if percent complete -1', -1)
    @test('throws if percent complete -0.1', -0.1)
    @test('throws if percent complete 1.1', 1.1)
    protected throwsIfPercentCompleteOutOfRange(percentComplete: number) {
        const err = assert.doesThrow(() => this.Vc({ percentComplete }))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['percentComplete'],
        })
    }

    @test('throws if setting percent late to -1', -1)
    @test('throws if setting percent late to -0.1', -0.1)
    @test('throws if setting percent late to 1.1', 1.1)
    protected throwsIfSettingPercentOutOfRangeLate(percentComplete: number) {
        const vc = this.Vc()
        const err = assert.doesThrow(() =>
            vc.setPercentComplete(percentComplete)
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['percentComplete'],
        })
    }

    @test()
    protected settingPercentCompleteRenders() {
        const vc = this.Vc({ percentComplete: 0.5 })
        let model = this.render(vc)
        assert.isEqual(model.percentComplete, 0.5)
        assert.isEqual(vc.getPercentComplete(), 0.5)

        vc.setPercentComplete(1)

        model = this.render(vc)
        assert.isEqual(model.percentComplete, 1)
        assert.isEqual(vc.getPercentComplete(), 1)

        vc.setPercentComplete(0.35)

        model = this.render(vc)
        assert.isEqual(model.percentComplete, 0.35)
    }

    @test()
    protected settingPercentCompleteTriggersRender() {
        this.vc.setPercentComplete(0.5)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test('can start with title', 'you are so close!')
    @test('can start with title 2', 'you are not even close!')
    protected canStartWithTitle(title: string) {
        const vc = this.Vc({ title })
        const model = this.render(vc)
        assert.isEqual(model.title, title)
    }

    @test('can set title later', 'what the!?')
    @test('can set title later 2', 'i know you are ,but what am i?')
    protected canSetTitleLater(title: string) {
        this.vc.setTitle(title)
        const model = this.render(this.vc)
        assert.isEqual(model.title, title)
    }

    @test()
    protected settingTitleTriggersRender() {
        this.vc.setTitle('hey')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private Vc(options?: ProgressViewControllerOptions) {
        return this.Controller('progress', { ...options })
    }
}
