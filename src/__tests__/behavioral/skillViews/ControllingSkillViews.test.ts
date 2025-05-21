import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

class TestVc extends AbstractSkillViewController {
    public setTitle(title: string | null) {
        return super.setTitle(title)
    }

    public setSubtitle(title: string | null) {
        return super.setSubtitle(title)
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
        return {
            layouts: [],
        }
    }
}

@suite()
export default class ControllingSkillViewsTest extends AbstractViewControllerTest {
    protected controllerMap: Record<string, any> = {
        titleVc: TestVc,
    }
    private vc!: TestVc

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('titleVc' as any, {}) as TestVc
    }

    @test()
    protected async titleUndefinedToStart() {
        this.assertTitleUndefined()
    }

    @test()
    protected async canSetTitle() {
        this.setTitle('hello world!')
        this.assertTitleEquals('hello world!')

        this.setTitle('goodbye')
        this.assertTitleEquals('goodbye')

        this.setTitle(null)
        this.assertTitleUndefined()
    }

    @test()
    protected settingTitleTriggersRender() {
        this.setTitle('go team!')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async subtitleUndefinedToStart() {
        this.assertSubtitleUndefined()
    }

    @test()
    protected canSetSubtitle() {
        this.setSubtitle('hello again!')
        this.assertSubtitleEquals('hello again!')

        this.setSubtitle('go again!')
        this.assertSubtitleEquals('go again!')

        this.setSubtitle(null)
        this.assertSubtitleUndefined()
    }

    @test()
    protected settingSubtitleTriggersRender() {
        this.setSubtitle('go!')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private assertSubtitleUndefined() {
        assert.isUndefined(this.vc.getSubtitle())
    }

    private assertSubtitleEquals(title: string) {
        assert.isEqual(this.vc.getSubtitle(), title)
    }

    private setSubtitle(title: string | null) {
        this.vc.setSubtitle(title)
    }

    private assertTitleUndefined() {
        assert.isUndefined(this.vc.getTitle())
    }

    private assertTitleEquals(expected: string) {
        assert.isEqual(this.vc.getTitle(), expected)
    }

    private setTitle(title: string | null) {
        this.vc.setTitle(title)
    }
}
