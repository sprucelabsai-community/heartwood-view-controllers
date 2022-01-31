import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ButtonGroupViewController from '../../../viewControllers/ButtonGroup.vc'

export default class ControllingAButtonBarTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static async canCreateAButtonBar() {
		const vc = this.Controller('buttonBar', {
			buttons: [],
		})
		assert.isTruthy(vc)
		assert.isEqualDeep(this.render(vc).buttons, [])
		assert.isEqualDeep(this.render(vc.getButtonGroupVc()), [])
	}

	@test()
	protected static shouldRenderButtonsItsPassed() {
		const vc = this.Controller('buttonBar', {
			buttons: [
				{
					label: 'what the?',
				},
			],
		})

		const model = this.render(vc)
		assert.isEqual(model.controller, vc)
		assert.isEqual(model.buttons[0].label, 'what the?')
	}

	@test()
	protected static rendersButtonsUsingButtonGroup() {
		const vc = this.Controller('buttonBar', {
			buttons: [
				{
					label: 'what the?',
				},
				{
					label: 'what the 2',
				},
			],
		})

		assert.isTruthy(this.render(vc).buttons[0].controller)
		assert.isFunction(this.render(vc).buttons[0].controller?.render)
	}

	@test()
	protected static async optionsPassedThroughToButtonGroup() {
		const buttons = [
			{
				label: 'what the?',
			},
			{
				label: 'what the 2',
			},
		]

		const selectionHandler = () => {}
		const clickHandler = () => {}

		const vc = this.Controller('buttonBar', {
			onSelectionChange: selectionHandler,
			shouldAllowMultiSelect: true,
			onClickHintIcon: clickHandler,
			buttons,
		})

		const buttonGroupVc = vc.getButtonGroupVc()
		assert.isTrue(buttonGroupVc instanceof ButtonGroupViewController)

		const rendered = buttonGroupVc.render()
		const renderedButtons = []

		for (const button of rendered) {
			if (button?.controller) {
				const btn = this.render(button.controller)

				renderedButtons.push(btn)
			}
		}

		assert.isEqual(renderedButtons[0].label, 'what the?')
		assert.isEqual(renderedButtons[1].label, 'what the 2')

		//@ts-ignore
		assert.isEqual(buttonGroupVc.selectionChangeHandler, selectionHandler)
		//@ts-ignore
		assert.isEqual(buttonGroupVc.clickHintHandler, clickHandler)
		//@ts-ignore
		assert.isTrue(buttonGroupVc.shouldAllowMultiSelect)
	}

	@test()
	protected static delegatesCallsToButtonGroup() {
		const buttons = [
			{
				label: `${new Date().getTime()}`,
			},
			{
				label: 'what the 2',
			},
		]

		const vc = this.Controller('buttonBar', {
			buttons,
		})

		assert.isEqual(
			vc.getSelectedButtons(),
			vc.getButtonGroupVc().getSelectedButtons()
		)

		vc.selectButton(0)
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), [0])

		vc.selectButtons([1])
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), [1])

		vc.deselectButton(1)
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), [])
	}
}
