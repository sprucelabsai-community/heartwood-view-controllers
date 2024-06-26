import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ButtonGroupButton } from '../../../types/heartwood.types'
import ButtonBarViewController from '../../../viewControllers/ButtonBar.vc'
import ButtonGroupViewController from '../../../viewControllers/ButtonGroup.vc'

export default class ControllingAButtonBarTest extends AbstractViewControllerTest {
    protected static controllerMap = {}
    private static vc: ButtonBarViewController

    @test()
    protected static async canCreateAButtonBar() {
        this.vc = this.ButtonBarWithButtons([])
        assert.isTruthy(this.vc)
        assert.isEqualDeep(this.renderedButtons, [])
        assert.isEqualDeep(this.render(this.vc.getButtonGroupVc()), [])
    }

    @test()
    protected static shouldRenderButtonsItsPassed() {
        this.setButtons([
            {
                id: 'first',
                label: 'what the?',
            },
        ])

        assert.isEqual(this.render(this.vc).controller, this.vc)
        assert.isEqual(this.renderedButtons[0].label, 'what the?')
    }

    @test()
    protected static rendersButtonsUsingButtonGroup() {
        this.setButtons([
            {
                id: 'first',
                label: 'what the?',
            },
            {
                id: 'second',
                label: 'what the 2',
            },
        ])

        assert.isTruthy(this.renderedButtons[0].controller)
        assert.isFunction(this.renderedButtons[0].controller?.render)
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
            {
                id: 'third',
                label: 'what the 3',
            },
        ]

        this.setButtons(buttons)

        assert.isEqual(
            this.vc.getSelectedButtons(),
            this.buttonGroupVc.getSelectedButtons()
        )

        await this.vc.selectButton(id)
        this.assertSelectedButtonGroupButtonsEqual([id])

        await this.vc.selectButtons(['second'])
        this.assertSelectedButtonGroupButtonsEqual(['second'])

        await this.vc.deselectButton('second')
        this.assertSelectedButtonGroupButtonsEqual([])

        await this.vc.setSelectedButtons(['second'])
        this.assertSelectedButtonGroupButtonsEqual(['second'])

        await this.vc.setSelectedButtons(['third'])
        this.assertSelectedButtonGroupButtonsEqual(['third'])
    }

    private static assertSelectedButtonGroupButtonsEqual(expected: string[]) {
        assert.isEqualDeep(this.buttonGroupVc.getSelectedButtons(), expected)
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

    private static setButtons(buttons: { id: string; label: string }[]) {
        this.vc = this.ButtonBarWithButtons(buttons)
    }

    private static get buttonGroupVc() {
        return this.vc.getButtonGroupVc()
    }

    private static get renderedButtons() {
        return this.render(this.vc).buttons
    }

    private static ButtonBarWithButtons(buttons: ButtonGroupButton[]) {
        return this.Controller('buttonBar', {
            buttons,
        })
    }
}
