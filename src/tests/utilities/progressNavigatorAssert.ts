import { assert } from '@sprucelabs/test-utils'
import {
	ProgressNavigator,
	SkillViewController,
	ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { getVcName } from './assertSupport'

const progressNavigatorAssert = {
	skillViewRendersNavigator(vc: SkillViewController) {
		const navigator = vc.renderProgressNavigator?.()

		assert.isTruthy(
			navigator,
			`Skill view controller ${getVcName(
				vc
			)} does not render a progress navigator. Make sure to implement 'public renderProgressNavigator()' in your skill view controller.`
		)

		assert.isTruthy(
			navigator.controller,
			`Progress navigator for skill view controller ${getVcName(
				vc
			)} did not render using a controller! Do something like 'this.progressNavigator.render()' in your renderProgressNavigator() method.`
		)

		return navigator.controller
	},

	stepIsComplete(vc: ViewController<ProgressNavigator>, stepId: string) {
		const model = renderUtil.render(vc)
		const step = model.steps.find((s) => s.id === stepId)

		assert.isTrue(
			step?.isComplete,
			`Step ${stepId} is not complete! Try this.progressNavigator.completeStep('${stepId}')!`
		)
	},

	currentStep(vc: ViewController<ProgressNavigator>, stepId: string) {
		const model = renderUtil.render(vc)
		assert.isEqual(
			model.currentStepId,
			stepId,
			`Step ${stepId} is not current! Make sure you call this.progressNavigator.setCurrentStep('${stepId}')!`
		)
	},
}

export default progressNavigatorAssert
