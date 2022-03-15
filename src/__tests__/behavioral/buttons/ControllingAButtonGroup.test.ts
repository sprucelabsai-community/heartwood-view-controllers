import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import ButtonGroupViewController from '../../../viewControllers/ButtonGroup.vc'

export default class UsingAButtonGroupTest extends AbstractViewControllerTest {
	private static singleSelectVc: ButtonGroupViewController
	private static onSelectInvocations: string[][]
	private static multiSelectVc: ButtonGroupViewController
	protected static controllerMap = {}
	private static onClickHintInvocations: string[] = []

	protected static async beforeEach() {
		await super.beforeEach()
		this.onSelectInvocations = []

		this.singleSelectVc = this.Factory().Controller('buttonGroup', {
			onSelectionChange: (selected) => {
				this.onSelectInvocations.push(selected)
			},
			onClickHintIcon: (idx) => {
				this.onClickHintInvocations.push(idx)
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
				{
					id: 'second',
					label: 'second',
				},
				{
					id: 'third',
					label: 'third',
				},
			],
		})

		this.multiSelectVc = this.Factory().Controller('buttonGroup', {
			shouldAllowMultiSelect: true,
			onSelectionChange: (selected) => {
				this.onSelectInvocations.push(selected)
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
				{
					id: 'second',
					label: 'second',
				},
				{
					id: 'third',
					label: 'third',
				},
				{
					id: 'fourth',
					label: 'fourth',
				},
			],
		})
	}

	@test()
	protected static canCreateUsingAButtonGrid() {
		assert.isTruthy(this.singleSelectVc)
	}

	@test()
	protected static throwsIfButtonsHaveNoIds() {
		assert.doesThrow(() =>
			this.Controller('buttonGroup', {
				buttons: [
					//@ts-ignore
					{
						label: 'no id',
					},
				],
			})
		)
	}

	@test()
	protected static rendersButtons() {
		const buttons = this.render(this.singleSelectVc)
		assert.isLength(buttons, 3)
		assert.isEqual(buttons[0].label, 'first')
		assert.isEqual(buttons[1].label, 'second')
	}

	@test()
	protected static noSelectedButtonsToStart() {
		const selected = this.singleSelectVc.getSelectedButtons()
		assert.isLength(selected, 0)
	}

	@test()
	protected static isSelectedIsNullIfNothingSelectedAtFirst() {
		const buttons = this.render(this.singleSelectVc)
		assert.doesNotInclude(buttons, { isSelected: true })
		assert.doesNotInclude(buttons, { isSelected: false })
	}

	@test()
	protected static async canSelectButtonAndMarkRestAsDeselected() {
		await this.singleSelectVc.selectButton('first')
		const buttons = this.render(this.singleSelectVc)
		this.assertFirstButtonSelected(buttons)
	}

	@test()
	protected static async selectingSameButtonMoreThanOnceHasNoNegativeEffect() {
		await this.singleSelectVc.selectButton('first')
		await this.singleSelectVc.selectButton('first')
		await this.singleSelectVc.selectButton('first')

		assert.isLength(this.onSelectInvocations, 1)
		let buttons = this.render(this.singleSelectVc)

		this.assertFirstButtonSelected(buttons)

		await this.singleSelectVc.deselectButton('first')

		buttons = this.render(this.singleSelectVc)
		assert.doesNotInclude(buttons, { isSelected: true })
	}

	@test()
	protected static async deselectingSameButtonMoreThanOnceHasNoNegativeEffect() {
		await this.singleSelectVc.selectButton('first')
		await this.singleSelectVc.deselectButton('first')
		await this.singleSelectVc.deselectButton('first')

		assert.isLength(this.onSelectInvocations, 2)

		let buttons = this.render(this.singleSelectVc)
		assert.doesNotInclude(buttons, { isSelected: true })
	}

	@test()
	protected static async canDeselectButton() {
		await this.singleSelectVc.selectButton('first')
		await this.singleSelectVc.deselectButton('first')

		const buttons = this.render(this.singleSelectVc)

		assert.doesNotInclude(buttons, { isSelected: true })
	}

	@test()
	protected static async clickingButtonSelectsOneButton() {
		let buttons = this.render(this.singleSelectVc)
		await buttons[0].onClick?.()
		buttons = this.render(this.singleSelectVc)

		this.assertFirstButtonSelected(buttons)
	}

	@test()
	protected static async onSelectFiredWhenButtonSelected() {
		await this.singleSelectVc.selectButton('first')

		assert.isLength(this.onSelectInvocations, 1)
		assert.isEqualDeep(this.onSelectInvocations[0], ['first'])
	}

	@test()
	protected static async canSelectMoreThanOneButton() {
		await this.multiSelectVc.selectButton('first')
		await this.multiSelectVc.selectButton('second')

		const buttons = this.render(this.multiSelectVc)

		assert.doesInclude(buttons, { isSelected: true })
		assert.doesInclude(buttons[0], { isSelected: true })
		assert.doesInclude(buttons[1], { isSelected: true })
		assert.doesInclude(buttons[2], { isSelected: false })
		assert.doesInclude(buttons[3], { isSelected: false })
	}

	@test()
	protected static async onSelectFiredWhenMultiButtonSelectedAndDeselected() {
		await this.multiSelectVc.selectButton('first')
		await this.multiSelectVc.selectButton('second')
		await this.multiSelectVc.deselectButton('first')
		await this.multiSelectVc.deselectButton('first')

		assert.isLength(this.onSelectInvocations, 3)

		assert.isEqualDeep(this.onSelectInvocations[0], ['first'])
		assert.isEqualDeep(this.onSelectInvocations[1], ['first', 'second'])
		assert.isEqualDeep(this.onSelectInvocations[2], ['second'])
	}

	@test()
	protected static buttonsFadeInFirstRender() {
		const buttons = this.render(this.singleSelectVc)
		assert.isTrue(buttons[0].shouldQueueShow)
	}

	@test()
	protected static buttonsDoesNotFadeInSecondRender() {
		this.render(this.singleSelectVc)
		const buttons = this.render(this.singleSelectVc)
		assert.isFalse(buttons[0].shouldQueueShow)
	}

	@test()
	protected static async clickingHintIconTriggersHintCallback() {
		let buttons = this.render(this.singleSelectVc)

		await buttons[0].onClickHintIcon?.()

		assert.isLength(this.onClickHintInvocations, 1)
		assert.isEqual(this.onClickHintInvocations[0], 'first')

		await buttons[1].onClickHintIcon?.()
		assert.isEqual(this.onClickHintInvocations[1], 'second')
	}

	@test()
	protected static async canSetSelectedButtonsToStart() {
		const vc = this.Factory().Controller('buttonGroup', {
			selected: ['first', 'second'],
			onSelectionChange: (selected) => {
				this.onSelectInvocations.push(selected)
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
				{
					id: 'second',
					label: 'second',
				},
				{
					id: 'third',
					label: 'third',
				},
				{
					id: 'fourth',
					label: 'fourth',
				},
			],
		})

		const selected = vc.getSelectedButtons()
		assert.isEqualDeep(selected, ['first', 'second'])

		const buttons = this.render(vc)
		assert.doesInclude(buttons, { isSelected: true })
	}

	@test()
	protected static async canCancelChangeToCancelChange() {
		let wasHit = false
		const vc = this.Factory().Controller('buttonGroup', {
			onWillChangeSelection: () => {
				return false
			},
			onSelectionChange: () => {
				wasHit = true
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
			],
		})

		await interactor.clickButtonInGroup(vc, 0)
		assert.isEqualDeep(vc.getSelectedButtons(), [])

		assert.isFalse(wasHit)
	}

	@test()
	protected static async canCancelChangeDeselect() {
		let wasHit = false
		const vc = this.Factory().Controller('buttonGroup', {
			selected: ['first'],
			onWillChangeSelection: () => {
				return false
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
			],
		})

		await interactor.clickButtonInGroup(vc, 0)
		assert.isEqualDeep(vc.getSelectedButtons(), ['first'])

		assert.isFalse(wasHit)
	}

	@test()
	protected static async willChangeReceivesExpectedPayload() {
		let passedToWillChange: any
		let wasSelectionChangeHit = false

		const vc = this.Factory().Controller('buttonGroup', {
			onWillChangeSelection: (selected, changed) => {
				passedToWillChange = {
					selected,
					changed,
				}
			},
			onSelectionChange: () => {
				wasSelectionChangeHit = true
			},
			buttons: [
				{
					id: 'first',
					label: 'first',
				},
				{
					id: 'second',
					label: 'second',
				},
				{
					id: 'third',
					label: 'third',
				},
			],
		})

		await interactor.clickButtonInGroup(vc, 0)
		assert.isTruthy(wasSelectionChangeHit)
		assert.isEqualDeep(passedToWillChange, {
			selected: [],
			changed: {
				adding: 'first',
			},
		})

		await interactor.clickButtonInGroup(vc, 1)

		assert.isEqualDeep(passedToWillChange, {
			selected: ['first'],
			changed: {
				adding: 'second',
				removing: 'first',
			},
		})

		await interactor.clickButtonInGroup(vc, 2)

		assert.isEqualDeep(passedToWillChange, {
			selected: ['second'],
			changed: {
				adding: 'third',
				removing: 'second',
			},
		})

		await interactor.clickButtonInGroup(vc, 2)

		assert.isEqualDeep(passedToWillChange, {
			selected: ['third'],
			changed: {
				removing: 'third',
			},
		})

		await interactor.clickButtonInGroup(vc, 1)
		await interactor.clickButtonInGroup(vc, 1)

		assert.isEqualDeep(passedToWillChange, {
			selected: ['second'],
			changed: {
				removing: 'second',
			},
		})
	}

	private static assertFirstButtonSelected(
		buttons: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
	) {
		assert.doesInclude(buttons, { isSelected: true })
		assert.doesInclude(buttons[0], { isSelected: true })
		assert.doesInclude(buttons[1], { isSelected: false })
	}
}
