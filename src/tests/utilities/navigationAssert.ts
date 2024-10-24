import { PermissionContractId } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    Navigation,
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
        ids.forEach((id) => this.rendersButton(vc, id))
    },

    rendersButtonLabels(vc: ViewController<Navigation>) {
        const model = renderUtil.render(vc)
        assert.isTrue(
            model.shouldRenderButtonLabels,
            `Your navigation should render button labels but it is not! Try shouldRenderButtonLabels: true`
        )
    },

    skillViewRendersNavigation(vc: SkillViewController) {
        const nav = vc.renderNavigation?.()
        assert.isTruthy(
            nav,
            `Your skill view did not render a navigation! Implement renderNavigation() and use this.Controller('navigation', {}) to render one.`
        )

        return nav.controller!
    },

    skillViewDoesNotRenderNavigation(vc: SkillViewController) {
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
}

export default navigationAssert
function getButtonFromNav(vc: ViewController<Navigation>, id: string) {
    const model = renderUtil.render(vc)
    const buttons = model.buttons
    const button = buttons?.find((b) => b.id === id)
    assert.isTruthy(
        button,
        `I could not find a button with the id "${id}" in your navigation!`
    )
    return button
}
