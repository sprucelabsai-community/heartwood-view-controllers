import { SpruceSchemas } from '@sprucelabs/mercury-types'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		confirmTest: ConfirmTestSkillViewController
	}
}

export default class ConfirmTestSkillViewController extends AbstractSkillViewController {
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
