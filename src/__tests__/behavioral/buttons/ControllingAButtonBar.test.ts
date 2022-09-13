import { test, assert } from '@sprucelabs/test-utils'
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
					id: 'first',
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
					id: 'first',
					label: 'what the?',
				},
				{
					id: 'second',
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
				id: 'first',
				label: 'what the?',
			},
			{
				id: 'second',
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
	protected static async delegatesCallsToButtonGroup() {
		const id = `${new Date().getTime()}`

		const buttons = [
			{
				id,
				label: id,
			},
			{
				id: 'second',
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

		await vc.selectButton(id)
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), [id])

		await vc.selectButtons(['second'])
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), ['second'])

		await vc.deselectButton('second')
		assert.isEqualDeep(vc.getButtonGroupVc().getSelectedButtons(), [])
	}

	@test()
	protected static async selectingButtonsTriggersOnChange() {
		let wasHit = true
		const vc = this.Controller('buttonBar', {
			onSelectionChange: () => {
				wasHit = true
			},
			buttons: [
				{
					id: 'one',
				},
				{ id: 'two' },
			],
		})

		await vc.selectButtons(['one'])
		await this.wait(0)

		assert.isTrue(wasHit)
	}
}
