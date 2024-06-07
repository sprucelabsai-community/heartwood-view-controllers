import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    ListRow,
    RowStyle,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class ListCard extends AbstractViewController<Card> {
    private cardVc: CardViewController
    public constructor(options: ViewControllerOptions & { listIds: string[] }) {
        super(options)

        const { listIds = [] } = options

        const sections = listIds.map((id) => ({
            list: this.Controller('list', {
                id,
                rows: [],
            }).render(),
        }))

        this.cardVc = this.Controller('card', {
            body: {
                sections,
            },
        })
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return this.cardVc.render()
    }
}

export default class AssertingListsTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        listVc: ListCard,
    }
    private static vc: ListViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('list', {})
    }

    @test()
    protected static throwsIfCantFindListWithId() {
        assert.doesThrow(() =>
            vcAssert.assertCardRendersList(this.Vc(['waka']), 'not-found')
        )

        vcAssert.assertCardDoesNotRenderList(this.Vc(['waka']), 'not-found')
    }

    @test()
    protected static findsOneById() {
        vcAssert.assertCardRendersList(this.Vc(['not-found']), 'not-found')
        assert.doesThrow(() =>
            vcAssert.assertCardDoesNotRenderList(
                this.Vc(['not-found']),
                'not-found'
            )
        )
    }

    @test()
    protected static findsByIdIfNotFirstSection() {
        vcAssert.assertCardRendersList(
            this.Vc(['yes', 'no', 'not-found-2']),
            'not-found-2'
        )
    }

    @test()
    protected static canTellIfRowIsEnabled() {
        this.addRow({
            id: 'first',
            isEnabled: false,
        })
        this.addRow({
            id: 'second',
            isEnabled: false,
        })

        this.assertRowIsDisabled('first')
        this.assertRowIsDisabled('second')

        this.enableRow(0)

        this.assertRowIsEnabled('first')
        this.assertRowIsDisabled('second')
    }

    @test()
    protected static settingEnabledTriggersRender() {
        this.addRow({
            id: 'first',
        })

        const rowVc = this.getRow(0)

        vcAssert.attachTriggerRenderCounter(rowVc)
        rowVc.setIsEnabled(true)
        vcAssert.assertTriggerRenderCount(rowVc, 1)
    }

    @test()
    protected static canAssertRowStyle() {
        this.addRow({
            id: 'style',
            style: 'critical',
        })

        this.assertRowStyle(0, 'critical')
        assert.doesThrow(() => this.assertRowStyle(0, 'standard'))

        this.addRow({
            id: 'testing',
        })

        this.assertRowStyle('testing', 'standard')
        this.assertRowStyle(1, 'standard')
    }

    @test()
    protected static assertsHasInput() {
        this.assertAssertingInputThrows('it does not exist')
        this.addRow({
            cells: [],
        })

        this.assertAssertingInputThrows('could not find an input')

        this.addRow({
            id: 'new',
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                    },
                },
            ],
        })

        listAssert.rowRendersInput(this.vc, 'new', 'firstName')
        assert.doesThrow(() => {
            listAssert.rowDoesNotRenderInput(this.vc, 'new', 'firstName')
        })
    }

    @test()
    protected static async canAssertInputIsNotInteractive() {
        const id = generateId()
        const inputName = generateId()

        this.addRow({
            id,
            cells: [
                {
                    textInput: {
                        name: inputName,
                        isInteractive: false,
                    },
                },
            ],
        })

        assert.doesThrow(() =>
            listAssert.inputIsInteractive(this.vc, id, inputName)
        )
        listAssert.inputIsNotInteractive(this.vc, id, inputName)
    }

    @test()
    protected static async canAssertInputIsInteractive() {
        const id = generateId()
        const inputName = generateId()

        this.addRow({
            id,
            cells: [
                {
                    textInput: {
                        name: inputName,
                        isInteractive: true,
                    },
                },
            ],
        })

        assert.doesThrow(() =>
            listAssert.inputIsNotInteractive(this.vc, id, inputName)
        )
        listAssert.inputIsInteractive(this.vc, id, inputName)
        assert.doesThrow(() =>
            listAssert.inputIsInteractive(this.vc, id, generateId())
        )
    }

    @test()
    protected static async canCheckInteractiveOnCellThatIsNotTheFirst() {
        const id = generateId()
        const inputName = generateId()
        const input2Name = generateId()

        this.addRow({
            id,
            cells: [
                {
                    textInput: {
                        name: inputName,
                        isInteractive: true,
                    },
                },
                {
                    textInput: {
                        name: input2Name,
                        isInteractive: false,
                    },
                },
            ],
        })

        listAssert.inputIsNotInteractive(this.vc, id, input2Name)
    }

    @test()
    protected static async canCheckOtherInputTypesForInteractive() {
        const id = generateId()
        const inputName = generateId()
        const inputName2 = generateId()

        this.addRow({
            id,
            cells: [
                {
                    checkboxInput: {
                        name: inputName,
                        isInteractive: true,
                    },
                },
                {
                    dateInput: {
                        name: inputName2,
                        isInteractive: false,
                    },
                },
            ],
        })

        listAssert.inputIsInteractive(this.vc, id, inputName)
        assert.doesThrow(() =>
            listAssert.inputIsNotInteractive(this.vc, id, inputName)
        )
        assert.doesThrow(() =>
            listAssert.inputIsInteractive(this.vc, id, inputName2)
        )
    }

    @test()
    protected static knowsIfButtonIsEnabledOrDisabled() {
        const enabledId = generateId()
        const disabledId = generateId()
        const secondDisabledId = generateId()
        const secondRowId = generateId()
        const secondEnabledId = generateId()

        this.addRow({
            cells: [
                {
                    button: {
                        id: enabledId,
                        isEnabled: true,
                    },
                },
                {
                    button: {
                        id: disabledId,
                        isEnabled: false,
                    },
                },
            ],
        })

        this.addRow({
            id: secondRowId,
            cells: [
                {
                    button: {
                        id: secondDisabledId,
                        isEnabled: false,
                    },
                },
                {
                    button: {
                        id: secondEnabledId,
                    },
                },
            ],
        })

        listAssert.buttonInRowIsEnabled(this.vc, 0, enabledId)
        assert.doesThrow(() =>
            listAssert.buttonInRowIsDisabled(this.vc, 0, enabledId)
        )

        assert.doesThrow(() =>
            listAssert.buttonInRowIsEnabled(this.vc, 0, 'second')
        )
        listAssert.buttonInRowIsDisabled(this.vc, 0, disabledId)

        assert.doesThrow(() =>
            listAssert.buttonInRowIsEnabled(
                this.vc,
                secondRowId,
                secondDisabledId
            )
        )

        listAssert.buttonInRowIsDisabled(this.vc, secondRowId, secondDisabledId)

        listAssert.buttonInRowIsEnabled(this.vc, secondRowId, secondEnabledId)

        assert.doesThrow(() =>
            listAssert.buttonInRowIsDisabled(
                this.vc,
                secondRowId,
                secondEnabledId
            )
        )
    }

    @test()
    protected static async buttonInRowIsDisabledThrowsWithBadRowsAndButtonIds() {
        const rowId = generateId()
        const buttonId = generateId()

        this.addRow({
            id: rowId,
            cells: [
                {
                    button: {
                        id: 'first',
                        isEnabled: false,
                    },
                },
            ],
        })

        assert.doesThrow(() =>
            listAssert.buttonInRowIsDisabled(this.vc, generateId(), buttonId)
        )

        assert.doesThrow(() =>
            listAssert.buttonInRowIsDisabled(this.vc, rowId, generateId())
        )
    }

    @test()
    protected static async canAssertButtonWithIdWithoutPassingId() {
        this.addRow({
            id: 'test',
            cells: [
                {
                    button: {
                        id: generateId(),
                        label: 'hey',
                    },
                },
            ],
        })

        listAssert.rowRendersButton(this.vc, 'test')
    }

    private static assertAssertingInputThrows(msg: string) {
        assert.doesThrow(
            () => listAssert.rowRendersInput(this.vc, 0, 'name'),
            msg
        )
        listAssert.rowDoesNotRenderInput(this.vc, 0, 'name')
    }

    private static assertRowStyle(row: number | string, style: RowStyle) {
        vcAssert.assertRowIsStyle(this.vc, row, style)
    }

    private static getRow(row: number | string) {
        return this.vc.getRowVc(row)
    }

    private static enableRow(row: number | string) {
        this.vc.getRowVc(row).setIsEnabled(true)
    }

    private static assertRowIsEnabled(row: string | number) {
        vcAssert.assertRowIsEnabled(this.vc, row)
        assert.doesThrow(() => vcAssert.assertRowIsDisabled(this.vc, 'first'))
    }

    private static assertRowIsDisabled(row: string | number) {
        assert.doesThrow(() => vcAssert.assertRowIsEnabled(this.vc, row))
        vcAssert.assertRowIsDisabled(this.vc, row)
    }

    private static addRow(view: Partial<ListRow>) {
        this.vc.addRow({ cells: [], id: generateId(), ...view })
    }

    protected static Vc(listIds: string[]): ListCard {
        //@ts-ignore
        return this.Controller('listVc', { listIds })
    }
}
