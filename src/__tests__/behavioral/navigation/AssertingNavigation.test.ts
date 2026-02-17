import { PermissionContractId } from '@sprucelabs/mercury-types'
import { cloneDeep } from '@sprucelabs/schema'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import {
    NavigationButton,
    NavigationRoute,
    SkillViewControllerId,
} from '../../../types/heartwood.types'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'
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

@suite()
export default class AssertingNavigationTest extends AbstractNavigationTest {
    private vc!: NavigationViewController

    protected controllerMap = {
        noNav: NoNavigationSkillView,
        hasNav: HasNavSkillView,
        nullNav: NullNavigationSkillView,
    }

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.NavigationVc()
    }

    @test()
    protected async throwsWhenNotFindingButtons() {
        assert.doesThrow(() => navigationAssert.rendersButton(this.vc, 'test'))
    }

    @test()
    protected async doesNotFindIfNotFindingAllButtons() {
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
    protected async canFindButtons(buttons: NavigationButton[], ids: string[]) {
        const vc = this.NavigationVc({
            buttons,
        })
        navigationAssert.rendersButton(vc, ids[0])
        navigationAssert.rendersButtons(vc, ids)
    }

    @test()
    protected async cannotFindButton() {
        const buttonId = generateId()
        const vc = this.NavigationVc({
            buttons: [{ id: buttonId, lineIcon: 'tag' }],
        })
        assert.doesThrow(() =>
            navigationAssert.doesNotRenderButton(vc, buttonId)
        )
    }

    @test()
    protected async doesNotThrowsIfButtonNotFound() {
        const buttonId = generateId()
        const vc = this.NavigationVc({
            buttons: [{ id: buttonId, lineIcon: 'tag' }],
        })

        navigationAssert.doesNotRenderButton(vc, generateId())
    }

    @test()
    protected async throwsWhenNotRenderButtonLabels() {
        const vc = this.NavigationVc({
            shouldRenderButtonLabels: false,
        })

        assert.doesThrow(() => navigationAssert.rendersButtonLabels(vc))
    }

    @test()
    protected async canFindRenderButtonLabels() {
        const vc = this.NavigationVc({
            shouldRenderButtonLabels: true,
        })

        navigationAssert.rendersButtonLabels(vc)
    }

    @test()
    protected async throwsWhenNotRenderingNavigation() {
        const svc = this.Controller('noNav' as any, {})
        assert.doesThrow(() => navigationAssert.skillViewRendersNavigation(svc))
        assert.doesThrow(() =>
            navigationAssert.skillViewDoesNotRenderNavigation(svc)
        )
    }

    @test()
    protected async nullNavCountsAsNotRenderingNav() {
        const svc = this.Controller('nullNav' as any, {})
        assert.doesThrow(() => navigationAssert.skillViewRendersNavigation(svc))
        navigationAssert.skillViewDoesNotRenderNavigation(svc)
    }

    @test()
    protected async canPassIfFindingsNav() {
        const { nav, svc } = this.getNavVc()
        assert.isEqual(nav, svc.nav)
        assert.doesThrow(() =>
            navigationAssert.skillViewDoesNotRenderNavigation(svc)
        )
    }

    @test()
    protected async throwsWhenNotFindingDestination() {
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
    protected async canCheckDestination() {
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
    protected async assertViewPermissionContractFailsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.buttonRequiresViewPermissions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'button', 'permissionContractId'],
        })
    }

    @test()
    protected async assertPermissionsThrowsIfButtonNotFound() {
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
    protected async assertPermissionsThrowsIfPermissionsDontMatch(
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
    protected async assertPermissionsMatchesWhenPermissionsMatch(
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
    protected async canAssertPermissionOnSecondButton() {
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
    protected rendersButtonsThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => navigationAssert.rendersButtons())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'buttons'],
        })
    }

    @test()
    protected async assertAdditionalRoutesThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.hasAdditionalValidRoutes()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'routes'],
        })
    }

    @test()
    protected async throwsWhenValidRoutesDoNotMatch() {
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
    protected async passesIfValidRoutesMatch() {
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
    protected async canAssertButtonsNestedInDropdown() {
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
    protected async throwsWhenButtonNotInDropdown() {
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
    protected async canFindDropdownOnSecondButton() {
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
    protected async isHiddenThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.isHidden()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenNavIsNotHidden() {
        assert.doesThrow(
            () => navigationAssert.isHidden(this.vc),
            'navigationVc.hide()'
        )
    }

    @test()
    protected async isHiddenPassesWhenHidden() {
        this.vc.hide()
        navigationAssert.isHidden(this.vc)
    }

    @test()
    protected async isVisibleThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            navigationAssert.isVisible()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenNavIsNotVisible() {
        this.vc.hide()
        assert.doesThrow(
            () => navigationAssert.isVisible(this.vc),
            'navigationVc.show()'
        )
    }

    @test()
    protected async isVisiblePassesWhenVisible() {
        navigationAssert.isVisible(this.vc)
    }

    @test()
    protected async didNotRefreshAssertionThrowWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            navigationAssert.assertActionDoesNotRefreshPermissions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected async didRefrehAssertionThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            navigationAssert.assertActionRefreshesPermissions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected async knowsWhenDidntRefreshPermissions() {
        await this.assertAuctionDoesNotRefreshPermissions(() => {})

        await assert.doesThrowAsync(() =>
            this.assertActionRefreshesPermissions(() => {})
        )
    }

    @test()
    protected async knowsWhenDidRefreshPermissions() {
        await this.assertActionRefreshesPermissions(() =>
            this.vc.refreshPermissions()
        )

        await assert.doesThrowAsync(() =>
            this.assertAuctionDoesNotRefreshPermissions(() =>
                this.vc.refreshPermissions()
            )
        )
    }

    private async assertActionRefreshesPermissions(
        cb: () => void
    ): Promise<void> {
        return navigationAssert.assertActionRefreshesPermissions(this.vc, cb)
    }

    private async assertAuctionDoesNotRefreshPermissions(cb: () => void) {
        await navigationAssert.assertActionDoesNotRefreshPermissions(
            this.vc,
            cb
        )
    }

    private getNavVc() {
        const svc = this.Controller('hasNav' as any, {})
        const nav = navigationAssert.skillViewRendersNavigation(svc)
        return { nav, svc }
    }
}
