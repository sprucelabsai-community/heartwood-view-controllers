import { assertOptions } from '@sprucelabs/schema'
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

	public render(): Stats {
		//@ts-ignore
		return { ...this.model, controller: this }
	}
}
