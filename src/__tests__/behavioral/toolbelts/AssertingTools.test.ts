import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { AbstractViewController } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import {
	SkillViewController,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/Card.vc'
import FormViewController from '../../../viewControllers/Form.vc'
import SwipeViewController from '../../../viewControllers/Swipe.vc'
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
	private static swipeVc: SwipeViewController
	private static fancyTool: FancyTool

	protected static controllerMap = {
		toolBeltSvc: ToolBeltSkillViewController,
		good: GoodSkillViewController,
		fancy: FancyCard,
		tool: FancyTool,
	}

	@test()
	protected static hasAssertRendersToolBelt() {
		assert.isFunction(vcAssertUtil.assertRendersToolBelt)
	}

	@test('throws if given nothing', null)
	@test('throws if given no tools', { tools: [] })
	protected static throwsIfSkillViewControllerDoesNotRenderToolBelt(
		toolBelt: ToolBelt | null
	) {
		const vc = this.Controller('toolBeltSvc', { toolBelt })

		assert.doesThrow(() => vcAssertUtil.assertRendersToolBelt(vc as any))
		vcAssertUtil.assertDoesNotRenderToolBelt(vc as any)
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

		vcAssertUtil.assertRendersToolBelt(vc)

		const cardVc = vcAssertUtil.assertToolBeltRendersTool(vc, 'taco')
		assert.isEqual(cardVc, card1)

		vcAssertUtil.assertToolBeltRendersTool(vc, randomId)

		assert.doesThrow(() =>
			vcAssertUtil.assertToolBeltDoesNotRenderTool(vc, randomId)
		)
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

		const toolBeltVc = vcAssertUtil.assertRendersToolBelt(vc)
		assert.doesThrow(() => vcAssertUtil.assertDoesNotRenderToolBelt(vc))
		assert.isTrue(toolBeltVc instanceof ToolBeltViewController)
	}

	@test()
	protected static knowsWhenASpecificToolIsRendered() {
		const randomId = `${new Date().getTime() * Math.random()}`
		const vc = this.ToolBeltSvc({ tool2Id: randomId })

		const vc2 = this.Controller('good', {
			layouts: [],
		})

		vcAssertUtil.assertToolBeltRendersTool(vc, 'add')
		assert.doesThrow(() => vcAssertUtil.assertToolBeltRendersTool(vc2, 'add'))
		assert.doesThrow(() => vcAssertUtil.assertToolBeltRendersTool(vc, 'taco'))
		vcAssertUtil.assertToolBeltDoesNotRenderTool(vc, 'taco')

		vcAssertUtil.assertToolBeltRendersTool(vc, randomId)
	}

	@test()
	protected static canCheckInstanceOfTool() {
		let vc = this.ToolBeltSvc()
		const svc = this.ToolBeltSvc()
		assert.isTruthy(svc)

		assert.doesThrow(() =>
			vcAssertUtil.assertToolInstanceOf(svc, 'add', FormViewController)
		)

		const swipeVc = vcAssertUtil.assertToolInstanceOf(
			svc,
			'add',
			SwipeViewController
		)

		assert.isEqual(swipeVc, this.swipeVc)

		vcAssertUtil.assertToolInstanceOf(svc, 'edit', CardViewController)

		const randomId = `${new Date().getTime()}`

		vc = this.ToolBeltSvc({
			tool2Id: randomId,
		})

		vcAssertUtil.assertToolInstanceOf(vc, randomId, CardViewController)
	}

	@test()
	protected static canTellToolInstanceOfSubClass() {
		vcAssertUtil.assertToolInstanceOf(this.ToolBeltSvc(), 'fancy', FancyCard)
	}

	@test()
	protected static canTellParentMostClass() {
		const toolVc = vcAssertUtil.assertToolInstanceOf(
			this.ToolBeltSvc(),
			'tool',
			FancyTool
		)

		assert.isEqual(toolVc, this.fancyTool)
	}

	private static ToolBeltSvc(options?: { tool2Id?: string }) {
		//@ts-ignore
		this.swipeVc = this.Controller('swipe', {})
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
