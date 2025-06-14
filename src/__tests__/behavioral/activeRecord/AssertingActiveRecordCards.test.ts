import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockActiveRecordCard from '../../../tests/MockActiveRecordCard'
import activeRecordCardAssert from '../../../tests/utilities/activeRecordCardAssert'
import {
    ActiveRecordPagingOptions,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'
import ActiveRecordCardViewController from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'

class GenericSkillView extends AbstractSkillViewController {
    private model!: SkillView

    public constructor(options: ViewControllerOptions & SkillView) {
        super(options)
        this.model = removeUniversalViewOptions(options)
    }

    public render(): SkillView {
        return this.model
    }
}

@suite()
export default class AssertingActiveRecordCardsTest extends AbstractViewControllerTest {
    private cardVc!: MockActiveRecordCard

    protected async beforeEach() {
        await super.beforeEach()

        this.getFactory().setController('genericSkillView', GenericSkillView)

        this.getFactory().setController(
            'active-record-card',
            MockActiveRecordCard
        )
        this.cardVc = this.ActiveRecordCard() as MockActiveRecordCard
    }

    @test()
    protected throwsIfNoActiveRecord() {
        const vc = this.Controller('genericSkillView', {
            layouts: [],
        })

        assert.doesThrow(() =>
            activeRecordCardAssert.skillViewRendersActiveRecordCard(vc)
        )
    }

    @test()
    protected canTellIfHasActiveRecord() {
        const vc = this.Controller('genericSkillView', {
            layouts: [
                {
                    cards: [
                        this.renderActiveRecordCard(),
                        this.renderActiveRecordCard('test'),
                    ],
                },
            ],
        })

        activeRecordCardAssert.skillViewRendersActiveRecordCard(vc)

        assert.doesThrow(() =>
            activeRecordCardAssert.skillViewRendersActiveRecordCard(vc, 'test2')
        )

        activeRecordCardAssert.skillViewRendersActiveRecordCard(vc, 'test')
    }

    @test()
    protected canTellIfPlainCardPassed() {
        const cardVc = this.Controller('card', {})
        const vc = this.Controller('genericSkillView', {
            layouts: [
                {
                    cards: [cardVc.render()],
                },
            ],
        })

        assert.doesThrow(() =>
            activeRecordCardAssert.skillViewRendersActiveRecordCard(vc)
        )
        assert.doesThrow(() =>
            activeRecordCardAssert.rendersAsActiveRecordCard(cardVc)
        )
    }

    @test()
    protected returnsActiveCardControllerInstance() {
        const active = this.ActiveRecordCard()
        const vc = this.Controller('genericSkillView', {
            layouts: [
                {
                    cards: [active.render()],
                },
            ],
        })

        const match =
            activeRecordCardAssert.skillViewRendersActiveRecordCard(vc)
        assert.isEqual(active, match)

        assert.isTrue(match instanceof ActiveRecordCardViewController)
        activeRecordCardAssert.rendersAsActiveRecordCard(match)
        //@ts-ignore
        activeRecordCardAssert.rendersAsActiveRecordCard(match.cardVc)
    }

    @test()
    protected matchesWhenCardRendersActiveRecordCard() {
        const active = this.ActiveRecordCard()
        const vc = this.Controller('card', {})
        vc.render = () => {
            return active.render()
        }
        activeRecordCardAssert.rendersAsActiveRecordCard(vc)
    }

    @test()
    protected async assertPagingOptionsThrowsWhenMissingRequired() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            activeRecordCardAssert.pagingOptionsEqual()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'expected'],
        })
    }

    @test()
    protected async throwsWhenPagingOptionsDontMatch() {
        this.assertPagingOptionsEqualThrows({
            pageSize: 10,
            shouldPageClientSide: true,
            errorMessage: 'paging',
        })

        this.setupCardWithPaging({
            pageSize: 12,
            shouldPageClientSide: true,
        })

        this.assertPagingOptionsEqualThrows({
            pageSize: 20,
            shouldPageClientSide: false,
            errorMessage: 'not match',
        })

        this.assertPagingOptionsEqualThrows({
            pageSize: 11,
            shouldPageClientSide: true,
            errorMessage: 'not match',
        })
    }

    @test()
    protected async assertingPagingSettingsMatch() {
        this.setupPagingAndAssertEqualExpected({
            pageSize: 10,
            shouldPageClientSide: true,
        })

        this.setupPagingAndAssertEqualExpected({
            pageSize: 20,
            shouldPageClientSide: false,
        })
    }

    @test()
    protected async canAssertHasBeenLoaded() {
        assert.doesThrow(() => this.cardVc.assertIsLoaded())
        await this.cardVc.load()
        this.cardVc.assertIsLoaded()
    }

    @test()
    protected async canAssertReloadCount() {
        await this.cardVc.load()
        assert.doesThrow(() => this.cardVc.assertRefreshCount(1))
        await this.refresh()
        this.cardVc.assertRefreshCount(1)
        assert.doesThrow(() => this.cardVc.assertRefreshCount(2))
        await this.refresh()
        this.cardVc.assertRefreshCount(2)
    }

    private async refresh() {
        await this.cardVc.refresh()
    }

    private setupPagingAndAssertEqualExpected(
        expected: ActiveRecordPagingOptions
    ) {
        this.setupCardWithPaging(expected)
        activeRecordCardAssert.pagingOptionsEqual(this.cardVc, {
            ...expected,
        })
    }

    private setupCardWithPaging(expected: ActiveRecordPagingOptions) {
        this.cardVc = this.ActiveRecordCard(generateId(), expected)
    }

    private assertPagingOptionsEqualThrows(expected: {
        pageSize: number
        shouldPageClientSide: boolean
        errorMessage?: string
    }) {
        const { errorMessage, ...rest } = expected
        assert.doesThrow(
            () => this.assertPagingOptions(rest),
            errorMessage ?? 'match'
        )
    }

    private assertPagingOptions(expected: ActiveRecordPagingOptions) {
        return activeRecordCardAssert.pagingOptionsEqual(this.cardVc, expected)
    }

    private renderActiveRecordCard(
        id?: string
    ): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return this.ActiveRecordCard(id).render()
    }

    private ActiveRecordCard(
        id?: string,
        pagingOptions?: ActiveRecordPagingOptions
    ) {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id,
                eventName: 'list-organizations::v2020_12_25',
                responseKey: 'organizations',
                rowTransformer: (o) => ({ id: o.id, cells: [] }),
                paging: pagingOptions,
            })
        ) as MockActiveRecordCard
    }
}

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

declare module '../../../types/heartwood.types' {
    interface ViewControllerMap {
        genericSkillView: GenericSkillView
    }

    interface ViewControllerOptionsMap {
        genericSkillView: SkillView
    }
}
