import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import {
	SkillViewController,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/Card.vc'
import ToolBeltViewController from '../../../viewControllers/ToolBelt.vc'

type ToolBelt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

declare module '../../../types/heartwood.types' {
	interface ViewControllerMap {
		toolBeltSvc: ToolBeltSkillViewController
	}
	interface ViewControllerOptionsMap {
		toolBeltSvc: { toolBelt?: ToolBelt | null }
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

export default class AssertingToolsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		toolBeltSvc: ToolBeltSkillViewController,
		good: GoodSkillViewController,
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

		const toolBeltVc = vcAssertUtil.assertRendersToolBelt(vc)

		const {
			tool,
			cardVc,
			toolBeltVc: toolBeltVc1,
		} = vcAssertUtil.assertToolBeltRendersTool(vc, 'taco')
		assert.isEqual(tool.id, 'taco')
		assert.isEqualDeep(tool.lineIcon, 'add')
		assert.isEqual(cardVc, card1)
		assert.isEqual(toolBeltVc, toolBeltVc1)

		const { tool: tool2 } = vcAssertUtil.assertToolBeltRendersTool(vc, randomId)
		assert.isEqual(tool2.id, randomId)
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
		vcAssertUtil.assertToolBeltRendersTool(vc, randomId)
	}

	@test.only()
	protected static canCheckInstanceOfTool() {
		let vc = this.ToolBeltSvc()

		assert.doesThrow(() =>
			vcAssertUtil.assertToolInstanceOf(
				vc.getToolBeltVc(),
				'add',
				CardViewController
			)
		)

		vcAssertUtil.assertToolInstanceOf(
			vc.getToolBeltVc(),
			'edit',
			CardViewController
		)

		vcAssertUtil.assertToolInstanceOf(
			vc.getToolBeltVc(),
			'edit',
			CardViewController
		)

		const randomId = `${new Date().getTime()}`

		vc = this.ToolBeltSvc({
			tool2Id: randomId,
		})

		vcAssertUtil.assertToolInstanceOf(
			vc.getToolBeltVc(),
			randomId,
			CardViewController
		)
	}

	private static ToolBeltSvc(options?: { tool2Id?: string }) {
		return this.Controller('toolBeltSvc', {
			toolBelt: {
				controller: 'waka' as any,
				tools: [
					{
						id: 'add',
						lineIcon: 'add',
						card: {} as any,
					},
					{
						id: options?.tool2Id ?? 'edit',
						lineIcon: 'edit',
						card: this.Controller('card', {}).render(),
					},
				],
			},
		})
	}
}
