/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { buildSchema, validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import skillViewSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/skillView.schema'
import buildForm from '../../builders/buildForm'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import interactionUtil from '../../tests/utilities/interaction.utility'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import { LineIcon, SkillViewController } from '../../types/heartwood.types'
import CardViewController from '../../viewControllers/Card.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ListViewController, {
	ListRowModel,
} from '../../viewControllers/list/List.vc'
import { ListCellModel } from '../../viewControllers/list/ListCell.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		good: GoodSkillViewController
		bad: BadSkillViewController
		newCard: NewTestingCardViewController
		goodWithDialog: GoodWithDialogSkillViewController
		goodWithAlert: GoodWithAlertSkillViewController
		goodWithDialogThatWaits: GoodWithDialogThatWaitsSkillViewController
		toolBeltSvc: ToolBeltSkillViewController
	}
	interface ViewControllerOptionsMap {
		good: SkillView
		bad: any
		toolBeltSvc: { toolBelt?: ToolBelt | null }
	}
}

class BadSkillViewController {
	public render() {
		return {}
	}
}

class GoodSkillViewController implements SkillViewController {
	private model: SkillView
	public constructor(model: SkillView) {
		this.model = model
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

type ToolBelt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt

class ToolBeltSkillViewController implements SkillViewController {
	private toolBelt: ToolBelt | null
	public constructor(options: { toolBelt: ToolBelt | null } | null) {
		this.toolBelt = options?.toolBelt ?? null
	}
	public async load() {}
	public triggerRender() {}

	public renderToolBelt() {
		return this.toolBelt
	}

	public render(): SkillView {
		return {
			layouts: [],
		}
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

	public async load() {}

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

export default class VcAssertUtilTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		bad: BadSkillViewController,
		good: GoodSkillViewController,
		goodWithDialog: GoodWithDialogSkillViewController,
		goodWithAlert: GoodWithAlertSkillViewController,
		goodWithDialogThatWaits: GoodWithDialogThatWaitsSkillViewController,
		newCard: NewTestingCardViewController,
		toolBeltSvc: ToolBeltSkillViewController,
	}

	@test()
	protected static knowsIfNotRenderingCard() {
		assert.isFunction(vcAssertUtil.assertSkillViewRendersCard)
		const vc = this.BadController()
		//@ts-ignore
		assert.doesThrow(() => vcAssertUtil.assertSkillViewRendersCard(vc))
		//@ts-ignore
		assert.doesThrow(() => vcAssertUtil.assertSkillViewRendersCards(vc))
	}

	@test()
	protected static canAssertNumberOfCards() {
		const vc = this.BadController()
		//@ts-ignore
		let cardVcs = vcAssertUtil.assertSkillViewRendersCards(vc, 0)
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
			vcAssertUtil.assertSkillViewRendersCards(goodVc, 0)
		)

		//@ts-ignore
		cardVcs = vcAssertUtil.assertSkillViewRendersCards(goodVc, 1)
		assert.isLength(cardVcs, 1)

		//@ts-ignore
		cardVcs = vcAssertUtil.assertSkillViewRendersCards(goodVc)
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
		const matchVc = vcAssertUtil.assertSkillViewRendersCard(goodVc)

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
		const cardVcs = vcAssertUtil.assertSkillViewRendersCards(goodVc, 1)

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
		const cardVc = vcAssertUtil.assertSkillViewRendersCard(vc)

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
		const cardVc = vcAssertUtil.assertSkillViewRendersCard(vc)

		assert.isEqual(cardVc.getHeaderTitle(), 'go2!')
	}

	@test()
	protected static assertingIfCardBodyIsLoading() {
		const vc = this.Controller('card', {
			body: {},
		})

		assert.doesThrow(() => vcAssertUtil.assertCardBodyIsLoading(vc))
		vcAssertUtil.assertCardBodyIsNotLoading(vc)

		vc.setIsBodyLoading(true)

		vcAssertUtil.assertCardBodyIsLoading(vc)
		assert.doesThrow(() => vcAssertUtil.assertCardBodyIsNotLoading(vc))
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
					cells,
				},
			],
		})

		assert.isFunction(vcAssertUtil.assertRowRendersContent)
		assert.doesThrow(() =>
			vcAssertUtil.assertRowRendersContent(vc.getRowVc(0), 'waka')
		)
		assert.doesThrow(() =>
			vcAssertUtil.assertRowRendersContent(vc.getRowVc(0), 'undefined')
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
			rows: [row],
		})

		vcAssertUtil.assertRowRendersContent(vc.getRowVc(0), search)
	}

	@test()
	protected static knowsIfSkillViewDoesNotRenderViewController() {
		const model: SkillView = {
			layouts: [{}],
		}

		const vc = this.Controller('good', model)
		validateSchemaValues(skillViewSchema, this.render(vc))

		assert.doesThrow(() =>
			vcAssertUtil.assertSkillViewRendersViewController(vc, FormViewController)
		)
	}

	@test('knows if form rendered in first layout, first card, first section', {
		VcClass: FormViewController,
		layoutIdx: 0,
		cardIdx: 0,
		sectionIdx: 0,
		bodyGenerator: () => ({
			form: VcAssertUtilTest.renderEmptyForm(),
		}),
	})
	@test('knows if form rendered in random layout, first card, first section', {
		VcClass: FormViewController,
		cardIdx: 0,
		sectionIdx: 0,
		bodyGenerator: () => ({
			form: VcAssertUtilTest.renderEmptyForm(),
		}),
	})
	@test('knows if form rendered in random layout, random card, first section', {
		VcClass: FormViewController,
		bodyGenerator: () => ({
			form: VcAssertUtilTest.renderEmptyForm(),
		}),
	})
	@test(
		'knows if form rendered in random layout, random card, random section',
		{
			VcClass: FormViewController,
			bodyGenerator: () => ({
				form: VcAssertUtilTest.renderEmptyForm(),
			}),
		}
	)
	@test('knows if list is renderd', {
		VcClass: ListViewController,
		bodyGenerator: () => ({
			list: VcAssertUtilTest.renderEmptyList(),
		}),
	})
	@test('knows if list is not renderd', {
		VcClass: ListViewController,
		layoutIdx: 0,
		cardIdx: 0,
		sectionIdx: 0,
		shouldPass: false,
		bodyGenerator: () => ({
			form: VcAssertUtilTest.renderEmptyForm(),
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
			const match = vcAssertUtil.assertSkillViewRendersViewController(
				vc,
				VcClass
			)
			assert.isTrue(match instanceof VcClass)
		} else {
			assert.doesThrow(() =>
				vcAssertUtil.assertSkillViewRendersViewController(vc, VcClass)
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

		vcAssertUtil.assertSkillViewRendersViewController(
			vc,
			NewTestingCardViewController
		)

		assert.doesThrow(() =>
			vcAssertUtil.assertSkillViewDoesNotRenderViewController(
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
			vcAssertUtil.assertSkillViewRendersViewController(vc, ListViewController)
		)

		vcAssertUtil.assertSkillViewDoesNotRenderViewController(
			vc,
			ListViewController
		)
	}

	@test()
	protected static async knowsIfRenderingDialog() {
		const vc = this.Controller('goodWithDialog', {})

		await vcAssertUtil.assertRendersDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertDoesNotRenderDialog(vc, () => vc.load())
		)
	}

	@test()
	protected static async knowsIfNotRenderingDialog() {
		const vc = this.Controller('good', {
			layouts: [],
		})

		await vcAssertUtil.assertDoesNotRenderDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersDialog(vc, () => vc.load())
		)
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

			rows.push({ cells })
		}

		rows[options.rowIdx].cells[options.cellIdx].button = {
			lineIcon: options.icon,
		}

		const listVc = this.Controller('list', {
			rows,
		})

		if (options.shouldPass) {
			vcAssertUtil.assertRowRendersButtonWithIcon(
				listVc.getRowVc(options.rowIdx),
				options.iconToCheck
			)
		} else {
			assert.doesThrow(() =>
				vcAssertUtil.assertRowRendersButtonWithIcon(
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
		assert.doesThrow(() => vcAssertUtil.assertCardRendersForms(cardVc, 1))
		assert.doesThrow(() => vcAssertUtil.assertCardRendersForm(cardVc))

		const formVc1 = this.buildEmptyForm(vcId)

		cardVc.addSection({
			title: 'hey!',
			[vcId]: formVc1.render(),
		})

		vcAssertUtil.assertCardRendersForms(cardVc, 1)
		assert.isEqual(formVc1, vcAssertUtil.assertCardRendersForm(cardVc))

		assert.doesThrow(() => vcAssertUtil.assertCardRendersForms(cardVc, 2))

		const formVc = this.buildEmptyForm(vcId)

		cardVc.addSection({
			title: 'hey!',
			[vcId]: formVc.render(),
		})
		const forms = vcAssertUtil.assertCardRendersForms(cardVc, 2)
		assert.isEqual(forms[1], formVc)
	}

	@test()
	protected static async assertCardRendersCriticalError() {
		let wasPrimaryHit = false
		let wasSecondaryHit = false

		const cardVc = this.Controller('card', {})
		vcAssertUtil.assertCardDoesNotRenderCriticalError(cardVc)
		assert.doesThrow(() => vcAssertUtil.assertCardRendersCriticalError(cardVc))
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

		vcAssertUtil.assertCardRendersCriticalError(cardVc)
		assert.doesThrow(() =>
			vcAssertUtil.assertCardDoesNotRenderCriticalError(cardVc)
		)

		await interactionUtil.clickPrimaryInFooter(cardVc)
		await interactionUtil.clickSecondaryInFooter(cardVc)

		assert.isTrue(wasPrimaryHit)
		assert.isTrue(wasSecondaryHit)
	}

	@test()
	protected static hasAssertRendersPowerTools() {
		assert.isFunction(vcAssertUtil.assertRendersToolBelt)
	}

	@test('throws if given nothing', null)
	@test('throws if given no tools', { tools: [] })
	protected static throwsIfSkillViewControllerDoesNotRenderPowerTools(
		toolBelt: ToolBelt | null
	) {
		const vc = this.Controller('toolBeltSvc', { toolBelt })

		assert.doesThrow(() => vcAssertUtil.assertRendersToolBelt(vc as any))
		vcAssertUtil.assertDoesNotRenderToolBelt(vc as any)
	}

	@test()
	protected static knowsIfGivenPowerTools() {
		const vc = this.Controller('toolBeltSvc', {
			toolBelt: {
				tools: [
					{
						id: 'add',
						lineIcon: 'add',
						card: {} as any,
					},
				],
			},
		})

		const toolBeltVc = vcAssertUtil.assertRendersToolBelt(vc)
		assert.doesThrow(() => vcAssertUtil.assertDoesNotRenderToolBelt(vc))
		assert.isFalsy(toolBeltVc)
	}

	@test()
	protected static async passesBackToolBeltVcIfOneExists() {
		const vc = this.Controller('toolBeltSvc', {
			toolBelt: {
				controller: 'waka' as any,
				tools: [
					{
						id: 'add',
						lineIcon: 'add',
						card: {} as any,
					},
				],
			},
		})

		const toolBeltVc = vcAssertUtil.assertRendersToolBelt(vc)
		//@ts-ignore
		assert.isEqual(toolBeltVc, 'waka')
	}

	@test()
	protected static async knowsWhenNotRenderingCalendar() {
		assert.isFunction(vcAssertUtil.assertRendersCalendar)

		const svc = this.Controller('good', {
			layouts: [{}],
		})

		assert.doesThrow(() => vcAssertUtil.assertRendersCalendar(svc))
		vcAssertUtil.assertDoesNotRenderCalendar(svc)
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
										},
									},
								],
							},
						},
					],
				},
			],
		})

		vcAssertUtil.assertRendersCalendar(svc)
		assert.doesThrow(() => vcAssertUtil.assertDoesNotRenderCalendar(svc))
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

		vcAssertUtil.assertRendersCalendar(svc)
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
			vcAssertUtil.assertFormRendersFields(formVc, ['one', 'two', 'three'])
		)

		vcAssertUtil.assertFormRendersFields(formVc, ['four'])
		vcAssertUtil.assertFormRendersFields(formVc, ['four', 'five'])
		vcAssertUtil.assertFormRendersFields(formVc, ['four', 'five', 'six'])
	}

	@test()
	protected static async knowsIfRenderingDialogThatWaits() {
		const vc = this.Controller('goodWithDialogThatWaits', {})

		await vcAssertUtil.assertRendersDialog(vc, () => vc.load())

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertDoesNotRenderDialog(vc, () => vc.load())
		)
	}

	@test()
	protected static async knowsIfCardFooterIsRenderingButton() {
		const vc = this.Controller('card', {})
		const emptyButtonsVc = this.Controller('card', {
			footer: {
				buttons: [],
			},
		})

		assert.doesThrow(() => vcAssertUtil.assertCardFooterRendersButton(vc))
		assert.doesThrow(() =>
			vcAssertUtil.assertCardFooterRendersButton(emptyButtonsVc)
		)

		const vc2 = this.Controller('card', {
			footer: {
				buttons: [
					{
						label: 'hey!',
					},
					{
						label: 'go',
						type: 'destructive',
					},
				],
			},
		})

		vcAssertUtil.assertCardFooterRendersButton(vc2)
		assert.doesThrow(() =>
			vcAssertUtil.assertCardFooterRendersButton(vc2, 'primary')
		)

		vcAssertUtil.assertCardFooterRendersButton(vc2, 'destructive')
	}

	@test()
	protected static async knowsIfRenderingAlert() {
		const vc = this.Controller('goodWithAlert', {})
		const vc2 = this.Controller('goodWithDialog', {})

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersAlert(vc, () => vc.load())
		)

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersAlert(vc2, () => vc2.load())
		)

		const alertVc = await vcAssertUtil.assertRendersAlert(vc, () =>
			vc.showAlert()
		)

		assert.isFalse(vc.afterAlert)

		await alertVc.hide()

		await this.wait(0)

		assert.isTrue(vc.afterAlert)
	}

	@test()
	protected static async knowsIfNotRenderingTalkingSprucebot() {
		assert.isFunction(vcAssertUtil.assertCardRendersTalkingSprucebot)

		const vc = this.Controller('card', {})

		assert.doesThrow(() => vcAssertUtil.assertCardRendersTalkingSprucebot(vc))
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

		const actual = vcAssertUtil.assertCardRendersTalkingSprucebot(vc)

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

		vcAssertUtil.assertCardRendersTalkingSprucebot(vc2)
	}

	private static BadController() {
		//@ts-ignore
		return this.Controller('bad') as BadSkillViewController
	}

	private static GoodController(model: SkillView) {
		//@ts-ignore
		return this.Controller('good', model) as BadSkillViewController
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
}
