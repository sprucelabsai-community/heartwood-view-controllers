import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { StickyTool, StickyToolPosition } from '../../../types/calendar.types'
import ToolBeltViewController from '../../../viewControllers/ToolBelt.vc'

export default class AddingStickyToolsToToolBeltTest extends AbstractViewControllerTest {
	private static vc: ToolBeltViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('toolBelt', {})
	}

	@test()
	protected static hasAddStickTool() {
		assert.isFunction(this.vc.setStickyTool)
	}

	@test()
	protected static canAddStickTool() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setStickyTool())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['card', 'lineIcon', 'position'],
		})
	}

	@test()
	protected static canAddSticky() {
		this.setStickyTool()
	}

	@test('renders tool 1', 'test', 'add')
	@test('renders tool 2', 'test-2', 'square')
	protected static stickyToolGetsRendered(id: string, lineIcon: any) {
		const tool: Tool = {
			card: {} as any,
			id,
			lineIcon,
		}

		this.setStickyTool(tool)

		vcAssert.assertToolBeltRendersTool(this.vc, id)

		const tools = this.render(this.vc).tools
		assert.isEqualDeep(tools[0], tool)
	}

	@test()
	protected static stickyToolGoesToTop() {
		this.addTool()

		const tool = this.setStickyTool()

		const model = this.render(this.vc)
		const renderedTool = model.tools[0]

		//@ts-ignore
		this.assertToolsMatch({ ...tool, id: 'top' }, renderedTool)
	}

	@test()
	protected static noToolsInToolBeltToStart() {
		const tools = this.render(this.vc).tools
		assert.isLength(tools, 0)
	}

	@test()
	protected static rendersExpectedToolsMoreThanOnce() {
		this.setStickyTool()

		this.render(this.vc)
		this.render(this.vc)
		this.render(this.vc)

		//@ts-ignore
		assert.isLength(this.vc.model.tools, 0)
	}

	@test()
	protected static canSetBottomStickyTool() {
		const tool = this.setStickyTool({
			position: 'bottom',
		})

		this.addTool()

		const tools = this.render(this.vc).tools

		//@ts-ignore
		this.assertToolsMatch({ ...tool, id: 'bottom' }, tools[1])
	}

	@test(`can't remove bottom sticky if not found`, 'bottom')
	@test(`can't remove top sticky if not found`, 'top')
	protected static removingStickyThrowsIfNotSet(position: StickyToolPosition) {
		const err = assert.doesThrow(() => this.vc.removeStickyTool(position))
		errorAssert.assertError(err, 'TOOL_NOT_FOUND', {
			id: position,
		})
	}

	@test('can remove bottom sticky', 'bottom')
	@test('can remove top sticky', 'top')
	protected static canRemoveSticky(position: StickyToolPosition) {
		this.setStickyTool({
			position,
		})

		this.vc.removeStickyTool(position)

		this.assertRendersTotalTools(0)
	}

	@test()
	protected static clearsOnlyStickyTool() {
		this.setStickyTool({
			position: 'top',
		})

		this.setStickyTool({
			position: 'bottom',
		})

		this.vc.removeStickyTool('bottom')
		this.assertRendersTotalTools(1)
	}

	@test()
	protected static removingStickyToolTriggersRender() {
		this.setStickyTool({ position: 'top' })
		this.vc.removeStickyTool('top')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	private static assertRendersTotalTools(expected: number) {
		const tools = this.render(this.vc).tools
		assert.isLength(tools, expected)
	}

	private static assertToolsMatch(
		tool: StickyTool,
		renderedTool: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
	) {
		//@ts-ignore
		delete tool.position

		//@ts-ignore
		assert.isEqualDeep(renderedTool, tool)
	}

	private static addTool() {
		this.vc.addTool({
			id: 'zebra',
			card: {} as any,
			lineIcon: 'add',
		})
	}

	private static setStickyTool(tool?: Partial<StickyTool>) {
		const built: StickyTool = {
			lineIcon: 'add-circle',
			position: 'top',
			card: {} as any,
			...tool,
		}

		this.vc.setStickyTool(built)

		return built
	}
}

type Tool = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
