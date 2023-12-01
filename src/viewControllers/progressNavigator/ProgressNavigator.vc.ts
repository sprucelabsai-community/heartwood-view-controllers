import { SchemaError, assertOptions } from '@sprucelabs/schema'
import SpruceError from '../../errors/SpruceError'
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
	}

	public openStep(id: string) {
		const step = this.getStepOrThrow(id)
		if (!step.isComplete) {
			throw new SpruceError({
				code: 'STEP_NOT_COMPLETE',
				stepId: id,
			})
		}
		step.isComplete = false
		this.triggerRender()
	}

	private get steps() {
		return this.model.steps
	}

	public openStepAndAllAfter(id: string) {
		this.renderOnceSync(() => {
			this.openStep(id)

			const idx = this.steps.findIndex((s) => s.id === id)
			const startingIdx = idx + 1

			this.closeOpenStepsStartingAt(startingIdx)
		})
	}

	private closeOpenStepsStartingAt(startingIdx: number) {
		const total = this.steps.length
		for (let i = startingIdx; i < total; i++) {
			const step = this.model.steps[i]
			if (step.isComplete) {
				this.openStep(step.id)
			}
		}
	}

	public reset() {
		this.renderOnceSync(() => {
			this.closeOpenStepsStartingAt(0)
			this.setCurrentStep(this.steps[0].id)
		})
	}

	private getStepOrThrow(stepId: string) {
		const step = this.steps.find((s) => s.id === stepId)
		if (!step) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['stepId'],
				friendlyMessage: `You can't get a step that doesn't exist! You asked for "${stepId}" but I only have "${this.model.steps
					.map((s) => s.id)
					.join(', ')}"`,
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
