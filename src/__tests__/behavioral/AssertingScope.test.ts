import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
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

@suite()
export default class AssertingScopeTest extends AbstractViewControllerTest {
    protected controllerMap = {
        scope: Scope,
        scopeFlagVc: ScopeFlagVc,
    }

    @test()
    protected scopeMustBeValued() {
        assert.doesThrow(() =>
            vcAssert.assertSkillViewScopedBy(
                this.Vc('organization'),
                //@ts-ignore
                'aoeuaoeu'
            )
        )
        assert.doesThrow(() =>
            vcAssert.assertSkillViewScopedBy(
                this.Vc('organization'),
                //@ts-ignore
                '523423423'
            )
        )
    }

    @test()
    protected scopeFlagMustBeValid() {
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
    protected scopeIsDefaultToNone() {
        vcAssert.assertSkillViewNotScoped(this.Vc())
    }

    @test()
    protected scopeFagDefaultsToNothing() {
        vcAssert.assertSkillViewNotScoped(this.FlagVc())
    }

    @test('knows if scoped by location', 'location')
    @test('knows if scoped by organization', 'organization')
    protected knowsIfScopedBySomething(scope: ScopedBy) {
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
    protected knowsIfScopedByFlag(scope: ScopeFlag[]) {
        const vc = this.FlagVc(scope)
        assert.doesThrow(() => vcAssert.assertSkillViewNotScoped(vc))
        vcAssert.assertSkillViewScopedBy(vc, scope)
    }

    @test()
    protected matchesOutOfOrder() {
        const vc = this.FlagVc(['organization', 'employed'])
        assert.doesThrow(() => vcAssert.assertSkillViewNotScoped(vc))
        vcAssert.assertSkillViewScopedBy(vc, ['employed', 'organization'])
    }

    @test()
    protected scopeToNoneCountsAsNotScoped() {
        const vc = this.Vc('none')
        vcAssert.assertSkillViewNotScoped(vc)
    }

    @test()
    protected emptyFlagsCountsAsNone() {
        const vc = this.FlagVc([])
        vcAssert.assertSkillViewNotScoped(vc)
    }

    @test()
    protected throwsIfScopedBySomethingElse() {
        const vc = this.Vc('organization')
        assert.doesThrow(() => vcAssert.assertSkillViewScopedBy(vc, 'location'))
    }

    @test()
    protected throwsIfScopedFlagsDontMatch() {
        const vc = this.FlagVc(['organization'])
        assert.doesThrow(() =>
            vcAssert.assertSkillViewScopedBy(vc, ['location'])
        )
    }

    private Vc(scope?: ScopedBy) {
        return this.Controller('scope' as any, {
            scope,
        }) as Scope
    }

    private FlagVc(scope?: ScopeFlag[]) {
        return this.Controller('scopeFlagVc' as any, {
            scope,
        }) as ScopeFlagVc
    }
}
