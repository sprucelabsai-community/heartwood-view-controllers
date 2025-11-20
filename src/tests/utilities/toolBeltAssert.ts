import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    AppController,
    Card,
    SkillViewController,
    StickyToolPosition,
    ToolBelt,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ToolBeltViewController, {
    OpenToolBeltOptions,
} from '../../viewControllers/ToolBelt.vc'
import { assertToolInstanceOf, getVcName, wait } from './assertSupport'

const toolBeltAssert = {
    async actionFocusesTool(
        svcOrToolBelt: Controller | ToolBeltViewController,
        toolId: string,
        action: () => Promise<any> | any
    ) {
        const toolBeltVc = this.rendersToolBelt(svcOrToolBelt, false)

        let passedToolId: any

        toolBeltVc.focusTool = (id: string) => {
            passedToolId = id
        }

        await wait(action())

        this.toolBeltRendersTool(svcOrToolBelt, toolId)

        assert.isTruthy(
            passedToolId,
            `I expected you to focus the tool '${toolId}', but you didn't! Try 'this.toolBeltVc.focusTool('${toolId}')'`
        )

        assert.isEqual(
            passedToolId,
            toolId,
            `You did not focus the tool I expected. I was waiting for '${toolId}' but got '${passedToolId}'.`
        )
    },

    async actionOpensToolBelt(
        svcOrToolBelt: Controller | ToolBeltViewController,
        action: () => Promise<any> | any,
        options?: OpenToolBeltOptions
    ) {
        const toolBeltVc = this.rendersToolBelt(svcOrToolBelt, false)
        let wasForced = false

        toolBeltVc.open = (actualOptions) => {
            if (options) {
                assert.isEqualDeep(
                    actualOptions,
                    options,
                    `The options passed to 'toolBeltSvc.show(...) did not match what I expected.' `
                )
            }
            wasForced = true
        }

        await action()

        assert.isTrue(
            wasForced,
            `I expected you to call 'toolBeltVc.open()', but you didn't!`
        )
    },

    async actionDoesNotOpenToolBelt(
        svcOrToolBelt: Controller | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        try {
            await this.actionOpensToolBelt(svcOrToolBelt, action)
        } catch {
            return
        }

        assert.fail(
            `I didn't expect you to call 'toolBeltVc.open()', but you did!`
        )
    },

    async actionClosesToolBelt(
        svcOrToolBelt: Controller | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        const toolBeltVc = this.rendersToolBelt(svcOrToolBelt, false)
        let wasForced = false

        toolBeltVc.close = () => {
            wasForced = true
        }

        await action()

        assert.isTrue(
            wasForced,
            `I expected you to call 'toolBeltVc.close()', but you didn't!`
        )
    },

    async actionDoesNotCloseToolBelt(
        svcOrToolBelt: Controller | ToolBeltViewController,
        action: () => Promise<any> | any
    ) {
        try {
            await this.actionClosesToolBelt(svcOrToolBelt, action)
        } catch {
            return
        }

        assert.fail(
            `I didn't expect you to call 'toolBeltVc.close()', but you did!`
        )
    },

    rendersToolBelt(
        svcOrToolBelt: Controller | ToolBeltViewController,
        assertHasAtLeast1Tool = true
    ) {
        let toolBelt: ToolBelt | undefined | null

        if (svcOrToolBelt instanceof ToolBeltViewController) {
            toolBelt = svcOrToolBelt.render()
        } else {
            toolBelt = svcOrToolBelt?.renderToolBelt?.()

            assert.isTruthy(
                toolBelt,
                `Your skill view '${getVcName(
                    svcOrToolBelt
                )}' needs\n\n'public renderToolBelt() { return this.toolBeltVc.render() }'`
            )
        }

        if (assertHasAtLeast1Tool) {
            assert.isTrue(
                (toolBelt?.tools?.length ?? 0) > 0,
                'Your tool belt does not render any tools! You can try toolBeltVc.addTool(...)?'
            )
        }

        return toolBelt?.controller as ToolBeltViewController
    },

    toolBeltDoesNotRenderStickyTools(
        svcOrToolBelt: SkillViewController | ToolBeltViewController
    ) {
        const vc = this.rendersToolBelt(svcOrToolBelt, false)

        assert.isFalsy(
            vc.getStickyTools().top ?? vc.getStickyTools().bottom,
            `Your tool belt renders sticky tools and I did not expect it to!`
        )
    },

    toolInstanceOf(
        svcOrToolBelt: SkillViewController | ToolBeltViewController,
        toolId: string,
        Class: any
    ): ViewController<any> {
        const vc = this.rendersToolBelt(svcOrToolBelt)
        const tool = vc.getTool(toolId)
        assert.isTruthy(tool, `The tool '${toolId}' does not exist!`)

        const match = assertToolInstanceOf(tool, Class)
        assert.isTruthy(
            match,
            `The tool '${toolId}' wasn't an instance of a '${Class.name}'`
        )

        return match
    },

    toolBeltDoesNotRenderTool(
        svc: SkillViewController | ToolBeltViewController,
        toolId: string
    ) {
        try {
            this.toolBeltRendersTool(svc, toolId)
        } catch {
            return
        }
        assert.fail(`You rendered the tool '${toolId}' and should not have!`)
    },

    toolBeltStickyToolInstanceOf(options: {
        toolBeltVc: ToolBeltViewController
        position: StickyToolPosition
        Class: any
    }) {
        const { position, toolBeltVc, Class } = assertOptions(options, [
            'toolBeltVc',
            'position',
            'Class',
        ])

        //@ts-ignore
        const tool = toolBeltVc.getStickyTools()[position]

        assert.isTruthy(
            tool,
            `It appears you have no sticky tool set in position '${position}'! try 'this.toolBeltVc.addStickyTool(...)'!`
        )

        const match = assertToolInstanceOf(tool, Class)

        assert.isTruthy(
            match,
            `The sticky tool at the ${position} is not an instance of '${Class.name}'`
        )

        return match
    },

    toolBeltRendersTool(
        svcOrToolBelt: Controller | ToolBeltViewController,
        toolId: string
    ) {
        const toolBeltVc = this.rendersToolBelt(svcOrToolBelt)

        const model = renderUtil.render(toolBeltVc)
        const tool = model.tools.find((t) => t.id === toolId)

        assert.isTruthy(
            tool,
            `I could not find a tool with the id of '${toolId}' in your ToolBelt. Try this.toolBeltVc.addTool({...}).`
        )

        return tool.card.controller as ViewController<Card>
    },

    doesNotRenderToolBelt(svc: Controller) {
        try {
            this.rendersToolBelt(svc)
        } catch {
            return
        }

        assert.fail(
            `Your skill view should not be rendering a toolbelt with tools`
        )
    },

    hidesToolBelt(svc: Controller) {
        const toolBelt = svc.renderToolBelt?.()
        assert.isNull(
            toolBelt,
            `I expected renderToolbelt() to return null, but it did not.`
        )
    },
}

export default toolBeltAssert

type Controller = SkillViewController | AppController
