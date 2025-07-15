import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import progressNavigatorAssert from '../../../tests/utilities/progressNavigatorAssert'
import AbstractProgressNavigatorTest from './AbstractProgressNavigatorTest'
import {
    NoProgressSkillView,
    WithProgressSkillView,
    WithProgressWithoutControllerSkillView,
} from './supportingSkillViews'

@suite()
export default class AssertingProgressNavigatorTest extends AbstractProgressNavigatorTest {
    protected controllerMap = {
        'no-progress': NoProgressSkillView,
        'with-progress': WithProgressSkillView,
        'with-progress-without-controller':
            WithProgressWithoutControllerSkillView,
    }

    @test()
    protected async throwsIfSkillViewIsNotRenderingNavigator() {
        this.assertDoesNotRenderProgressNavigator('no-progress')
        this.assertDoesNotRenderProgressNavigator(
            'with-progress-without-controller'
        )
    }

    @test()
    protected async passesIfFindsNavigator() {
        this.assertRendersProgressNavigator('with-progress')
    }

    @test()
    protected async returnsProgressNavigatorController() {
        const vc = this.Controller('with-progress' as any, {})
        const navigator = this.assertSkillViewRendersProgressNavigator(vc)
        assert.isEqual(navigator, vc.progressNavigator)
    }

    @test()
    protected async throwsWhenStepNotComplete() {
        const step1 = this.generatRandomStep()
        const step2 = this.generatRandomStep()
        const step3 = this.generatRandomStep()
        this.reload({
            steps: [step1, step2, step3],
        })

        this.assertStepCompleteThrows(step2.id)
        this.assertStepCompleteThrows(step3.id)
    }

    @test()
    protected async passesWhenStepComplete() {
        const { step1, step2 } = this.NavigatorWith2Steps()

        this.completeStep(step1.id)
        this.assertStepIsComplete(step1.id)
        this.completeStep(step2.id)
        this.assertStepIsComplete(step2.id)
    }

    @test()
    protected async throwsWhenCurrentStepNotMatched() {
        const { step2 } = this.NavigatorWith2Steps()
        this.assertAssertingCurrentStepThrows(generateId())
        this.assertAssertingCurrentStepThrows(step2.id)
    }

    @test()
    protected async passesWhenCurrentStepMatched() {
        const { step1, step2 } = this.NavigatorWith2Steps()
        this.assertCurrentStep(step1.id)
        this.setCurrentStep(step2.id)
        this.assertCurrentStep(step2.id)
    }

    @test()
    protected async throwsWhenNotRenderingStep() {
        this.NavigatorWith2Steps()
        assert.doesThrow(() => this.assertRendersStep(generateId()))
        this.assertingRenderStepsThrows([generateId()])
    }

    @test()
    public async passesWhenRenderingStep() {
        const { step1, step2 } = this.NavigatorWith2Steps()

        this.assertRendersStep(step1.id)
        this.assertRendersStep(step2.id)
        this.assertRendersSteps([step1.id])
        this.assertingRenderStepsThrows([step1.id, generateId()])
    }

    private assertingRenderStepsThrows(buttons: string[]) {
        assert.doesThrow(() => this.assertRendersSteps(buttons))
    }

    protected assertRendersStep(button: string) {
        return progressNavigatorAssert.rendersStep(this.vc, button)
    }
    protected assertRendersSteps(buttons: string[]) {
        return progressNavigatorAssert.rendersSteps(this.vc, buttons)
    }

    private assertStepCompleteThrows(stepId: string) {
        assert.doesThrow(() => this.assertStepIsComplete(stepId))
        progressNavigatorAssert.stepIsNotComplete(this.vc, stepId)
    }

    private assertAssertingCurrentStepThrows(id: string) {
        assert.doesThrow(() => this.assertCurrentStep(id))
    }

    private assertCurrentStep(id: string): any {
        progressNavigatorAssert.currentStep(this.vc, id)
    }

    private NavigatorWith2Steps() {
        const step1 = this.generatRandomStep()
        const step2 = this.generatRandomStep()

        this.reload({
            steps: [step1, step2],
        })
        return { step1, step2 }
    }

    private assertStepIsComplete(stepId: string) {
        progressNavigatorAssert.stepIsComplete(this.vc, stepId)
        assert.doesThrow(() =>
            progressNavigatorAssert.stepIsNotComplete(this.vc, stepId)
        )
    }

    private assertDoesNotRenderProgressNavigator(id: string) {
        const vc = this.Controller(id as any, {})
        assert.doesThrow(() => this.assertSkillViewRendersProgressNavigator(vc))
        progressNavigatorAssert.skillViewDoesNotRenderNavigator(vc)
    }

    private assertSkillViewRendersProgressNavigator(vc: any): any {
        return progressNavigatorAssert.skillViewRendersNavigator(vc)
    }

    private assertRendersProgressNavigator(id: string) {
        const vc = this.Controller(id as any, {})
        this.assertSkillViewRendersProgressNavigator(vc)
        assert.doesThrow(() =>
            progressNavigatorAssert.skillViewDoesNotRenderNavigator(vc)
        )
    }
}
