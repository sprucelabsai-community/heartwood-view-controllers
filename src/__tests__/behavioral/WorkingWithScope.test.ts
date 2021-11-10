import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { AbstractSkillViewController } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		check: ScopeChecker
	}
}

class ScopeChecker extends AbstractSkillViewController {
	public loadArgs = {}
	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [],
		}
	}

	public async load() {}
}

export default class WorkingWithScopeTest extends AbstractViewControllerTest {
	public static controllerMap = {
		check: ScopeChecker,
	}

	@test()
	protected static async canCreateWorkingWithScope() {
		const vc = this.Controller('check', {})
		assert.isEqualDeep(vc.loadArgs, {})
	}
}
