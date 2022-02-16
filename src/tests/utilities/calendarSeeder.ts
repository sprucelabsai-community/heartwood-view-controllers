import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '../..'

let idCount = 0
type Event = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent,
	'isSelected'
>

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
		const totalTimeBlocks = blocks[Math.round(Math.random())]

		const hour = Math.round(Math.random() * 8) + 9

		return {
			id: `${new Date().getTime() * Math.random()}-${idCount++}`,
			startDateTimeMs: dateUtil.setTimeOfDay(
				new Date().getTime(),
				hour,
				generateRandomMinutes(45),
				0,
				0
			),
			target: {
				personId: `${new Date().getTime()}`,
			},
			calendarId: `${new Date().getTime()}`,
			timeBlocks: new Array(totalTimeBlocks).fill(0).map((_, idx) => ({
				durationMinutes: generateRandomMinutes(75),
				isBusy: !(idx % 2),
				title: `Block ${new Date().getTime() * Math.random()}-${idCount++}`,
				subtitle: `Subtitle ${
					new Date().getTime() * Math.random()
				}-${idCount++}`,
			})),
			...values,
		}
	},
}

export default calendarSeeder
function generateRandomMinutes(maxMinutes: number): number {
	return Math.round((Math.random() * maxMinutes + 15) / 15) * 15
}
