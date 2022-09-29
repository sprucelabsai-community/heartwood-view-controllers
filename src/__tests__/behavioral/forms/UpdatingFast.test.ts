import { buildSchema } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import FormViewController from '../../../viewControllers/form/Form.vc'

export default class UpdatingFastTest extends AbstractViewControllerTest {
	private static vc: FormViewController<FastTypingSchema>

	protected static async beforeEach() {
		await super.beforeEach()

		let timeout = 100
		this.vc = this.Controller(
			'form',
			buildForm({
				onWillChange: async () => {
					await new Promise((r) => setTimeout(r, (timeout -= 10)))
				},
				schema: fastTypingSchema,
				sections: [
					{
						fields: ['field1', 'field2'],
					},
				],
			})
		)
	}

	@test()
	protected static async lastUpdateWinsEvenIfFirstIsDelayed() {
		await this.all([this.setValue1('1'), this.setValue1('2')])
		this.assertValue1Equals('2')
	}

	@test()
	protected static async canSetValuesToSeveralFieldsAtOnce() {
		await this.all([
			this.setValue1('1'),
			this.setValue2('2'),
			this.setValue1('2'),
			this.setValue2('3'),
		])

		this.assertValue1Equals('2')
		this.assertValue2Equals('3')
	}

	@test()
	protected static async handlesTwoSetsOfUpdates() {
		await this.updateValue1FiveTimes()
		this.assertValue1Equals('5')
		await this.updateValue1FiveTimes()
		this.assertValue1Equals('5')

		await this.all([
			this.updateValue2FiveTimes(),
			this.updateValue1FiveTimes(),
			this.updateValue2FiveTimes(),
			this.updateValue1FiveTimes(),
		])

		this.assertValue1Equals('5')
		this.assertValue2Equals('5')
	}

	@test()
	protected static async updatesValueWhileProcessing() {
		const expected = ''
		let hitCount = 0
		this.vc.setTriggerRenderForInput('field1', () => {
			hitCount++
		})

		const promise = this.setValue1(expected)
		assert.isEqual(hitCount, 1)
		const actual = this.vc.getValue('field1', {
			shouldIncludePendingValues: true,
		})
		assert.isEqual(actual, expected)
		assert.isEqual(hitCount, 1)
		await promise
		assert.isEqual(hitCount, 2)
	}

	private static async updateValue1FiveTimes() {
		await this.all([
			this.setValue1('1'),
			this.setValue1('2'),
			this.setValue1('3'),
			this.setValue1('4'),
			this.setValue1('5'),
		])
	}

	private static async updateValue2FiveTimes() {
		await this.all([
			this.setValue2('1'),
			this.setValue2('2'),
			this.setValue2('3'),
			this.setValue2('4'),
			this.setValue2('5'),
		])
	}

	private static async all(all: Promise<void>[]) {
		await Promise.all(all)
	}

	private static assertValue1Equals(expected: string) {
		assert.isEqual(this.getValue1(), expected)
	}
	private static assertValue2Equals(expected: string) {
		assert.isEqual(this.getValue2(), expected)
	}

	private static getValue1(): string | null | undefined {
		return this.vc.getValue('field1')
	}

	private static getValue2(): string | null | undefined {
		return this.vc.getValue('field2')
	}

	private static async setValue1(value: string): Promise<void> {
		return this.vc.setValue('field1', value)
	}

	private static async setValue2(value: string): Promise<void> {
		return this.vc.setValue('field2', value)
	}
}

const fastTypingSchema = buildSchema({
	id: 'fastTyping',
	fields: {
		field1: {
			type: 'text',
		},
		field2: {
			type: 'text',
		},
	},
})

type FastTypingSchema = typeof fastTypingSchema
