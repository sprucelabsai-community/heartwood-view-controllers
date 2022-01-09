import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { AbstractSkillViewController, ScopedBy, vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

class Scope extends AbstractSkillViewController {
	private scope?: ScopedBy

	public constructor(options: any) {
		super(options)
		this.scope = options.scope
	}

	public getScopedBy() {
		return this.scope ?? 'none'
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [],
		}
	}
}

export default class AssertingScopeTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		scope: Scope,
	}

	@test()
	protected static scopeMustBeValued() {
		assert.doesThrow(() =>
			//@ts-ignore
			vcAssertUtil.assertSkillViewScopedBy(this.Vc('organization'), 'aoeuaoeu')
		)
		assert.doesThrow(() =>
			//@ts-ignore
			vcAssertUtil.assertSkillViewScopedBy(this.Vc('organization'), '523423423')
		)
	}

	@test()
	protected static scopeIsDefaultToNone() {
		const vc = this.Vc()
		vcAssertUtil.assertSkillViewNotScoped(vc)
	}

	@test('knows if scoped by location', 'location')
	@test('knows if scoped by organization', 'organization')
	protected static knowsIfScopedBySomething(scope: ScopedBy) {
		const vc = this.Vc(scope)
		assert.doesThrow(() => vcAssertUtil.assertSkillViewNotScoped(vc))
		vcAssertUtil.assertSkillViewScopedBy(vc, scope)
	}

	@test()
	protected static scopeToNoneCountsAsNotScoped() {
		const vc = this.Vc('none')
		vcAssertUtil.assertSkillViewNotScoped(vc)
	}

	@test()
	protected static throwsIfScopedBySomethingElse() {
		const vc = this.Vc('organization')
		assert.doesThrow(() => vcAssertUtil.assertSkillViewScopedBy(vc, 'location'))
	}

	private static Vc(scope?: ScopedBy) {
		return this.Controller('scope' as any, {
			scope,
		}) as Scope
	}
}
