import { test, assert } from '@sprucelabs/test'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class InteractingWithSelectsInRowsTest extends AbstractViewControllerTest {
	@test()
	protected static async hasInteractWithSelectFunction() {
		assert.isFunction(interactor.selectChoiceInRow)
	}

	@test()
	protected static async throwsWhenCantFindRow() {
		const vc = this.ListVc()

		await assert.doesThrowAsync(() =>
			interactor.selectChoiceInRow({
				vc,
				row: 'not-found',
				newChoice: 'red',
			})
		)
	}

	@test()
	protected static async doesNotThrowWhenFindingSelect() {
		const firstRowId = `${new Date().getTime()}`

		const vc = this.ListVc({ firstRowId })
		await interactor.selectChoiceInRow({
			vc,
			row: firstRowId,
			newChoice: 'red',
		})
	}

	@test()
	protected static async throwsIfCantFindSelectInFirstCell() {
		const middleRowId = `${new Date().getTime()}`

		const vc = this.ListVc({ middleRowId })
		await assert.doesThrowAsync(() =>
			interactor.selectChoiceInRow({
				vc,
				row: middleRowId,
				newChoice: 'red',
			})
		)
	}

	@test()
	protected static async doesNotThrowWhenFindingSelectInLaterCell() {
		const vc = this.ListVc()
		await interactor.selectChoiceInRow({
			vc,
			row: 'last',
			newChoice: 'happy',
		})
	}

	@test()
	protected static async throwsWhenSelectingChoiceThatDoesNotExist() {
		const vc = this.ListVc()
		await assert.doesThrowAsync(() =>
			interactor.selectChoiceInRow({ vc, row: 'first', newChoice: 'aoud' })
		)

		assert.isUndefined(vc.getRowVc('first').getValue('favoriteColor'))
	}

	@test()
	protected static async setsValueOnList() {
		const vc = this.ListVc()
		await interactor.selectChoiceInRow({
			vc,
			row: 'first',
			newChoice: 'green',
		})

		const row = vc.getRowVc('first')
		assert.isEqual(row.getValue('favoriteColor'), 'green')
	}

	@test()
	protected static async setsInLastRow() {
		const vc = this.ListVc()
		await interactor.selectChoiceInRow({
			vc,
			row: 'last',
			newChoice: 'soHappy',
		})

		const row = vc.getRowVc('last')
		assert.isEqual(row.getValue('feeling'), 'soHappy')
	}

	@test()
	protected static async throwsWhenSelectingByInputNameThatDoesNotExist() {
		const vc = this.ListVc()
		await assert.doesThrowAsync(() =>
			interactor.selectChoiceInRow({
				vc,
				row: 'multipleSelects',
				name: 'fdsapanda',
				newChoice: 'red',
			})
		)
	}

	@test()
	protected static async throwsWhenSelectingInvalidChoiceByInputName() {
		const vc = this.ListVc()
		await assert.doesThrowAsync(() =>
			interactor.selectChoiceInRow({
				vc,
				row: 'multipleSelects',
				name: 'favoriteCarColor',
				newChoice: 'pizza',
			})
		)
	}

	@test()
	protected static async setsWhenSelectingByInputNameThatExists() {
		const vc = this.ListVc()

		await interactor.selectChoiceInRow({
			vc,
			row: 'multipleSelects',
			name: 'favoriteCarColor',
			newChoice: 'green',
		})

		await interactor.selectChoiceInRow({
			vc,
			row: 'multipleSelects',
			name: 'favoriteFood',
			newChoice: 'pizza',
		})

		const row = vc.getRowVc('multipleSelects')
		assert.isEqual(row.getValue('favoriteCarColor'), 'green')
		assert.isEqual(row.getValue('favoriteFood'), 'pizza')
	}

	private static ListVc(options?: {
		firstRowId?: string
		middleRowId?: string
	}) {
		return this.Controller('list', {
			rows: [
				{
					id: options?.firstRowId ?? 'first',
					cells: [
						{
							selectInput: {
								name: 'favoriteColor',
								choices: [
									{
										value: 'red',
										label: 'red',
									},
									{
										value: 'green',
										label: 'green',
									},
								],
							},
						},
					],
				},
				{
					id: options?.middleRowId ?? 'middle',
					cells: [],
				},
				{
					id: 'multipleSelects',
					cells: [
						{
							selectInput: {
								name: 'favoriteCarColor',
								choices: [
									{
										value: 'red',
										label: 'red',
									},
									{
										value: 'green',
										label: 'green',
									},
								],
							},
						},
						{
							selectInput: {
								name: 'favoriteFood',
								choices: [
									{
										value: 'tacos',
										label: 'tacos',
									},
									{
										value: 'pizza',
										label: 'pizza',
									},
								],
							},
						},
					],
				},
				{
					id: 'last',
					cells: [
						{},
						{},
						{
							selectInput: {
								name: 'feeling',
								choices: [
									{
										value: 'happy',
										label: 'Happy!',
									},
									{
										value: 'soHappy',
										label: 'Happier!',
									},
								],
							},
						},
					],
				},
			],
		})
	}
}
