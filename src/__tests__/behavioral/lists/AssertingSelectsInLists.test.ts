import { selectAssertUtil } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class AssertingSelectsInListsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static hasAssertRowRendersSelect() {
		assert.isFunction(vcAssert.assertRowRendersSelect)
	}

	@test()
	protected static throwsIfCantFindRow() {
		const vc = this.ListVc()

		assert.doesThrow(() => vcAssert.assertRowRendersSelect(vc, 'not-found'))
	}

	@test()
	protected static canFindSelectInARandomRowId() {
		const row1Id = `${new Date().getTime()}`
		const vc = this.ListVc({
			row1Id,
		})

		vcAssert.assertRowRendersSelect(vc, row1Id)
	}

	@test()
	protected static cantFindSelectInRowThatDoesNotHaveOne() {
		const vc = this.ListVc({})
		assert.doesThrow(() => vcAssert.assertRowRendersSelect(vc, 'last'))
	}

	@test()
	protected static canFindSelectInCellAfterFirst() {
		const vc = this.ListVc({})
		vcAssert.assertRowRendersSelect(vc, 'middle')
	}

	@test()
	protected static returnsASelectViewController() {
		const vc = this.ListVc({})
		const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')

		assert.isTruthy(selectVc)
		assert.isFunction(selectVc.getChoices)
		assert.isArray(selectVc.getChoices())

		assert.isFunction(selectVc.getIsRequired)
		assert.isFalse(selectVc.getIsRequired())
	}

	@test()
	protected static selectVcKnowsIfRequired() {
		const vc = this.ListVc({
			isMiddleRequired: true,
		})

		const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')
		assert.isTrue(selectVc.getIsRequired())
	}

	@test()
	protected static selectVcKnowsOptions() {
		const vc = this.ListVc({
			isMiddleRequired: true,
		})

		const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')

		selectAssertUtil.assertSelectChoicesMatch(selectVc?.getChoices(), [
			'foo',
			'taco',
		])
	}

	@test()
	protected static selectVcKnowsOptionsInDifferentRow() {
		const vc = this.ListVc({
			isMiddleRequired: true,
		})

		const selectVc = vcAssert.assertRowRendersSelect(vc, 'first')

		selectAssertUtil.assertSelectChoicesMatch(selectVc?.getChoices(), [
			'red',
			'green',
			'blue',
		])
	}

	private static ListVc(options?: {
		row1Id?: string
		row2Id?: string
		isMiddleRequired?: boolean
	}) {
		return this.Controller('list', {
			rows: [
				{
					id: options?.row1Id ?? 'first',
					cells: [
						{
							selectInput: {
								isRequired: true,
								name: 'favoriteColor',
								choices: [
									{ value: 'red', label: 'red' },
									{ value: 'green', label: 'green' },
									{ value: 'blue', label: 'blue' },
								],
							},
						},
					],
				},
				{
					id: 'middle',
					cells: [
						{},
						{},
						{
							selectInput: {
								isRequired: !!options?.isMiddleRequired,
								name: 'state',
								choices: [
									{
										value: 'foo',
										label: 'bar',
									},
									{
										value: 'taco',
										label: 'bell',
									},
								],
							},
						},
					],
				},
				{
					id: options?.row2Id ?? 'last',
					cells: [{}],
				},
			],
		})
	}
}
