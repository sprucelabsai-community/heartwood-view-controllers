import AbstractSkillViewController from '../../../../../skillViewControllers/Abstract.svc'

export default class BookSkillViewController extends AbstractSkillViewController {
	public static id = 'reserve'

	public constructor(options: any) {
		super(options)
	}

	public getPlugins() {
		return this.plugins
	}

	public render() {
		return {}
	}
}
