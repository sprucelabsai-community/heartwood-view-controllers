import { test, assert } from '@sprucelabs/test'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

export default class ClickingTogglesInRowsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static async canCreateClickingTogglesInRows() {
		assert.isFunction(interactor.clickToggleInRow)
	}

	@test()
	protected static async throwsIfCantFindRow() {
		const listVc = this.ListVc()
		await assert.doesThrowAsync(() =>
			interactor.clickToggleInRow(listVc, 'last')
		)
	}

	@test()
	protected static async canClickToggle() {
		const toggleId = `${new Date().getTime()}`
		const listVc = this.ListVc({
			rows: [
				{
					id: 'clicking-toggle',
					cells: [],
				},
				{
					id: toggleId,
					cells: [
						{
							toggleInput: {
								name: 'oops',
							},
						},
					],
				},
			],
		})
		await interactor.clickToggleInRow(listVc, toggleId)
	}

	@test()
	protected static async throwsIfCantFindToggleInput() {
		const listVc = this.ListVc({
			rows: [
				{
					id: 'first',
					cells: [{}],
				},
			],
		})

		await assert.doesThrowAsync(() =>
			interactor.clickToggleInRow(listVc, 'first')
		)
	}

	@test()
	protected static async canFindInputInOtherCells() {
		const listVc = this.ListVc({
			rows: [
				{
					id: 'first',
					cells: [],
				},
				{
					id: 'last',
					cells: [
						{},
						{},
						{
							toggleInput: {
								name: 'oops',
							},
						},
					],
				},
			],
		})
		await interactor.clickToggleInRow(listVc, 'last')
	}

	@test()
	protected static async clickingTriggersOnChange() {
		let wasHit = false
		let passedValue: boolean | undefined
		const listVc = this.ListVc({
			rows: [
				{
					id: 'last',
					cells: [
						{
							toggleInput: {
								name: 'oops',
								onChange: (value) => {
									wasHit = true
									passedValue = value
								},
							},
						},
					],
				},
			],
		})

		await interactor.clickToggleInRow(listVc, 'last')

		assert.isTrue(wasHit)
		assert.isTrue(passedValue)

		await interactor.clickToggleInRow(listVc, 'last')

		assert.isFalse(passedValue)
	}

	private static ListVc(options?: Partial<ListViewControllerOptions>) {
		return this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [],
				},
			],
			...options,
		})
	}
}
