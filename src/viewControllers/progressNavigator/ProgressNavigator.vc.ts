import { SchemaError, assertOptions } from '@sprucelabs/schema'
import {
	ProgressNavigator,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class ProgressNavigatorViewController extends AbstractViewController<ProgressNavigator> {
	public static id = 'progress-navigator'
	private model: ProgressNavigator

	public constructor(
		options: ViewControllerOptions & ProgressNavigatorViewControllerOptions
	) {
		super(options)
		const model = removeUniversalViewOptions(assertOptions(options, ['steps']))

		this.model = model
		this.model.controller = this

		const { steps, currentStepId } = model

		if (steps.length === 0) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['steps'],
				friendlyMessage: 'You gotta provide at least one step!',
			})
		}

		this.model.currentStepId = currentStepId ?? steps[0].id
		this.getStepOrThrow(this.model.currentStepId)
	}

	public completeStep(stepId: string) {
		const step = this.getStepOrThrow(stepId)

		step.isComplete = true

		this.triggerRender()

		return
	}

	private getStepOrThrow(stepId: string) {
		const step = this.model.steps.find((s) => s.id === stepId)
		if (!step) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['stepId'],
				friendlyMessage: `You can't complete a step that doesn't exist!`,
			})
		}
		return step
	}

	public setCurrentStep(stepId: string) {
		this.getStepOrThrow(stepId)
		this.model.currentStepId = stepId
		this.triggerRender()
	}

	public getCurrentStep() {
		return this.model.currentStepId
	}

	public render(): ProgressNavigator {
		return this.model
	}
}

export type ProgressNavigatorViewControllerOptions = Omit<
	ProgressNavigator,
	'controller'
>
