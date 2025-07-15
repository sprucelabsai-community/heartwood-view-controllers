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

    skillViewDoesNotRenderNavigator(vc: SkillViewController) {
        try {
            this.skillViewRendersNavigator(vc)
        } catch {
            // If it throws, it means it does not render the navigator
            return
        }

        assert.fail(
            `Your skill view is rendering a progress navigator! Make sure public renderProgressNavigator() is not implemented or returns null.`
        )
    },

    stepIsComplete(vc: ViewController<ProgressNavigator>, stepId: string) {
        const step = getStep(vc, stepId)

        assert.isTrue(
            step?.isComplete,
            `Step ${stepId} is not complete! Try this.progressNavigator.completeStep('${stepId}')!`
        )
    },

    stepIsNotComplete(vc: ViewController<ProgressNavigator>, stepId: string) {
        const step = getStep(vc, stepId)

        assert.isFalsy(
            step?.isComplete,
            `Step ${stepId} is complete and it should not be! Try this.progressNavigator.open('${stepId}') or call this.progressNavigator.completeStep('${stepId}') later!`
        )
    },

    rendersStep(vc: ViewController<ProgressNavigator>, stepId: string) {
        getStep(vc, stepId)
    },

    rendersSteps(vc: ViewController<ProgressNavigator>, stepIds: string[]) {
        stepIds.forEach((id) => this.rendersStep(vc, id))
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
function getStep(vc: ViewController<ProgressNavigator>, stepId: string) {
    const model = renderUtil.render(vc)
    const step = model.steps.find((s) => s.id === stepId)
    assert.isTruthy(
        step,
        `Step "${stepId}" does not exist in your progress nav!`
    )
    return step
}
