import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { renderUtil, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ToolBeltViewController from '../../../viewControllers/ToolBelt.vc'

@suite()
export default class ControllingTheToolBeltTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    protected vc!: ToolBeltViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('tool-belt', {})
    }

    @test()
    protected async canCreateControllingTheToolBelt() {
        const vc = this.Controller('tool-belt', {})
        assert.isTruthy(vc)
    }

    @test('renders model passed to constructor 1', {
        tools: [],
    })
    @test('renders model passed to constructor 2', {
        tools: [
            {
                linIcon: 'waka',
            },
        ],
    })
    protected rendersToolBeltPassedToIt(model: any) {
        const vc = this.Controller('tool-belt', model)
        const actual = renderUtil.render(vc)
        delete actual.controller

        assert.isEqualDeep(actual, model)
    }

    @test()
    protected canAddTool() {
        assert.isFunction(this.vc.addTool)

        const tool = toolGenerator.generateTool()
        this.vc.addTool(tool)

        const model = renderUtil.render(this.vc)

        assert.isEqualDeep(model.tools[0], tool)
    }

    @test()
    protected canAdd2Tools() {
        this.vc.addTool(toolGenerator.generateTool())
        this.vc.addTool(toolGenerator.generateTool('maps_2'))

        const model = renderUtil.render(this.vc)

        assert.isEqualDeep(
            model.tools,
            toolGenerator.generateTools([
                {
                    id: 'maps',
                    lineIcon: 'map',
                },
                {
                    id: 'maps_2',
                    lineIcon: 'map',
                },
            ])
        )
    }

    @test()
    protected cantAddToolWithSameSlugTwice() {
        this.vc.addTool(toolGenerator.generateTool())

        const err = assert.doesThrow(() =>
            this.vc.addTool({
                id: 'maps',
                lineIcon: 'map',
                card: {} as any,
            })
        )

        errorAssert.assertError(err, 'DUPLICATE_TOOL_ID')
    }

    @test()
    protected cantRemoveToolThatAlreadyExists() {
        const err = assert.doesThrow(() => this.vc.removeTool('map'))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['id'],
        })
    }

    @test()
    protected canRemoveTool() {
        this.vc.addTool(toolGenerator.generateTool())

        this.vc.removeTool('maps')
        const model = renderUtil.render(this.vc)
        assert.isLength(model.tools, 0)
    }

    @test()
    protected canRemoveAfterAddingTwo() {
        this.vc.addTool(toolGenerator.generateTool())
        this.vc.addTool(toolGenerator.generateTool('maps_2'))

        this.vc.removeTool('maps')
        const model = renderUtil.render(this.vc)

        assert.isEqualDeep(model.tools[0], toolGenerator.generateTool('maps_2'))
    }

    @test()
    protected triggersRenderWhenAddingAndRemovingTool() {
        this.vc.addTool({ id: 'go', card: {} as any, lineIcon: 'video' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.vc.removeTool('go')
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected renderReturnsController() {
        const model = this.render(this.vc)
        assert.isTrue(model.controller === this.vc)
    }

    @test()
    protected allToolsIsEmptyToStart() {
        const tools = this.vc.getTools()
        assert.isLength(tools, 0)
    }

    @test()
    protected getsBackTools() {
        this.vc.addTool(toolGenerator.generateTool('maps_2'))

        const tools = this.vc.getTools()

        assert.isEqualDeep(tools, [toolGenerator.generateTool('maps_2')])
    }

    @test()
    protected canClearTools() {
        this.addTool('tool_1')
        this.addTool('tool_2')
        this.addTool('tool_3')

        this.vc.clearTools()

        assert.isEqualDeep(this.vc.getTools(), [])
    }

    @test()
    protected canSetOneTool() {
        this.assertCanSetTools(1)
    }

    @test()
    protected canSetTwoTools() {
        this.assertCanSetTools(2)
    }

    @test()
    protected canGetToolBackById() {
        this.vc.addTool(toolGenerator.generateTool('maps_2'))

        assert.isEqualDeep(
            this.vc.getTool('maps_2'),
            toolGenerator.generateTool('maps_2')
        )

        this.vc.addTool(toolGenerator.generateTool('maps_4', 'add'))

        assert.isEqualDeep(
            this.vc.getTool('maps_4'),
            toolGenerator.generateTool('maps_4', 'add')
        )
    }

    @test()
    protected returnsCopyOfArrayOfTools() {
        this.addTool()

        const tools1 = this.vc.getTools()
        const tools2 = this.vc.getTools()

        assert.isNotEqual(tools1, tools2)
    }

    @test('cant find tool that does not exist 1', 'taco')
    @test('cant find tool that does not exist 1', 'taco-tuesday')
    protected cantFocusToolThatDoesNotExist(id: string) {
        const err = assert.doesThrow(() => this.vc.focusTool(id))
        errorAssert.assertError(err, 'TOOL_NOT_FOUND', {
            id,
        })
    }

    @test('can focus tool 1', 'testing')
    @test('can focus tool 2', 'testing-again')
    protected async invokesFocusHandler(id: string) {
        let wasHit = false
        let passedId: any

        this.addTool(id)

        //@ts-ignore
        this.vc.handleFocusTool = (id: string) => {
            wasHit = true
            passedId = id
        }

        this.vc.focusTool(id)

        assert.isTrue(wasHit)
        assert.isEqual(passedId, id)
    }

    @test()
    protected async doesNotTriggerFocusHandlerForToolNotFound() {
        let wasHit = false

        //@ts-ignore
        this.vc.handleFocusTool = () => {
            wasHit = true
        }

        assert.doesThrow(() => this.vc.focusTool('cheesy'))
        assert.isFalse(wasHit)
    }

    private addTool(id = 'maps_2') {
        this.vc.addTool(toolGenerator.generateTool(id))
    }

    private assertCanSetTools(total: number) {
        const tools = toolGenerator.generateTools(total)
        this.vc.setTools(tools)
        assert.isEqualDeep(tools, this.vc.getTools())
    }
}

type Tool = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
type LineIcon =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineIcon['name']

const toolGenerator = {
    generateTools(tools: number | Omit<Tool, 'card'>[]) {
        if (typeof tools === 'number') {
            return new Array(tools)
                .fill(0)
                .map((_, idx) => this.generateTool(`tool_${idx}`))
        }
        return tools.map((t) => this.generateTool(t.id, t.lineIcon))
    },
    generateTool(id?: string, lineIcon?: LineIcon): Tool {
        return {
            id: id ?? 'maps',
            lineIcon: lineIcon ?? 'map',
            card: {} as any,
        }
    },
}
