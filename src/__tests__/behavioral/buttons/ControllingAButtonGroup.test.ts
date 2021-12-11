import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ButtonGroupViewController from '../../../viewControllers/ButtonGroup.vc'

export default class UsingAButtonGroupTest extends AbstractViewControllerTest {
	private static singleSelectVc: ButtonGroupViewController
	private static onSelectInvocations: number[][]
	private static multiSelectVc: ButtonGroupViewController
	protected static controllerMap = {}
	private static onClickHintInvocations: number[] = []

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
					label: 'first',
				},
				{
					label: 'second',
				},
				{
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
					label: 'first',
				},
				{
					label: 'second',
				},
				{
					label: 'third',
				},
				{
					label: 'founth',
				},
			],
		})
	}

	@test()
	protected static canCreateUsingAButtonGrid() {
		assert.isTruthy(this.singleSelectVc)
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
	protected static canSelectButtonAndMarkRestAsDeselected() {
		this.singleSelectVc.selectButton(0)
		const buttons = this.render(this.singleSelectVc)
		this.assertFirstButtonSelected(buttons)
	}

	@test()
	protected static selectingSameButtonMoreThanOnceHasNoNegativeEffect() {
		this.singleSelectVc.selectButton(0)
		this.singleSelectVc.selectButton(0)
		this.singleSelectVc.selectButton(0)

		assert.isLength(this.onSelectInvocations, 1)
		let buttons = this.render(this.singleSelectVc)

		this.assertFirstButtonSelected(buttons)

		this.singleSelectVc.deselectButton(0)

		buttons = this.render(this.singleSelectVc)
		assert.doesNotInclude(buttons, { isSelected: true })
	}

	@test()
	protected static deselectingSameButtonMoreThanOnceHasNoNegativeEffect() {
		this.singleSelectVc.selectButton(0)
		this.singleSelectVc.deselectButton(0)
		this.singleSelectVc.deselectButton(0)

		assert.isLength(this.onSelectInvocations, 2)

		let buttons = this.render(this.singleSelectVc)
		assert.doesNotInclude(buttons, { isSelected: true })
	}

	@test()
	protected static canDeselectButton() {
		this.singleSelectVc.selectButton(0)
		this.singleSelectVc.deselectButton(0)

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
	protected static onSelectFiredWhenButtonSelected() {
		this.singleSelectVc.selectButton(0)

		assert.isLength(this.onSelectInvocations, 1)
		assert.isEqualDeep(this.onSelectInvocations[0], [0])
	}

	@test()
	protected static canSelectMoreThanOneButton() {
		this.multiSelectVc.selectButton(0)
		this.multiSelectVc.selectButton(1)

		const buttons = this.render(this.multiSelectVc)

		assert.doesInclude(buttons, { isSelected: true })
		assert.doesInclude(buttons[0], { isSelected: true })
		assert.doesInclude(buttons[1], { isSelected: true })
		assert.doesInclude(buttons[2], { isSelected: false })
		assert.doesInclude(buttons[3], { isSelected: false })
	}

	@test()
	protected static onSelectFiredWhenMultiButtonSelectedAndDeselected() {
		this.multiSelectVc.selectButton(0)
		this.multiSelectVc.selectButton(1)
		this.multiSelectVc.deselectButton(0)
		this.multiSelectVc.deselectButton(0)

		assert.isLength(this.onSelectInvocations, 3)

		assert.isEqualDeep(this.onSelectInvocations[0], [0])
		assert.isEqualDeep(this.onSelectInvocations[1], [0, 1])
		assert.isEqualDeep(this.onSelectInvocations[2], [1])
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
		assert.isEqual(this.onClickHintInvocations[0], 0)

		await buttons[1].onClickHintIcon?.()
		assert.isEqual(this.onClickHintInvocations[1], 1)
	}

	@test()
	protected static async canSetSelectedButtonsToStart() {
		const vc = this.Factory().Controller('buttonGroup', {
			selected: [0, 1],
			onSelectionChange: (selected) => {
				this.onSelectInvocations.push(selected)
			},
			buttons: [
				{
					label: 'first',
				},
				{
					label: 'second',
				},
				{
					label: 'third',
				},
				{
					label: 'founth',
				},
			],
		})

		const selected = vc.getSelectedButtons()
		assert.isEqualDeep(selected, [0, 1])

		const buttons = this.render(vc)
		assert.doesInclude(buttons, { isSelected: true })
	}

	private static assertFirstButtonSelected(
		buttons: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
	) {
		assert.doesInclude(buttons, { isSelected: true })
		assert.doesInclude(buttons[0], { isSelected: true })
		assert.doesInclude(buttons[1], { isSelected: false })
	}
}
