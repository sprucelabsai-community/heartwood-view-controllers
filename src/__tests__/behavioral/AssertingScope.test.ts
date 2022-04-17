import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import {
	AbstractSkillViewController,
	ScopedBy,
	ScopeFlag,
	vcAssert,
} from '../..'
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

class ScopeFlagVc extends AbstractSkillViewController {
	private scope?: ScopeFlag[]

	public constructor(options: any) {
		super(options)
		this.scope = options.scope
	}

	public getScope() {
		return this.scope ?? []
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
		scopeFlagVc: ScopeFlagVc,
	}

	@test()
	protected static scopeMustBeValued() {
		assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewScopedBy(this.Vc('organization'), 'aoeuaoeu')
		)
		assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewScopedBy(this.Vc('organization'), '523423423')
		)
	}

	@test()
	protected static scopeFlagMustBeValid() {
		assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewScopedBy(this.FlagVc('organization'), [
				'aoeuaoeu',
			])
		)

		assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewScopedBy(this.FlagVc('organization'), [
				'organization',
				'aoeuaoeu',
			])
		)
	}

	@test()
	protected static scopeIsDefaultToNone() {
		vcAssert.assertSkillViewNotScoped(this.Vc())
	}

	@test()
	protected static scopeFagDefaultsToNothing() {
		vcAssert.assertSkillViewNotScoped(this.FlagVc())
	}

	@test('knows if scoped by location', 'location')
	@test('knows if scoped by organization', 'organization')
	protected static knowsIfScopedBySomething(scope: ScopedBy) {
		const vc = this.Vc(scope)
		assert.doesThrow(() => vcAssert.assertSkillViewNotScoped(vc))
		vcAssert.assertSkillViewScopedBy(vc, scope)
	}

	@test('knows if scoped by location flag', ['location'])
	@test('knows if scoped by organization flag', ['organization'])
	@test('knows if scoped by organization, employed flag', [
		'organization',
		'employed',
	])
	protected static knowsIfScopedByFlag(scope: ScopeFlag[]) {
		const vc = this.FlagVc(scope)
		assert.doesThrow(() => vcAssert.assertSkillViewNotScoped(vc))
		vcAssert.assertSkillViewScopedBy(vc, scope)
	}

	@test()
	protected static matchesOutOfOrder() {
		const vc = this.FlagVc(['organization', 'employed'])
		assert.doesThrow(() => vcAssert.assertSkillViewNotScoped(vc))
		vcAssert.assertSkillViewScopedBy(vc, ['employed', 'organization'])
	}

	@test()
	protected static scopeToNoneCountsAsNotScoped() {
		const vc = this.Vc('none')
		vcAssert.assertSkillViewNotScoped(vc)
	}

	@test()
	protected static emptyFlagsCountsAsNone() {
		const vc = this.FlagVc([])
		vcAssert.assertSkillViewNotScoped(vc)
	}

	@test()
	protected static throwsIfScopedBySomethingElse() {
		const vc = this.Vc('organization')
		assert.doesThrow(() => vcAssert.assertSkillViewScopedBy(vc, 'location'))
	}

	@test()
	protected static throwsIfScopedFlagsDontMatch() {
		const vc = this.FlagVc(['organization'])
		assert.doesThrow(() => vcAssert.assertSkillViewScopedBy(vc, ['location']))
	}

	private static Vc(scope?: ScopedBy) {
		return this.Controller('scope' as any, {
			scope,
		}) as Scope
	}

	private static FlagVc(scope?: ScopeFlag[]) {
		return this.Controller('scopeFlagVc' as any, {
			scope,
		}) as ScopeFlagVc
	}
}
