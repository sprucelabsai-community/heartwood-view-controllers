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
		this.assertOpenStepNotCompletedThrows(step1.id)
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

	private static reloadWith2Steps() {
		const step1 = this.generatRandomStep()
		const step2 = this.generatRandomStep()

		this.reload({
			steps: [step1, step2],
		})
		return { step1, step2 }
	}

	private static assertOpenStepNotCompletedThrows(stepId: string) {
		const err = assert.doesThrow(() => this.openStep(stepId))
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
		assert.isEqual(model.currentStepId, id)
		assert.isEqual(this.vc.getCurrentStep(), id)
	}

	private static assertStepAtIdxIsComplete(idx: number) {
		let model = this.renderVc()
		assert.isTrue(model.steps[idx].isComplete)
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
