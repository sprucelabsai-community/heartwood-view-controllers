import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

export default class AssertingTogglesInListsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static hasAssertListRendersToggle() {
		assert.isFunction(vcAssertUtil.assertRowRendersToggle)
		assert.isFunction(vcAssertUtil.assertRowDoesNotRenderToggle)
	}

	@test()
	protected static knowsIfRowNotFound() {
		const listVc = this.ListVc()
		assert.doesThrow(() => vcAssertUtil.assertRowRendersToggle(listVc, 'edit'))
		vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'edit')
	}

	@test()
	protected static canFindToggle() {
		const listVc = this.ListVc()
		vcAssertUtil.assertRowRendersToggle(listVc, 'save')
		assert.doesThrow(() =>
			vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'save')
		)
	}

	@test()
	protected static throwsIfToggleByNameNotFound() {
		const listVc = this.ListVc()
		assert.doesThrow(() =>
			vcAssertUtil.assertRowRendersToggle(listVc, 'save', 'taco')
		)
		vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'save', 'taco')
	}

	@test()
	protected static canFindToggleByName() {
		const listVc = this.ListVc({ rowId: 'create', toggleName: 'test' })
		vcAssertUtil.assertRowRendersToggle(listVc, 'create', 'test')
		assert.doesThrow(() =>
			vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'create', 'test')
		)
	}

	@test()
	protected static canFindToggleInLaterRows() {
		const listVc = this.ListVc({ rowId: 'create', toggleName2: 'testing' })
		vcAssertUtil.assertRowRendersToggle(listVc, 'create', 'testing')
		assert.doesThrow(() =>
			vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'create', 'testing')
		)
	}

	@test()
	protected static async knowsIfNoToggleIsRender() {
		const listVc = this.ListVc()

		assert.doesThrow(() =>
			vcAssertUtil.assertRowRendersToggle(listVc, 'editing')
		)
		vcAssertUtil.assertRowDoesNotRenderToggle(listVc, 'editing')
	}

	private static ListVc(options?: {
		rowId?: string
		toggleName?: string
		toggleName2?: string
		toggleName3?: string
	}) {
		return this.Controller('list', {
			rows: [
				{
					id: options?.rowId ?? 'save',
					cells: [
						{
							toggleInput: {
								name: options?.toggleName ?? 'test',
							},
						},
						{
							toggleInput: {
								name: options?.toggleName2 ?? 'test2',
							},
						},
						{
							toggleInput: {
								name: options?.toggleName3 ?? 'test3',
							},
						},
					],
				},
				{
					id: 'editing',
					cells: [
						{
							text: {
								content: 'hey!',
							},
						},
					],
				},
			],
		})
	}
}
