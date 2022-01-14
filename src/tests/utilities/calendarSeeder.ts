import { SpruceSchemas } from '../..'

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
}

export default calendarSeeder
