import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection

@suite()
export default class AssertingCardSectionsTest extends AbstractViewControllerTest {
    @test('does not find with no sections', [], 'test')
    @test('does not find with miss-matched id', [{ id: 'testing' }], 'test')
    protected throwsIfNoSection(sections: Section[], lookupId: string) {
        assert.doesThrow(
            () => this.assertRendersSection(sections, lookupId),
            'find a section'
        )

        this.assertDoesNotRenderSection(sections, lookupId)
    }

    @test(
        'finds matching first section',
        [
            {
                id: 'test',
            },
        ],
        'test'
    )
    @test(
        'finds matching first section different id',
        [
            {
                id: 'testing',
            },
        ],
        'testing'
    )
    @test(
        'finds matching in later section',
        [
            { id: 'test' },
            {
                id: 'testing',
            },
        ],
        'testing'
    )
    protected passesInFirstSection(sections: Section[], lookupId: string) {
        this.assertRendersSection(sections, lookupId)
        assert.doesThrow(
            () => this.assertDoesNotRenderSection(sections, lookupId),
            'the section'
        )
    }

    private assertRendersSection(sections: Section[], sectionId: string) {
        vcAssert.assertCardRendersSection(this.CardVc(sections), sectionId)
    }

    private assertDoesNotRenderSection(sections: Section[], sectionId: string) {
        vcAssert.assertCardDoesNotRenderSection(
            this.CardVc(sections),
            sectionId
        )
    }

    private CardVc(sections?: Section[]) {
        return this.Controller('card', { body: { sections } })
    }
}
