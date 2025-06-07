import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { ButtonBarViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class AssertingButtonBarsInCards extends AbstractViewControllerTest {
    @test()
    protected throwsWhenMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            vcAssert.assertCardRendersButtonBar()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected canFindButtonBarInFirstSection() {
        this.assertFindsButtonBar([
            {
                buttonBar: this.renderButtonBar(),
            },
        ])
    }

    @test()
    protected throwsWithNoButtonBar() {
        const cardVc = this.CardVc()
        assert.doesThrow(() => vcAssert.assertCardRendersButtonBar(cardVc))
    }

    @test()
    protected canFindButtonBarInSecionSection() {
        this.assertFindsButtonBar([
            {},
            {
                buttonBar: this.renderButtonBar(),
            },
        ])
    }

    @test()
    protected rendersButtonBar() {
        const buttonBarVc = this.ButtonBarVc()

        const vc = this.assertFindsButtonBar([
            {
                buttonBar: buttonBarVc.render(),
            },
        ])

        assert.isEqual(vc, buttonBarVc)
    }

    private assertFindsButtonBar(sections: Section[]) {
        const cardVc = this.CardVc(sections)

        return vcAssert.assertCardRendersButtonBar(cardVc)
    }

    private CardVc(sections: Section[] = []) {
        return this.Controller('card', {
            body: {
                sections,
            },
        })
    }

    private renderButtonBar(): ButtonBar {
        return this.ButtonBarVc().render()
    }

    private ButtonBarVc(): ButtonBarViewController {
        return this.Controller('button-bar', {
            buttons: [],
        })
    }
}

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type ButtonBar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar
