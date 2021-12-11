import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas, ViewControllerOptions } from '..'
import AbstractViewController from './Abstract.vc'

type Ratings = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings
export type RatingsViewControllerOptions = Ratings

export default class RatingsViewController extends AbstractViewController<Ratings> {
	private model: Ratings

	public constructor(options: ViewControllerOptions & Ratings) {
		super(options)

		const value = options.value
		const renderAs = options.renderAs

		this.assertValidRenderAs(renderAs)
		this.assertValueInRange(value)

		this.model = {
			onChange: options.onChange,
			value: options.value,
			renderAs: options.renderAs,
		}
	}

	private assertValidRenderAs(renderAs: string | null | undefined) {
		if (renderAs && renderAs !== 'stars' && renderAs !== 'smilies') {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['renderAs'],
				friendlyMessage: `Render as can only be 'stars' or 'smilies'.`,
			})
		}
	}

	private assertValueInRange(value?: number | null) {
		if (value && (value < 0 || value > 1)) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['value'],
				friendlyMessage: 'Rating value must be between zero and one.',
			})
		}
	}

	public setRenderAs(renderAs: NonNullable<Ratings['renderAs']>) {
		this.assertValidRenderAs(renderAs)
		this.model.renderAs = renderAs
		this.triggerRender()
	}

	public getRenderAs() {
		return this.model.renderAs
	}

	public setValue(value: number) {
		this.assertValueInRange(value)
		this.model.value = value
		this.model.onChange?.(value)
		this.triggerRender()
	}

	public getValue() {
		return this.model.value
	}

	public render(): Ratings {
		return {
			//@ts-ignore
			controller: this,
			...this.model,
		}
	}
}
