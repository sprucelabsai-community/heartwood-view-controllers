import { test, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import buttonAssert from '../../../tests/utilities/buttonAssert'

export default class AssertingButtonBars extends AbstractViewControllerTest {
    protected static controllerMap = {}

    @test()
    protected static throwsWhenMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            buttonAssert.buttonBarRendersButton()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['buttonBarVc', 'buttonId'],
        })
    }

    @test('finds first button', 'first')
    @test('finds second button', 'second')
    protected static findsButton(buttonId: string) {
        const buttons = [
            {
                id: 'first',
                label: 'Hey!',
            },
            {
                id: 'second',
                label: 'There!',
            },
        ]
        const vc = this.ButtonBarVc(buttons)
        buttonAssert.buttonBarRendersButton(vc, buttonId)
    }

    @test()
    protected static thowsWhenNoButton() {
        const vc = this.ButtonBarVc([
            {
                id: 'first',
                label: 'Hey!',
            },
        ])

        assert.doesThrow(() =>
            buttonAssert.buttonBarRendersButton(vc, 'second')
        )
    }

    @test()
    protected static async assertRendersButtonPassesIfButtonGroupRendersButton() {
        const id = generateId()

        const vc = this.ButtonBarVc([
            {
                id,
                label: 'Hey!',
            },
        ])

        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttonBar: vc.render(),
                    },
                ],
            },
        })

        buttonAssert.cardRendersButton(cardVc, id)
    }

    private static ButtonBarVc(buttons: { id: string; label: string }[]) {
        return this.Controller('buttonBar', {
            buttons,
        })
    }
}
