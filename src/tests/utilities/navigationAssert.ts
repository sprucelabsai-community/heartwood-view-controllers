import { PermissionContractId } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    AppController,
    Navigation,
    NavigationButton,
    NavigationRoute,
    SkillViewController,
    SkillViewControllerId,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

const navigationAssert = {
    rendersButton(vc: ViewController<Navigation>, id: string) {
        getButtonFromNav(vc, id)
    },

    buttonRedirectsTo(options: {
        vc: ViewController<Navigation>
        button: string
        destination: {
            id: SkillViewControllerId
            args?: Record<string, any>
        }
    }) {
        const { vc, button, destination } = options

        const model = getButtonFromNav(vc, button)

        assert.isTruthy(
            model.destination,
            `Your navigation button "${button}" does not have a destination set!`
        )

        assert.isEqual(
            model.destination?.id,
            destination.id,
            `Your navigation button "${button}" does not redirect to the correct destination. Expected "${destination.id}" but got "${model.destination?.id}"`
        )

        if (destination.args) {
            assert.isEqualDeep(
                model.destination?.args,
                destination.args,
                `Your navigation button "${button}" does not redirect to the correct destination. Expected args "${JSON.stringify(
                    destination.args
                )}" but got "${JSON.stringify(model.destination?.args)}"`
            )
        }
    },

    rendersButtons(vc: ViewController<Navigation>, ids: string[]) {
        assertOptions({ vc, buttons: ids }, ['vc', 'buttons'])
        ids.forEach((id) => this.rendersButton(vc, id))
    },

    doesNotRenderButton(vc: ViewController<Navigation>, id: string) {
        assertOptions({ vc, buttons: id }, ['vc', 'buttons'])

        const model = renderUtil.render(vc)

        const buttons = model.buttons?.reduce((acc, b) => {
            if ((b as NavigationButton).dropdown) {
                return [
                    ...acc,
                    b,
                    ...((b as NavigationButton)?.dropdown?.items ?? []),
                ]
            }
            return [...acc, b]
        }, [] as any[])

        const button = buttons?.find((b) => b.id === id)

        assert.isFalsy(
            button,
            `I found a button with the id "${id}" in your navigation but I should not have!`
        )
    },

    rendersButtonLabels(vc: ViewController<Navigation>) {
        const model = renderUtil.render(vc)
        assert.isTrue(
            model.shouldRenderButtonLabels,
            `Your navigation should render button labels but it is not! Try shouldRenderButtonLabels: true`
        )
    },

    skillViewRendersNavigation(
        vc: Pick<SkillViewController, 'renderNavigation'>,
        msg?: string
    ) {
        const nav = vc.renderNavigation?.()
        assert.isTruthy(
            nav,
            msg ??
                `Your skill view did not render a navigation! Implement renderNavigation() and use this.Controller('navigation', {}) to render one.`
        )

        return nav.controller!
    },

    appRendersNavigation(vc: Pick<AppController, 'renderNavigation'>) {
        return this.skillViewRendersNavigation(
            vc,
            `Your AppController did not render a navigation! Implement renderNavigation() and use this.Controller('navigation', {}) to render one.`
        )
    },

    appDoesNotRenderNavigation(vc: Pick<AppController, 'renderNavigation'>) {
        const nav = vc.renderNavigation?.()
        assert.isNull(
            nav,
            `Your AppController should not render a navigation! Implement renderNavigation() and return null.`
        )
    },

    skillViewDoesNotRenderNavigation(
        vc: Pick<SkillViewController, 'renderNavigation'>
    ) {
        const nav = vc.renderNavigation?.()
        assert.isNull(
            nav,
            `Your skill view should not render a navigation! Implement renderNavigation() and return null.`
        )
    },

    buttonRequiresViewPermissions(
        vc: ViewController<Navigation>,
        button: string,
        permissionContractId: PermissionContractId
    ) {
        assertOptions({ vc, button, permissionContractId }, [
            'vc',
            'button',
            'permissionContractId',
        ])

        const match = getButtonFromNav(vc, button)

        assert.isEqual(
            match.viewPermissionContract?.id,
            permissionContractId,
            'Your button did not have the view permission contract set to what I expected!'
        )
    },

    hasAdditionalValidRoutes(
        vc: ViewController<Navigation>,
        routes: NavigationRoute[]
    ) {
        assertOptions({ vc, routes }, ['vc', 'routes'])

        const model = renderUtil.render(vc)
        assert.isEqualDeep(
            model.additionalValidRoutes,
            routes,
            `I did not find the valid routes I expected. Make sure you set 'additionalValidRoutes' in your navigation's view model (constructor options).`
        )
    },

    isHidden(vc: ViewController<Navigation>) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)

        assert.isFalse(
            model.isVisible,
            `Your navigation should be hidden! Try calling 'this.navigationVc.hide()'.`
        )
    },

    isVisible(vc: ViewController<Navigation>) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)

        const isVisible =
            typeof model.isVisible === 'undefined' || model.isVisible

        assert.isTruthy(
            isVisible,
            `Your navigation should be visible! Try calling 'this.navigationVc.show()'.`
        )
    },
}

export default navigationAssert
export function getButtonFromNav(vc: ViewController<Navigation>, id: string) {
    const model = renderUtil.render(vc)

    const buttons = model.buttons?.reduce((acc, b) => {
        if ((b as NavigationButton).dropdown) {
            return [
                ...acc,
                b,
                ...((b as NavigationButton)?.dropdown?.items ?? []),
            ]
        }
        return [...acc, b]
    }, [] as any[])

    const button = buttons?.find((b) => b.id === id)
    assert.isTruthy(
        button,
        `I could not find a button with the id "${id}" in your navigation!`
    )
    return button
}
