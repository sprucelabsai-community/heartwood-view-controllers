import { SchemaError } from '@sprucelabs/schema'
import {
	AbstractViewController,
	SpruceSchemas,
	ViewControllerOptions,
} from '..'
import SpruceError from '../errors/SpruceError'

type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
type Tool = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
export type ToolBeltViewControllerOptions = Partial<ViewModel>

export default class ToolBeltViewController extends AbstractViewController<ViewModel> {
	private model: ViewModel
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
		return this.model.tools
	}

	public getTool(id: string) {
		return this.model.tools.find((t) => t.id === id)
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt {
		return { ...this.model, controller: this }
	}
}
