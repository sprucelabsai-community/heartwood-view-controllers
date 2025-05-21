import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import { CardSection, CardViewController } from '../../../types/heartwood.types'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

@suite()
export default class AssertingPagersTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    private pagerVc!: PagerViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.setupPager()
    }

    @test()
    protected async throwsWithMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.cardRendersPager())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsIfNoSectionRendered() {
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected async canFindPagerInFirstSection() {
        this.addSectionWithPager()
        this.assertCardRendersPager()
    }

    @test()
    protected async throwsIfSectionWithNoPagerRendered() {
        this.addSection({})
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected async canFindPagerInSecondSection() {
        this.addSection({})
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager()
        assert.isEqual(vc, this.pagerVc)
    }

    @test()
    protected async throwsIfPagerIdDoesNotMatch() {
        this.setupPager({ id: generateId() })
        this.addSectionWithPager()
        this.asserthThrowsBecausePagerNotFound(generateId())
    }

    @test()
    protected async findsFirstPagerWithId() {
        const id = generateId()
        this.setupPager({ id })
        this.addSectionWithPager()
        this.assertCardRendersPager(id)
    }

    @test()
    protected async findsSecondPagerWithId() {
        const id = generateId()
        this.addSectionWithPager()
        this.setupPager({ id })
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager(id)
        assert.isEqual(vc, this.pagerVc)
    }

    @test()
    protected async totalPagersThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.totalPages())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'expected'],
        })
    }

    @test()
    protected async throwsIfTotalPagesDoesNotMatch() {
        this.setupPager({ totalPages: 10 })
        this.assertTotalPagesThrows(11)
        this.setupPager({ totalPages: 11 })
        this.assertTotalPagesThrows(10)
    }

    @test()
    protected async matchesOnTotalPages() {
        this.setupPager({ totalPages: 10 })
        this.assertTotalPages(10)
    }

    @test()
    protected async cardDoesNotRenderPagerThrowsWhenMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.cardDoesNotRenderPager())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenPagerIsRendered() {
        this.addSectionWithPager()
        assert.doesThrow(
            () => pagerAssert.cardDoesNotRenderPager(this.vc),
            'pager'
        )
    }

    @test()
    protected async canFindPageInFooter() {
        this.vc.setFooter({
            pager: this.pagerVc.render(),
        })

        this.assertCardRendersPager()
    }

    @test()
    protected throwsIfNotInFooter() {
        this.vc.setFooter({
            buttons: [],
        })

        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected async assertCurrentPageThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.currentPage())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'expected'],
        })
    }

    @test()
    protected async throwsIfCurrentPageDoesNotMatch() {
        this.setTotalPages(20)
        this.assertCurrentPageThrows(11)
        this.setCurrentPage(11)
        this.assertCurrentPageThrows(9)
    }

    @test()
    protected async matchesOnCurrentPage() {
        this.setTotalPages(20)
        this.setCurrentPage(5)
        this.assertCurrentPage(5)
        this.setCurrentPage(10)
        this.assertCurrentPage(10)
        this.setCurrentPage(11)
        this.assertCurrentPage(11)
    }

    @test()
    protected async assertRouterNotConfiguredThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.pagerIsCleared())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async canAssertRouterIsNotConfigured() {
        this.setupPager({
            totalPages: 10,
        })

        this.assertPagerOptionsNotSetThrows()

        this.setupPager({
            currentPage: 5,
        })

        this.assertPagerOptionsNotSetThrows()

        this.setupPager({
            totalPages: 0,
            currentPage: 0,
        })

        this.assertPagerOptionsNotSetThrows()
    }

    @test()
    protected async canAssertRouterIsNotConfiguredOnCard() {
        this.setupPager({})
        this.assertPagerPagingIsNotConfigured()
    }

    @test()
    protected async isConfiguredThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.pagerIsConfigured())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsIfTotalPagesNotConfigured() {
        this.assertPagingConfiguredThrows()
        this.setupPager({
            currentPage: 0,
        })
        this.assertPagingConfiguredThrows()
    }

    @test()
    protected async passesIfConfigured() {
        this.setupPager({
            currentPage: 0,
            totalPages: 10,
        })

        this.assertPagingConfigured()
    }

    private assertPagingConfiguredThrows() {
        assert.doesThrow(() => this.assertPagingConfigured(), 'configured')
    }

    private assertPagingConfigured(): any {
        return pagerAssert.pagerIsConfigured(this.pagerVc)
    }

    private assertPagerOptionsNotSetThrows() {
        assert.doesThrow(() => this.assertPagerPagingIsNotConfigured(), 'clear')
    }

    private assertPagerPagingIsNotConfigured(): any {
        return pagerAssert.pagerIsCleared(this.pagerVc)
    }

    private assertCurrentPageThrows(expected: number) {
        assert.doesThrow(
            () => this.assertCurrentPage(expected),
            'setCurrentPage'
        )
    }

    private setCurrentPage(current: number) {
        this.pagerVc.setCurrentPage(current)
    }

    private setTotalPages(pages: number) {
        this.pagerVc.setTotalPages(pages)
    }

    private assertCurrentPage(expected: number): any {
        return pagerAssert.currentPage(this.pagerVc, expected)
    }

    private assertTotalPagesThrows(expected: number) {
        assert.doesThrow(() => this.assertTotalPages(expected), 'pages')
    }

    private assertTotalPages(expected: number): any {
        return pagerAssert.totalPages(this.pagerVc, expected)
    }

    private setupPager(options?: PagerViewControllerOptions) {
        this.pagerVc = this.Controller('pager', { ...options })
    }

    private asserthThrowsBecausePagerNotFound(id?: string) {
        assert.doesThrow(
            () => this.assertCardRendersPager(id),
            id ? 'id' : 'pager'
        )

        pagerAssert.cardDoesNotRenderPager(this.vc, id)
    }

    private addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private addSectionWithPager() {
        this.addSection({
            pager: this.pagerVc.render(),
        })
    }

    private assertCardRendersPager(id?: string) {
        return pagerAssert.cardRendersPager(this.vc, id)
    }
}
