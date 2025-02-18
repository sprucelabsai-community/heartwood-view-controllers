import { assertOptions, validateSchemaValues } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { CORE_CONTROLLER_MAP } from '../../controllerMap'
import LockScreenSkillViewController from '../../skillViewControllers/LockScreen.svc'
import {
    ConfirmOptions,
    LineIcon,
    SkillViewController,
    ViewController,
    CardViewController,
    ScopedBy,
    Card,
    StickyToolPosition,
    ScopeFlag,
    Button,
    List,
    RowStyle,
    AlertOptions,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ButtonBarViewController from '../../viewControllers/ButtonBar.vc'
import CalendarViewController from '../../viewControllers/Calendar.vc'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewController from '../../viewControllers/form/Form.vc'
import ListViewController from '../../viewControllers/list/List.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import RatingsViewController from '../../viewControllers/Ratings.vc'
import ProgressViewController from '../../viewControllers/reporting/Progress.vc'
import StatsViewController from '../../viewControllers/reporting/Stats.vc'
import SwipeCardViewController from '../../viewControllers/SwipeCard.vc'
import TalkingSprucebotViewController from '../../viewControllers/TalkingSprucebot.vc'
import ToolBeltViewController, {
    OpenToolBeltOptions,
} from '../../viewControllers/ToolBelt.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'
import activeRecordCardAssert from './activeRecordCardAssert'
import {
    Vc,
    AssertConfirmViewController,
    pluckFirstFromCard,
    pluckAllFromView,
    ButtonViewController,
    AssertRedirectOptions,
    SelectViewController,
    getVcName,
    wait,
    WAIT_TIMEOUT,
    isVcInstanceOf,
    checkForCardSection,
} from './assertSupport'
import { attachTriggerRenderCounter } from './attachTriggerRenderCounter'
import buttonAssert from './buttonAssert'
import listAssert from './listAssert'
import toolBeltAssert from './toolBeltAssert'

const vcAssert = {
    _setVcFactory(factory: ViewControllerFactory) {
        //@ts-ignore
        this.factory = factory
    },
    attachTriggerRenderCounter(vc: Vc) {
        attachTriggerRenderCounter(vc)
    },
    assertTriggerRenderCount(vc: Vc, expected: number) {
        //@ts-ignore
        let actual = vc.__renderInvocationCount

        if (typeof actual === 'undefined') {
            this.attachTriggerRenderCounter(vc)
            actual = 0
        }

        assert.isEqual(
            actual,
            expected,
            `Expected triggerRender of '${
                //@ts-ignore
                vc.id ?? 'view controller'
            }' to be invoked '${expected}' time${
                expected === 1 ? '' : 's'
            }, but it was actually invoked '${actual}' time${
                actual === 1 ? '' : 's'
            }.`
        )
    },
    async assertRendersConfirm(
        vc: ViewController<any>,
        action: () => any | Promise<any>
    ) {
        let confirmVc: AssertConfirmViewController = {
            //@ts-ignore
            id: 'confirm',
            accept: async () => {},
            options: {},
            decline: async () => {},
        }

        let wasHit = false

        const confirmPromise = new Promise((confirmResolve) => {
            //@ts-ignore
            const originalConfirm = vc._originalConfirm

            //@ts-ignore
            vc.confirm = async (options: ConfirmOptions) => {
                wasHit = true

                originalConfirm?.()
                //@ts-ignore
                confirmResolve()

                confirmVc.options = options

                return new Promise((resolve) => {
                    confirmVc.accept = async () => {
                        resolve(true)
                        await actionPromise
                    }
                    confirmVc.decline = async () => {
                        resolve(false)
                        await actionPromise
                    }
                })
            }
        })

        const actionPromise = action()

        await wait(actionPromise, confirmPromise)

        assert.isTrue(
            wasHit,
            `this.confirm() was not invoked in your view controller within ${WAIT_TIMEOUT} milliseconds.`
        )

        return confirmVc
    },
    async assertDoesNotRenderConfirm(
        vc: ViewController<any>,
        action: () => any | Promise<any>
    ) {
        try {
            await this.assertRendersConfirm(vc, action)
        } catch {
            return
        }

        assert.fail(
            `Your view controller rendered a confirm and it should not have!`
        )
    },

    async assertDoesNotRenderDialog(
        vc: ViewController<any>,
        action: () => any | Promise<any>
    ) {
        try {
            await this.assertRendersDialog(vc, action)
        } catch {
            return
        }

        assert.fail(
            `Your view controller rendered a dialog and it should not have!`
        )
    },

    async assertRendersSuccessAlert(
        vc: ViewController<any>,
        action: () => any | Promise<any>
    ) {
        return await this.assertRendersAlert(vc, action, 'success')
    },

    async assertRendersAlert(
        vc: ViewController<any>,
        action: () => any | Promise<any>,
        style: AlertOptions['style'] = 'error'
    ) {
        let wasAlertTriggered = false

        //@ts-ignore
        let oldAlert = vc._originalAlert ? vc._originalAlert : vc.alert.bind(vc)
        let alertOptions: any

        //@ts-ignore
        vc.alert = (options: any) => {
            wasAlertTriggered = true
            alertOptions = options
            return oldAlert(options)
        }

        let dlgVc: DialogViewController | undefined

        try {
            dlgVc = await this.assertRendersDialog(vc, action)
        } catch (err: any) {
            assert.fail(
                `Expected await this.alert() to be called in your view '${getVcName(
                    vc
                )}' within 5 seconds and it wasn't.${
                    err.stack.includes('renderInDialog(')
                        ? ``
                        : ` I was interrupted by this error:\n\n${err.stack ?? err.message}`
                }`
            )
        }

        assert.isTrue(
            wasAlertTriggered,
            `Expected await this.alert() to be called in '${getVcName(
                vc
            )}' within 5 seconds and it wasn't.`
        )

        //@ts-ignore
        dlgVc.alertOptions = alertOptions
        const passedStyle = alertOptions.style ?? 'error'

        assert.isEqual(
            passedStyle,
            style,
            `I expected await this.alert({ style: '${style}' }) to be called in ${getVcName(
                vc
            )}, but it wasn't!`
        )

        return dlgVc as unknown as AlertViewController
    },

    async assertDoesNotRenderAlert(
        vc: ViewController<any>,
        action: () => any | Promise<any>,
        style: AlertOptions['style'] = 'error'
    ) {
        //@ts-ignore
        let oldAlert = vc._originalAlert
            ? //@ts-ignore
              vc._originalAlert.bind(vc)
            : //@ts-ignore
              vc.alert?.bind(vc)

        let message = ''

        //@ts-ignore
        vc._originalAlert = (options: any) => {
            message = options.message
            return oldAlert(options)
        }

        try {
            await this.assertRendersAlert(vc, action, style)
        } catch {
            return
        }

        assert.fail(
            `Didn't expect your controller to render an alert, but it did! It reads:\n\n${message}`
        )
    },

    async assertAsksForAVote(
        vc: ViewController<any>,
        action: () => Promise<any>
    ) {
        let wasHit = false
        const voteVc = {
            castVote: async () => {},
        }

        let votePromise = new Promise((resolve: any) => {
            //@ts-ignores
            vc.voteHandler = async () => {
                wasHit = true
                resolve()
                await new Promise((resolve: any) => {
                    voteVc.castVote = async () => {
                        await resolve()
                        await new Promise((resolve) => setTimeout(resolve, 0))
                    }
                })
            }
        })

        await wait(action(), votePromise)

        assert.isTrue(
            wasHit,
            "I totally expected you to `await this.askForAVote()`, but you didn't."
        )

        return voteVc
    },

    async assertRendersDialog(
        vc: ViewController<any>,
        action: () => any | Promise<any>,
        dialogHandler?: (dialogVc: DialogViewController) => any | Promise<any>
    ): Promise<DialogViewController> {
        let run = () => {}

        return new Promise((resolve, reject) => {
            try {
                let wasHit = false
                let dialogVc: DialogViewController | undefined
                let dialogPromise = new Promise((resolve) => {
                    const renderInDialogHandler = (...args: any[]) => {
                        assert.isFalsy(
                            //@ts-ignore
                            vc._currentlyRenderingInDialog,
                            `Holy dialogs Batman! You tried to render more than 1 dialog!`
                        )

                        //@ts-ignore
                        vc._currentlyRenderingInDialog = true

                        dialogVc = oldRenderInDialog(...args)

                        // //@ts-ignore
                        // dialogVc.getParent = () => {
                        //     //@ts-ignore
                        //     return dialogVc?.getCardVc().getParent()
                        // }

                        resolve(undefined)

                        const oldHide = dialogVc!.hide.bind(dialogVc!)
                        dialogVc!.hide = async () => {
                            await oldHide()
                            await new Promise((r) => setTimeout(r, 0))
                        }

                        return dialogVc
                    }

                    //@ts-ignore
                    const oldRenderInDialog =
                        //@ts-ignore
                        vc._originalRenderInDialog ??
                        //@ts-ignore
                        vc.renderInDialog?.bind(vc) ??
                        function () {}

                    //@ts-ignore
                    vc._originalRenderInDialog = oldRenderInDialog
                    //@ts-ignore
                    vc.renderInDialog = renderInDialogHandler
                })

                let dialogHandlerPromise: any

                //@ts-ignore
                const originalHandler = vc.renderInDialogHandler?.bind(vc)

                //@ts-ignore
                vc.renderInDialogHandler = ({ controller }) => {
                    wasHit = true

                    originalHandler?.({ controller })

                    //@ts-ignore
                    setTimeout(async () => {
                        dialogHandlerPromise = dialogHandler?.(
                            controller
                        )?.catch?.((err: any) => {
                            reject(err)
                        })
                    }, 0)
                }

                run = async () => {
                    try {
                        await wait(action(), dialogPromise)

                        assert.isTrue(
                            wasHit,
                            `this.renderInDialog() was not invoked in your view controller within ${WAIT_TIMEOUT} milliseconds.`
                        )

                        await dialogHandlerPromise

                        assert.isTruthy(dialogVc)

                        //@ts-ignore
                        vc._currentlyRenderingInDialog = false
                        resolve(dialogVc)
                    } catch (err) {
                        reject(err)
                    }
                }

                void run()
            } catch (err) {
                reject(err)
            }
        })
    },

    assertCardRendersSection(
        vc: ViewController<Card>,
        sectionIdOrIdx: string | number
    ) {
        checkForCardSection(vc, sectionIdOrIdx)
    },

    assertCardDoesNotRenderSection(
        vc: ViewController<Card>,
        sectionIdOrIdx: string | number
    ) {
        try {
            this.assertCardRendersSection(vc, sectionIdOrIdx)
        } catch {
            return
        }

        assert.fail(
            `I found the section '${sectionIdOrIdx}' in your card and I should not have!`
        )
    },

    /**
     * @deprecated vcAssert.assertCardSectionRendersButton(...) -> buttonAssert.cardSectionRendersButton(...)
     */
    assertCardSectionRendersButton(
        vc: ViewController<Card>,
        sectionIdOrIdx: string | number,
        buttonId?: string
    ) {
        return buttonAssert.cardSectionRendersButton(
            vc,
            sectionIdOrIdx,
            buttonId
        )
    },

    /**
     * @deprecated vcAssert.assertCardRendersList(...) -> listAssert.cardRendersList(...)
     */
    assertCardRendersList(
        vc: ViewController<Card> | FormViewController<any>,
        id?: string
    ): ListViewController {
        const model = renderUtil.render(vc)
        const lists = pluckAllFromView(
            //@ts-ignore
            model.body ? model : { body: model },
            'list'
        )

        let foundList = false
        let foundById = false
        let match: any

        for (const list of lists) {
            if (!match && list?.controller instanceof ListViewController) {
                foundList = true
                match = list
            }

            if (id && list?.id === id) {
                foundById = true
                match = list
                break
            }
        }

        assert.isTrue(
            foundList,
            "Expected to find a list inside your CardViewController, but didn't find one!"
        )

        if (id) {
            assert.isTrue(
                foundById,
                `Found a list, but nothing with the id '${id}'!`
            )
        }

        return match?.controller
    },

    assertCardDoesNotRenderList(
        vc: ViewController<Card> | FormViewController<any>,
        id?: string
    ) {
        try {
            this.assertCardRendersList(vc, id)
        } catch {
            return
        }

        assert.fail(
            `Your view controller renders a list${
                id ? ` with the id '${id}'` : ''
            } and it shouldn't.`
        )
    },

    /**
     * @deprecated vcAssert.assertCardRendersButtonBar(...) -> buttonAssert.cardRendersButtonBar(...)
     */
    assertCardRendersButtonBar(
        cardVc: ViewController<Card>
    ): ButtonBarViewController {
        return buttonAssert.cardRendersButtonBar(cardVc)
    },

    assertDialogWasClosed(vc: DialogViewController) {
        assert.isFalse(vc.getIsVisible(), 'Dialog was not closed!')
    },

    assertRendersValidCard(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        //@ts-ignore TODO make shouldAllowEditing part of formBuilderSchema
        delete model.shouldAllowEditing
        validateSchemaValues(cardSchema, model)

        if (model.footer?.buttons) {
            this.assertLastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(vc)
        }
    },

    /**
     * @deprecated vcAssert.assertLastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(...) -> buttonAssert.lastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(...)
     */
    assertLastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(
        vc: ViewController<Card>
    ) {
        return buttonAssert.lastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(
            vc
        )
    },

    assertCardRendersHeader(cardVc: ViewController<Card>) {
        const model = renderUtil.render(cardVc)
        assert.isObject(
            model.header,
            `Your card did not render a header and should have!`
        )
    },

    assertCardRendersFooter(cardVc: ViewController<Card>) {
        const model = renderUtil.render(cardVc)
        assert.isObject(
            model.footer,
            `Your card did not render a footer and should have!`
        )
    },

    assertCardDoesNotRenderFooter(cardVc: ViewController<Card>) {
        assertOptions({ cardVc }, ['cardVc'])
        const model = renderUtil.render(cardVc)
        assert.isFalsy(
            model.footer,
            `Your card is rendering a footer and should not. Try 'this.cardVc.setFooter(null)'!`
        )
    },

    /**
     * @deprecated vcAssert.assertButtonBarRendersButton(...) -> buttonAssert.buttonBarRendersButton(...)
     */
    assertButtonBarRendersButton(
        buttonBarVc: ButtonBarViewController,
        buttonId: string
    ) {
        return buttonAssert.buttonBarRendersButton(buttonBarVc, buttonId)
    },
    /**
     * @deprecated vcAssert.assertListRendersRows(...) -> listAssert.listRendersRows(...)
     */
    assertListRendersRows(
        listVc: ViewController<List>,
        expectedRows?: number | string[]
    ) {
        return listAssert.listRendersRows(listVc, expectedRows)
    },

    /**
     * @deprecated vcAssert.assertListRendersRow(...) -> listAssert.listRendersRow(...)
     */
    assertListRendersRow(listVc: ViewController<List>, row: string | number) {
        return listAssert.listRendersRow(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowRendersCheckBox(...) -> listAssert.rowRendersCheckBox(...)
     */
    assertRowRendersCheckBox(
        listVc: ViewController<List>,
        row: string | number,
        name?: string
    ) {
        return listAssert.rowRendersCheckBox(listVc, row, name)
    },

    /**
     * @deprecated vcAssert.assertRowRendersCalendar(...) -> listAssert.rowRendersCalendar(...)
     */
    assertRowRendersCalendar(listVc: ListViewController, row: string | number) {
        return listAssert.rowRendersCalendar(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowRendersButtonBar(...) -> listAssert.rowRendersButtonBar(...)
     */
    assertRowRendersButtonBar(
        listVc: ViewController<List>,
        row: string | number
    ): ButtonBarViewController {
        return listAssert.rowRendersButtonBar(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowRendersCell(...) -> listAssert.rowRendersCell(...)
     */
    assertRowRendersCell(
        listVc: ViewController<List>,
        row: string | number,
        cell: string | number
    ) {
        return listAssert.rowRendersCell(listVc, row, cell)
    },

    /**
     * @deprecated vcAssert.assertRowDoesNotRenderCell(...) -> listAssert.rowDoesNotRenderCell(...)
     */
    assertRowDoesNotRenderCell(
        listVc: ViewController<List>,
        row: string | number,
        cell: string | number
    ) {
        return listAssert.rowDoesNotRenderCell(listVc, row, cell)
    },

    /**
     * @deprecated vcAssert.assertRowRendersButton(...) -> listAssert.rowRendersButton(...)
     */
    assertRowRendersButton(
        listVc: ViewController<List>,
        row: string | number,
        buttonId: string
    ) {
        return listAssert.rowRendersButton(listVc, row, buttonId)
    },

    /**
     * @deprecated vcAssert.assertRowDoesNotRenderButton(...) -> listAssert.rowDoesNotRenderButton(...)
     */
    assertRowDoesNotRenderButton(
        listVc: ViewController<List>,
        row: string | number,
        buttonId: string
    ) {
        return listAssert.rowDoesNotRenderButton(listVc, row, buttonId)
    },

    /**
     * @deprecated vcAssert.assertListDoesNotRenderRow(...) -> listAssert.listDoesNotRenderRow(...)
     */
    assertListDoesNotRenderRow(
        listVc: ViewController<List>,
        row: string | number
    ) {
        return listAssert.listDoesNotRenderRow(listVc, row)
    },

    assertSkillViewRendersSwipeCard(
        vc: SkillViewController
    ): SwipeCardViewController {
        assertOptions({ vc }, ['vc'])

        //@ts-ignore
        const cards = pullCardsFromSkillView(vc, this.factory)

        for (const vc of cards ?? []) {
            if (vc instanceof SwipeCardViewController) {
                return vc
            }
        }
        assert.fail(`I could not find a swipe view in '${getVcName(vc)}'!`)
        return {} as any
    },

    assertIsSwipeCard(vc: ViewController<Card>) {
        const { controller } = renderUtil.render(vc)
        assert.isTrue(
            controller instanceof SwipeCardViewController,
            `I expected a swipe card view controller but got '${getVcName(
                vc
            )}'! Make your render something like 'return this.swipeVc.render()'`
        )
    },

    assertSkillViewRendersCard(
        vc: SkillViewController,
        id?: string
    ): CardViewController {
        return this.assertSkillViewRendersCards(vc, id ? [id] : undefined)[0]
    },

    assertSkillViewDoesNotRenderCards(
        vc: SkillViewController,
        expected?: number | string[]
    ) {
        const cards: CardViewController[] = pullCardsFromSkillView(
            vc,
            //@ts-ignore
            this.factory
        )
        const matches: string[] = []

        if (Array.isArray(expected)) {
            for (const id of expected) {
                const match = cards.find((c) => getViewId(c) === id)
                if (match) {
                    matches.push(getViewId(match))
                }
            }
        }

        assert.isLength(
            matches,
            0,
            `I didn't expect to find cards with the ids:\n\n${matches.join('\n')}`
        )
    },

    assertSkillViewDoesNotRenderCard(vc: SkillViewController, id: string) {
        try {
            this.assertSkillViewRendersCard(vc, id)
        } catch {
            return
        }

        assert.fail(`I didn't expect to find a card with the id ${id}`)
    },

    assertSkillViewRendersCards(
        vc: SkillViewController,
        expected?: number | string[]
    ): CardViewController[] {
        let matches: CardViewController[] = []

        const cards: CardViewController[] = pullCardsFromSkillView(
            vc,
            //@ts-ignore
            this.factory
        )

        if (Array.isArray(expected)) {
            for (const id of expected) {
                const match = cards.find((c) => getViewId(c) === id)
                if (!match) {
                    assert.fail(`I could not find a card with the id of ${id}!`)
                } else {
                    matches.push(match)
                }
            }
        } else if (typeof expected === 'number' && cards.length !== expected) {
            assert.fail(
                `Expected your skill view to render ${expected} card${
                    expected === 1 ? '' : 's'
                }, but it got ${cards.length}.`
            )
        } else if (typeof expected === 'undefined' && cards.length === 0) {
            assert.fail(
                'Expected your skill view to render a card, but it did not!'
            )
        } else {
            matches = cards
        }

        return matches
    },

    assertCardIsBusy(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        if (!model.body?.isBusy) {
            assert.fail(
                `Expected your card '${
                    model.id ?? getVcName(vc)
                }' to be busy. Try 'this.setIsBusy(true)' or setting { body: { isBusy: true } }`
            )
        }
    },

    assertCardIsNotBusy(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        if (model.body?.isBusy) {
            assert.fail(
                `Expected your card '${
                    model.id ?? getVcName(vc)
                }' not to be busy, but it was. Try 'this.setIsBusy(false)'.`
            )
        }
    },

    /**
     * @deprecated vcAssert.assertRowDoesNotRenderContent(...) -> listAssert.rowDoesNotRenderContent(...)
     */
    assertRowDoesNotRenderContent(
        vc: ViewController<List>,
        row: string | number,
        content: string
    ) {
        return listAssert.rowDoesNotRenderContent(vc, row, content)
    },

    /**
     * @deprecated vcAssert.assertRowRendersContent(...) -> listAssert.rowRendersContent(...)
     */
    assertRowRendersContent(
        vc: ViewController<List>,
        row: string | number,
        content: string
    ) {
        return listAssert.rowRendersContent(vc, row, content)
    },

    assertSkillViewDoesNotRenderViewController(
        vc: SkillViewController,
        VcClass: any
    ) {
        try {
            this.assertSkillViewRendersViewController(vc, VcClass)
        } catch {
            return
        }
        //@ts-ignore
        assert.fail(`Expected not to find a ${VcClass.name} inside ${vc.id}!`)
    },

    assertSkillViewRendersViewController(
        vc: SkillViewController,
        VcClass: any
    ) {
        const model = renderUtil.render(vc)
        const fieldsToCheck = Object.keys(CORE_CONTROLLER_MAP)

        for (const layout of model.layouts ?? []) {
            for (const card of layout.cards ?? []) {
                const vc = findControllerInModel(VcClass, card)
                if (vc) {
                    return vc
                }
                for (const section of card.body?.sections ?? []) {
                    for (const f of fieldsToCheck) {
                        //@ts-ignore
                        const m = section[f]
                        const vc = findControllerInModel(VcClass, m)
                        if (vc) {
                            return vc
                        }
                    }
                }
            }
        }

        assert.fail(
            `Expected a ${getVcName(
                vc
            )} to be rendered in your skill view, but it wasn't!`
        )
    },

    /**
     * @deprecated vcAssert.assertRowRendersButtonWithIcon(...) -> listAssert.rowRendersButtonWithIcon(...)
     */
    assertRowRendersButtonWithIcon(vc: ListRowViewController, icon: LineIcon) {
        return listAssert.rowRendersButtonWithIcon(vc, icon)
    },

    /**
     * @deprecated vcAssert.assertFooterRendersButtonWithType(...) -> buttonAssert.footerRendersButtonWithType(...)
     */
    assertFooterRendersButtonWithType(
        vc: ViewController<Card>,
        type?: Button['type']
    ) {
        return buttonAssert.footerRendersButtonWithType(vc, type)
    },

    /**
     *
     * @deprecated vcAssert.assertCardDoesNotRenderButtons(...) -> buttonAssert.cardDoesNotRenderButtons(...)
     */
    assertCardDoesNotRenderButtons(vc: ViewController<Card>, ids: string[]) {
        return buttonAssert.cardDoesNotRenderButtons(vc, ids)
    },

    /**
     * @deprecated vcAssert.assertCardDoesNotRenderButton(...) -> buttonAssert.cardDoesNotRenderButton(...)
     */
    assertCardDoesNotRenderButton(vc: ViewController<Card>, id: string) {
        return buttonAssert.cardDoesNotRenderButton(vc, id)
    },

    /**
     * @deprecated vcAssert.assertCardRendersButtons(...) -> buttonAssert.cardRendersButtons(...)
     */
    assertCardRendersButtons(
        vc: ViewController<Card>,
        ids: string[]
    ): ButtonViewController[] {
        return buttonAssert.cardRendersButtons(vc, ids)
    },

    /**
     * @deprecated vcAssert.assertCardRendersButton(...) -> buttonAssert.cardRendersButton(...)
     */
    assertCardRendersButton(vc: ViewController<Card>, id: string) {
        return this.assertCardRendersButtons(vc, [id])[0]
    },

    assertCardRendersCriticalError(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isTruthy(
            model.criticalError,
            `I expected a critical error on your card, but didn'nt find one. Try 'this.cardVc.setCriticalError(...)'`
        )

        return model.criticalError
    },

    assertCardDoesNotRenderCriticalError(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isFalsy(
            model.criticalError,
            'Your card was not supposed to render a critical error!'
        )
    },

    /**
     * @deprecated vcAssert.assertActionFocusesTool -> toolBeltAssert.actionFocusesTool
     */
    async assertActionFocusesTool(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        toolId: string,
        action: () => Promise<any> | any
    ) {
        return toolBeltAssert.actionFocusesTool(svcOrToolBelt, toolId, action)
    },

    /**
     * @deprecated vcAssert.assertActionOpensToolBelt -> toolBeltAssert.actionOpensToolBelt
     */
    async assertActionOpensToolBelt(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        action: () => Promise<any> | any,
        options?: OpenToolBeltOptions
    ) {
        return toolBeltAssert.actionOpensToolBelt(
            svcOrToolBelt,
            action,
            options
        )
    },

    /**
     * @deprecated vcAssert.assertActionDoesNotOpenToolBelt -> toolBeltAssert.ActionDoesNotOpenToolBelt
     */
    async assertActionDoesNotOpenToolBelt(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        return toolBeltAssert.actionDoesNotOpenToolBelt(svcOrToolBelt, action)
    },

    /**
     * @deprecated vcAssert.assertActionClosesToolBelt -> toolBeltAssert.actionClosesToolBelt
     */
    async assertActionClosesToolBelt(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        return toolBeltAssert.actionClosesToolBelt(svcOrToolBelt, action)
    },

    /**
     * @deprecated vcAssert.assertActionDoesNotCloseToolBelt -> toolBeltAssert.actionDoesNotCloseToolBelt
     */
    async assertActionDoesNotCloseToolBelt(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        return toolBeltAssert.actionDoesNotCloseToolBelt(svcOrToolBelt, action)
    },

    /**
     * @deprecated vcAssert.assertRendersToolBelt -> toolBeltAssert.rendersToolBelt
     */
    assertRendersToolBelt(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        assertHasAtLeast1Tool = true
    ) {
        return toolBeltAssert.rendersToolBelt(
            svcOrToolBelt,
            assertHasAtLeast1Tool
        )
    },

    /**
     * @deprecated vcAssert.assertToolBeltDoesNotRenderStickyTools -> toolBeltAssert.toolBeltDoesNotRenderStickyTools
     */
    assertToolBeltDoesNotRenderStickyTools(
        svcOrToolBelt: SkillViewController | ToolBeltViewController
    ) {
        return toolBeltAssert.toolBeltDoesNotRenderStickyTools(svcOrToolBelt)
    },

    /**
     * @deprecated vcAssert.assertToolInstanceOf -> toolBeltAssert.toolInstanceOf
     */
    assertToolInstanceOf(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        toolId: string,
        Class: any
    ): ViewController<any> {
        return toolBeltAssert.toolInstanceOf(svcOrToolBelt, toolId, Class)
    },

    /**
     * @deprecated vcAssert.assertToolBeltDoesNotRenderTool -> toolBeltAssert.toolBeltDoesNotRenderTool
     */
    assertToolBeltDoesNotRenderTool(
        svc: SkillViewController | ToolBeltViewController,
        toolId: string
    ) {
        return toolBeltAssert.toolBeltDoesNotRenderTool(svc, toolId)
    },

    /**
     * @deprecated vcAssert.assertToolBeltStickyToolInstanceOf -> toolBeltAssert.toolBeltStickyToolInstanceOf
     */
    assertToolBeltStickyToolInstanceOf(options: {
        toolBeltVc: ToolBeltViewController
        position: StickyToolPosition
        Class: any
    }) {
        return toolBeltAssert.toolBeltStickyToolInstanceOf(options)
    },

    /**
     * @deprecated vcAssert.assertToolBeltRendersTool -> toolBeltAssert.toolBeltRendersTool
     */
    assertToolBeltRendersTool(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        toolId: string
    ) {
        return toolBeltAssert.toolBeltRendersTool(svcOrToolBelt, toolId)
    },

    /**
     * @deprecated vcAssert.assertDoesNotRenderToolBelt -> toolBeltAssert.doesNotRenderToolBelt
     */
    assertDoesNotRenderToolBelt(svc: SkillViewController) {
        return toolBeltAssert.doesNotRenderToolBelt(svc)
    },

    assertSkillViewRendersCalendar(svc: SkillViewController) {
        const model = renderUtil.render(svc)

        for (const layout of model.layouts ?? []) {
            for (const card of layout?.cards ?? []) {
                const calendar = pluckFirstFromCard(card ?? {}, 'calendar')
                if (calendar) {
                    return calendar.controller as CalendarViewController
                }
            }
        }

        assert.fail('Your skill view does not render a calendar!')

        return {} as CalendarViewController
    },

    assertCardRendersCalendar(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        const calendar = pluckFirstFromCard(model, 'calendar')

        if (calendar) {
            return calendar.controller as CalendarViewController
        }

        assert.fail(`Your card '${getVcName(vc)}' does not render a calendar!`)

        return {} as CalendarViewController
    },

    assertCardDoesNotRenderCalendar(vc: ViewController<Card>) {
        try {
            this.assertCardRendersCalendar(vc)
        } catch {
            return
        }

        assert.fail(`Your card rendered a calendar and should not.`)
    },

    /**
     * @deprecated - use assertSkillViewRendersCalendar
     */
    assertRendersCalendar(svc: SkillViewController) {
        return this.assertSkillViewRendersCalendar(svc)
    },

    assertSkillViewDoesNotRenderCalendar(svc: SkillViewController) {
        try {
            this.assertSkillViewRendersCalendar(svc)
        } catch {
            return
        }

        assert.fail(
            'Your skill view should not be rendering a calendar right now!'
        )
    },
    /**
     * @deprecated - use assertSkillViewDoesNotRenderCalendar
     */
    assertDoesNotRenderCalendar(svc: SkillViewController) {
        return this.assertSkillViewDoesNotRenderCalendar(svc)
    },

    assertCardRendersTalkingSprucebot(
        vc: ViewController<Card>,
        id?: string
    ): TalkingSprucebotViewController {
        const model = renderUtil.render(vc)
        const sprucebots = pluckAllFromView(model, 'talkingSprucebot')

        const sprucebot = sprucebots.find((sb) => sb?.id === id)

        if (!sprucebot) {
            assert.fail(
                id
                    ? `I could not find a talking Sprucebot with the id '${id}' in your card!`
                    : 'Your card does not render a talking sprucebot!'
            )
        }

        //@ts-ignore
        return sprucebot.controller
    },

    assertCardDoesNotRenderTalkingSprucebot(
        vc: ViewController<Card>,
        id?: string
    ) {
        try {
            this.assertCardRendersTalkingSprucebot(vc, id)
        } catch {
            return
        }

        assert.fail(
            `Your card wasn't supposed to render a talking sprucebot${
                id ? ` with the id of ${id}` : ''
            }, but it is!`
        )
    },

    assertIsFullScreen(vc: SkillViewController) {
        const model = renderUtil.render(vc)

        assert.isTrue(
            model.isFullScreen,
            'Your skill view is not being rendered full screen. Try setting `isFullScreen:true` in your view model.'
        )
    },

    assertIsNotFullScreen(vc: SkillViewController) {
        try {
            this.assertIsFullScreen(vc)
        } catch {
            return
        }

        assert.fail(
            'Your skill view is being rendered full screen. Try setting `isFullScreen:false` in your view model.'
        )
    },

    async assertLoginIsRequired(vc: SkillViewController) {
        const isRequired = await vc.getIsLoginRequired?.()
        assert.isTrue(
            isRequired,
            //@ts-ignore
            `Your skill view ${getVcName(
                vc
            )} does not require login and it should! Try implementing 'public async getIsLoginRequired() { return true }' in your SkillViewController.`
        )
    },

    async assertLoginIsNotRequired(vc: SkillViewController) {
        try {
            await this.assertLoginIsRequired(vc)
        } catch {
            return
        }

        assert.fail(
            `Your skill view does not require login and it should! Make sure 'getIsLoginRequired' returns false in your SkillViewController.`
        )
    },

    async assertActionDoesNotRedirect(
        options: Omit<AssertRedirectOptions, 'destination'>
    ) {
        try {
            await this.assertActionRedirects(options)
        } catch {
            return
        }

        assert.fail(`You redirected and should not have!`)
    },

    async assertActionRedirects(options: AssertRedirectOptions) {
        const { router, action, destination } = assertOptions(options, [
            'action',
            'router',
        ])

        const oldRedirect =
            //@ts-ignore
            router._originalRedirect ?? router.redirect.bind(router)

        let wasHit = false
        let failMessage: any | undefined
        let results: any | undefined

        const redirectPromise = new Promise((resolve: any) => {
            //@ts-ignore
            router.redirect = async (id: any, args: any) => {
                try {
                    wasHit = true

                    if (destination?.id && destination.id !== id) {
                        assert.fail(
                            `I expected to be redirected to '${destination.id}' but I was sent to '${id}'.`
                        )
                        return
                    }

                    if (destination?.args) {
                        assert.isEqualDeep(
                            args,
                            destination.args,
                            `The args you passed to your redirect are not what I expected!`
                        )
                    }

                    //@ts-ignore
                    results = oldRedirect(id, args)
                    await results
                } catch (err: any) {
                    failMessage = err
                }
                resolve()
            }
        })

        await wait(action())

        assert.isTrue(wasHit, `I expected to be redirected, but was not!`)

        await redirectPromise

        if (failMessage) {
            throw failMessage
        }

        return results
    },

    /**
     * @deprecated vcAssert.assertRowRendersToggle(...) -> listAssert.rowRendersToggle(...)
     */
    assertRowRendersToggle(
        listVc: ViewController<List>,
        row: string | number,
        toggleName?: string
    ) {
        return listAssert.rowRendersToggle(listVc, row, toggleName)
    },

    /**
     * @deprecated vcAssert.assertRowIsSelected(...) -> listAssert.rowIsSelected(...)
     */
    assertRowIsSelected(listVc: ViewController<List>, row: string | number) {
        return listAssert.rowIsSelected(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowIsNotSelected(...) -> listAssert.rowIsNotSelected(...)
     */
    assertRowIsNotSelected(listVc: ViewController<List>, row: string | number) {
        return listAssert.rowIsNotSelected(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowsAreSelected(...) -> listAssert.rowsAreSelected(...)
     */
    assertRowsAreSelected(
        listVc: ViewController<List>,
        rows: (string | number)[]
    ) {
        return listAssert.rowsAreSelected(listVc, rows)
    },

    /**
     * @deprecated vcAssert.assertRowIsEnabled(...) -> listAssert.rowIsEnabled(...)
     */
    assertRowIsEnabled(listVc: ViewController<List>, row: string | number) {
        return listAssert.rowIsEnabled(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowIsDisabled(...) -> listAssert.rowIsDisabled(...)
     */
    assertRowIsDisabled(listVc: ViewController<List>, row: string | number) {
        return listAssert.rowIsDisabled(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertRowDoesNotRenderToggle(...) -> listAssert.rowDoesNotRenderToggle(...)
     */
    assertRowDoesNotRenderToggle(
        listVc: ViewController<List>,
        row: string | number,
        toggleName?: string
    ) {
        return listAssert.rowDoesNotRenderToggle(listVc, row, toggleName)
    },

    /**
     * @deprecated vcAssert.assertRowRendersSelect(...) -> listAssert.rowRendersSelect(...)
     */
    assertRowRendersSelect(
        listVc: ViewController<List>,
        row: string | number,
        name?: string
    ): SelectViewController {
        return listAssert.rowRendersSelect(listVc, row, name)
    },

    /**
     * @deprecated vcAssert.assertRowRendersRatings(...) -> listAssert.rowRendersRatings(...)
     */
    assertRowRendersRatings(
        listVc: ViewController<List>,
        row: string | number
    ) {
        return listAssert.rowRendersRatings(listVc, row)
    },

    /**
     * @deprecated vcAssert.assertSkillViewRendersActiveRecordCard(...) -> activeRecordCardAssert.skillViewRendersActiveRecordCard(...)
     */
    assertSkillViewRendersActiveRecordCard(
        svc: SkillViewController,
        id?: string
    ) {
        return activeRecordCardAssert.skillViewRendersActiveRecordCard(svc, id)
    },

    /**
     * @deprecated vcAssert.assertIsActiveRecordCard(...) -> activeRecordCardAssert.isActiveRecordCard(...)
     */
    assertIsActiveRecordCard(vc: ViewController<Card>) {
        return activeRecordCardAssert.rendersAsActiveRecordCard(vc)
    },

    assertControllerInstanceOf<Controller extends ViewController<any>>(
        vc: ViewController<any> | null | undefined,
        Class: new (...arg: any[]) => Controller
    ): Controller {
        assert.isTruthy(vc, `Expected a vc but received '${vc}'!`)

        const match = isVcInstanceOf(vc, Class)

        assert.isTruthy(
            match,
            `Expected your ${
                Object.getPrototypeOf(vc)?.constructor?.name ??
                'view controller'
            } to be an instance of ${Class.name}, but it wasn't!`
        )

        return match as unknown as Controller
    },

    assertRendersAsInstanceOf<Controller extends ViewController<any>>(
        vc: ViewController<any>,
        Class: new (...args: any[]) => Controller
    ): Controller {
        if (vc instanceof DialogViewController) {
            vc = vc.getCardVc()
            assert.isTruthy(
                vc,
                `Your dialog is not rendering a card! Try 'this.renderDialog(cardVc.render())'`
            )
        } else if (vc instanceof LockScreenSkillViewController) {
            vc = vc.getSkillViewVc() as ViewController<any>
            assert.isTruthy(
                vc,
                `Your LockScreen is not rendering a skill view! Try 'this.renderLockScreen(lockSvc.render())'`
            )
        }

        assert.isTruthy(
            vc,
            `The view you sent me is missing a controller. It may help to check your render method to ensure you're properly returning a controller. Here are a few examples of how to do this:

1. Render your card into the dialog:

    this.renderInDialog(this.Controller('my-card', {}).render())

2. Rendering a SubView:

    public render() {
        return this.cardVc.render()
    }

3. Rendering as yourself (e.g. in a SkillViewController):

    public render() {
        return {
            controller: this
        }
    }
`
        )

        const model = renderUtil.render(vc)
        assert.isTruthy(
            model.controller,
            `Your view controller does not return a controller. Make sure you return 'controller:this' from render() or that you're rending a built in view with 'render() { return this.cardVc.render() }'.`
        )

        try {
            return this.assertControllerInstanceOf<Controller>(
                model.controller,
                Class
            )
        } catch {
            assert.fail(
                `Expected your ${
                    Object.getPrototypeOf(vc)?.constructor?.name ??
                    'view controller'
                } to render a controller that is an instance of ${
                    Class.name
                }, but it didn't! Make sure the view you're expecting is rendering itself as the controller (or another view controller). e.g.

1. Render your card into the dialog:

    this.renderInDialog(this.Controller('my-card', {}).render())

2. Rendering a SubView:

    public render() {
        return this.cardVc.render()
    }

3. Rendering as yourself (e.g. in a SkillViewController):

    public render() {
        return {
            controller: this
        }
    } `
            )
        }

        return {} as Controller
    },

    assertCardRendersStats(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        const match = pluckFirstFromCard(model, 'stats')
        assert.isTruthy(
            match,
            `Your card did not render stats and I expected it to!`
        )

        return match.controller as StatsViewController
    },

    assertStatsRendersValue(
        vc: StatsViewController,
        idx: number,
        value: number | string
    ) {
        const model = renderUtil.render(vc)
        const expected = model.stats[idx]?.value
        assert.isEqual(
            expected,
            value,
            `Expected stats to render '${value}' at index '${idx}', but found '${
                expected ?? 'nothing'
            }'.`
        )
    },

    async assertRendersAlertThenRedirects(
        options: AssertRedirectOptions & { vc: ViewController<any> }
    ) {
        await this.assertActionRedirects({
            ...options,
            action: async () => {
                const alertVc = await this.assertRendersAlert(
                    options.vc,
                    options.action
                )

                await alertVc.hide()
            },
        })
    },

    patchAlertToThrow(vc: ViewController<any>) {
        //@ts-ignore
        if (!vc._originalAlert) {
            //@ts-ignore
            vc._originalAlert = vc.alert.bind(vc)
        }

        //@ts-ignore
        vc.alert = async (options: AlertOptions) => {
            if (!options.style || options.style === 'error') {
                assert.fail(
                    `Skill view '${getVcName(
                        vc
                    )}' unexpectedly rendered an error alert. It reads:\n\n${
                        options.message
                    }`
                )
            }
        }
    },

    assertCardDoesNotRenderProgress(vc: ViewController<Card>, id?: string) {
        try {
            this.assertCardRendersProgress(vc, undefined, id)
        } catch {
            return
        }

        assert.fail(
            `I found a progress card ${
                id ? `with id "${id}" ` : ' '
            }and I did not expect to!`
        )
    },

    assertCardRendersProgress(
        vc: ViewController<Card>,
        expectedPercentComplete?: number,
        id?: string
    ): ProgressViewController {
        const model = renderUtil.render(vc)

        const progresses = pluckAllFromView(model, 'progress')
        assert.isAbove(
            progresses.length,
            0,
            `I expected your card to render progress view, but it didn't!`
        )

        let progress: any | undefined

        if (id) {
            for (const p of progresses) {
                if (p?.id === id) {
                    progress = p
                }
            }

            assert.isTruthy(
                progress,
                `I expected your progress view to have the id '${id}', but it has '${progress.id}'`
            )
        } else {
            progress = progresses[0]
        }

        //@ts-ignore
        const controller = progress.controller

        const progressModel = renderUtil.render(
            controller ?? {
                render: () => ({}),
                setTriggerRenderHandler: () => {},
            }
        )

        if (typeof expectedPercentComplete === 'number') {
            assert.isEqual(
                expectedPercentComplete,
                progressModel.percentComplete,
                `Expected progress to be at '${expectedPercentComplete}', but found '${
                    progressModel.percentComplete ?? 'nothing'
                }'`
            )
        }

        //@ts-ignore
        return controller
    },

    assertCardRendersRatings(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        const progress = pluckFirstFromCard(model, 'ratings')

        assert.isTruthy(
            progress,
            `Expected to find a ratings view inside your card, but I didn't!`
        )

        return progress.controller as RatingsViewController
    },

    assertSkillViewNotScoped(vc: SkillViewController) {
        const actualAsArray = normalizeScopeFromVc(vc)
        assert.isEqualDeep(
            actualAsArray,
            ['none'],
            `Your skill view '${getVcName(
                vc
            )}' should not be scoped, but is set to '${renderScopeMarkup(
                actualAsArray
            )}'!`
        )
    },

    assertSkillViewScopedBy(
        vc: SkillViewController,
        scopedBy: ScopedBy | ScopeFlag[]
    ) {
        let expectedAsArray = Array.isArray(scopedBy) ? scopedBy : [scopedBy]

        for (const scope of expectedAsArray) {
            if (
                ['none', 'location', 'organization', 'employed'].indexOf(
                    scope
                ) === -1
            ) {
                assert.fail(
                    `Valid scopes are 'none', 'location', 'organization', and/or 'employed'. You passed '${scopedBy}'.`
                )
            }
        }

        const actualAsArray = normalizeScopeFromVc(vc)

        expectedAsArray.sort()
        actualAsArray.sort()

        assert.isEqualDeep(
            actualAsArray,
            expectedAsArray,
            `Your skill view '${getVcName(
                vc
            )}' is not scoped as expected. Try 'public getScope = () => ${renderScopeMarkup(
                expectedAsArray
            )} as ScopeFlag[]'!`
        )
    },

    /**
     * @deprecated vcAssert.assertCheckboxTogglesRowEnabled(...) -> listAssert.checkboxTogglesRowEnabled(...)
     */
    async assertCheckboxTogglesRowEnabled(
        listVc: ViewController<List>,
        row: string | number
    ) {
        return listAssert.checkboxTogglesRowEnabled(listVc, row)
    },

    assertCardFooterIsDisabled(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isFalse(
            model.footer?.isEnabled,
            `I expected your footer to be disabled, try setting '{ footer: { isEnabled: false } }' or 'cardVc.disableFooter()'`
        )
    },

    assertCardFooterIsNotBusy(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isFalse(
            model.footer?.isBusy,
            `I expected your footer to not be busy, try setting '{ footer: { isBusy: false } }' or 'cardVc.setFooterIsBusy(false)'`
        )
    },

    assertCardFooterIsBusy(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isTrue(
            model.footer?.isBusy,
            `I expected your footer to be busy, try setting '{ footer: { isBusy: true } }' or 'cardVc.setFooterIsBusy(true)'`
        )
    },

    assertCardFooterIsEnabled(vc: ViewController<Card>) {
        const model = renderUtil.render(vc)
        assert.isTrue(
            model.footer?.isEnabled !== false,
            `I expected your footer to be enabled, try setting '{ footer: { isEnabled: true } }' or 'cardVc.enableFooter()'`
        )
    },

    /**
     * @deprecated vcAssert.assertRowIsStyle(...) -> listAssert.rowIsStyle(...)
     */
    assertRowIsStyle(
        vc: ViewController<List>,
        row: string | number,
        style: RowStyle
    ) {
        return listAssert.rowIsStyle(vc, row, style)
    },
}

export default vcAssert

export function getViewId(c: ViewController<any>) {
    return renderUtil.render(c).id ?? '**no-id**'
}

export function pullCardsFromSkillView(
    vc: SkillViewController<Record<string, any>>,
    factory: any
) {
    const model = renderUtil.render(vc)
    const cards: CardViewController[] = [
        ...(model.topCards?.map((c) => c.controller!) ?? []),
        ...(model.leftCards?.map((c) => c.controller!) ?? []),
        ...(model.rightCards?.map((c) => c.controller!) ?? []),
        ...(model.bottomCards?.map((c) => c.controller!) ?? []),
        ...(model.cards?.map((c) => c.controller!) ?? []),
    ]
    for (const layout of model?.layouts ?? []) {
        for (const card of layout.cards ?? []) {
            if (card) {
                //@ts-ignore
                cards.push(card.controller ?? factory.Controller('card', card))
            }
        }
    }
    return cards
}

function renderScopeMarkup(expectedAsArray: ScopedBy[] | ScopeFlag[]) {
    return `['${expectedAsArray.join("','")}']`
}

export function normalizeScopeFromVc(
    vc: SkillViewController<Record<string, any>>
) {
    const actual = vc.getScopedBy?.()
    const actualAsArray: ScopeFlag[] = actual
        ? [actual]
        : (vc.getScope?.() ?? [])
    if (actualAsArray.length === 0) {
        actualAsArray.push('none')
    }
    return actualAsArray
}

function findControllerInModel(VcClass: any, model: any) {
    if (model?.controller instanceof VcClass) {
        return model?.controller
    }

    if (
        VcClass.name.toLowerCase().includes(
            //@ts-ignore
            model?.controller?.id?.toLowerCase() ?? '******nope'
        )
    ) {
        return model?.controller
    }

    return null
}

export type AlertViewController = Pick<
    DialogViewController,
    'hide' | 'getIsVisible' | 'getShouldShowCloseButton' | 'wait' | 'render'
> & {
    alertOptions: AlertOptions
}
