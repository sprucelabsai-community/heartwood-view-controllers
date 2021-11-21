import { test, assert } from '@sprucelabs/test'
import { interactionUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { ListViewControllerOptions } from '../../viewControllers/list/List.vc'

export default class ClickingTogglesInRowsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static async canCreateClickingTogglesInRows() {
		assert.isFunction(interactionUtil.clickToggleInRow)
	}

	@test()
	protected static async throwsIfCantFindRow() {
		const listVc = this.ListVc()
		await assert.doesThrowAsync(() =>
			interactionUtil.clickToggleInRow(listVc, 'last')
		)
	}

	@test()
	protected static async canClickToggle() {
		const toggleId = `${new Date().getTime()}`
		const listVc = this.ListVc({
			rows: [
				{
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
		await interactionUtil.clickToggleInRow(listVc, toggleId)
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
			interactionUtil.clickToggleInRow(listVc, 'first')
		)
	}

	@test()
	protected static async canFindInputInOtherCells() {
		const listVc = this.ListVc({
			rows: [
				{
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
		await interactionUtil.clickToggleInRow(listVc, 'last')
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

		await interactionUtil.clickToggleInRow(listVc, 'last')

		assert.isTrue(wasHit)
		assert.isTrue(passedValue)

		await interactionUtil.clickToggleInRow(listVc, 'last')

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
