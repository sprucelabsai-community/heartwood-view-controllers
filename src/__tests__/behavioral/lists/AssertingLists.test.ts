import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
    assert,
    generateId,
    test,
    suite,
    errorAssert,
} from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    FormSection,
    ListRow,
    RowStyle,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import ListViewController from '../../../viewControllers/list/List.vc'
import { TestFormSchema, testFormSchema } from '../forms/testFormOptions'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class ListCard extends AbstractViewController<Card> {
    public cardVc!: CardViewController
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

    public dropInFormWithList(
        options: DropInFormOptions,
        type: 'form' | 'big-form' = 'form'
    ) {
        const formSections = this.buildFormSections(options)

        const formVc = this.Controller(
            type,
            buildForm({
                schema: testFormSchema,
                sections: formSections,
            })
        )

        const { sectionIdx } = options
        const cardSections = Array.from({ length: sectionIdx + 1 }, () => ({}))
        cardSections[sectionIdx] = {
            [namesUtil.toCamel(type)]: formVc.render(),
        }

        this.cardVc.setSections(cardSections)
    }

    private buildFormSections(options: {
        sectionIdx: number
        formSectionIdx: number
        listVc?: ListViewController
    }) {
        const { sectionIdx, formSectionIdx, listVc } = options

        const formSections: FormSection<TestFormSchema>[] = Array.from(
            { length: sectionIdx + 1 },
            (_, idx) => ({
                title: `Section ${idx}`,
            })
        )

        formSections[formSectionIdx] = {
            list: listVc?.render(),
        }

        return formSections
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return this.cardVc.render()
    }
}

@suite()
export default class AssertingListsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        listVc: ListCard,
    }
    private vc!: ListViewController
    private listId!: string

    protected async beforeEach() {
        await super.beforeEach()
        this.listId = generateId()
        this.vc = this.Controller('list', {
            id: this.listId,
        })
    }

    @test()
    protected throwsIfCantFindListWithId() {
        assert.doesThrow(() =>
            vcAssert.assertCardRendersList(this.Vc(['waka']), 'not-found')
        )

        vcAssert.assertCardDoesNotRenderList(this.Vc(['waka']), 'not-found')
    }

    @test()
    protected findsOneById() {
        vcAssert.assertCardRendersList(this.Vc(['not-found']), 'not-found')
        assert.doesThrow(() =>
            vcAssert.assertCardDoesNotRenderList(
                this.Vc(['not-found']),
                'not-found'
            )
        )
    }

    @test()
    protected findsByIdIfNotFirstSection() {
        vcAssert.assertCardRendersList(
            this.Vc(['yes', 'no', 'not-found-2']),
            'not-found-2'
        )
    }

    @test()
    protected canTellIfRowIsEnabled() {
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
    protected settingEnabledTriggersRender() {
        this.addRow({
            id: 'first',
        })

        const rowVc = this.getRow(0)

        vcAssert.attachTriggerRenderCounter(rowVc)
        rowVc.setIsEnabled(true)
        vcAssert.assertTriggerRenderCount(rowVc, 1)
    }

    @test()
    protected canAssertRowStyle() {
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
    protected assertsHasInput() {
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
    protected async canAssertInputIsNotInteractive() {
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
    protected async canAssertInputIsInteractive() {
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
    protected async canCheckInteractiveOnCellThatIsNotTheFirst() {
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
    protected async canCheckOtherInputTypesForInteractive() {
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
    protected knowsIfButtonIsEnabledOrDisabled() {
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
    protected async buttonInRowIsDisabledThrowsWithBadRowsAndButtonIds() {
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
    protected async canAssertButtonWithIdWithoutPassingId() {
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

    @test('can find list in section[0] formSection[0]', 0, 0)
    @test('can find list in section[0] formSection[1]', 0, 1)
    @test('can find list in section[1] formSection[0]', 1, 0)
    protected canAssertIfListRenderedInFormSection(
        sectionIdx: number,
        formSectionIdx: number
    ) {
        const vc = this.Vc([])
        vc.dropInFormWithList({
            sectionIdx,
            formSectionIdx,
            listVc: this.vc,
        })

        const match = listAssert.cardRendersList(vc)
        assert.isEqual(match, this.vc)
        assert.doesThrow(() => listAssert.cardDoesNotRenderList(vc))
    }

    @test()
    protected async assertCardRendersListThrowsIfListInFormDoesNotMatchId() {
        const vc = this.Vc([])
        vc.dropInFormWithList({
            sectionIdx: 0,
            formSectionIdx: 0,
            listVc: this.vc,
        })

        assert.doesThrow(() => listAssert.cardRendersList(vc, generateId()))
        listAssert.cardDoesNotRenderList(vc, generateId())
    }

    @test()
    protected async canMatchListInFormWithId() {
        const vc = this.Vc([])
        vc.dropInFormWithList({
            sectionIdx: 0,
            formSectionIdx: 0,
            listVc: this.vc,
        })

        listAssert.cardRendersList(vc, this.listId)
        assert.doesThrow(() =>
            listAssert.cardDoesNotRenderList(vc, this.listId)
        )
    }

    @test('can match list in second section of form', 'form')
    @test('can match list in second section of big form', 'big-form')
    protected async canMatchListInSecondSectionOfSecondForm(
        type: 'form' | 'big-form'
    ) {
        const vc = this.Vc([])
        vc.dropInFormWithList(
            {
                sectionIdx: 1,
                formSectionIdx: 1,
                listVc: this.vc,
            },
            type
        )

        listAssert.cardRendersList(vc, this.listId)
        assert.doesThrow(() =>
            listAssert.cardDoesNotRenderList(vc, this.listId)
        )
    }

    @test()
    protected async canFindListInTheSecondForm() {
        const vc = this.Vc([])

        vc.dropInFormWithList({
            sectionIdx: 0,
            formSectionIdx: 1,
        })

        const formVc = this.Controller(
            'form',
            buildForm({
                schema: testFormSchema,
                sections: [
                    {
                        list: this.vc.render(),
                    },
                ],
            })
        )

        vc.cardVc.addSection({
            form: formVc.render(),
        })

        listAssert.cardRendersList(vc, this.listId)
    }

    @test()
    protected async throwsIfNoControllerOnListInCard() {
        const cardVc = this.CardVc()

        assert.doesThrow(() => listAssert.cardRendersList(cardVc, this.listId))
    }

    @test()
    protected async throwIfValueEqualsIsMissingParams() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => listAssert.valueEquals())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'row', 'name', 'value'],
        })
    }

    @test()
    protected async canAssertIfValueEquals() {
        const { rowId, name, value } = this.addRowWithValues()

        listAssert.valueEquals({ listVc: this.vc, row: rowId, name, value })
    }

    @test()
    protected async throwsIfValueDoesNotEqual() {
        const { rowId, name } = this.addRowWithValues()
        assert.doesThrow(
            () =>
                listAssert.valueEquals({
                    listVc: this.vc,
                    row: rowId,
                    name,
                    value: generateId(),
                }),
            `The value of '${name}' in row '${rowId}' does not equal the expected value.`
        )
    }

    @test()
    protected async throwsIfValueDoesNotEqualIsMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            listAssert.valueDoesNotEqual()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'row', 'name', 'value'],
        })
    }

    @test()
    protected async canAssertIfValueDoesNotEqual() {
        const { rowId, name } = this.addRowWithValues()
        listAssert.valueDoesNotEqual({
            listVc: this.vc,
            row: rowId,
            name,
            value: generateId(),
        })
    }

    @test()
    protected async throwsIfValueEqualsWhenItShouldNot() {
        const { rowId, name, value } = this.addRowWithValues()

        assert.doesThrow(
            () =>
                listAssert.valueDoesNotEqual({
                    listVc: this.vc,
                    row: rowId,
                    name,
                    value,
                }),
            `The value of '${name}' in row '${rowId}' equals the expected value when it should not.`
        )
    }

    private CardVc() {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        list: {
                            id: this.listId,
                            rows: [],
                        },
                    },
                ],
            },
        })
    }

    private addRowWithValues() {
        const rowId = generateId()
        const name = generateId()
        const value = generateId()
        this.addRow({
            id: rowId,
            cells: [
                {
                    textInput: {
                        name,
                        value,
                    },
                },
            ],
        })
        return { rowId, name, value }
    }

    private assertAssertingInputThrows(msg: string) {
        assert.doesThrow(
            () => listAssert.rowRendersInput(this.vc, 0, 'name'),
            msg
        )
        listAssert.rowDoesNotRenderInput(this.vc, 0, 'name')
    }

    private assertRowStyle(row: number | string, style: RowStyle) {
        listAssert.rowIsStyle(this.vc, row, style)
    }

    private getRow(row: number | string) {
        return this.vc.getRowVc(row)
    }

    private enableRow(row: number | string) {
        this.vc.getRowVc(row).setIsEnabled(true)
    }

    private assertRowIsEnabled(row: string | number) {
        vcAssert.assertRowIsEnabled(this.vc, row)
        assert.doesThrow(() => vcAssert.assertRowIsDisabled(this.vc, 'first'))
    }

    private assertRowIsDisabled(row: string | number) {
        assert.doesThrow(() => vcAssert.assertRowIsEnabled(this.vc, row))
        vcAssert.assertRowIsDisabled(this.vc, row)
    }

    private addRow(view: Partial<ListRow>) {
        this.vc.addRow({ cells: [], id: generateId(), ...view })
    }

    protected Vc(listIds: string[]): ListCard {
        //@ts-ignore
        return this.Controller('listVc', { listIds })
    }
}

interface DropInFormOptions {
    sectionIdx: number
    formSectionIdx: number
    listVc?: ListViewController
}
