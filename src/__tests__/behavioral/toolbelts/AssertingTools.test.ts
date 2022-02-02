import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { AbstractViewController } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
	SkillViewController,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/Card.vc'
import FormViewController from '../../../viewControllers/Form.vc'
import SwipeCardViewController from '../../../viewControllers/SwipeCard.vc'
import ToolBeltViewController from '../../../viewControllers/ToolBelt.vc'

type ToolBelt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

declare module '../../../types/heartwood.types' {
	interface ViewControllerMap {
		toolBeltSvc: ToolBeltSkillViewController
		fancy: FancyCard
		tool: FancyTool
	}
	interface ViewControllerOptionsMap {
		toolBeltSvc: { toolBelt?: ToolBelt | null }
	}
}

class FancyTool extends AbstractViewController<Card> {
	public render() {
		return this.Controller('fancy', {}).render()
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

class ToolBeltSkillViewController implements SkillViewController {
	private toolBelt?: ToolBeltViewController | undefined
	public constructor(
		options: { toolBelt: ToolBelt | null } & ViewControllerOptions
	) {
		this.toolBelt = options?.toolBelt
			? options.vcFactory.Controller('toolBelt', options.toolBelt)
			: undefined
	}

	public async load() {}
	public triggerRender() {}

	public async focusTool(id: string) {
		this.toolBelt?.focusTool(id)
	}

	public async delayedFocusTool(id: string) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		this.toolBelt?.focusTool(id)
	}

	public async delayedAddAndFocusTool(id: string) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		this.toolBelt?.addTool({ id, lineIcon: 'calendar', card: {} })
		this.toolBelt?.focusTool(id)
	}

	public renderToolBelt() {
		return this.toolBelt?.render() ?? null
	}

	public getToolBeltVc() {
		return this.toolBelt
	}

	public render(): SkillView {
		return {
			layouts: [],
		}
	}
}

class FancyCard extends AbstractViewController<Card> {
	public render(): Card {
		return this.Controller('card', {}).render()
	}
}

export default class AssertingToolsTest extends AbstractViewControllerTest {
	private static swipeVc: SwipeCardViewController
	private static fancyTool: FancyTool

	protected static controllerMap = {
		toolBeltSvc: ToolBeltSkillViewController,
		good: GoodSkillViewController,
		fancy: FancyCard,
		tool: FancyTool,
	}

	@test()
	protected static hasAssertRendersToolBelt() {
		assert.isFunction(vcAssert.assertRendersToolBelt)
	}

	@test('throws if given nothing', null)
	@test('throws if given no tools', { tools: [] })
	protected static throwsIfSkillViewControllerDoesNotRenderToolBelt(
		toolBelt: ToolBelt | null
	) {
		const vc = this.Controller('toolBeltSvc', { toolBelt })

		assert.doesThrow(() => vcAssert.assertRendersToolBelt(vc as any))
		vcAssert.assertDoesNotRenderToolBelt(vc as any)
	}

	@test()
	protected static async passeBackToolWhenCheckingForTool() {
		const randomId = `${new Date().getTime() * Math.random()}`

		const card1 = this.Controller('card', {
			header: {
				title: 'hey!',
			},
		})

		const vc = this.Controller('toolBeltSvc', {
			toolBelt: {
				controller: 'waka' as any,
				tools: [
					{
						id: 'taco',
						lineIcon: 'add',
						card: card1.render(),
					},
					{
						id: randomId,
						lineIcon: 'alarm',
						card: {} as any,
					},
				],
			},
		})

		vcAssert.assertRendersToolBelt(vc)

		this.assertToolRendersCard(vc, card1)

		vcAssert.assertToolBeltRendersTool(vc, randomId)

		assert.doesThrow(() =>
			vcAssert.assertToolBeltDoesNotRenderTool(vc, randomId)
		)
	}

	private static assertToolRendersCard(
		vc: ToolBeltSkillViewController,
		card1: CardViewController
	) {
		const cardVc = vcAssert.assertToolBeltRendersTool(vc, 'taco')
		assert.isEqual(cardVc, card1)

		const cardVc2 = vcAssert.assertToolBeltRendersTool(
			vc.getToolBeltVc() as any,
			'taco'
		)
		assert.isEqual(cardVc2, card1)
	}

	@test()
	protected static knowsIfGivenToolBelt() {
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

		const toolBeltVc = vcAssert.assertRendersToolBelt(vc)
		assert.doesThrow(() => vcAssert.assertDoesNotRenderToolBelt(vc))
		assert.isTrue(toolBeltVc instanceof ToolBeltViewController)
	}

	@test()
	protected static knowsWhenASpecificToolIsRendered() {
		const randomId = `${new Date().getTime() * Math.random()}`
		const vc = this.ToolBeltSvc({ tool2Id: randomId })

		const vc2 = this.Controller('good', {
			layouts: [],
		})

		vcAssert.assertToolBeltRendersTool(vc, 'add')
		assert.doesThrow(() => vcAssert.assertToolBeltRendersTool(vc2, 'add'))
		assert.doesThrow(() => vcAssert.assertToolBeltRendersTool(vc, 'taco'))
		vcAssert.assertToolBeltDoesNotRenderTool(vc, 'taco')

		vcAssert.assertToolBeltRendersTool(vc, randomId)
	}

	@test()
	protected static canCheckInstanceOfTool() {
		let vc = this.ToolBeltSvc()
		const svc = this.ToolBeltSvc()
		assert.isTruthy(svc)

		assert.doesThrow(() =>
			vcAssert.assertToolInstanceOf(svc, 'add', FormViewController)
		)

		const swipeVc = vcAssert.assertToolInstanceOf(
			svc,
			'add',
			SwipeCardViewController
		)

		assert.isEqual(swipeVc, this.swipeVc)

		vcAssert.assertToolInstanceOf(svc, 'edit', CardViewController)

		const randomId = `${new Date().getTime()}`

		vc = this.ToolBeltSvc({
			tool2Id: randomId,
		})

		vcAssert.assertToolInstanceOf(vc, randomId, CardViewController)
	}

	@test()
	protected static canTellToolInstanceOfSubClass() {
		vcAssert.assertToolInstanceOf(this.ToolBeltSvc(), 'fancy', FancyCard)
	}

	@test()
	protected static canTellParentMostClass() {
		const toolVc = vcAssert.assertToolInstanceOf(
			this.ToolBeltSvc(),
			'tool',
			FancyTool
		)

		assert.isEqual(toolVc, this.fancyTool)
	}

	@test()
	protected static async assertToolIsFocusedThrowsIfNoToolBelt() {
		await assert.doesThrowAsync(() =>
			vcAssert.assertActionFocusesTool(
				this.Controller('good', { layouts: [] }),
				'tool',
				async () => {}
			)
		)
	}

	@test()
	protected static async assertToolIsFocusedThrowsIfBadToolId() {
		await assert.doesThrowAsync(() =>
			vcAssert.assertActionFocusesTool(
				this.ToolBeltSvc(),
				'no-found',
				async () => {}
			)
		)
	}

	@test('assert focuses tool 1', 'new-tool')
	@test('assert focuses tool 2', 'new-tool-2')
	protected static async passesWhenFocusingTool(id: string) {
		const svc = this.ToolBeltSvc({ tool2Id: id })
		await vcAssert.assertActionFocusesTool(svc, id, async () =>
			svc.focusTool(id)
		)

		await vcAssert.assertActionFocusesTool(
			svc.getToolBeltVc() as any,
			id,
			async () => svc.focusTool(id)
		)
	}

	@test()
	protected static async passesWhenFocusHappensLater() {
		const svc = this.ToolBeltSvc({ tool2Id: 'ten' })
		await vcAssert.assertActionFocusesTool(svc, 'ten', async () =>
			svc.delayedFocusTool('ten')
		)
	}

	@test()
	protected static async canFocuseWhenToolStartsWithNoTools() {
		const svc = this.Controller('toolBeltSvc', {
			toolBelt: {
				tools: [],
			},
		})

		await vcAssert.assertActionFocusesTool(svc, 'ten', async () =>
			svc.delayedAddAndFocusTool('ten')
		)
	}

	@test()
	protected static async assertToolIsFocusedThrowsIfToolIdDoesNotMatch() {
		const svc = this.ToolBeltSvc({ tool2Id: 'new-tool' })

		await assert.doesThrowAsync(() =>
			vcAssert.assertActionFocusesTool(svc, 'new-tool', async () =>
				svc.focusTool('add')
			)
		)
	}

	@test()
	protected static async canTellIfToolFocusedEvenIfToolAddedLate() {
		const svc = this.ToolBeltSvc()
		await vcAssert.assertActionFocusesTool(svc, 'new-tool', async () => {
			svc.getToolBeltVc()?.addTool({
				id: 'new-tool',
				lineIcon: 'calendar',
				card: {} as any,
			})
			await svc.focusTool('new-tool')
		})
	}

	private static ToolBeltSvc(options?: { tool2Id?: string }) {
		//@ts-ignore
		this.swipeVc = this.Controller('swipeCard', {})
		this.fancyTool = this.Controller('tool', {})

		return this.Controller('toolBeltSvc', {
			toolBelt: {
				controller: 'waka' as any,
				tools: [
					{
						id: 'add',
						lineIcon: 'add',
						card: this.swipeVc.render(),
					},
					{
						id: options?.tool2Id ?? 'edit',
						lineIcon: 'calendar',
						card: this.Controller('card', {}).render(),
					},
					{
						id: 'fancy',
						lineIcon: 'calendar',
						card: this.Controller('fancy', {}).render(),
					},
					{
						id: 'tool',
						lineIcon: 'calendar',
						card: this.fancyTool.render(),
					},
				],
			},
		})
	}
}
