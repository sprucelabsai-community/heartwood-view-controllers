import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import {
    NavigationButton,
    SkillViewControllerId,
} from '../../../types/heartwood.types'
import AbstractNavigationTest from './AbstractNavigationTest'
import HasNavSkillView from './HasNavSkillView'

class NoNavigationSkillView extends AbstractSkillViewController {
    public render() {
        return {}
    }
}

class NullNavigationSkillView extends AbstractSkillViewController {
    public renderNavigation() {
        return null
    }
    public render() {
        return {}
    }
}

export default class AssertingNavigationTest extends AbstractNavigationTest {
    protected static controllerMap = {
        noNav: NoNavigationSkillView,
        hasNav: HasNavSkillView,
        nullNav: NullNavigationSkillView,
    }

    @test()
    protected static async throwsWhenNotFindingButtons() {
        const vc = this.NavigationVc()
        assert.doesThrow(() => navigationAssert.rendersButton(vc, 'test'))
    }

    @test()
    protected static async doesNotFindIfNotFindingAllButtons() {
        const vc = this.NavigationVc({
            buttons: [{ id: 'test', lineIcon: 'tag' }],
        })
        assert.doesThrow(() =>
            navigationAssert.rendersButtons(vc, ['test', 'test2'])
        )
    }

    @test('can find first button 1', [{ id: 'test' }], ['test'])
    @test('can find first button 2', [{ id: 'test2' }], ['test2'])
    @test(
        'can find second button 1',
        [{ id: 'test' }, { id: 'test2' }],
        ['test2']
    )
    @test(
        'can find multiple buttons 1',
        [{ id: 'test' }, { id: 'test2' }],
        ['test', 'test2']
    )
    protected static async canFindButtons(
        buttons: NavigationButton[],
        ids: string[]
    ) {
        const vc = this.NavigationVc({
            buttons,
        })
        navigationAssert.rendersButton(vc, ids[0])
        navigationAssert.rendersButtons(vc, ids)
    }

    @test()
    protected static async throwsWhenNotRenderButtonLabels() {
        const vc = this.NavigationVc({
            shouldRenderButtonLabels: false,
        })

        assert.doesThrow(() => navigationAssert.rendersButtonLabels(vc))
    }

    @test()
    protected static async canFindRenderButtonLabels() {
        const vc = this.NavigationVc({
            shouldRenderButtonLabels: true,
        })

        navigationAssert.rendersButtonLabels(vc)
    }

    @test()
    protected static async throwsWhenNotRenderingNavigation() {
        const svc = this.Controller('noNav' as any, {})
        assert.doesThrow(() => navigationAssert.skillViewRendersNavigation(svc))
        assert.doesThrow(() =>
            navigationAssert.skillViewDoesNotRenderNavigation(svc)
        )
    }

    @test()
    protected static async nullNavCountsAsNotRenderingNav() {
        const svc = this.Controller('nullNav' as any, {})
        assert.doesThrow(() => navigationAssert.skillViewRendersNavigation(svc))
        navigationAssert.skillViewDoesNotRenderNavigation(svc)
    }

    @test()
    protected static async canPassIfFindingsNav() {
        const svc = this.Controller('hasNav' as any, {})
        const nav = navigationAssert.skillViewRendersNavigation(svc)
        assert.isEqual(nav, svc.nav)
        assert.doesThrow(() =>
            navigationAssert.skillViewDoesNotRenderNavigation(svc)
        )
    }

    @test()
    protected static async throwsWhenNotFindingDestination() {
        const destinationId = generateId() as SkillViewControllerId
        const vc = this.NavigationVc({
            buttons: [
                { id: 'test', lineIcon: 'tag' },
                {
                    id: 'test2',
                    lineIcon: 'alarm',
                    destination: {
                        id: generateId() as SkillViewControllerId,
                    },
                },
                {
                    id: 'another',
                    lineIcon: 'alarm',
                    destination: {
                        id: destinationId,
                        args: {
                            hello: 'world',
                        },
                    },
                },
            ],
        })
        assert.doesThrow(() =>
            navigationAssert.buttonRedirectsTo({
                vc,
                button: 'test',
                destination: { id: generateId() as never },
            })
        )
        assert.doesThrow(() =>
            navigationAssert.buttonRedirectsTo({
                vc,
                button: generateId(),
                destination: { id: generateId() as never },
            })
        )

        assert.doesThrow(() =>
            navigationAssert.buttonRedirectsTo({
                vc,
                button: 'test2',
                destination: { id: generateId() as never },
            })
        )

        assert.doesThrow(() =>
            navigationAssert.buttonRedirectsTo({
                vc,
                button: 'another',
                destination: { id: destinationId, args: {} },
            })
        )
    }

    @test()
    protected static async canCheckDestination() {
        const args = {
            [generateId()]: generateId(),
        }
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: 'test',
                    lineIcon: 'tag',
                    destination: {
                        id: 'test' as SkillViewControllerId,
                    },
                },
                {
                    id: 'lastly',
                    lineIcon: 'tag',
                    destination: {
                        id: 'button-bar' as SkillViewControllerId,
                        args,
                    },
                },
            ],
        })

        navigationAssert.buttonRedirectsTo({
            vc,
            button: 'test',
            destination: { id: 'test' as never },
        })

        navigationAssert.buttonRedirectsTo({
            vc,
            button: 'lastly',
            destination: { id: 'button-bar' as never, args },
        })
    }
}
