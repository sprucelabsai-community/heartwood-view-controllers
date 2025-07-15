import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    Button,
    Card,
    FormViewController,
    Navigation,
    NavigationButton,
    SkillViewController,
    TriggerRenderHandler,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import ButtonBarViewController from '../../viewControllers/ButtonBar.vc'
import ButtonGroupViewController from '../../viewControllers/ButtonGroup.vc'
import {
    ButtonViewController,
    checkForCardSection,
    getVcName,
    pluckAllFromView,
    pluckFirstFromCard,
} from './assertSupport'

const buttonAssert = {
    buttonBarRendersButton(
        buttonBarVc: ButtonBarViewController,
        buttonId: string
    ) {
        assertOptions({ buttonBarVc, buttonId }, ['buttonBarVc', 'buttonId'])

        const model = renderUtil.render(buttonBarVc)
        const match = model.buttons.find((b) => b.id === buttonId)

        assert.isTruthy(
            match,
            `Your button bar doesn't have a button with the id '${buttonId}'`
        )
    },

    lastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(
        vc: ViewController<Card>
    ) {
        const model = renderUtil.render(vc)
        const footer = model.footer ?? {}
        const primaryIdx = footer.buttons?.findIndex(
            (b) => b.type === 'primary'
        )

        if (
            footer.buttons &&
            typeof primaryIdx === 'number' &&
            primaryIdx > -1 &&
            footer.buttons?.[footer.buttons.length - 1]?.type !== 'primary'
        ) {
            assert.fail('Your primary button has to be last in your footer.')
        }
    },

    cardRendersButtonBar(
        cardVc: ViewController<Card>
    ): ButtonBarViewController {
        assertOptions({ cardVc }, ['cardVc'])

        const model = renderUtil.render(cardVc)

        const match = model.body?.sections?.find((s) => !!s.buttonBar)

        assert.isTruthy(match, `Your card does not render a button bar.`)

        return match.buttonBar?.controller as any
    },

    cardRendersButtonGroup(cardVc: ViewController<Card>) {
        const model = renderUtil.render(cardVc)
        const [match] = pluckFirstFromCard(model, 'buttons') ?? []
        const groupVc = match?.controller?.getParentController?.()
        assert.isTruthy(
            groupVc,
            'I could not find a button group in your card or your button group does not render any buttons.'
        )
        return groupVc
    },

    buttonGroupIsMultiSelect(buttonGroupVc: ButtonGroupViewController) {
        assert.isTrue(
            buttonGroupVc.getIsMultiSelect(),
            'Your button group should allow multi-select.'
        )
    },

    cardSectionRendersButton(
        vc: ViewController<Card>,
        sectionIdOrIdx: string | number,
        buttonId?: string
    ) {
        const section = checkForCardSection(vc, sectionIdOrIdx)

        if (buttonId) {
            const match = section?.buttons?.find((b) => b.id === buttonId)

            assert.isTruthy(
                match,
                `Could not find button '${buttonId}' in section '${sectionIdOrIdx}'`
            )
        } else {
            assert.isTruthy(
                section?.buttons,
                `Could not find button in section '${sectionIdOrIdx}'`
            )
        }
    },

    footerRendersButtonWithType(
        vc: ViewController<Card>,
        type?: Button['type']
    ) {
        const model = renderUtil.render(vc)
        const buttons = model.footer?.buttons

        if (
            !buttons ||
            buttons.length === 0 ||
            (type && !buttons.find((b) => b.type === type))
        ) {
            assert.fail(
                `Your footer is supposed to render a${
                    type ? ` ${type}` : ''
                } button but it doesn't!`
            )
        }
    },

    cardDoesNotRenderButtons(vc: ViewController<Card>, ids: string[]) {
        try {
            this.cardRendersButtons(vc, ids)
        } catch {
            return
        }

        const { found } = pluckButtons(vc, ids)

        assert.fail(
            `I did not expect your card to render buttons:\n\n${found.join(', ')}`
        )
    },

    cardDoesNotRenderButton(vc: ViewController<Card>, id: string) {
        try {
            this.cardRendersButton(vc, id)
        } catch {
            return
        }

        assert.fail(
            `I did not expect your card to render a button with the id '${id}', but it did!`
        )
    },

    cardRendersButtons(
        vc: ViewController<Card>,
        ids: string[]
    ): ButtonViewController[] {
        const { missing, foundButtons } = pluckButtons(vc, ids)

        if (missing.length > 0) {
            assert.fail(
                `Your card '${getVcName(
                    vc
                )}' is missing buttons with the following ids: ${missing.join(', ')}`
            )
        }

        return foundButtons.map((button) => ({
            render() {
                return button
            },
            triggerRender() {},
            setTriggerRenderHandler(handler: TriggerRenderHandler) {
                this.triggerRender = handler
            },
        }))
    },

    cardRendersButton(vc: ViewController<Card>, id: string) {
        return this.cardRendersButtons(vc, [id])[0]
    },

    buttonIsDisabled(vc: ViewController<Card>, id: string) {
        const button = this.cardRendersButton(vc, id)
        assert.isFalse(
            button.render().isEnabled,
            `The button '${id}' is not disabled! Try setting 'isEnabled' to false.`
        )
    },

    buttonIsEnabled(vc: ViewController<Card>, id: string) {
        const button = this.cardRendersButton(vc, id)
        assert.isTrue(
            button.render().isEnabled ?? true,
            `The button '${id}' is not enabled! Try setting 'isEnabled' to true.`
        )
    },

    buttonIsSelected(vc: ViewController<Card>, id: string) {
        const button = this.cardRendersButton(vc, id)
        assert.isTrue(
            button.render().isSelected,
            `The button '${id}' is not selected and should be!`
        )
    },
}

export default buttonAssert

export function pluckButtons(
    vc:
        | ViewController<Card>
        | ViewController<Navigation>
        | FormViewController<any>
        | BigFormViewController<any>
        | SkillViewController,
    ids: string[]
): { found: string[]; missing: string[]; foundButtons: Button[] } {
    assertOptions({ vc, ids }, ['vc', 'ids'])

    const model = renderUtil.render(vc)

    //@ts-ignore
    if (model.layouts) {
        const sv =
            model as SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
        for (const layout of sv.layouts ?? []) {
            const cards = layout?.cards
            for (const card of cards ?? []) {
                const results = pluckButtonsFromViewModel(card, ids)
                if (results.found.length > 0) {
                    return results
                }
            }
        }
    }

    return pluckButtonsFromViewModel(model, ids)
}

function pluckButtonsFromViewModel(
    model:
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any>
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Navigation
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigForm<any>,
    ids: string[]
) {
    const cardModel = model as Card
    const criticalError = cardModel.criticalError

    const buttons = [
        ...(criticalError
            ? (criticalError.buttons ?? [])
            : (cardModel.footer?.buttons ?? [])),
    ]

    if ((model as Navigation).buttons) {
        buttons.push(...((model as Navigation).buttons as NavigationButton[]))
    }

    if (!criticalError) {
        pluckAllFromView(model as any, 'buttons').forEach((b) => {
            if (b) {
                buttons.push(...b)
            }
        })

        pluckAllFromView(model as any, 'form').forEach((f) => {
            buttons.push(...(f?.footer?.buttons ?? []))
        })

        pluckAllFromView(model as any, 'buttonBar').forEach((f) => {
            buttons.push(...(f?.buttons ?? []))
        })
    }

    const missing: string[] = []
    const found: string[] = []
    const foundButtons: Button[] = []

    for (const id of ids) {
        const match = buttons.find((b) => b?.id === id)
        if (!match) {
            missing.push(id)
        } else {
            found.push(id)
            foundButtons.push(match)
        }
    }
    return { found, missing, foundButtons }
}
