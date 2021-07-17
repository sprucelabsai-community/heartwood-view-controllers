import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import { ListRow } from '../../viewControllers/list/List.vc'
import { ListCellModel } from '../../viewControllers/list/ListCell.vc'

class BadSkillViewController {
	public render() {
		return {}
	}
}

class GoodSkillViewController {
	private model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
	public constructor(
		model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
	) {
		this.model = model
	}
	public render() {
		return this.model
	}
}

export default class VcAssertUtilTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		bad: BadSkillViewController,
		good: GoodSkillViewController,
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
	protected static knowsIfRowRendersContent(row: ListRow, search: string) {
		const vc = this.Controller('list', {
			rows: [row],
		})

		vcAssertUtil.assertRowRendersContent(vc.getRowVc(0), search)
	}

	private static BadController() {
		//@ts-ignore
		return this.Controller('bad') as BadSkillViewController
	}

	private static GoodController(
		model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
	) {
		//@ts-ignore
		return this.Controller('good', model) as BadSkillViewController
	}
}
