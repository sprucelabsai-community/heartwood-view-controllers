import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    ClickCalendarViewOptions,
    DropEventOptions,
    KeyboardKey,
    List,
    Navigation,
    Pager,
    SkillViewController,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ActiveRecordListViewController from '../../viewControllers/activeRecord/ActiveRecordList.vc'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import FormViewController from '../../viewControllers/form/Form.vc'
import listUtil from '../../viewControllers/list/list.utility'
import ListViewController from '../../viewControllers/list/List.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import LoginCardViewController from '../../viewControllers/LoginCard.vc'
import { getVcName } from './assertSupport'
import { pluckButtons } from './buttonAssert'
import { ButtonViewController } from './ButtonViewController'
import calendarInteractor from './calendarInteractor'
import formAssert from './formAssert'
import navigationAssert, { getButtonFromNav } from './navigationAssert'
import pagerAssert from './pagerAssert'
import vcAssert from './vcAssert'

const interactor = {
    async click(
        button?:
            | ButtonViewController
            | {
                  onClick?:
                      | ((options?: any) => void | Promise<void>)
                      | null
                      | undefined
                  id?: string | null
              }
            | null,
        onClickOptions?: Record<string, any>
    ) {
        const btnVc = button as ButtonViewController
        if (btnVc.render) {
            button = btnVc.render()
        }
        //@ts-ignore
        const { onClick, id = '**missing id**' } = button ?? {}

        assert.isFunction(
            onClick,
            `Clicking failed because the button '${id}' does not have onClick set.`
        )
        //@ts-ignore
        await onClick(
            onClickOptions ?? {
                altKey: false,
                bubbles: true,
                button: 0,
                buttons: 0,
                cancelable: true,
                clientX: 269,
                clientY: 433,
                ctrlKey: false,
                currentTarget: `button.button.has_label`,
                defaultPrevented: false,
                detail: 9,
                eventPhase: 3,
                getModifierState: () => {},
                isDefaultPrevented: () => {},
                isPropagationStopped: () => {},
                isTrusted: true,
                metaKey: false,
                movementX: 0,
                movementY: 0,
                nativeEvent: {},
                pageX: 269,
                pageY: 433,
                relatedTarget: null,
                screenX: 2317,
                screenY: 612,
                shiftKey: false,
                target: `button.button.has_label`,
                timeStamp: 19915.5,
                title: 'Page 10',
                type: 'click',
                view: {},
            }
        )
    },

    async clickButton(vc: CardVc | FormVc | NavVc, buttonId: string) {
        const match = pluckButtonFromView(vc, buttonId)
        await this.click(match)
    },

    async clickButtonInGroup(
        buttonGroupVc: ButtonGroupVc,
        buttonIdOrIdx: string | number
    ) {
        assertOptions({ buttonGroupVc, buttonIdOrIdx }, [
            'buttonGroupVc',
            'buttonIdOrIdx',
        ])

        const buttons = renderUtil.render(buttonGroupVc)

        const match = buttons.find(
            (b, idx) => b.id === buttonIdOrIdx || idx === buttonIdOrIdx
        )
        assert.isTruthy(
            match,
            `I could not find the '${buttonIdOrIdx}' button!`
        )

        await this.click(match)
    },

    async clickButtonHint(vc: CardVc | FormVc, buttonId: string) {
        assertOptions({ vc, buttonId }, ['vc', 'buttonId'])

        const button = pluckButtonFromView(vc, buttonId)

        assert.isTrue(
            button.shouldShowHintIcon,
            `Make sure have 'shouldShowHintIcon' set to true in your button: '${buttonId}'`
        )

        assert.isFunction(
            button.onClickHintIcon,
            `You gotta set 'onClickHintIcon' on your button with the id: '${
                button.id ?? '***missing***'
            }'`
        )
        return button.onClickHintIcon?.()
    },

    async clickButtonInButtonBar(vc: ButtonBarVc, buttonId: string) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const match = model.buttons.find((b) => b.id === buttonId)
        return this.click(match)
    },

    async clickInFooterWithType(
        vc: CardVc | FormVc,
        type: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button['type']
    ) {
        const model = renderUtil.render(vc)
        const primary = pluckErrorAndFooterButtons(model).find(
            (b) => b.type === type
        )

        //@ts-ignore
        if (!primary && model.shouldRenderSubmitControls) {
            //@ts-ignore
            await this.submitForm(vc)
            return
        }

        assert.isTruthy(
            primary,
            `Your footer doesn't have button with type=${type} to click.`
        )

        return this.click(primary)
    },

    async clickPrimaryInFooter(vc: CardVc | FormVc) {
        return this.clickInFooterWithType(vc, 'primary')
    },

    async clickSecondaryInFooter(vc: CardVc | FormVc) {
        return this.clickInFooterWithType(vc, 'secondary')
    },

    async clickDestructiveInFooter(vc: CardVc | FormVc) {
        return this.clickInFooterWithType(vc, 'destructive')
    },

    async clickInputButton(vc: FormVc, fieldName: string, id: string) {
        const button = formAssert.fieldRendersInputButton(vc, fieldName, id)
        await this.click(button)
    },

    async clickDestructiveInRow(listVc: ListVc, rowIdxOrId: number | string) {
        const vc =
            typeof rowIdxOrId === 'number'
                ? listVc.getRowVc(rowIdxOrId)
                : listVc.getRowVc(rowIdxOrId)

        if (!vc) {
            assert.fail(`I could not find row ${rowIdxOrId}!`)
        }

        const model = renderUtil.render(vc)
        const destructiveButton = model.cells
            .map((c) => c.button)
            .find((button) => button?.type === 'destructive')

        assert.isTruthy(
            destructiveButton,
            `There is no button with type=destructive in this row to click!`
        )

        await this.click(destructiveButton, { rowVc: vc })
    },

    async cancelForm(vc: FormVc) {
        const onCancel = renderUtil.render(vc).onCancel

        assert.isFunction(
            onCancel,
            `You don't have a cancel handler set. Try { onCancel: () => {} } in your form!`
        )

        await onCancel()
    },

    async submitBigFormSlide(vc: BigFormViewController<any>) {
        assertOptions({ vc }, ['vc'])

        if (!vc.isPresentSlideValid()) {
            const errors = vc.validate()
            assert.fail(
                `The slide you are trying to submit is not valid! Here are the errors: ${JSON.stringify(
                    errors,
                    null,
                    2
                )}`
            )
        }

        await this.submitForm(vc)
    },

    async submitForm(vc: FormVc) {
        assert.isTruthy(
            vc,
            `You have to pass a view controller to submit a form.`
        )

        if (!vc.getIsEnabled()) {
            assert.fail(`You can't submit a form that is disabled!`)
        }

        //@ts-ignore
        await renderUtil.render(vc).onSubmit?.()
    },

    async clickPagerButton(vc: ViewController<Pager>, button: PagerButton) {
        assertOptions(
            {
                vc,
                button,
            },
            ['vc', 'button']
        )

        pagerAssert.pagerIsConfigured(vc)

        const { totalPages, currentPage, setCurrentPage } =
            renderUtil.render(vc)

        assert.isFalse(
            currentPage === 0 && button === 'previous',
            `You cannot click 'previous' on the first page!`
        )

        assert.isFalse(
            button === 'next' && currentPage! + 1 === totalPages,
            `You cannot click 'next' on the last page!`
        )

        if (typeof button === 'number') {
            await setCurrentPage(button)
        } else {
            const direction = button === 'next' ? 1 : -1
            await setCurrentPage(currentPage! + direction)
        }
    },

    async submitLoginForm(vc: LoginCardViewController, demoNumber: string) {
        if (demoNumber) {
            const formVc = vc.getLoginForm()

            await formVc.setValue('phone', demoNumber)

            await formVc.submit()

            const errors = formVc.getErrorsByField() as any
            const error = errors[Object.keys(errors)[0]]?.[0]

            assert.isFalse(
                formVc.hasErrors(),
                error?.friendlyMessage ?? error?.stack ?? error?.message
            )

            await formVc.setValue(
                'code',
                demoNumber.substr(demoNumber.length - 4)
            )

            return
        }

        assert.fail('Expected a LoginFormController')
    },

    async clickButtonInRow(
        vc: ListVc,
        rowIdxOrId: number | string,
        buttonId: string
    ) {
        const rowVc =
            typeof rowIdxOrId === 'string'
                ? vc.getRowVc(rowIdxOrId)
                : vc.getRowVc(rowIdxOrId)

        if (!rowVc) {
            assert.fail(`I could not find row ${rowIdxOrId}!`)
        }
        const rowModel = renderUtil.render(rowVc)
        const button = rowModel.cells.find(
            (c) => c.button?.id === buttonId
        )?.button
        assert.isTruthy(
            button,
            `I could not find a button with the id of '${buttonId}' to click in row '${rowIdxOrId}'!`
        )

        await this.click(button)
    },

    /**
     * @deprecated interactor.keyDownOnElementInRow(...) -> interactor.keyDownOnInputInRow(...)
     */
    async keyDownOnElementInRow(options: {
        vc: ListRowViewController
        key: KeyboardKey
        cellIdx: number
    }) {
        return this.keyDownOnInputInRow({
            ...options,
            cell: options.cellIdx,
        })
    },

    async keyDownOnInputInRow(options: {
        vc: ListRowViewController
        key: KeyboardKey
        cell: number
    }) {
        const { vc, key, cell: cellIdx } = options

        const cell = renderUtil.render(options.vc.getCellVc(cellIdx))
        const element = listUtil.getInputFromCell(cell) ?? cell.button

        assert.isTruthy(element, `No input found in cell '${cellIdx}'`)

        assert.isFunction(
            element.onKeyDown,
            `Your input in cell '${cellIdx}' does not have \`onKeyDown\` set.`
        )

        await element.onKeyDown({ key, rowVc: vc })
    },

    async clickCheckboxInRow(vc: ListVc, row: string | number, name?: string) {
        const rowVc = vc.getRowVc(row)
        const model = renderUtil.render(rowVc)
        const checkboxInput = model.cells.find((c) =>
            name ? c.checkboxInput?.name === name : c.checkboxInput
        )?.checkboxInput

        assert.isTruthy(
            checkboxInput,
            name
                ? `I could not find a checkbox named '${name}'!`
                : `I could not find a checkbox to click!`
        )

        const current = checkboxInput.value ?? false
        await rowVc.setValue(checkboxInput.name, !current)
    },

    async clickToggleInRow(vc: ListVc, row: string | number) {
        const rowVc = vc.getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells) {
            if (cell.toggleInput) {
                const current = cell.toggleInput.value ?? false
                await rowVc.setValue(cell.toggleInput.name, !current)
                return
            }
        }

        assert.fail(`I could not find a toggle in row '${row}' to click.`)
    },

    async selectChoiceInRow(options: {
        vc: ListVc
        row: string | number
        newChoice: string
        name?: string
    }) {
        const { vc, row, newChoice, name } = options

        const rowVc = vc.getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if (cell.selectInput) {
                if (name && cell.selectInput.name !== name) {
                    continue
                }

                const choices = cell.selectInput.choices.filter(
                    (c) => c.value === newChoice
                )

                assert.isAbove(
                    choices.length,
                    0,
                    `The select in row '${row}' didn't have a choice for '${newChoice}' so I couldn't select it.`
                )

                await rowVc.setValue(cell.selectInput.name, newChoice)
                return
            }
        }

        if (name) {
            assert.fail(
                `I could not find a select by name of '${name}' in row '${row}' to make a choice!`
            )
        }
        assert.fail(
            `I could not find a select in row '${row}' to make a choice!`
        )
    },

    async clickRow(listVc: ListVc, row: number | string) {
        assertOptions(
            { listVc, row },
            ['listVc', 'row'],
            `You have to pass a list and it's row to click it!`
        )

        const rowVc = listVc.getRowVc(row)
        const model = renderUtil.render(rowVc)

        assert.isTruthy(
            model.onClick,
            `Row '${model.id}' is missing an onClick!`
        )

        assert.isNotEqual(
            model.isEnabled,
            false,
            `You tried to click a disabled row. Onclick will not be triggered. You can, however, click a checkbox in a row that is disabled.`
        )

        await model.onClick?.()
    },

    async dragAndDropListRow(
        listVc: ViewController<List>,
        newRowIds: string[]
    ) {
        assertOptions({ listVc, newRowIds }, ['listVc', 'newRowIds'])

        const { rows, onDragAndDropSort, shouldAllowDragAndDropSorting } =
            renderUtil.render(listVc)

        assert.isTrue(
            shouldAllowDragAndDropSorting,
            `You tried to drag and drop rows, but your list does not have 'shouldAllowDragAndDropSorting' set to true.`
        )

        assert.isTruthy(
            onDragAndDropSort,
            `You tried to drag and drop rows, but your list does not have 'onDragAndDropSort' set.`
        )

        assert.isLength(
            newRowIds,
            rows.length,
            `You tried to drag and drop ${newRowIds.length} row${newRowIds.length === 1 ? '' : 's'}, but your list has ${rows.length} row${rows.length === 1 ? '' : 's'}. The number of rows must match!`
        )

        for (const newRowId of newRowIds) {
            const match = rows.find((r) => r.id === newRowId)
            assert.isTruthy(
                match,
                `You can't drag and drop row ${newRowId} because it is not in your list.`
            )
        }

        return await onDragAndDropSort(newRowIds)
    },

    async clickCell(
        listVc: ListVc,
        rowIdxOrId: number | string,
        cellIdxOrId: number | string
    ) {
        assertOptions({ listVc, rowIdxOrId, cellIdxOrId }, [
            'listVc',
            'rowIdxOrId',
            'cellIdxOrId',
        ])

        const rowVc = listVc.getRowVc(rowIdxOrId)
        const model = renderUtil.render(rowVc)

        let rowCell

        if (typeof cellIdxOrId === 'string') {
            rowCell = model.cells.find((c) => c.id === cellIdxOrId)
        } else {
            rowCell = model.cells[cellIdxOrId]
        }

        assert.isTruthy(
            rowCell,
            `Could not find Cell '${cellIdxOrId}' in Row '${model.id}'`
        )

        assert.isTruthy(
            rowCell?.onClick,
            `Cell '${cellIdxOrId}' in Row '${model.id}' is missing an onClick!`
        )

        await rowCell.onClick?.()
    },

    async clickCalendarEvent(
        vc: ViewController<Calendar>,
        eventId: string,
        blockIdx?: number
    ) {
        return calendarInteractor.clickEvent(vc, eventId, blockIdx)
    },

    async dragCalendarEventTo(
        vc: ViewController<Calendar>,
        eventId: string,
        updates: Omit<DropEventOptions, 'event' | 'dragEvent'>
    ): Promise<boolean> {
        return calendarInteractor.dragAndDropEvent(vc, eventId, updates)
    },

    /**
     * @deprecated interactor.clickCalendarMonthView(...) -> calendarInteractor.clickMonthView(...)
     */
    async clickCalendarMonthView(
        vc: ViewController<Calendar>,
        dateTimeMs: number
    ) {
        return calendarInteractor.clickMonthView(vc, dateTimeMs)
    },

    /**
     * @deprecated interactor.clickCalendarDayView(...) -> calendarInteractor.clickDayView(...)
     */
    async clickCalendarDayView(
        vc: ViewController<Calendar>,
        dateTimeMs: number,
        personId?: string
    ) {
        return calendarInteractor.clickDayView(vc, dateTimeMs, personId)
    },

    async focus(vc: ViewController<any>) {
        assertOptions({ vc }, ['vc'])

        assert.isTruthy(
            vc.willFocus || vc.didFocus,
            `You focused a view controller that has no focus handlers in place. Try adding 'public willFocus()' or 'public didFocus()' to your vc.`
        )

        await vc.willFocus?.()
        await vc.didFocus?.()
    },

    async hide(vc: ViewController<any>) {
        await vc.didHide?.()
    },

    async blur(vc: ViewController<any>) {
        assertOptions({ vc }, ['vc'])

        assert.isTruthy(
            vc.willBlur || vc.didBlur,
            `You focused a view controller that has no focus handlers in place. Try adding 'public willBlur()' or 'public didBlur()' to your vc.`
        )

        await vc.willBlur?.()
        await vc.didBlur?.()
    },

    async clickCriticalErrorButton(vc: CardVc, buttonId: string) {
        const { buttons } = vcAssert.assertCardRendersCriticalError(vc)
        const button = buttons?.find((b) => b.id === buttonId)

        assert.isTruthy(
            button,
            `I could not find the button '${buttonId}' in your critical error`
        )

        assert.isFunction(
            button.onClick,
            "Your critical error button does not have an 'onClick` set! Try that next!"
        )

        await this.click(button)
    },

    async clickNavButton(vc: SkillViewController | NavVc, buttonId: string) {
        const navVc = (vc as SkillViewController).load
            ? navigationAssert.skillViewRendersNavigation(
                  vc as SkillViewController
              )
            : vc
        const match = getButtonFromNav(navVc, buttonId)

        return this.click(match)
    },

    /**
     * @deprecated interactor.longPressDropOnMonthView() -> calendarInteractor.longPressDropOnMonthView()
     */
    async longPressDropOnMonthView(
        vc: ViewController<Calendar>,
        options?: ClickCalendarViewOptions
    ) {
        return calendarInteractor.longPressThenDrop(vc, options)
    },
}

export default interactor

function pluckButtonFromView(
    vc: CardVc | FormVc | NavVc | SkillViewController,
    buttonId: string
) {
    const { foundButtons } = pluckButtons(vc, [buttonId])
    const match = foundButtons[0]

    assert.isTruthy(
        match,
        `Could not find a button in '${getVcName(vc)}' with the id '${buttonId}'`
    )
    return match
}

function pluckErrorAndFooterButtons(
    model:
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any>
) {
    //@ts-ignore
    return (model.criticalError?.buttons ??
        model.footer?.buttons ??
        []) as SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
}

type CardVc =
    ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
type ButtonBarVc =
    ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar>
type ButtonGroupVc = ViewController<
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
>
type Calendar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar
type FormVc = FormViewController<any> | BigFormViewController<any>
type NavVc = ViewController<Navigation>

export type PagerButton = 'previous' | 'next' | number

type ListVc = ListViewController | ActiveRecordListViewController
