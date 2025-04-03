import { PermissionContractId } from '@sprucelabs/mercury-types'
import { cloneDeep } from '@sprucelabs/schema'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import {
    NavigationButton,
    NavigationRoute,
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
        const { nav, svc } = this.getNavVc()
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

    @test()
    protected static async assertViewPermissionContractFailsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.buttonRequiresViewPermissions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'button', 'permissionContractId'],
        })
    }

    @test()
    protected static async assertPermissionsThrowsIfButtonNotFound() {
        const vc = this.NavigationVc({
            buttons: [{ id: generateId(), lineIcon: 'tag' }],
        })

        assert.doesThrow(
            () =>
                navigationAssert.buttonRequiresViewPermissions(
                    vc,
                    generateId(),
                    'feed-contract'
                ),
            'not find a button'
        )
    }

    @test(
        'fails on permission contract on first button feed-contract != chatbot-contract',
        'feed-contract',
        'chatbot-contract'
    )
    @test(
        'fails on permission contract on first button a-check != a-fail',
        'a-check',
        'a-fail'
    )
    protected static async assertPermissionsThrowsIfPermissionsDontMatch(
        buttonPermissionId: PermissionContractId,
        checkPermissionId: PermissionContractId
    ) {
        const id = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id,
                    lineIcon: 'tag',
                    viewPermissionContract: {
                        id: buttonPermissionId,
                    },
                },
            ],
        })

        assert.doesThrow(
            () =>
                navigationAssert.buttonRequiresViewPermissions(
                    vc,
                    id,
                    checkPermissionId
                ),
            'permission'
        )
    }

    @test(
        'matches on feed-contract permission on first button',
        'feed-contract'
    )
    @test(
        'matches on chatbot-contract permission on first button',
        'chatbot-contract'
    )
    protected static async assertPermissionsMatchesWhenPermissionsMatch(
        permissionId: PermissionContractId
    ) {
        const id = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id,
                    lineIcon: 'tag',
                    viewPermissionContract: {
                        id: permissionId,
                    },
                },
            ],
        })

        navigationAssert.buttonRequiresViewPermissions(vc, id, permissionId)
    }

    @test()
    protected static async canAssertPermissionOnSecondButton() {
        const id = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: generateId(),
                    lineIcon: 'tag',
                },
                {
                    id,
                    lineIcon: 'tag',
                    viewPermissionContract: {
                        id: 'feed-contract',
                    },
                },
            ],
        })

        navigationAssert.buttonRequiresViewPermissions(vc, id, 'feed-contract')
    }

    @test()
    protected static rendersButtonsThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => navigationAssert.rendersButtons())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'buttons'],
        })
    }

    @test()
    protected static async assertAdditionalRoutesThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.hasAdditionalValidRoutes()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'routes'],
        })
    }

    @test()
    protected static async throwsWhenValidRoutesDoNotMatch() {
        const vc = this.NavigationVc({
            buttons: [],
        })

        assert.doesThrow(
            () =>
                navigationAssert.hasAdditionalValidRoutes(vc, [
                    {
                        destination: {
                            id: 'test' as SkillViewControllerId,
                        },
                    },
                ]),
            'valid routes'
        )
    }

    @test()
    protected static async passesIfValidRoutesMatch() {
        const actual: NavigationRoute[] = [
            {
                destination: {
                    id: generateId() as SkillViewControllerId,
                },
                viewPermissionContract: {
                    id: 'feed-contract',
                },
            },
        ]

        const expected = cloneDeep(actual)

        const vc = this.NavigationVc({
            buttons: [],
            additionalValidRoutes: actual,
        })

        navigationAssert.hasAdditionalValidRoutes(vc, expected)
    }

    @test()
    protected static async canAssertButtonsNestedInDropdown() {
        const id = generateId()
        const id2 = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: 'my-button',
                    lineIcon: 'add',
                    dropdown: {
                        items: [
                            {
                                id,
                                label: 'Hey there!',
                            },
                            {
                                id: id2,
                                label: 'Hey there!',
                            },
                        ],
                    },
                },
            ],
        })

        navigationAssert.rendersButton(vc, id)
        navigationAssert.rendersButton(vc, id2)
    }

    @test()
    protected static async throwsWhenButtonNotInDropdown() {
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: 'my-button',
                    lineIcon: 'add',
                    dropdown: {
                        items: [
                            {
                                id: generateId(),
                                label: 'Hey there!',
                            },
                        ],
                    },
                },
            ],
        })

        assert.doesThrow(() => navigationAssert.rendersButton(vc, generateId()))
    }

    @test()
    protected static async canFindDropdownOnSecondButton() {
        const id = generateId()
        const id2 = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: generateId(),
                    lineIcon: 'add',
                },
                {
                    id: id2,
                    lineIcon: 'add',
                    dropdown: {
                        items: [
                            {
                                id,
                                label: 'Hey there!',
                            },
                        ],
                    },
                },
            ],
        })

        navigationAssert.rendersButton(vc, id)
        navigationAssert.rendersButton(vc, id2)
    }

    @test()
    protected static async isHiddenThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.isHidden()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsWhenNavIsNotHidden() {
        const navVc = this.NavigationVc()
        assert.doesThrow(
            () => navigationAssert.isHidden(navVc),
            'navigationVc.hide()'
        )
    }

    @test()
    protected static async isHiddenPassesWhenHidden() {
        const navVc = this.NavigationVc()
        navVc.hide()
        navigationAssert.isHidden(navVc)
    }

    @test()
    protected static async isVisibleThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.isVisible()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsWhenNavIsNotVisible() {
        const navVc = this.NavigationVc()
        navVc.hide()
        assert.doesThrow(
            () => navigationAssert.isVisible(navVc),
            'navigationVc.show()'
        )
    }

    @test()
    protected static async isVisiblePassesWhenVisible() {
        const navVc = this.NavigationVc()
        navigationAssert.isVisible(navVc)
    }

    private static getNavVc() {
        const svc = this.Controller('hasNav' as any, {})
        const nav = navigationAssert.skillViewRendersNavigation(svc)
        return { nav, svc }
    }
}
