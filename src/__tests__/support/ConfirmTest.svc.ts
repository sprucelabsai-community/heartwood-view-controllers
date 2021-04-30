import { SpruceSchemas } from '@sprucelabs/mercury-types'
import AbstractSkillViewController from '../../viewControllers/Abstract.svc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		confirmTest: typeof ConfirmTestSkillViewController
	}
}

export default class ConfirmTestSkillViewController extends AbstractSkillViewController {
	public id = 'confirmTest'

	public async confirmShouldSave() {
		const confirm = await this.confirm({ message: 'You sure?' })
		return confirm
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.SkillView {
		return {
			layouts: [],
		}
	}
}
