import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    Card,
    FormViewController,
    LineIcon,
    List,
    ListCell,
    RowStyle,
    SkillViewController,
    SwipeCardViewController,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ButtonBarViewController from '../../viewControllers/ButtonBar.vc'
import listUtil from '../../viewControllers/list/list.utility'
import ListViewController from '../../viewControllers/list/List.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import SwipeCardViewControllerImp from '../../viewControllers/SwipeCard.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'
import {
    getVcName,
    pluckAllFromView,
    SelectViewController,
} from './assertSupport'
import interactor from './interactor'
import { pullCardsFromSkillView } from './vcAssert'

const listAssert = {
    views: {} as SimpleFactory,
    _setVcFactory(views: SimpleFactory) {
        this.views = views
    },
    listRendersRows(
        listVc: ViewController<List>,
        expectedRows?: number | string[]
    ) {
        const model = renderUtil.render(listVc)
        assert.isTruthy(
            model.rows,
            `Your list should have rendered rows, it didn't render anything.`
        )

        if (typeof expectedRows === 'number') {
            assert.isLength(
                model.rows,
                expectedRows,
                `Your list was supposed to render ${expectedRows} row(s), but it rendered ${model.rows.length}.`
            )
        } else if (Array.isArray(expectedRows)) {
            for (const id of expectedRows) {
                this.listRendersRow(listVc, id)
            }
        }
    },

    listRendersRow(listVc: ViewController<List>, row: string | number) {
        return getListVc(listVc).getRowVc(row)
    },

    rowDoesNotRenderCheckbox(
        listVc: ViewController<List>,
        row: string | number,
        name?: string
    ) {
        try {
            this.rowRendersCheckBox(listVc, row, name)
        } catch {
            return
        }

        assert.fail(
            `I found a checkbox${
                name ? ` named '${name}'` : ''
            } in row '${row}' and I didn't expect to!`
        )
    },
    rowRendersCheckBox(
        listVc: ViewController<List>,
        row: string | number,
        name?: string
    ) {
        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        const checkbox = model.cells.find(
            (cell) =>
                !!cell.checkboxInput &&
                (!name || cell.checkboxInput.name === name)
        )
        if (name) {
            assert.isTruthy(
                checkbox,
                `I could not find a checkbox by name '${name}' in row '${row}'!`
            )
        } else {
            assert.isTruthy(
                checkbox,
                `I could not find a checkbox in row '${row}'!`
            )
        }
    },

    cardRendersList(
        vc: ViewController<Card> | FormViewController<any>,
        id?: string
    ): ListViewController {
        let { match, foundById } = findList(vc, id)

        if (!match) {
            const forms = pluckAllFromView(
                renderUtil.render(vc) as Card,
                'form'
            )
            for (const form of forms) {
                if (form?.controller) {
                    const formMatch = findList(form.controller, id)
                    if (formMatch.match) {
                        match = formMatch.match
                        foundById = formMatch.foundById
                        break
                    }
                }
            }
        }

        assert.isTruthy(
            match,
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

    rowRendersCalendar(listVc: ListViewController, row: string | number) {
        assertOptions({ listVc, row }, ['listVc', 'row'])

        const rowVc = listVc.getRowVc(row)
        const model = renderUtil.render(rowVc)

        const match = model.cells.find((c) => c.calendar)

        assert.isTruthy(match, `I could not find a calendar in row '${row}'!`)

        assert.isEqual(
            match?.calendar?.view,
            'month',
            `Your calendar needs view='month' in order to render in a row!`
        )
    },

    rowRendersButtonBar(
        listVc: ViewController<List>,
        row: string | number
    ): ButtonBarViewController {
        assertOptions({ listVc, row }, ['listVc', 'row'])

        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if (cell.buttonBar) {
                return cell.buttonBar.controller as any
            }
        }

        assert.fail(
            `I could not find a buttonBar inside your list at row '${row}'!`
        )

        return {} as any
    },

    rowRendersCell(
        listVc: ViewController<List>,
        row: string | number,
        cell: string | number
    ) {
        assertOptions({ listVc, row, cell }, ['listVc', 'row', 'cell'])

        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        let rowCell

        if (typeof cell === 'string') {
            rowCell = model.cells.find((c) => c.id === cell)
        } else {
            rowCell = model.cells[cell]
        }

        assert.isTruthy(
            rowCell,
            `Could not find Cell '${cell}' in Row '${model.id}'`
        )
    },

    rowDoesNotRenderCell(
        listVc: ViewController<List>,
        row: string | number,
        cell: string | number
    ) {
        try {
            this.rowRendersCell(listVc, row, cell)
        } catch {
            return
        }
        assert.fail(
            `Your list renders a cell with the id of '${cell}' in row '${row}' and it should not!`
        )
    },

    rowRendersButton(
        listVc: ViewController<List>,
        row: string | number,
        buttonId?: string
    ) {
        const rowVc = this.listRendersRow(listVc, row)

        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if ((!buttonId && cell.button) || cell.button?.id === buttonId) {
                return cell.button!
            }
        }

        assert.fail(
            buttonId
                ? `Your list does not render a button with the id of '${buttonId}' in row '${row}'.`
                : `Your list does not render a button in row '${row}'.`
        )

        return {} as NonNullable<ListCell['button']>
    },

    buttonInRowIsDisabled(
        listVc: ViewController<List>,
        row: string | number,
        buttonId: string
    ) {
        this.rowRendersButton(listVc, row, buttonId)

        try {
            this.buttonInRowIsEnabled(listVc, row, buttonId)
        } catch {
            return
        }

        assert.fail(`The button '${buttonId}' in row '${row}' is not disabled!`)
    },

    buttonInRowIsEnabled(
        listVc: ViewController<List>,
        row: string | number,
        buttonId: string
    ) {
        const button = this.rowRendersButton(listVc, row, buttonId)
        assert.isTruthy(
            button.isEnabled ?? true,
            `The button '${buttonId}' in row '${row}' is not enabled!`
        )
    },

    rowRendersButtonWithIcon(vc: ListRowViewController, icon: LineIcon) {
        const model = renderUtil.render(vc)

        for (const cell of model?.cells ?? []) {
            if (cell.button?.lineIcon === icon) {
                return
            }
        }

        assert.fail(`Could not find button with 'lineIcon='${icon}'' in row!`)
    },

    rowDoesNotRenderButton(
        listVc: ViewController<List>,
        row: string | number,
        buttonId?: string
    ) {
        try {
            this.rowRendersButton(listVc, row, buttonId)
        } catch {
            return
        }
        assert.fail(
            buttonId
                ? `Your list renders a button with the id of '${buttonId}' in row '${row}' and it should not!`
                : `Your list renders a button in row '${row}' and it should not!`
        )
    },

    listDoesNotRenderRow(listVc: ViewController<List>, row: string | number) {
        try {
            this.listRendersRow(listVc, row)
        } catch {
            return
        }
        assert.fail(`I found a row '${row}' and I didn't expect to!`)
    },

    skillViewRendersSwipeCard(
        vc: SkillViewController
    ): SwipeCardViewController {
        assertOptions({ vc }, ['vc'])

        const cards = pullCardsFromSkillView(vc, this.views)

        for (const vc of cards) {
            if (vc instanceof SwipeCardViewControllerImp) {
                return vc
            }
        }
        assert.fail(`I could not find a swipe view in '${getVcName(vc)}'!`)
        return {} as any
    },

    rowRendersInput(
        vc: ViewController<List>,
        row: string | number,
        inputName: string
    ) {
        const listVc = getListVc(vc)
        const rowVc = listVc.getRowVc(row)

        rowVc.getValue(inputName)
    },

    inputIsInteractive(
        vc: ViewController<List>,
        row: string | number,
        inputName: string
    ) {
        const rowVc = getListVc(vc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            const input = listUtil.getInputFromCell(cell, inputName)
            if (input) {
                assert.isTruthy(
                    input.isInteractive ?? true,
                    `Input ${inputName} in row ${row} is not interactive and it should be! Try isInteractive: true!`
                )
                return
            }
        }

        assert.fail(
            `I could not find an input named '${inputName}' in row '${row}'!`
        )
    },

    inputIsNotInteractive(
        vc: ViewController<List>,
        row: string | number,
        inputName: string
    ) {
        try {
            this.inputIsInteractive(vc, row, inputName)
        } catch {
            return
        }

        assert.fail(
            `Input ${inputName} in row ${row} is interactive and it should not be! Try isInteractive: false!`
        )
    },

    rowDoesNotRenderInput(
        vc: ViewController<List>,
        row: string | number,
        inputName: string
    ) {
        try {
            this.rowRendersInput(vc, row, inputName)
        } catch {
            return
        }

        assert.fail(
            `I found an input called '${inputName}' in row '${row}' and I expected NOT to!`
        )
    },

    rowDoesNotRenderContent(
        vc: ViewController<List>,
        row: string | number,
        content: string
    ) {
        try {
            this.rowRendersContent(vc, row, content)
        } catch {
            return
        }

        assert.fail(
            `I found '${content}' in row '${row}' of your list and didn't expect to!`
        )
    },

    rowRendersContent(
        vc: ViewController<List>,
        row: string | number,
        content: string
    ) {
        const rowVc = this.listRendersRow(vc, row)
        const model = renderUtil.render(rowVc)
        const contents: string[] = []

        for (const cell of model.cells) {
            const value = renderCellContent(cell)
            contents.push(value)

            if (value?.toLowerCase().includes(content.toLowerCase())) {
                return
            }
        }
        assert.fail(
            `Expected row '${row}' to render content '${content}', but it did not. It did, however, render the following cells:\n\n${contents
                .map((c, idx) => `Cell ${idx}: ${c}`)
                .join('\n')}`
        )
    },

    rowRendersToggle(
        listVc: ViewController<List>,
        row: string | number,
        toggleName?: string
    ) {
        const rowVc = this.listRendersRow(listVc, row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if (toggleName && cell.toggleInput?.name === toggleName) {
                return
            } else if (!toggleName && cell.toggleInput) {
                return
            }
        }

        assert.fail(
            `Could not find a toggle${
                toggleName ? ` named '${toggleName}'` : ''
            } in row '${row}' in your list!`
        )
    },

    rowIsSelected(listVc: ViewController<List>, row: string | number) {
        this.rowsAreSelected(listVc, [row])
    },

    rowIsNotSelected(listVc: ViewController<List>, row: string | number) {
        try {
            this.rowIsSelected(listVc, row)
        } catch {
            return
        }

        assert.fail(`I didn't expect row '${row}' to be selected, but it was!`)
    },

    rowsAreSelected(listVc: ViewController<List>, rows: (string | number)[]) {
        const vc = getListVc(listVc)
        for (const row of rows) {
            const rowVc = vc.getRowVc(row)

            if (!rowVc.getIsSelected()) {
                assert.fail(
                    `I expected row '${row}' to be selected, but it wasn't!!`
                )
            }
        }
    },

    rowIsEnabled(listVc: ViewController<List>, row: string | number) {
        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)
        assert.isTrue(
            model.isEnabled ?? true,
            `The row '${row}' is not enabled!`
        )
    },

    rowIsDisabled(listVc: ViewController<List>, row: string | number) {
        try {
            this.rowIsEnabled(listVc, row)
        } catch {
            return
        }

        assert.fail(
            `I expected row '${row}' to be disabled, but it was actually enabled! Try 'isEnabled: false' in your button!`
        )
    },

    rowDoesNotRenderToggle(
        listVc: ViewController<List>,
        row: string | number,
        toggleName?: string
    ) {
        try {
            this.rowRendersToggle(listVc, row, toggleName)
        } catch {
            return
        }

        assert.fail(
            `I found a toggle${
                toggleName ? ` named '${toggleName}'` : ''
            } in row '${row}' and I didn't expect to.`
        )
    },

    rowRendersSelect(
        listVc: ViewController<List>,
        row: string | number,
        name?: string
    ): SelectViewController {
        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if (cell.selectInput) {
                if (name && name !== cell.selectInput.name) {
                    continue
                }
                return {
                    getChoices() {
                        return cell.selectInput?.choices ?? []
                    },
                    getIsRequired() {
                        return !!cell.selectInput?.isRequired
                    },
                }
            }
        }

        if (name) {
            assert.fail(
                `Could not find select in row '${row}' by name '${name}'`
            )
        }
        assert.fail(
            `Could not find select in row '${row}' and I totally expected to!`
        )

        return {} as any
    },

    rowRendersRatings(listVc: ViewController<List>, row: string | number) {
        const rowVc = getListVc(listVc).getRowVc(row)
        const model = renderUtil.render(rowVc)

        for (const cell of model.cells ?? []) {
            if (cell.ratingsInput) {
                return
            }
        }

        assert.isTruthy(
            model.cells?.[0]?.ratingsInput,
            `I couldn't find a ratingsInput in row '${row}'!`
        )
    },

    async checkboxTogglesRowEnabled(
        listVc: ViewController<List>,
        row: string | number
    ) {
        assertOptions({ listVc, row }, ['listVc', 'row'])

        const vc = getListVc(listVc)
        const rowVc = vc.getRowVc(row)
        const model = renderUtil.render(rowVc)
        const wasEnabled = rowVc.getIsEnabled()

        assert.isTruthy(
            model.cells[0]?.checkboxInput,
            `You need to render a checkbox in the first cell of your row!`
        )

        await interactor.clickCheckboxInRow(vc, row)

        assert.isNotEqual(
            wasEnabled,
            rowVc.getIsEnabled(),
            `You need to make sure your checkbox toggles the enabled status of your row! Also, you will need to manually test toggling in both directions, this test just checks the enabled status inverts on click.`
        )
    },

    rowIsStyle(
        vc: ViewController<List>,
        row: string | number,
        style: RowStyle
    ) {
        const rowVc = this.listRendersRow(vc, row)
        const view = renderUtil.render(rowVc)
        const actual = view.style ?? 'standard'
        assert.isEqual(
            actual,
            style,
            `You row is the wrong style! I expected it to be '${style}', but found '${actual}'!`
        )
    },
}

export default listAssert

function findList(
    vc: ViewController<Card> | FormViewController<any>,
    id: string | undefined
) {
    const model = renderUtil.render(vc)
    const lists = pluckAllFromView(
        //@ts-ignore
        model.body ? model : { body: model },
        'list'
    )

    let foundById = false
    let match: any

    for (const list of lists) {
        if (!match && list?.controller instanceof ListViewController) {
            match = list
        }

        if (id && list?.id === id) {
            foundById = true
            match = list
            break
        }
    }
    return { match, foundById }
}

function renderCellContent(cell: ListCell) {
    return `${cell.subText?.content ?? ''}
				${cell.subText?.html ?? ''}
				${cell.text?.content ?? ''}
				${cell.text?.html ?? ''}
			${cell.button?.label ?? ''}`
}

function getListVc(listVc: ViewController<List>): ListViewController {
    const controller = renderUtil.render(listVc).controller
    assert.isTruthy(
        controller,
        'Your vc did not render with { controller: listVc }'
    )
    return controller
}

type SimpleFactory = Pick<ViewControllerFactory, 'Controller'>
