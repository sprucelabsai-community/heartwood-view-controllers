import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas, ViewControllerOptions } from '../..'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export interface ProgressViewControllerOptions {}

type Progress = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Progress

export default class ProgressViewController extends AbstractViewController<Progress> {
	private model: Progress

	public constructor(options: ViewControllerOptions & Progress) {
		super(options)

		const percentComplete = options.percentComplete
		this.assertValidPercentComplete(percentComplete)

		this.model = {
			...removeUniversalViewOptions(options),
		}
	}

	private assertValidPercentComplete(
		percentComplete: number | null | undefined
	) {
		if (
			typeof percentComplete == 'number' &&
			(percentComplete < 0 || percentComplete > 1)
		) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['percentComplete'],
				friendlyMessage: 'percentComplete must be a number between 0 and 1',
			})
		}
	}
	public setPercentComplete(percentComplete: number) {
		this.assertValidPercentComplete(percentComplete)
		this.model.percentComplete = percentComplete
		this.triggerRender()
	}

	public setTitle(title: string) {
		this.model.title = title
		this.triggerRender()
	}

	public getPercentComplete() {
		return this.model.percentComplete
	}

	public render(): Progress {
		return {
			//@ts-ignore
			controller: this,
			...this.model,
		}
	}
}
