import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
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

export default class ControllingSkillViewsTest extends AbstractViewControllerTest {
	protected static controllerMap: Record<string, any> = {
		titleVc: TestVc,
	}
	private static vc: TestVc

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('titleVc' as any, {}) as TestVc
	}

	@test()
	protected static async titleUndefinedToStart() {
		this.assertTitleUndefined()
	}

	@test()
	protected static async canSetTitle() {
		this.setTitle('hello world!')
		this.assertTitleEquals('hello world!')

		this.setTitle('goodbye')
		this.assertTitleEquals('goodbye')

		this.setTitle(null)
		this.assertTitleUndefined()
	}

	@test()
	protected static settingTitleTriggersRender() {
		this.setTitle('go team!')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async subtitleUndefinedToStart() {
		this.assertSubtitleUndefined()
	}

	@test()
	protected static canSetSubtitle() {
		this.setSubtitle('hello again!')
		this.assertSubtitleEquals('hello again!')

		this.setSubtitle('go again!')
		this.assertSubtitleEquals('go again!')

		this.setSubtitle(null)
		this.assertSubtitleUndefined()
	}

	@test()
	protected static settingSubtitleTriggersRender() {
		this.setSubtitle('go!')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	private static assertSubtitleUndefined() {
		assert.isUndefined(this.vc.getSubtitle())
	}

	private static assertSubtitleEquals(title: string) {
		assert.isEqual(this.vc.getSubtitle(), title)
	}

	private static setSubtitle(title: string | null) {
		this.vc.setSubtitle(title)
	}

	private static assertTitleUndefined() {
		assert.isUndefined(this.vc.getTitle())
	}

	private static assertTitleEquals(expected: string) {
		assert.isEqual(this.vc.getTitle(), expected)
	}

	private static setTitle(title: string | null) {
		this.vc.setTitle(title)
	}
}
