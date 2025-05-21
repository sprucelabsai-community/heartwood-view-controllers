import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import {
    AbstractViewController,
    CardViewControllerImpl,
    ListViewController,
    StickyToolPosition,
    vcAssert,
    ViewControllerId,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class TestToolCard extends AbstractViewController<Card> {
    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        const vc = this.Controller('card', {})
        return vc.render()
    }
}

@suite()
export default class AssertingStickyToolsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        testToolCard: TestToolCard,
    }

    @test()
    protected throwsIfMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            vcAssert.assertToolBeltStickyToolInstanceOf()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['toolBeltVc', 'position', 'Class'],
        })
    }

    @test()
    protected throwsWhenNoTopStickyTool() {
        assert.doesThrow(
            () =>
                vcAssert.assertToolBeltStickyToolInstanceOf({
                    toolBeltVc: this.Controller('tool-belt', {}),
                    position: 'top',
                    Class: {} as any,
                }),
            'no sticky tool'
        )
    }

    @test()
    protected throwsWhenClassDoesNotMatch() {
        const vc = this.Controller('tool-belt', {})
        const card1 = this.Controller('card', {})

        vc.setStickyTool({
            card: card1.render(),
            lineIcon: 'add',
            position: 'top',
        })

        assert.doesThrow(
            () =>
                vcAssert.assertToolBeltStickyToolInstanceOf({
                    toolBeltVc: vc,
                    position: 'top',
                    Class: ListViewController,
                }),
            'instance'
        )
    }

    @test('passes in position top', 'top', 'card', CardViewControllerImpl)
    @test('passes in position bottom', 'bottom', 'list', ListViewController)
    @test('passes in position top 2', 'top', 'testToolCard', TestToolCard)
    protected passesIfInstanceMatches(
        position: StickyToolPosition,
        vcId: ViewControllerId,
        Class: any
    ) {
        const vc = this.Controller('tool-belt', {})
        const cardVc = this.Controller(vcId, {})

        vc.setStickyTool({
            card: cardVc.render(),
            lineIcon: 'add',
            position,
        })

        const match = vcAssert.assertToolBeltStickyToolInstanceOf({
            toolBeltVc: vc,
            position,
            Class,
        })

        //@ts-ignore
        assert.isEqual(match, cardVc)
    }
}
