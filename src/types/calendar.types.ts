import { SpruceSchemas } from '@sprucelabs/mercury-types'

type Person = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson

export interface ClickCalendarViewOptions {
	time?: number
	person?: Person
}
