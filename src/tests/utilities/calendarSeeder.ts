import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '../..'

let idCount = 0
type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

const calendarSeeder = {
	generatePeopleValues(total: number) {
		return new Array(total).fill(0).map(() => this.generatePersonValues())
	},
	generatePersonValues(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson {
		return {
			id: `${new Date().getTime() * Math.random()}`,
			casualName: 'Timmy',
		}
	},
	generateEventsValues(total: number) {
		return new Array(total)
			.fill(0)
			.map(() => calendarSeeder.generateEventValues())
	},

	generateEventValues(values?: Partial<Event>): Event {
		const blocks = [1, 3]
		const totalTimeBlocks = blocks[Math.round(Math.random() * 1)]

		return {
			id: `${new Date().getTime() * Math.random()}-${idCount++}`,
			startDateTimeMs: dateUtil.getStartOfDay(),
			target: {
				personId: '1234',
			},
			calendarId: '2134',
			timeBlocks: new Array(totalTimeBlocks).fill(0).map((_, idx) => ({
				durationMinutes: Math.round(Math.random() * 89) + 1,
				isBusy: !(idx % 2),
				title: `Block ${new Date().getTime() * Math.random()}-${idCount++}`,
			})),
			...values,
		}
	},
}

export default calendarSeeder
