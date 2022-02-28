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
			id: `${random()}`,
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
			id: `${random()}-${idCount++}`,
			startDateTimeMs: dateUtil.setTimeOfDay(
				new Date().getTime(),
				hour,
				generateRandomMinutes(45),
				0,
				0
			),
			target: {
				personId: `${random()}`,
				locationId: `${random()}`,
			},
			calendarId: `${random()}`,
			timeBlocks: new Array(totalTimeBlocks).fill(0).map((_, idx) => ({
				durationMinutes: generateRandomMinutes(75),
				isBusy: !(idx % 2),
				title: `Block ${random()}-${idCount++}`,
				subtitle: `Subtitle ${random()}-${idCount++}`,
			})),
			...values,
		}
	},
}

export default calendarSeeder
function random() {
	return new Date().getTime() * Math.random()
}

function generateRandomMinutes(maxMinutes: number): number {
	return Math.round((Math.random() * maxMinutes + 15) / 15) * 15
}
