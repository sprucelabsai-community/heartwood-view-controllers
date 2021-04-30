import {
	SkillView,
	SkillViewController,
	SkillViewControllerLoadOptions,
} from '../types/heartwood.types'

export class SpySkillViewController implements SkillViewController {
	public id = 'test'
	public triggerRender!: () => void

	public invocations: Record<string, number> = {
		render: 0,
		load: 0,
	}
	public lastLoadOptions?: SkillViewControllerLoadOptions

	public constructor(id: string) {
		this.id = id
	}

	public async load(options: SkillViewControllerLoadOptions): Promise<void> {
		this.invocations.load++
		this.lastLoadOptions = options
	}

	public render(): SkillView {
		this.invocations.render++
		return {
			layouts: [],
		}
	}
}
