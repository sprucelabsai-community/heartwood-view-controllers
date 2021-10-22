import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar,
	'controller'
>
type Time = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime
export type CalendarViewControllerOptions = ViewModel

export default class CalendarViewController extends AbstractViewController<ViewModel> {
	private model: ViewModel

	public constructor(options: ViewModel & ViewControllerOptions) {
		super(options)

		if (!options.people) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: ['people'],
				friendlyMessage:
					'You have to supply at least 1 person to your calendar to render it (today).',
			})
		}

		const minHour = options.minTime?.hour ?? 0
		const minMinute = options.minTime?.minute ?? 0

		const maxHour = options.maxTime?.hour ?? 0
		const maxMinute = options.maxTime?.minute ?? 0

		if (minHour + minMinute > maxHour + maxMinute) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['minTime', 'maxTime'],
				friendlyMessages: [
					'minTime time must be later than maxTime',
					'maxTime must be before minTime.',
				],
			})
		}

		this.model = {
			people: options.people,
			timezoneOffsetMs: options.timezoneOffsetMs,
			minTime: options.minTime,
			maxTime: options.maxTime,
		}
	}

	public setMinTime(time: Time) {
		this.model.minTime = time
		this.triggerRender()
	}

	public setMaxTime(time: Time) {
		this.model.maxTime = time
		this.triggerRender()
	}

	public setTimezoneOffsetMs(offsetMs: number): any {
		if (offsetMs < -12 * 60 * 60 * 1000 || offsetMs > 14 * 60 * 60 * 1000) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['timezoneOffsetMs'],
				friendlyMessage: `timezoneOffsetMs must be in milliseconds from 0 to 86,400,000.`,
			})
		}

		this.model.timezoneOffsetMs = offsetMs
		this.triggerRender()
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar {
		return {
			...this.model,
			controller: this,
		}
	}
}
