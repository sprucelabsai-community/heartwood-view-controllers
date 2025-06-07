import { buildSchema, validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import skillViewSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/skillView.schema'
import buildForm from '../../../builders/buildForm'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    LineIcon,
    SkillViewController,
    ConfirmOptions,
    SkillView,
    ListCell,
    ListRow,
    CriticalError,
    Card,
    TriggerRenderHandler,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import FormViewController from '../../../viewControllers/form/Form.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

class CardVc extends AbstractViewController<Card> {
    public isBusy = false
    public render(): Card {
        return {
            body: {
                isBusy: this.isBusy,
            },
        }
    }
}

class BadSkillViewController extends AbstractSkillViewController {
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public triggerRender() {}

    public render() {
        return {
            layouts: [],
        }
    }
}

class GoodSkillViewController implements SkillViewController {
    private model!: SkillView
    private isLoginRequired = false

    public constructor(model: SkillView) {
        this.model = model

        //@ts-ignore
        this.isLoginRequired = model.isLoginRequired
    }

    public async getIsLoginRequired() {
        return this.isLoginRequired
    }

    public async load() {}
    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public renderToolBelt() {
        return null
    }

    public render() {
        return this.model
    }
}

class GoodWithDialogSkillViewController extends AbstractSkillViewController {
    private model!: SkillView

    public constructor(model: any) {
        super(model)
        this.model = model
    }

    public async load() {
        this.renderInDialog({})
    }

    public render() {
        return this.model
    }
}

let alertMessage1 = generateId()
let alertMessage2 = generateId()

class GoodWithAlertSkillViewController extends AbstractSkillViewController {
    public afterAlert = false

    public constructor(model: any) {
        super(model)
    }

    public async showAlert() {
        alertMessage1 = generateId()
        await this.alert({ message: alertMessage1 })
        this.afterAlert = true
    }

    public async showAlert2() {
        alertMessage2 = generateId()
        await this.alert({ message: alertMessage2 })
        this.afterAlert = true
    }

    public async load() {}

    public render() {
        return {
            layouts: [],
        }
    }
}

class GoodWithConfirm extends AbstractSkillViewController {
    public confirmResults?: boolean

    public constructor(model: any) {
        super(model)
    }

    public async showConfirm(options: ConfirmOptions = {}) {
        const results = await this.confirm(options)
        this.confirmResults = results
    }

    public render() {
        return {
            layouts: [],
        }
    }
}

class GoodWithDialogThatWaitsSkillViewController extends AbstractSkillViewController {
    private model!: SkillView

    public constructor(model: any) {
        super(model)
        this.model = model as SkillView
    }

    public async load() {
        await new Promise((resolve) => setTimeout(resolve, 100))

        await this.renderInDialog({}).wait()
    }

    public render() {
        return this.model
    }
}

class NewTestingCardViewController extends CardViewController {}

@suite()
export default class VcAssertTest extends AbstractViewControllerTest {
    protected controllerMap = {
        bad: BadSkillViewController,
        good: GoodSkillViewController,
        goodWithDialog: GoodWithDialogSkillViewController,
        goodWithAlert: GoodWithAlertSkillViewController,
        goodWithDialogThatWaits: GoodWithDialogThatWaitsSkillViewController,
        newCard: NewTestingCardViewController,
        goodWithConfirm: GoodWithConfirm,
        cardVc: CardVc,
    }

    @test()
    protected knowsIfNotRenderingCard() {
        assert.isFunction(vcAssert.assertSkillViewRendersCard)
        const vc = this.BadController()

        assert.doesThrow(() => vcAssert.assertSkillViewRendersCard(vc))
        assert.doesThrow(() => vcAssert.assertSkillViewRendersCards(vc))
    }

    @test()
    protected canAssertNumberOfCards() {
        const vc = this.BadController()

        let cardVcs = vcAssert.assertSkillViewRendersCards(vc, 0)
        assert.isLength(cardVcs, 0)

        const goodVc = this.GoodController({
            layouts: [
                {
                    cards: [
                        {
                            header: { title: 'hey!' },
                        },
                    ],
                },
            ],
        })

        assert.doesThrow(() => vcAssert.assertSkillViewRendersCards(goodVc, 0))

        cardVcs = vcAssert.assertSkillViewRendersCards(goodVc, 1)
        assert.isLength(cardVcs, 1)

        cardVcs = vcAssert.assertSkillViewRendersCards(goodVc)
        assert.isLength(cardVcs, 1)
    }

    @test()
    protected maintainsCardVcsInRendersCard() {
        const cardVc = this.Controller('card', {
            header: { title: 'test' },
        })

        const goodVc = this.GoodController({
            layouts: [
                {
                    cards: [cardVc.render()],
                },
            ],
        })

        const matchVc = vcAssert.assertSkillViewRendersCard(goodVc)

        assert.isEqual(matchVc, cardVc)
    }

    @test()
    protected maintainsCardVcsInRendersCards() {
        const cardVc = this.Controller('card', {
            header: { title: 'test' },
        })

        const goodVc = this.GoodController({
            layouts: [
                {
                    cards: [cardVc.render()],
                },
            ],
        })

        const cardVcs = vcAssert.assertSkillViewRendersCards(goodVc, 1)

        assert.isEqual(cardVcs[0], cardVc)
    }

    @test()
    protected async knowsIfCardInFirstLayout() {
        const vc = this.GoodController({
            layouts: [
                {
                    cards: [
                        {
                            header: {
                                title: 'go!',
                            },
                        },
                    ],
                },
            ],
        })

        const cardVc = vcAssert.assertSkillViewRendersCard(vc)

        assert.isEqual(cardVc.getHeaderTitle(), 'go!')
    }

    @test()
    protected async knowsIfCardInSecondLayout() {
        const vc = this.GoodController({
            layouts: [
                {},
                {
                    cards: [
                        {
                            header: {
                                title: 'go2!',
                            },
                        },
                    ],
                },
            ],
        })

        const cardVc = vcAssert.assertSkillViewRendersCard(vc)

        assert.isEqual(cardVc.getHeaderTitle(), 'go2!')
    }

    @test()
    protected knowsIfCardRendersById() {
        const id = `${new Date().getTime()}`
        const id2 = `${new Date().getTime() * Math.random()}`

        const vc = this.GoodController({
            layouts: [
                {},
                {
                    cards: [
                        {
                            id,
                            header: {
                                title: 'go2!',
                            },
                        },
                    ],
                },
                {
                    cards: [
                        {},
                        {
                            id: id2,
                            header: {
                                title: 'go!',
                            },
                        },
                    ],
                },
            ],
        })

        assert.doesThrow(() =>
            vcAssert.assertSkillViewRendersCard(vc, 'not-found')
        )

        vcAssert.assertSkillViewDoesNotRenderCard(vc, 'not-found')

        assert.doesThrow(() =>
            vcAssert.assertSkillViewRendersCards(vc, [id2, 'not-found'])
        )

        vcAssert.assertSkillViewDoesNotRenderCards(vc, [
            generateId(),
            'not-found',
        ])
        vcAssert.assertSkillViewDoesNotRenderCards(vc, [
            'not-found',
            generateId(),
            'not-found',
        ])

        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderCards(vc, [generateId(), id2])
        )

        vcAssert.assertSkillViewRendersCard(vc, id)

        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderCard(vc, id)
        )

        vcAssert.assertSkillViewRendersCard(vc, id2)

        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderCard(vc, id2)
        )

        vcAssert.assertSkillViewRendersCards(vc, [id2, id])

        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderCards(vc, [id2, id])
        )
    }

    @test()
    protected assertingIfCardBodyIsBusy() {
        const vc = this.Controller('card', {
            body: {},
        })

        const cardVc = this.Controller('cardVc', {})

        assert.doesThrow(() => vcAssert.assertCardIsBusy(vc))
        assert.doesThrow(() => vcAssert.assertCardIsBusy(cardVc))
        vcAssert.assertCardIsNotBusy(vc)
        vcAssert.assertCardIsNotBusy(cardVc)

        vc.setIsBusy(true)
        cardVc.isBusy = true

        vcAssert.assertCardIsBusy(vc)
        vcAssert.assertCardIsBusy(cardVc)
        assert.doesThrow(() => vcAssert.assertCardIsNotBusy(vc))
        assert.doesThrow(() => vcAssert.assertCardIsNotBusy(cardVc))
    }

    @test('fails with empty cells', [])
    @test('fails with cells that dont match', [
        {
            text: {
                content: 'hey',
            },
        },
    ])
    protected throwsIfRowDoesNotRenderContent(cells: ListCell[]) {
        const vc = this.Controller('list', {
            rows: [
                {
                    id: 'main',
                    cells,
                },
            ],
        })

        assert.isFunction(vcAssert.assertRowRendersContent)

        assert.doesThrow(() =>
            vcAssert.assertRowRendersContent(vc, 'main', 'waka')
        )
        vcAssert.assertRowDoesNotRenderContent(vc, 'main', 'waka')

        assert.doesThrow(() =>
            vcAssert.assertRowRendersContent(vc, 'main', 'undefined')
        )
    }

    @test(
        'knows if renders text content 1',
        { cells: [{ text: { content: 'waka' } }] },
        'waka'
    )
    @test(
        'knows if renders text content 2',
        { cells: [{ text: { content: `dingy` } }] },
        'dingy'
    )
    @test(
        'knows if renders text content 3',
        {
            cells: [
                { text: { content: `dingy` }, subText: { content: 'thingy' } },
            ],
        },
        'thingy'
    )
    @test(
        'knows if renders text content by partial match',
        { cells: [{ text: { content: `dingy the thingy` } }] },
        'dingy'
    )
    @test(
        'knows if renders text html by partial match',
        { cells: [{ text: { html: `dingy the thingy` } }] },
        'dingy'
    )
    @test(
        'knows if renders subText content',
        { cells: [{ subText: { content: `dingy` } }] },
        'dingy'
    )
    @test(
        'knows if renders subText html',
        { cells: [{ subText: { html: `dingy` } }] },
        'dingy'
    )
    @test(
        'knows if renders text content in cell 2',
        {
            cells: [
                { text: { content: 'taco' } },
                { text: { content: 'waka' } },
            ],
        },
        'waka'
    )
    @test(
        'knows if renders button label',
        { cells: [{ button: { label: 'waka' } }] },
        'waka'
    )
    @test(
        'knows if renders button label ignoring case',
        { cells: [{ button: { label: 'Waka' } }] },
        'waka'
    )
    @test(
        'knows if renders button label ignoring case 2',
        { cells: [{ button: { label: 'Waka' } }] },
        'Waka'
    )
    protected knowsIfRowRendersContent(row: ListRow, search: string) {
        const id = generateId()
        const vc = this.Controller('list', {
            rows: [{ ...row, id }],
        })

        vcAssert.assertRowRendersContent(vc, id, search)
        assert.doesThrow(() =>
            vcAssert.assertRowDoesNotRenderContent(vc, id, search)
        )
    }

    @test()
    protected knowsIfSkillViewDoesNotRenderViewController() {
        const model: SkillView = {
            layouts: [{}],
        }

        const vc = this.Controller('good', model)
        validateSchemaValues(skillViewSchema, this.render(vc))

        assert.doesThrow(() =>
            vcAssert.assertSkillViewRendersViewController(
                vc,
                FormViewController
            )
        )
    }

    @test('knows if form rendered in first layout, first card, first section', {
        VcClass: FormViewController,
        layoutIdx: 0,
        cardIdx: 0,
        sectionIdx: 0,
        bodyGenerator: (test: VcAssertTest) => ({
            form: test.renderEmptyForm(),
        }),
    })
    @test(
        'knows if form rendered in random layout, first card, first section',
        {
            VcClass: FormViewController,
            cardIdx: 0,
            sectionIdx: 0,
            bodyGenerator: (test: VcAssertTest) => ({
                form: test.renderEmptyForm(),
            }),
        }
    )
    @test(
        'knows if form rendered in random layout, random card, first section',
        {
            VcClass: FormViewController,
            bodyGenerator: (test: VcAssertTest) => ({
                form: test.renderEmptyForm(),
            }),
        }
    )
    @test(
        'knows if form rendered in random layout, random card, random section',
        {
            VcClass: FormViewController,
            bodyGenerator: (test: VcAssertTest) => ({
                form: test.renderEmptyForm(),
            }),
        }
    )
    @test('knows if list is rendered', {
        VcClass: ListViewController,
        bodyGenerator: (test: VcAssertTest) => ({
            list: test.renderEmptyList(),
        }),
    })
    @test('knows if list is not rendered', {
        VcClass: ListViewController,
        layoutIdx: 0,
        cardIdx: 0,
        sectionIdx: 0,
        shouldPass: false,
        bodyGenerator: (test: VcAssertTest) => ({
            form: test.renderEmptyForm(),
        }),
    })
    protected knowsIfSkillViewRendersViewController(options: {
        layoutIdx?: number
        cardIdx?: number
        sectionIdx?: number
        shouldPass?: boolean
        bodyGenerator: (
            test: VcAssertTest
        ) => SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
        VcClass: any
    }) {
        const {
            layoutIdx = Math.round(Math.random() * 10),
            cardIdx = Math.round(Math.random() * 10),
            sectionIdx = Math.round(Math.random() * 10),
            shouldPass = true,
            VcClass,
            bodyGenerator,
        } = options

        const bodyModel = { ...bodyGenerator(this) }

        const model: SkillView = {
            layouts: [],
        }

        if (!model.layouts) {
            model.layouts = []
        }

        while (model.layouts.length <= layoutIdx) {
            model.layouts.push({
                cards: [],
            })
        }

        while (model.layouts[layoutIdx].cards!.length <= cardIdx) {
            model.layouts[layoutIdx].cards!.push({
                body: {
                    sections: [],
                },
            })
        }

        while (
            // @ts-ignore
            model.layouts[layoutIdx].cards[cardIdx].body.sections.length <=
            sectionIdx
        ) {
            //@ts-ignore
            model.layouts[layoutIdx].cards[cardIdx].body.sections!.push({})
        }

        //@ts-ignore
        model.layouts[layoutIdx]!.cards[cardIdx].body.sections[sectionIdx] =
            bodyModel

        const vc = this.Controller('good', model)

        if (shouldPass) {
            const match = vcAssert.assertSkillViewRendersViewController(
                vc,
                VcClass
            )
            assert.isTrue(match instanceof VcClass)
        } else {
            assert.doesThrow(() =>
                vcAssert.assertSkillViewRendersViewController(vc, VcClass)
            )
        }
    }

    @test()
    protected knowsIfCardIsOfType() {
        const vc = this.Controller('good', {
            layouts: [
                {
                    cards: [this.Controller('newCard', {}).render()],
                },
            ],
        })

        vcAssert.assertSkillViewRendersViewController(
            vc,
            NewTestingCardViewController
        )

        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderViewController(
                vc,
                NewTestingCardViewController
            )
        )
    }

    @test()
    protected async knowsIfCardIsNotOfType() {
        const vc = this.Controller('good', {
            layouts: [
                {
                    cards: [this.Controller('newCard', {}).render()],
                },
            ],
        })

        await assert.doesThrowAsync(() =>
            vcAssert.assertSkillViewRendersViewController(
                vc,
                ListViewController
            )
        )

        vcAssert.assertSkillViewDoesNotRenderViewController(
            vc,
            ListViewController
        )
    }

    @test()
    protected async knowsIfRenderingDialog() {
        const vc = this.Controller('goodWithDialog', {})

        await vcAssert.assertRendersDialog(vc, () => vc.load())

        await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())
        )
    }

    @test()
    protected async knowsIfNotRenderingDialog() {
        const vc = this.Controller('good', {
            layouts: [],
        })

        await vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())

        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersDialog(vc, () => vc.load())
        )
    }

    @test()
    protected getsDialogById() {
        const card = this.Controller('card', {
            id: 'test-3',
            header: {
                title: 'test',
            },
        })
        const vc = this.Controller('good', {
            layouts: [
                {
                    cards: [
                        {
                            id: 'test-1',
                        },
                    ],
                },
                {
                    cards: [{}, card.render()],
                },
            ],
        })

        assert.doesThrow(() =>
            vcAssert.assertSkillViewRendersCard(vc, 'test-2')
        )

        const actual = vcAssert.assertSkillViewRendersCard(vc, 'test-3')

        assert.isEqual(actual, card)
    }

    @test('throws if not rendering button with icon', {
        rowIdx: 0,
        cellIdx: 0,
        iconToCheck: 'location-pin',
        shouldPass: false,
    })
    @test('knows when rendering button with icon in first row and cell', {
        rowIdx: 0,
        cellIdx: 0,
        icon: 'location-pin',
        iconToCheck: 'location-pin',
        shouldPass: true,
    })
    @test('throws if button does not render proper icon', {
        rowIdx: 0,
        cellIdx: 0,
        icon: 'location-pin',
        iconToCheck: 'taco',
        shouldPass: false,
    })
    @test('knows if button with icon in random row and cell', {
        rowIdx: Math.round(Math.random() * 10),
        cellIdx: Math.round(Math.random() * 10),
        icon: 'close',
        iconToCheck: 'close',
        shouldPass: true,
    })
    protected async knowsIfRowRendersButtonWithIcon(options: {
        rowIdx: number
        cellIdx: number
        icon?: LineIcon
        iconToCheck: LineIcon
        shouldPass?: boolean
    }) {
        let rows: ListRow[] = []

        while (rows.length <= options.rowIdx) {
            const cells: ListCell[] = []

            while (cells.length <= options.cellIdx) {
                cells.push({ text: { content: `empty row` } })
            }

            rows.push({ id: `${new Date().getTime() * Math.random()}`, cells })
        }

        rows[options.rowIdx].cells[options.cellIdx].button = {
            lineIcon: options.icon,
        }

        const listVc = this.Controller('list', {
            rows,
        })

        if (options.shouldPass) {
            vcAssert.assertRowRendersButtonWithIcon(
                listVc.getRowVc(options.rowIdx),
                options.iconToCheck
            )
        } else {
            assert.doesThrow(() =>
                vcAssert.assertRowRendersButtonWithIcon(
                    listVc.getRowVc(options.rowIdx),
                    options.iconToCheck
                )
            )
        }
    }

    @test('can assert rendering forms', 'form')
    @test('can assert rendering bigForms', 'big-form')
    protected knowsHowManyFormsBeingRendered(vcId: 'form' | 'big-form') {
        const cardVc = this.Controller('card', {})
        assert.doesThrow(() => formAssert.cardRendersForms(cardVc, 1))
        assert.doesThrow(() => formAssert.cardRendersForm(cardVc))

        const formVc1 = this.buildEmptyForm(vcId)

        cardVc.addSection({
            title: 'hey!',
            [namesUtil.toCamel(vcId)]: formVc1.render(),
        })

        formAssert.cardRendersForms(cardVc, 1)
        assert.isEqual(formVc1, formAssert.cardRendersForm(cardVc))

        assert.doesThrow(() => formAssert.cardRendersForms(cardVc, 2))

        const formVc = this.buildEmptyForm(vcId)

        cardVc.addSection({
            title: 'hey!',
            [namesUtil.toCamel(vcId)]: formVc.render(),
        })
        const forms = formAssert.cardRendersForms(cardVc, 2)
        assert.isEqual(forms[1], formVc)
    }

    @test()
    protected async assertCardRendersCriticalError() {
        let wasPrimaryHit = false
        let wasSecondaryHit = false

        const cardVc = this.Controller('card', {})
        vcAssert.assertCardDoesNotRenderCriticalError(cardVc)
        assert.doesThrow(() => vcAssert.assertCardRendersCriticalError(cardVc))
        const expected: CriticalError = {
            title: 'Oh my!',
            buttons: [
                {
                    type: 'secondary',
                    onClick: () => {
                        wasSecondaryHit = true
                    },
                },
                {
                    type: 'primary',
                    onClick: () => {
                        wasPrimaryHit = true
                    },
                },
            ],
        }
        cardVc.setCriticalError(expected)

        const actual = vcAssert.assertCardRendersCriticalError(cardVc)
        assert.isEqualDeep(actual, expected)
        assert.doesThrow(() =>
            vcAssert.assertCardDoesNotRenderCriticalError(cardVc)
        )

        await interactor.clickPrimaryInFooter(cardVc)
        await interactor.clickSecondaryInFooter(cardVc)

        assert.isTrue(wasPrimaryHit)
        assert.isTrue(wasSecondaryHit)
    }

    @test()
    protected async assertConfirmHoldsOnConfirmUntilClosed() {
        const vc = this.Controller('goodWithConfirm', {})
        const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
            vc.showConfirm()
        )

        assert.isUndefined(vc.confirmResults)

        await confirmVc.accept()

        assert.isTrue(vc.confirmResults)
    }

    @test()
    protected async assertDoesNotRenderConfirmThrowsIfRendersConfirm() {
        const vc = this.Controller('goodWithConfirm', {})
        await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderConfirm(vc, () => vc.showConfirm())
        )
    }

    @test()
    protected async assertDoesNotRenderConfirm() {
        const vc = this.Controller('goodWithDialogThatWaits', {})
        await vcAssert.assertDoesNotRenderConfirm(vc, () => vc.load())
    }

    @test()
    protected async canDeclineConfirm() {
        const vc = this.Controller('goodWithConfirm', {})
        const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
            vc.showConfirm()
        )

        await confirmVc.decline()

        assert.isFalse(vc.confirmResults)
    }

    @test()
    protected async assertConfirmVcGetsOptions() {
        const options = {
            [`${new Date().getTime()}`]: true,
            hello: 'world',
        }

        const vc = this.Controller('goodWithConfirm', {})
        const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
            vc.showConfirm(options as any)
        )

        assert.isEqualDeep(confirmVc.options, options as any)
    }

    @test()
    protected async knowsWhenNotRenderingCalendar() {
        assert.isFunction(vcAssert.assertSkillViewRendersCalendar)

        const svc = this.Controller('good', {
            layouts: [{}],
        })

        assert.doesThrow(() => vcAssert.assertSkillViewRendersCalendar(svc))
        vcAssert.assertSkillViewDoesNotRenderCalendar(svc)
    }

    @test()
    protected async knowsIfRowRenderingButton() {
        const rowVc = this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            button: {
                                id: 'edit',
                            },
                        },
                    ],
                },
                {
                    id: 'second',
                    cells: [
                        {
                            button: {
                                id: 'delete',
                            },
                        },
                        {
                            button: {
                                id: 'waka',
                            },
                        },
                        {
                            button: {
                                id: 'taco',
                            },
                        },
                    ],
                },
            ],
        })

        assert.doesThrow(() =>
            vcAssert.assertRowRendersButton(rowVc, 'test', 'edit')
        )

        vcAssert.assertRowDoesNotRenderButton(rowVc, 'test', 'edit')

        assert.doesThrow(() =>
            vcAssert.assertRowDoesNotRenderButton(rowVc, 'first', 'edit')
        )

        vcAssert.assertRowDoesNotRenderButton(rowVc, 'apple', '234234')
        vcAssert.assertRowRendersButton(rowVc, 'first', 'edit')

        assert.doesThrow(() =>
            vcAssert.assertRowRendersButton(rowVc, 'test', 'bad')
        )

        vcAssert.assertRowRendersButton(rowVc, 'second', 'delete')
        assert.doesThrow(() =>
            vcAssert.assertRowRendersButton(rowVc, 'second', 'create')
        )
        vcAssert.assertRowRendersButton(rowVc, 'second', 'taco')
        vcAssert.assertRowRendersButton(rowVc, 'second', 'waka')
    }

    @test('knows when rendering in layouts[0] cards[0] sections[0]')
    protected knowsWhenRenderingCalendar() {
        const svc = this.Controller('good', {
            layouts: [
                {
                    cards: [
                        {
                            body: {
                                sections: [
                                    {
                                        calendar: {
                                            people: [],
                                            events: [],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        })

        vcAssert.assertSkillViewRendersCalendar(svc)
        assert.doesThrow(() =>
            vcAssert.assertSkillViewDoesNotRenderCalendar(svc)
        )
    }

    @test()
    protected knowsWhenRenderingCalendarInRandomPlaces() {
        const section = {
            calendar: {
                people: [],
            },
        }
        const card = {
            body: {
                sections: [
                    ...new Array(Math.round(Math.random() * 100)),
                    section,
                ],
            },
        }
        const layout = {
            cards: [...new Array(Math.round(Math.random() * 100)), card],
        }

        const svc = this.Controller('good', {
            layouts: [...new Array(Math.round(Math.random() * 100)), layout],
        })

        vcAssert.assertSkillViewRendersCalendar(svc)
    }

    @test()
    protected knowsIfFieldsBeingRendered() {
        const formVc = this.Controller(
            'form',
            buildForm({
                schema: buildSchema({
                    id: 'test',
                    fields: {
                        one: {
                            type: 'text',
                        },
                        two: {
                            type: 'text',
                        },
                        three: {
                            type: 'text',
                        },
                        four: {
                            type: 'text',
                        },
                        five: {
                            type: 'text',
                        },
                        six: {
                            type: 'text',
                        },
                    },
                }),
                sections: [
                    {
                        fields: ['four', 'five'],
                    },
                    {
                        fields: ['six'],
                    },
                ],
            })
        )

        assert.doesThrow(() =>
            formAssert.formRendersFields(formVc, ['one', 'two', 'three'])
        )

        formAssert.formRendersFields(formVc, ['four'])
        formAssert.formRendersFields(formVc, ['four', 'five'])
        formAssert.formRendersFields(formVc, ['four', 'five', 'six'])
    }

    @test()
    protected async knowsIfRenderingDialogThatWaits() {
        const vc = this.Controller('goodWithDialogThatWaits', {})

        await vcAssert.assertRendersDialog(vc, () => vc.load())

        await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())
        )
    }

    @test()
    protected async knowsIfCardFooterIsRenderingButtons() {
        const assertDoesNotRenderButton = (vc: any, id: any) => {
            assert.doesThrow(() => vcAssert.assertCardRendersButton(vc, id))
            vcAssert.assertCardDoesNotRenderButton(vc, id)
        }

        const assertRendersButton = (vc: any, id: any) => {
            assert.doesThrow(() =>
                vcAssert.assertCardDoesNotRenderButton(vc, id)
            )
            vcAssert.assertCardRendersButton(vc, id)
        }

        const assertCardRendersButtons = (vc: any, id: any) => {
            assert.doesThrow(() =>
                vcAssert.assertCardDoesNotRenderButtons(vc, id)
            )
            vcAssert.assertCardRendersButtons(vc, id)
        }

        const assertDoesNotRenderButtons = (vc: any, id: any) => {
            assert.doesThrow(() => vcAssert.assertCardRendersButtons(vc, id))
            vcAssert.assertCardDoesNotRenderButtons(vc, id)
        }

        const vc = this.Controller('card', {})
        const emptyButtonsVc = this.Controller('card', {
            footer: {
                buttons: [],
            },
        })

        assert.doesThrow(() => vcAssert.assertFooterRendersButtonWithType(vc))
        assert.doesThrow(() =>
            vcAssert.assertFooterRendersButtonWithType(emptyButtonsVc)
        )

        assertDoesNotRenderButtons(emptyButtonsVc, ['button-one'])
        assertDoesNotRenderButton(emptyButtonsVc, 'button-one')

        const button1Id = `${Math.random()}`
        const button2Id = `${Math.random()}`

        const vc2 = this.Controller('card', {
            footer: {
                buttons: [
                    {
                        label: 'hey!',
                        id: button1Id,
                    },
                    {
                        label: 'go',
                        type: 'destructive',
                        id: button2Id,
                    },
                ],
            },
        })

        vcAssert.assertFooterRendersButtonWithType(vc2)

        assertCardRendersButtons(vc2, [button1Id])
        assertCardRendersButtons(vc2, [button2Id])
        assertCardRendersButtons(vc2, [button1Id, button2Id])
        assertCardRendersButtons(vc2, [button2Id, button1Id])

        assertRendersButton(vc2, button1Id)
        assertRendersButton(vc2, button2Id)

        assert.doesThrow(() =>
            vcAssert.assertFooterRendersButtonWithType(vc2, 'primary')
        )

        assert.doesThrow(() =>
            vcAssert.assertCardRendersButtons(vc2, [button1Id, 'bad-id'])
        )

        assertDoesNotRenderButton(vc2, 'button-one')

        vcAssert.assertFooterRendersButtonWithType(vc2, 'destructive')
    }

    @test('knows if rendering button as first section in body', [])
    @test('knows if rendering button as second section in body', [{}, {}])
    protected knowsIfRenderingButtonsInBody(emptySections: any[] = []) {
        const button1Id = `${Math.random()}`
        const button2Id = `${Math.random()}`
        const button3Id = `${Math.random()}`
        const button4Id = `${Math.random()}`

        const vc = this.Controller('card', {
            body: {
                sections: [
                    ...emptySections,
                    {
                        buttons: [
                            {
                                label: 'hey!',
                                id: button1Id,
                            },
                            {
                                label: 'go',
                                type: 'destructive',
                                id: button2Id,
                            },
                        ],
                    },
                ],
            },
            footer: {
                buttons: [
                    {
                        label: 'hey!',
                        id: button3Id,
                    },
                    {
                        label: 'go',
                        type: 'destructive',
                        id: button4Id,
                    },
                ],
            },
        })

        vcAssert.assertCardRendersButton(vc, button1Id)
        vcAssert.assertCardRendersButtons(vc, [button3Id, button4Id, button1Id])
        vcAssert.assertCardRendersButton(vc, button4Id)
        vcAssert.assertCardRendersButtons(vc, [button3Id, button4Id])
        vcAssert.assertCardRendersButton(vc, button4Id)
    }

    @test()
    protected async knowsIfRenderingAlert() {
        const vc = this.Controller('goodWithAlert', {})
        const vc2 = this.Controller('goodWithDialog', {})

        await this.assertAlerts(vc, vc2)
    }

    @test()
    protected async patchingAlertsToThrowDoesntAffectAlertAssertionBehavior() {
        const vc = this.Controller('goodWithAlert', {})
        const vc2 = this.Controller('goodWithDialog', {})

        vcAssert.patchAlertToThrow(vc)
        vcAssert.patchAlertToThrow(vc2)

        await assert.doesThrowAsync(() => vc.showAlert())

        await this.assertAlerts(vc, vc2)
    }

    @test()
    protected async knowsIfNotRenderingTalkingSprucebot() {
        assert.isFunction(vcAssert.assertCardRendersTalkingSprucebot)
        assert.isFunction(vcAssert.assertCardDoesNotRenderTalkingSprucebot)

        const vc = this.Controller('card', {})

        assert.doesThrow(() => vcAssert.assertCardRendersTalkingSprucebot(vc))
        vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc)
    }

    @test()
    protected async knowsIfRenderingTalkingSprucebot() {
        const expected = this.Controller('talking-sprucebot', {
            sentences: [
                {
                    words: 'hey',
                },
            ],
        })
        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        talkingSprucebot: expected.render(),
                    },
                ],
            },
        })

        assert.doesThrow(() =>
            vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc)
        )
        const actual = vcAssert.assertCardRendersTalkingSprucebot(vc)

        assert.isEqual(actual, expected)

        const vc2 = this.Controller('card', {
            body: {
                sections: [
                    {},
                    {},
                    {
                        talkingSprucebot: expected.render(),
                    },
                ],
            },
        })

        vcAssert.assertCardRendersTalkingSprucebot(vc2)
    }

    @test()
    protected knowsIfRowsWithIdRender() {
        const newId = `${new Date().getTime()}`
        const list1 = this.Controller('list', {
            rows: [
                {
                    id: 'good-one',
                    cells: [],
                },
                {
                    id: newId,
                    cells: [],
                },
            ],
        })

        assert.doesThrow(() =>
            vcAssert.assertListRendersRow(list1, 'not-found-' + newId)
        )

        assert.doesThrow(() =>
            vcAssert.assertListRendersRows(list1, ['not-found-' + newId])
        )

        assert.doesThrow(() =>
            vcAssert.assertListDoesNotRenderRow(list1, newId)
        )

        assert.doesThrow(() =>
            vcAssert.assertListRendersRows(list1, ['not-found-' + newId, newId])
        )

        vcAssert.assertListDoesNotRenderRow(list1, 'not-found-' + newId)
        vcAssert.assertListRendersRow(list1, 'good-one')
        vcAssert.assertListRendersRow(list1, newId)
        vcAssert.assertListRendersRows(list1, ['good-one'])
        vcAssert.assertListRendersRows(list1, ['good-one', newId])
    }

    @test()
    protected knowsIfRenderingFullScreen() {
        const vc = this.Controller('good', {
            isFullScreen: false,
            layouts: [],
        })
        assert.doesThrow(() => vcAssert.assertIsFullScreen(vc))
        vcAssert.assertIsNotFullScreen(vc)

        const vcIsFullScreen = this.Controller('good', {
            isFullScreen: true,
            layouts: [],
        })

        vcAssert.assertIsFullScreen(vcIsFullScreen)
        assert.doesThrow(() => vcAssert.assertIsNotFullScreen(vcIsFullScreen))
    }

    @test()
    protected async knowsIfRequiresLogin() {
        const vc = this.Controller('good', {
            isLoginRequired: false,
            layouts: [],
        })

        await assert.doesThrowAsync(() => vcAssert.assertLoginIsRequired(vc))
        await vcAssert.assertLoginIsNotRequired(vc)

        const vcRequiresLogin = this.Controller('good', {
            isLoginRequired: true,
            layouts: [],
        })

        await vcAssert.assertLoginIsRequired(vcRequiresLogin)
        await assert.doesThrowAsync(() =>
            vcAssert.assertLoginIsNotRequired(vcRequiresLogin)
        )
    }

    private BadController() {
        return this.Controller('bad', {}) as BadSkillViewController
    }

    private GoodController(model: SkillView) {
        return this.Controller('good', model) as GoodSkillViewController
    }

    private renderEmptyForm(vcId: 'form' | 'big-form' = 'form') {
        return this.buildEmptyForm(vcId).render()
    }

    private buildEmptyForm(vcId: 'form' | 'big-form' = 'form') {
        return this.Controller(vcId, {
            schema: {
                fields: {},
            },
            sections: [],
        })
    }

    private renderEmptyList() {
        return this.Controller('list', {
            rows: [],
        }).render()
    }

    private async assertAlerts(
        vc: GoodWithAlertSkillViewController,
        vc2: GoodWithDialogSkillViewController
    ) {
        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersAlert(vc, () => vc.load())
        )

        await vcAssert.assertDoesNotRenderAlert(vc, () => vc.load())

        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersAlert(vc2, () => vc2.load())
        )

        const alertVc = await vcAssert.assertRendersAlert(vc, () =>
            vc.showAlert()
        )

        const msg = await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderAlert(vc, () => vc.showAlert())
        )

        assert.doesInclude(msg.message, alertMessage1)

        const msg2 = await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderAlert(vc, () => vc.showAlert2())
        )

        assert.doesInclude(msg2.message, alertMessage2)

        assert.isFalse(vc.afterAlert)

        await alertVc.hide()

        await this.wait(0)

        assert.isTrue(vc.afterAlert)
    }
}

declare module '../../../types/heartwood.types' {
    interface ViewControllerMap {
        good: GoodSkillViewController
        bad: BadSkillViewController
        newCard: NewTestingCardViewController
        goodWithDialog: GoodWithDialogSkillViewController
        goodWithAlert: GoodWithAlertSkillViewController
        goodWithDialogThatWaits: GoodWithDialogThatWaitsSkillViewController
        goodWithConfirm: GoodWithConfirm
        cardVc: CardVc
    }
    interface ViewControllerOptionsMap {
        good: SkillView & { isLoginRequired?: boolean }
        bad: any
    }
}
