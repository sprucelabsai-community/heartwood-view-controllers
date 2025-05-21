import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ProgressNavigatorViewControllerOptions } from '../../../viewControllers/progressNavigator/ProgressNavigator.vc'
import AbstractProgressNavigatorTest from './AbstractProgressNavigatorTest'

@suite()
export default class ControllingProgressNavigatorTest extends AbstractProgressNavigatorTest {
    @test()
    protected async throwsWithMissingOptions() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.Controller('progress-navigator', {})
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['steps'],
        })
    }

    @test()
    protected async throwsWithNoSteps() {
        const err = assert.doesThrow(() =>
            this.Controller('progress-navigator', { steps: [] })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['steps'],
        })
    }

    @test()
    protected async canCreateWithRequiredOptions() {
        this.Vc({
            steps: [this.generatRandomStep()],
        })
    }

    @test()
    protected rendersModel() {
        const step1 = this.generatRandomStep()
        const step2 = this.generatRandomStep()

        const options: ProgressNavigatorViewControllerOptions = {
            steps: [step1, step2],
            currentStepId: step2.id,
            lineIcon: randomUtil.rand(['add', 'checkmark']),
            processLabel: generateId(),
        }

        this.reload(options)
        assert.isEqualDeep(this.renderVc(), { ...options, controller: this.vc })
    }

    @test()
    protected async throwsWhenTryingToCompleteStepThatDoesNotExist() {
        this.reload({
            steps: [this.generatRandomStep()],
        })

        this.assertCompleteStepThrowsInvalidStepId(generateId())
        this.assertEpectedRenderCount(0)
    }

    @test()
    protected async canCompleteStepThatDoesExist() {
        const { step1, step2 } = this.reloadWith2Steps()

        this.completeStep(step1.id)
        this.assertStepAtIdxIsComplete(0)

        this.assertEpectedRenderCount(1)
        this.completeStep(step2.id)

        this.assertStepAtIdxIsComplete(1)
    }

    @test()
    protected async settingCurrentStepThrowsIfStepDoesNotExist() {
        this.reload({
            steps: [this.generatRandomStep()],
        })

        this.assertSettingCurrentStepThrows(generateId())
        this.assertEpectedRenderCount(0)
    }

    @test()
    protected async canSetCurrentStep() {
        const { step1, step2 } = this.reloadWith2Steps()

        this.setCurrentStep(step1.id)
        this.assertCurrentStep(step1.id)
        this.assertEpectedRenderCount(1)

        this.setCurrentStep(step2.id)
        this.assertCurrentStep(step2.id)
        this.assertEpectedRenderCount(2)
    }

    @test()
    protected async defaultsFirstStepToCurrentStep() {
        const { step1 } = this.reloadWith2Steps()

        this.assertCurrentStep(step1.id)
    }

    @test()
    protected async throwsWhenStartingWithCurrentStepThatDoesNotExist() {
        const step1 = this.generatRandomStep()
        const step2 = this.generatRandomStep()

        this.assertActionThrowsInvalidStepId(() =>
            this.Vc({
                steps: [step1, step2],
                currentStepId: generateId(),
            })
        )
    }

    @test()
    protected async canOpenSteps() {
        const { step1 } = this.reloadWith2Steps()

        this.assertActionThrowsInvalidStepId(() => this.openStep(generateId()))
        this.assertOpenStepNotCompletedThrows(step1.id)
        this.completeStep(step1.id)
        this.openStep(step1.id)
    }

    @test()
    protected actuallyMarksStepAsNotIsComplete() {
        const { step1, step2 } = this.reloadWith2Steps()

        this.completeStep(step1.id)
        this.openStep(step1.id)
        this.assertStepAtIdxIsNotComplete(0)

        this.completeStep(step2.id)
        this.openStep(step2.id)
        this.assertStepAtIdxIsNotComplete(1)
    }

    @test()
    protected async openingTriggersRender() {
        const { step1 } = this.reloadWith2Steps()
        this.completeStep(step1.id)
        this.assertEpectedRenderCount(1)
        this.openStep(step1.id)
        this.assertEpectedRenderCount(2)
    }

    @test()
    protected async canOpenStepAndEverythingAfter() {
        const steps = this.reloadWithTotalSteps(4)
        const id = steps[0].id

        this.completeStep(id)
        this.openStepAndAllAfter(id)
        this.assertStepAtIdxIsNotComplete(0)

        this.completeStep(id)
        this.completeStep(steps[1].id)
        this.completeStep(steps[2].id)
        this.completeStep(steps[3].id)

        this.assertStepAtIdxIsComplete(2)
        this.assertStepAtIdxIsComplete(3)

        this.openStepAndAllAfter(steps[2].id)

        this.assertStepAtIdxIsComplete(1)
        this.assertStepAtIdxIsNotComplete(2)
        this.assertStepAtIdxIsNotComplete(3)
    }

    @test()
    protected async resetOpensAllSteps() {
        const steps = this.reloadWithTotalSteps(4)

        this.completeStep(steps[0].id)
        this.completeStep(steps[1].id)
        this.completeStep(steps[2].id)
        this.completeStep(steps[3].id)

        this.reset()

        this.assertStepAtIdxIsNotComplete(0)
        this.assertStepAtIdxIsNotComplete(1)
        this.assertStepAtIdxIsNotComplete(2)
        this.assertStepAtIdxIsNotComplete(3)
    }

    @test()
    protected async resetJumpsBackToFirstStep() {
        const steps = this.reloadWithTotalSteps(4)

        this.setCurrentStep(steps[3].id)

        this.reset()

        this.assertCurrentStep(steps[0].id)
    }

    @test()
    protected async openStepsAfterOnlyTriggersRenderOnce() {
        const steps = this.reloadWithTotalSteps(4)

        this.completeStep(steps[0].id)
        this.completeStep(steps[1].id)
        this.completeStep(steps[2].id)
        this.completeStep(steps[3].id)

        this.assertEpectedRenderCount(4)

        this.openStepAndAllAfter(steps[0].id)

        this.assertEpectedRenderCount(5)
    }

    @test()
    protected async resetTriggersRenderOnce() {
        const steps = this.reloadWithTotalSteps(4)

        this.completeStep(steps[0].id)

        this.assertEpectedRenderCount(1)

        this.reset()

        this.assertEpectedRenderCount(2)
    }

    @test()
    protected async canSetCurrentStepAndCompleteAllBefore() {
        const steps = this.reloadWithTotalSteps(4)

        const id = steps[3].id
        this.setCurrentStepAndCompletePrevious(id)
        this.assertCurrentStep(id)

        this.assertStepAtIdxIsComplete(0)
        this.assertStepAtIdxIsComplete(1)
        this.assertStepAtIdxIsComplete(2)
        this.assertStepAtIdxIsNotComplete(3)

        this.setCurrentStepAndCompletePrevious(steps[2].id)
        this.assertCurrentStep(steps[2].id)

        this.assertStepAtIdxIsComplete(0)
        this.assertStepAtIdxIsComplete(1)
        this.assertStepAtIdxIsNotComplete(2)
    }

    @test()
    protected async setCurrentStepAndCompleteAllBeforeTriggersRenderOnce() {
        const steps = this.reloadWithTotalSteps(4)

        const id = steps[3].id
        this.setCurrentStepAndCompletePrevious(id)
        this.assertEpectedRenderCount(1)

        this.setCurrentStepAndCompletePrevious(steps[2].id)
        this.assertEpectedRenderCount(2)
    }

    private setCurrentStepAndCompletePrevious(id: string) {
        this.vc.setCurrentStepAndCompletePrevious(id)
    }

    private reset() {
        this.vc.reset()
    }

    private openStepAndAllAfter(id: any) {
        return this.vc.openStepAndAllAfter(id)
    }

    private reloadWith2Steps() {
        const steps = this.reloadWithTotalSteps(2)
        return { step1: steps[0], step2: steps[1] }
    }

    private reloadWithTotalSteps(total: number) {
        const steps = new Array(total)
            .fill(0)
            .map(() => this.generatRandomStep())

        this.reload({
            steps,
        })
        return steps
    }

    private assertOpenStepNotCompletedThrows(stepId: string) {
        this.assertThrowsStepNotComplete(() => this.openStep(stepId), stepId)
    }

    private assertThrowsStepNotComplete(action: () => any, stepId: string) {
        const err = assert.doesThrow(action)
        errorAssert.assertError(err, 'STEP_NOT_COMPLETE', {
            stepId,
        })
    }

    private openStep(id: string): any {
        return this.vc.openStep(id)
    }

    private assertSettingCurrentStepThrows(id: string) {
        this.assertActionThrowsInvalidStepId(() => this.setCurrentStep(id))
    }

    private assertCurrentStep(id: string) {
        const model = this.renderVc()
        assert.isEqual(
            model.currentStepId,
            id,
            `Current step is not ${id}, it's ${model.currentStepId}`
        )
        assert.isEqual(this.vc.getCurrentStep(), id)
    }

    private assertStepAtIdxIsComplete(idx: number) {
        let model = this.renderVc()
        const step = model.steps[idx]
        assert.isTrue(step.isComplete, `Step at ${idx} is not complete`)
        assert.isTrue(this.vc.isStepComplete(step.id))
    }

    private assertStepAtIdxIsNotComplete(idx: number) {
        let model = this.renderVc()
        const step = model.steps[idx]
        assert.isFalsy(
            step.isComplete,
            `Step at ${idx} is complete and should not be`
        )
        assert.isFalse(this.vc.isStepComplete(step.id))
    }

    private renderVc() {
        return this.render(this.vc)
    }

    private assertEpectedRenderCount(expected: number) {
        vcAssert.assertTriggerRenderCount(this.vc, expected)
    }

    private assertCompleteStepThrowsInvalidStepId(stepId: string) {
        const action = () => this.completeStep(stepId)
        this.assertActionThrowsInvalidStepId(action)
    }

    private assertActionThrowsInvalidStepId(action: () => any) {
        const err = assert.doesThrow(action)
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['stepId'],
        })
    }
}
