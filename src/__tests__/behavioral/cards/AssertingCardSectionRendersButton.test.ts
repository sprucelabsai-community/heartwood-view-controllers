import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection

@suite()
export default class AssertingCardSectionRendersButtonTest extends AbstractViewControllerTest {
    @test('does not find with no sections', [], 'test')
    @test('does not find with miss-matched id', [{ id: 'testing' }], 'test')
    protected throwsIfNoSection(sections: Section[], sectionId: string) {
        assert.doesThrow(
            () => this.assertFindsButtonInSectionById(sections, sectionId),
            'find a section'
        )
    }

    @test(
        'throws if only section does not have a button',
        [{ id: 'testing' }],
        'testing'
    )
    @test(
        'throws if second section does not have a button',
        [{ id: 'testing' }, { id: 'test' }],
        'test'
    )
    @test(
        'throws if second section does not have a button (section idx)',
        [{ id: 'testing', buttons: [{ id: 'button1' }] }, { id: 'test' }],
        1
    )
    protected throwsIfSectionMissingButton(
        sections: Section[],
        sectionId: string
    ) {
        assert.doesThrow(
            () => this.assertFindsButtonInSectionById(sections, sectionId),
            'find button in section'
        )
    }

    @test(
        'finds matching first section',
        [
            {
                id: 'test',
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
            },
        ],
        'test'
    )
    @test(
        'finds matching first section different id',
        [
            {
                id: 'testing',
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
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
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
            },
        ] as Section[],
        'testing'
    )
    @test(
        'finds matching in later section using index',
        [
            { id: 'test' },
            {
                id: 'testing',
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
            },
        ] as Section[],
        1
    )
    protected passesInFirstSection(sections: Section[], lookupId: string) {
        this.assertFindsButtonInSectionById(sections, lookupId)
    }

    @test(
        'throws if section has a button but not one matching the buttonId',
        [
            {
                id: 'testing',
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
            },
        ],
        'testing',
        'button2'
    )
    protected throwsIfSectionIsMissingButtonId(
        sections: Section[],
        sectionId: string,
        buttonId: string
    ) {
        assert.doesThrow(
            () =>
                this.assertFindsButtonInSectionById(
                    sections,
                    sectionId,
                    buttonId
                ),
            'not find button'
        )
    }

    @test(
        'finds matching by buttonId - first button',
        [
            {
                id: 'testing',
                buttons: [
                    {
                        id: 'button1',
                        lineIcon: 'delete',
                        type: 'destructive',
                    },
                ],
            },
        ],
        'testing',
        'button1'
    )
    @test(
        'finds matching by buttonId - later button',
        [
            {
                id: 'testing',
                buttons: [
                    {
                        id: 'button1',
                    },
                    {
                        id: 'button2',
                    },
                    {
                        id: 'button3',
                    },
                ],
            },
        ],
        'testing',
        'button3'
    )
    protected passesIfButtonIdIsInSection(
        sections: Section[],
        sectionId: string,
        buttonId: string
    ) {
        this.assertFindsButtonInSectionById(sections, sectionId, buttonId)
    }

    private assertFindsButtonInSectionById(
        sections: Section[],
        sectionId: string,
        buttonId?: string
    ) {
        vcAssert.assertCardSectionRendersButton(
            this.CardVc(sections),
            sectionId,
            buttonId
        )
    }

    private CardVc(sections?: Section[]) {
        return this.Controller('card', { body: { sections } })
    }
}
