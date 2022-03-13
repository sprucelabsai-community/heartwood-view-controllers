import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import ButtonGroupViewController from '../../../viewControllers/ButtonGroup.vc'

export default class InteractingWithButtonGroupsTest extends AbstractViewControllerTest {
	private static vc: ButtonGroupViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.With3Buttons()
	}

	@test()
	protected static async throwsWhenMissingParams() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			interactor.clickButtonInGroup()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['buttonGroupVc', 'buttonIdOrIdx'],
		})
	}

	@test('throws when cant find button 1', 'not-found', 'test')
	@test('throws when cant find button 2', 'test', 'not-found')
	protected static async throwsWhenCantFindButtonById(
		buttonId: string,
		lookupId: string
	) {
		this.vc = this.Controller('buttonGroup', {
			buttons: [
				{
					id: buttonId,
				},
			],
		})

		await assert.doesThrowAsync(
			() => this.clickButton(lookupId),
			'could not find'
		)
	}

	@test()
	protected static async noErrorWhenFindingButton() {
		await this.clickButton('test')
	}

	@test()
	protected static async setsValue() {
		await this.clickButton('test')

		this.assertSelected(['test'])

		await this.clickButton('not-found')

		this.assertSelected(['not-found'])
	}

	@test()
	protected static async throwsWithBadNumberIndex() {
		await assert.doesThrowAsync(() => this.clickButton(10), `could not find`)
	}

	@test()
	protected static async passesWithGoodIndex() {
		await this.clickButton(0)
	}

	private static assertSelected(expected: string[]) {
		const selected = this.vc.getSelectedButtons()
		assert.isEqualDeep(selected, expected)
	}

	private static clickButton(lookupId: string | number): any {
		return interactor.clickButtonInGroup(this.vc, lookupId)
	}

	private static With3Buttons() {
		return this.Controller('buttonGroup', {
			buttons: [
				{ id: 'not-found' },
				{
					id: 'test',
				},
				{
					id: 'third',
				},
			],
		})
	}
}
