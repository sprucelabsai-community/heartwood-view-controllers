/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { buildSchema, validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import skillViewSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/skillView.schema'
import { AbstractViewController } from '../../..'
import buildForm from '../../../builders/buildForm'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
	LineIcon,
	SkillViewController,
	ConfirmOptions,
} from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/card/Card.vc'
import FormViewController from '../../../viewControllers/Form.vc'
import ListViewController, {
	ListRowModel,
} from '../../../viewControllers/list/List.vc'
import { ListCellModel } from '../../../viewControllers/list/ListCell.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

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

class BadSkillViewController {
	public render() {
		return {}
	}
}

class GoodSkillViewController implements SkillViewController {
	private model: SkillView
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

	public renderToolBelt() {
		return null
	}

	public render() {
		return this.model
	}
}

class GoodWithDialogSkillViewController extends AbstractSkillViewController {
	private model: SkillView

	//@ts-ignore
	public constructor(model: SkillView) {
		//@ts-ignore
		super(model)
		this.model = model
	}

	public async load() {
		//@ts-ignore
		this.renderInDialog({})
	}

	public render() {
		return this.model
	}
}

class GoodWithAlertSkillViewController extends AbstractSkillViewController {
	public afterAlert = false

	//@ts-ignore
	public constructor(model: any) {
		//@ts-ignore
		super(model)
	}

	public async showAlert() {
		await this.alert({ message: 'go team!' })
		this.afterAlert = true
	}

	public async showAlert2() {
		await this.alert({ message: 'moar team' })
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

	//@ts-ignore
	public constructor(model: any) {
		//@ts-ignore
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
	private model: SkillView

	//@ts-ignore
	public constructor(model: SkillView) {
		//@ts-ignore
		super(model)
		this.model = model
	}

	public async load() {
		await new Promise((resolve) => setTimeout(resolve, 100))
		//@ts-ignore
		await this.renderInDialog({}).wait()
	}

	public render() {
		return this.model
	}
}

class NewTestingCardViewController extends CardViewController {}

export default class VcAssertTest extends AbstractViewControllerTest {
	protected static controllerMap = {
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
	protected static knowsIfNotRenderingCard() {
		assert.isFunction(vcAssert.assertSkillViewRendersCard)
		const vc = this.BadController()
		//@ts-ignore
		assert.doesThrow(() => vcAssert.assertSkillViewRendersCard(vc))
		//@ts-ignore
		assert.doesThrow(() => vcAssert.assertSkillViewRendersCards(vc))
	}

	@test()
	protected static canAssertNumberOfCards() {
		const vc = this.BadController()
		//@ts-ignore
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

		assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewRendersCards(goodVc, 0)
		)

		//@ts-ignore
		cardVcs = vcAssert.assertSkillViewRendersCards(goodVc, 1)
		assert.isLength(cardVcs, 1)

		//@ts-ignore
		cardVcs = vcAssert.assertSkillViewRendersCards(goodVc)
		assert.isLength(cardVcs, 1)
	}

	@test()
	protected static maintainsCardVcsInRendersCard() {
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

		//@ts-ignore
		const matchVc = vcAssert.assertSkillViewRendersCard(goodVc)

		assert.isEqual(matchVc, cardVc)
	}

	@test()
	protected static maintainsCardVcsInRendersCards() {
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

		//@ts-ignore
		const cardVcs = vcAssert.assertSkillViewRendersCards(goodVc, 1)

		assert.isEqual(cardVcs[0], cardVc)
	}

	@test()
	protected static async knowsIfCardInFirstLayout() {
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

		//@ts-ignore
		const cardVc = vcAssert.assertSkillViewRendersCard(vc)

		assert.isEqual(cardVc.getHeaderTitle(), 'go!')
	}

	@test()
	protected static async knowsIfCardInSecondLayout() {
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

		//@ts-ignore
		const cardVc = vcAssert.assertSkillViewRendersCard(vc)

		assert.isEqual(cardVc.getHeaderTitle(), 'go2!')
	}

	@test()
	protected static knowsIfCardRendersById() {
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

		assert.doesThrow(() => vcAssert.assertSkillViewRendersCard(vc, 'not-found'))

		vcAssert.assertSkillViewDoesNotRenderCard(vc, 'not-found')

		assert.doesThrow(() =>
			vcAssert.assertSkillViewRendersCards(vc, [id2, 'not-found'])
		)

		vcAssert.assertSkillViewDoesNotRenderCards(vc, [id2, 'not-found'])

		vcAssert.assertSkillViewRendersCard(vc, id)

		assert.doesThrow(() => vcAssert.assertSkillViewDoesNotRenderCard(vc, id))

		vcAssert.assertSkillViewRendersCard(vc, id2)

		assert.doesThrow(() => vcAssert.assertSkillViewDoesNotRenderCard(vc, id2))

		vcAssert.assertSkillViewRendersCards(vc, [id2, id])

		assert.doesThrow(() =>
			vcAssert.assertSkillViewDoesNotRenderCards(vc, [id2, id])
		)
	}

	@test()
	protected static assertingIfCardBodyIsBusy() {
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
	protected static throwsIfRowDoesNotRenderContent(cells: ListCellModel[]) {
		const vc = this.Controller('list', {
			rows: [
				{
					id: 'main',
					cells,
				},
			],
		})

		assert.isFunction(vcAssert.assertRowRendersContent)
		assert.doesThrow(() => vcAssert.assertRowRendersContent(vc, 'main', 'waka'))
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
		{ cells: [{ text: { content: `dingy` }, subText: { content: 'thingy' } }] },
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
		{ cells: [{ text: { content: 'taco' } }, { text: { content: 'waka' } }] },
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
	protected static knowsIfRowRendersContent(row: ListRowModel, search: string) {
		const vc = this.Controller('list', {
			rows: [{ ...row, id: 'first' }],
		})

		vcAssert.assertRowRendersContent(vc, 'first', search)
	}

	@test()
	protected static knowsIfSkillViewDoesNotRenderViewController() {
		const model: SkillView = {
			layouts: [{}],
		}

		const vc = this.Controller('good', model)
		validateSchemaValues(skillViewSchema, this.render(vc))

		assert.doesThrow(() =>
			vcAssert.assertSkillViewRendersViewController(vc, FormViewController)
		)
	}

	@test('knows if form rendered in first layout, first card, first section', {
		VcClass: FormViewController,
		layoutIdx: 0,
		cardIdx: 0,
		sectionIdx: 0,
		bodyGenerator: () => ({
			form: VcAssertTest.renderEmptyForm(),
		}),
	})
	@test('knows if form rendered in random layout, first card, first section', {
		VcClass: FormViewController,
		cardIdx: 0,
		sectionIdx: 0,
		bodyGenerator: () => ({
			form: VcAssertTest.renderEmptyForm(),
		}),
	})
	@test('knows if form rendered in random layout, random card, first section', {
		VcClass: FormViewController,
		bodyGenerator: () => ({
			form: VcAssertTest.renderEmptyForm(),
		}),
	})
	@test(
		'knows if form rendered in random layout, random card, random section',
		{
			VcClass: FormViewController,
			bodyGenerator: () => ({
				form: VcAssertTest.renderEmptyForm(),
			}),
		}
	)
	@test('knows if list is rendered', {
		VcClass: ListViewController,
		bodyGenerator: () => ({
			list: VcAssertTest.renderEmptyList(),
		}),
	})
	@test('knows if list is not rendered', {
		VcClass: ListViewController,
		layoutIdx: 0,
		cardIdx: 0,
		sectionIdx: 0,
		shouldPass: false,
		bodyGenerator: () => ({
			form: VcAssertTest.renderEmptyForm(),
		}),
	})
	protected static knowsIfSkillViewRendersViewController(options: {
		layoutIdx?: number
		cardIdx?: number
		sectionIdx?: number
		shouldPass?: boolean
		bodyGenerator: () => SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
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

		const bodyModel = { ...bodyGenerator() }

		const model: SkillView = {
			layouts: [],
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
			//@ts-ignore
			model.layouts[layoutIdx].cards[cardIdx].body.sections.length <= sectionIdx
		) {
			//@ts-ignore
			model.layouts[layoutIdx].cards[cardIdx].body.sections!.push({})
		}

		//@ts-ignore
		model.layouts[layoutIdx]!.cards[cardIdx].body.sections[sectionIdx] =
			bodyModel

		const vc = this.Controller('good', model)

		if (shouldPass) {
			const match = vcAssert.assertSkillViewRendersViewController(vc, VcClass)
			assert.isTrue(match instanceof VcClass)
		} else {
			assert.doesThrow(() =>
				vcAssert.assertSkillViewRendersViewController(vc, VcClass)
			)
		}
	}

	@test()
	protected static knowsIfCardIsOfType() {
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
	protected static async knowsIfCardIsNotOfType() {
		const vc = this.Controller('good', {
			layouts: [
				{
					cards: [this.Controller('newCard', {}).render()],
				},
			],
		})

		await assert.doesThrowAsync(() =>
			vcAssert.assertSkillViewRendersViewController(vc, ListViewController)
		)

		vcAssert.assertSkillViewDoesNotRenderViewController(vc, ListViewController)
	}

	@test()
	protected static async knowsIfRenderingDialog() {
		const vc = this.Controller('goodWithDialog', {})

		await vcAssert.assertRendersDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())
		)
	}

	@test()
	protected static async knowsIfNotRenderingDialog() {
		const vc = this.Controller('good', {
			layouts: [],
		})

		await vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssert.assertRendersDialog(vc, () => vc.load())
		)
	}

	@test()
	protected static getsDialogById() {
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

		assert.doesThrow(() => vcAssert.assertSkillViewRendersCard(vc, 'test-2'))

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
	protected static async knowsIfRowRendersButtonWithIcon(options: {
		rowIdx: number
		cellIdx: number
		icon?: LineIcon
		iconToCheck: LineIcon
		shouldPass?: boolean
	}) {
		let rows: ListRowModel[] = []

		while (rows.length <= options.rowIdx) {
			const cells: ListCellModel[] = []

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

	@test('can assert rending forms', 'form')
	@test('can assert rending bigForms', 'bigForm')
	protected static knowsHowManyFormsBeingRendered(vcId: 'form' | 'bigForm') {
		const cardVc = this.Controller('card', {})
		assert.doesThrow(() => vcAssert.assertCardRendersForms(cardVc, 1))
		assert.doesThrow(() => vcAssert.assertCardRendersForm(cardVc))

		const formVc1 = this.buildEmptyForm(vcId)

		cardVc.addSection({
			title: 'hey!',
			[vcId]: formVc1.render(),
		})

		vcAssert.assertCardRendersForms(cardVc, 1)
		assert.isEqual(formVc1, vcAssert.assertCardRendersForm(cardVc))

		assert.doesThrow(() => vcAssert.assertCardRendersForms(cardVc, 2))

		const formVc = this.buildEmptyForm(vcId)

		cardVc.addSection({
			title: 'hey!',
			[vcId]: formVc.render(),
		})
		const forms = vcAssert.assertCardRendersForms(cardVc, 2)
		assert.isEqual(forms[1], formVc)
	}

	@test()
	protected static async assertCardRendersCriticalError() {
		let wasPrimaryHit = false
		let wasSecondaryHit = false

		const cardVc = this.Controller('card', {})
		vcAssert.assertCardDoesNotRenderCriticalError(cardVc)
		assert.doesThrow(() => vcAssert.assertCardRendersCriticalError(cardVc))
		cardVc.setCriticalError({
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
		})

		vcAssert.assertCardRendersCriticalError(cardVc)
		assert.doesThrow(() =>
			vcAssert.assertCardDoesNotRenderCriticalError(cardVc)
		)

		await interactor.clickPrimaryInFooter(cardVc)
		await interactor.clickSecondaryInFooter(cardVc)

		assert.isTrue(wasPrimaryHit)
		assert.isTrue(wasSecondaryHit)
	}

	@test()
	protected static async assertConfirmHoldsOnConfirmUntilClosed() {
		const vc = this.Controller('goodWithConfirm', {})
		const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
			vc.showConfirm()
		)

		assert.isUndefined(vc.confirmResults)

		await confirmVc.accept()

		assert.isTrue(vc.confirmResults)
	}

	@test()
	protected static async canDeclineConfirm() {
		const vc = this.Controller('goodWithConfirm', {})
		const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
			vc.showConfirm()
		)

		await confirmVc.decline()

		assert.isFalse(vc.confirmResults)
	}

	@test()
	protected static async assertConfirmVcGetsOptions() {
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
	protected static async knowsWhenNotRenderingCalendar() {
		assert.isFunction(vcAssert.assertSkillViewRendersCalendar)

		const svc = this.Controller('good', {
			layouts: [{}],
		})

		assert.doesThrow(() => vcAssert.assertSkillViewRendersCalendar(svc))
		vcAssert.assertSkillViewDoesNotRenderCalendar(svc)
	}

	@test()
	protected static async knowsIfRowRenderingButton() {
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
	protected static knowsWhenRenderingCalendar() {
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
		assert.doesThrow(() => vcAssert.assertSkillViewDoesNotRenderCalendar(svc))
	}

	@test()
	protected static knowsWhenRenderingCalendarInRandomPlaces() {
		const section = {
			calendar: {
				people: [],
			},
		}
		const card = {
			body: {
				sections: [...new Array(Math.round(Math.random() * 100)), section],
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
	protected static knowsIfFieldsBeingRendered() {
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
			vcAssert.assertFormRendersFields(formVc, ['one', 'two', 'three'])
		)

		vcAssert.assertFormRendersFields(formVc, ['four'])
		vcAssert.assertFormRendersFields(formVc, ['four', 'five'])
		vcAssert.assertFormRendersFields(formVc, ['four', 'five', 'six'])
	}

	@test()
	protected static async knowsIfRenderingDialogThatWaits() {
		const vc = this.Controller('goodWithDialogThatWaits', {})

		await vcAssert.assertRendersDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssert.assertDoesNotRenderDialog(vc, () => vc.load())
		)
	}

	@test()
	protected static async knowsIfCardFooterIsRenderingButtons() {
		const assertDoesNotRenderButton = (vc: any, id: any) => {
			assert.doesThrow(() => vcAssert.assertCardRendersButton(vc, id))
			vcAssert.assertCardDoesNotRenderButton(vc, id)
		}

		const assertRendersButton = (vc: any, id: any) => {
			assert.doesThrow(() => vcAssert.assertCardDoesNotRenderButton(vc, id))
			vcAssert.assertCardRendersButton(vc, id)
		}

		const assertCardRendersButtons = (vc: any, id: any) => {
			assert.doesThrow(() => vcAssert.assertCardDoesNotRenderButtons(vc, id))
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
	protected static knowsIfRenderingButtonsInBody(emptySections: any[] = []) {
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
	protected static async knowsIfRenderingAlert() {
		const vc = this.Controller('goodWithAlert', {})
		const vc2 = this.Controller('goodWithDialog', {})

		await this.assertAlerts(vc, vc2)
	}

	@test()
	protected static async patchingAlertsToThrowDoesntAffectAlertAssertionBehavior() {
		const vc = this.Controller('goodWithAlert', {})
		const vc2 = this.Controller('goodWithDialog', {})

		vcAssert.patchAlertToThrow(vc)
		vcAssert.patchAlertToThrow(vc2)

		await assert.doesThrowAsync(() => vc.showAlert())

		await this.assertAlerts(vc, vc2)
	}

	@test()
	protected static async knowsIfNotRenderingTalkingSprucebot() {
		assert.isFunction(vcAssert.assertCardRendersTalkingSprucebot)
		assert.isFunction(vcAssert.assertCardDoesNotRenderTalkingSprucebot)

		const vc = this.Controller('card', {})

		assert.doesThrow(() => vcAssert.assertCardRendersTalkingSprucebot(vc))
		vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc)
	}

	@test()
	protected static async knowsIfRenderingTalkingSprucebot() {
		const expected = this.Controller('talkingSprucebot', {
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
						//@ts-ignore
						talkingSprucebot: { controller: expected },
					},
				],
			},
		})

		assert.doesThrow(() => vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc))
		const actual = vcAssert.assertCardRendersTalkingSprucebot(vc)

		assert.isEqual(actual, expected)

		const vc2 = this.Controller('card', {
			body: {
				sections: [
					{},
					{},
					{
						//@ts-ignore
						talkingSprucebot: { controller: expected },
					},
				],
			},
		})

		vcAssert.assertCardRendersTalkingSprucebot(vc2)
	}

	@test()
	protected static knowsIfRowsWithIdRender() {
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

		assert.doesThrow(() => vcAssert.assertListDoesNotRenderRow(list1, newId))

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
	protected static knowsIfRenderingFullScreen() {
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
	protected static async knowsIfRequiresLogin() {
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

	private static BadController() {
		return this.Controller('bad', {}) as BadSkillViewController
	}

	private static GoodController(model: SkillView) {
		return this.Controller('good', model) as GoodSkillViewController
	}

	private static renderEmptyForm(vcId: 'form' | 'bigForm' = 'form') {
		return this.buildEmptyForm(vcId).render()
	}

	private static buildEmptyForm(vcId: 'form' | 'bigForm' = 'form') {
		return this.Controller(vcId, {
			schema: {
				fields: {},
			},
			sections: [],
		})
	}

	private static renderEmptyList() {
		return this.Controller('list', {
			rows: [],
		}).render()
	}

	private static async assertAlerts(
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

		const alertVc = await vcAssert.assertRendersAlert(vc, () => vc.showAlert())

		const msg = await assert.doesThrowAsync(() =>
			vcAssert.assertDoesNotRenderAlert(vc, () => vc.showAlert())
		)

		assert.doesInclude(msg.message, 'go team')

		const msg2 = await assert.doesThrowAsync(() =>
			vcAssert.assertDoesNotRenderAlert(vc, () => vc.showAlert2())
		)

		assert.doesInclude(msg2.message, 'moar team')

		assert.isFalse(vc.afterAlert)

		await alertVc.hide()

		await this.wait(0)

		assert.isTrue(vc.afterAlert)
	}
}
