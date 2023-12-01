import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ProgressNavigatorViewControllerOptions } from '../../../viewControllers/progressNavigator/ProgressNavigator.vc'
import AbstractProgressNavigatorTest from './AbstractProgressNavigatorTest'

export default class ControllingProgressNavigatorTest extends AbstractProgressNavigatorTest {
	@test()
	protected static async throwsWithMissingOptions() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('progress-navigator', {})
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['steps'],
		})
	}

	@test()
	protected static async throwsWithNoSteps() {
		const err = assert.doesThrow(() =>
			this.Controller('progress-navigator', { steps: [] })
		)

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['steps'],
		})
	}

	@test()
	protected static async canCreateWithRequiredOptions() {
		this.Vc({
			steps: [this.generatRandomStep()],
		})
	}

	@test()
	protected static rendersModel() {
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
	protected static async throwsWhenTryingToCompleteStepThatDoesNotExist() {
		this.reload({
			steps: [this.generatRandomStep()],
		})

		this.assertCompleteStepThrowsInvalidStepId(generateId())
		this.assertEpectedRenderCount(0)
	}

	@test()
	protected static async canCompleteStepThatDoesExist() {
		const { step1, step2 } = this.reloadWith2Steps()

		this.completeStep(step1.id)
		this.assertStepAtIdxIsComplete(0)

		this.assertEpectedRenderCount(1)
		this.completeStep(step2.id)

		this.assertStepAtIdxIsComplete(1)
	}

	@test()
	protected static async settingCurrentStepThrowsIfStepDoesNotExist() {
		this.reload({
			steps: [this.generatRandomStep()],
		})

		this.assertSettingCurrentStepThrows(generateId())
		this.assertEpectedRenderCount(0)
	}

	@test()
	protected static async canSetCurrentStep() {
		const { step1, step2 } = this.reloadWith2Steps()

		this.setCurrentStep(step1.id)
		this.assertCurrentStep(step1.id)
		this.assertEpectedRenderCount(1)

		this.setCurrentStep(step2.id)
		this.assertCurrentStep(step2.id)
		this.assertEpectedRenderCount(2)
	}

	@test()
	protected static async defaultsFirstStepToCurrentStep() {
		const { step1 } = this.reloadWith2Steps()

		this.assertCurrentStep(step1.id)
	}

	@test()
	protected static async throwsWhenStartingWithCurrentStepThatDoesNotExist() {
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
	protected static async canOpenSteps() {
		const { step1 } = this.reloadWith2Steps()

		this.assertActionThrowsInvalidStepId(() => this.openStep(generateId()))
		await this.assertOpenStepNotCompletedThrows(step1.id)
		this.completeStep(step1.id)
		this.openStep(step1.id)
	}

	@test()
	protected static actuallyMarksStepAsNotIsComplete() {
		const { step1, step2 } = this.reloadWith2Steps()

		this.completeStep(step1.id)
		this.openStep(step1.id)
		this.assertStepAtIdxIsNotComplete(0)

		this.completeStep(step2.id)
		this.openStep(step2.id)
		this.assertStepAtIdxIsNotComplete(1)
	}

	@test()
	protected static async openingTriggersRender() {
		const { step1 } = this.reloadWith2Steps()
		this.completeStep(step1.id)
		this.assertEpectedRenderCount(1)
		this.openStep(step1.id)
		this.assertEpectedRenderCount(2)
	}

	@test()
	protected static async canOpenStepAndEverythingAfter() {
		const steps = this.reloadWithTotalSteps(4)
		const id = steps[0].id
		await this.assertThrowsStepNotComplete(
			() => this.openStepsAndAllAfter(id),
			id
		)

		this.completeStep(id)
		await this.openStepsAndAllAfter(id)
		this.assertStepAtIdxIsNotComplete(0)

		this.completeStep(id)
		this.completeStep(steps[1].id)
		this.completeStep(steps[2].id)
		this.completeStep(steps[3].id)

		this.assertStepAtIdxIsComplete(2)
		this.assertStepAtIdxIsComplete(3)

		await this.openStepsAndAllAfter(steps[2].id)

		this.assertStepAtIdxIsComplete(1)
		this.assertStepAtIdxIsNotComplete(2)
		this.assertStepAtIdxIsNotComplete(3)
	}

	@test()
	protected static async resetOpensAllSteps() {
		const steps = this.reloadWithTotalSteps(4)

		this.completeStep(steps[0].id)
		this.completeStep(steps[1].id)
		this.completeStep(steps[2].id)
		this.completeStep(steps[3].id)

		await this.reset()

		this.assertStepAtIdxIsNotComplete(0)
		this.assertStepAtIdxIsNotComplete(1)
		this.assertStepAtIdxIsNotComplete(2)
		this.assertStepAtIdxIsNotComplete(3)
	}

	@test()
	protected static async resetJumpsBackToFirstStep() {
		const steps = this.reloadWithTotalSteps(4)

		this.setCurrentStep(steps[3].id)

		await this.reset()

		this.assertCurrentStep(steps[0].id)
	}

	@test()
	protected static async openStepsAfterOnlyTriggersRenderOnce() {
		const steps = this.reloadWithTotalSteps(4)

		this.completeStep(steps[0].id)
		this.completeStep(steps[1].id)
		this.completeStep(steps[2].id)
		this.completeStep(steps[3].id)

		this.assertEpectedRenderCount(4)

		await this.openStepsAndAllAfter(steps[0].id)

		this.assertEpectedRenderCount(5)
	}

	@test()
	protected static async resetTriggersRenderOnce() {
		const steps = this.reloadWithTotalSteps(4)

		this.completeStep(steps[0].id)

		this.assertEpectedRenderCount(1)

		await this.reset()

		this.assertEpectedRenderCount(2)
	}

	private static async reset() {
		await this.vc.reset()
	}

	private static async openStepsAndAllAfter(id: any) {
		return this.vc.openStepAndAllAfter(id)
	}

	private static reloadWith2Steps() {
		const steps = this.reloadWithTotalSteps(2)
		return { step1: steps[0], step2: steps[1] }
	}

	private static reloadWithTotalSteps(total: number) {
		const steps = new Array(total).fill(0).map(() => this.generatRandomStep())

		this.reload({
			steps,
		})
		return steps
	}

	private static async assertOpenStepNotCompletedThrows(stepId: string) {
		await this.assertThrowsStepNotComplete(() => this.openStep(stepId), stepId)
	}

	private static async assertThrowsStepNotComplete(
		action: () => any,
		stepId: string
	) {
		const err = await assert.doesThrowAsync(action)
		errorAssert.assertError(err, 'STEP_NOT_COMPLETE', {
			stepId,
		})
	}

	private static openStep(id: string): any {
		return this.vc.openStep(id)
	}

	private static assertSettingCurrentStepThrows(id: string) {
		this.assertActionThrowsInvalidStepId(() => this.setCurrentStep(id))
	}

	private static assertCurrentStep(id: string) {
		const model = this.renderVc()
		assert.isEqual(
			model.currentStepId,
			id,
			`Current step is not ${id}, it's ${model.currentStepId}`
		)
		assert.isEqual(this.vc.getCurrentStep(), id)
	}

	private static assertStepAtIdxIsComplete(idx: number) {
		let model = this.renderVc()
		assert.isTrue(model.steps[idx].isComplete, `Step at ${idx} is not complete`)
	}

	private static assertStepAtIdxIsNotComplete(idx: number) {
		let model = this.renderVc()
		assert.isFalse(model.steps[idx].isComplete)
	}

	private static renderVc() {
		return this.render(this.vc)
	}

	private static assertEpectedRenderCount(expected: number) {
		vcAssert.assertTriggerRenderCount(this.vc, expected)
	}

	private static assertCompleteStepThrowsInvalidStepId(stepId: string) {
		const action = () => this.completeStep(stepId)
		this.assertActionThrowsInvalidStepId(action)
	}

	private static assertActionThrowsInvalidStepId(action: () => any) {
		const err = assert.doesThrow(action)
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['stepId'],
		})
	}
}
