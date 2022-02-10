import { assertOptions, SchemaError } from '@sprucelabs/schema'
import {
	AbstractViewController,
	SpruceSchemas,
	StickyTool,
	StickyToolPosition,
	ViewControllerOptions,
} from '..'
import SpruceError from '../errors/SpruceError'

type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
type Tool = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
export type ToolBeltViewControllerOptions = Partial<ViewModel>

export default class ToolBeltViewController extends AbstractViewController<ViewModel> {
	private model: ViewModel
	private handleFocusTool = (_id: string) => {}
	private stickyTools: Record<StickyToolPosition, Tool> = {}

	public constructor(
		options: ToolBeltViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.model = {
			tools: options.tools ?? [],
		}

		if (options.lineIcon) {
			this.model.lineIcon = options.lineIcon
		}
	}

	public addTool(tool: Tool) {
		if (this.model.tools.find((t) => t.id === tool.id)) {
			throw new SpruceError({
				code: 'DUPLICATE_TOOL_ID',
				id: tool.id,
			})
		}

		this.model.tools.push(tool)
		this.triggerRender()
	}

	public setStickyTool(sticky: StickyTool) {
		assertOptions(sticky, ['card', 'lineIcon', 'position'])

		const { position, ...tool } = sticky

		this.stickyTools[position] = { id: position, ...tool }
	}

	public getStickyTools() {
		return this.stickyTools
	}

	public setTools(
		tools: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool[]
	) {
		this.model.tools = tools
	}

	public removeTool(id: string) {
		const idx = this.model.tools.findIndex((t) => t.id === id)
		if (idx === -1) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['id'],
				friendlyMessages: [`I couldn't find a tool with the id ${id}.`],
			})
		}

		this.model.tools.splice(idx, 1)
		this.triggerRender()
	}

	public getTools() {
		return [...this.model.tools]
	}

	public clearTools() {
		this.model.tools = []
	}

	public getTool(id: string) {
		return this.model.tools.find((t) => t.id === id)
	}

	public focusTool(id: string) {
		const tool = this.getTool(id)

		if (!tool) {
			throw new SpruceError({ code: 'TOOL_NOT_FOUND', id })
		}

		this.handleFocusTool(id)
	}

	public renderTools(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool[] {
		const tools = [...this.model.tools]
		if (this.stickyTools.top) {
			tools.unshift(this.stickyTools.top)
		}

		if (this.stickyTools.bottom) {
			tools.push(this.stickyTools.bottom)
		}

		return tools
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt {
		return { ...this.model, controller: this, tools: this.renderTools() }
	}
}
