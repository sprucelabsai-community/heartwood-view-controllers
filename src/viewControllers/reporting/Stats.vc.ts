import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { ViewControllerOptions } from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'

type Stats = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats

export type StatsViewControllerOptions = Stats

export default class StatsViewController extends AbstractViewController<Stats> {
	private model: Stats

	public constructor(
		options: ViewControllerOptions & StatsViewControllerOptions
	) {
		super(options)
		assertOptions(options, ['stats'])

		this.model = {
			shouldFormatValues: true,
			...options,
		}
	}

	public setValue(idx: number, value: number) {
		if (idx < 0 || idx > 2) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['idx'],
				friendlyMessage:
					'You can only set values on stats at index 0, 1, or 2.',
			})
		}

		if (!this.model.stats[idx]) {
			this.model.stats[idx] = {}
		}

		this.model.stats[idx].value = value
	}

	public render(): Stats {
		//@ts-ignore
		return { ...this.model, controller: this }
	}
}
