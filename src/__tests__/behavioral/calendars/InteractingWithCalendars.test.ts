import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { CalendarViewController, CalendarViewControllerOptions } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import interactionUtil from '../../../tests/utilities/interaction.utility'

export class InteractingWithCalendarsTest extends AbstractViewControllerTest {
	private static vc: CalendarViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.Vc()
	}

	@test()
	protected static async interactingThrowsWhenMissingOptions() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			interactionUtil.clickCalendarMonthView()
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'time', 'personId'],
		})
	}

	@test()
	protected static async throwsWhenClickingCalendarInWrongView() {
		this.Vc({
			view: 'day',
		})

		const err = await assert.doesThrowAsync(() => this.clickCalendar())
		assert.doesInclude(err.message, 'day')
	}

	@test()
	protected static async throwsWhenNoPersonMatch() {
		const err = await assert.doesThrowAsync(() =>
			this.clickCalendar({ personId: '234234' })
		)
		assert.doesInclude(err.message, 'person')
	}

	@test()
	protected static async throwsWithNoOnClick() {
		const [person] = this.VcWithPeople(1, { onClick: null })

		const err = await assert.doesThrowAsync(() =>
			this.clickCalendar({ personId: person.id })
		)
		assert.doesInclude(err.message, 'onClick')
	}

	@test()
	protected static async noErrorWhenPersonMatches() {
		const [person] = this.VcWithPeople(1)

		await this.clickCalendar({ personId: person.id })
	}

	@test()
	protected static async canFindPersonInSecondSpot() {
		const [, person] = this.VcWithPeople(3)

		await this.clickCalendar({ personId: person.id })
	}

	@test()
	protected static async invokesOnClick() {
		let wasHit = false
		let passedOptions: any

		const [person] = this.VcWithPeople(1, {
			onClick: (options) => {
				passedOptions = options
				wasHit = true
			},
		})

		const time = new Date().getTime()

		await this.clickCalendar({ personId: person.id, time })

		assert.isTrue(wasHit)
		assert.isEqualDeep(passedOptions, {
			person,
			time,
		})
	}

	private static VcWithPeople(
		totalPeople: number,
		options?: Partial<CalendarViewControllerOptions>
	) {
		const people = calendarSeeder.generatePeopleValues(totalPeople)

		this.Vc({
			people,
			...options,
		})

		return people
	}

	private static Vc(options?: Partial<CalendarViewControllerOptions>) {
		this.vc = this.Controller('calendar', {
			view: 'month',
			people: [],
			onClick: () => {},
			...options,
		})
	}

	private static clickCalendar(options?: {
		personId: string
		time?: number
	}): any {
		return interactionUtil.clickCalendarMonthView(
			this.vc,
			options?.time ?? new Date().getTime(),
			options?.personId ?? `123`
		)
	}
}
