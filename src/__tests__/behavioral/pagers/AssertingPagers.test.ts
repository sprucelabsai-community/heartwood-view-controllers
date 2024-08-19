import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import { CardSection, CardViewController } from '../../../types/heartwood.types'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

export default class AssertingPagersTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static pagerVc: PagerViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.setupPager()
    }

    @test()
    protected static async throwsWithMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.cardRendersPager())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsIfNoSectionRendered() {
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected static async canFindPagerInFirstSection() {
        this.addSectionWithPager()
        this.assertCardRendersPager()
    }

    @test()
    protected static async throwsIfSectionWithNoPagerRendered() {
        this.addSection({})
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected static async canFindPagerInSecondSection() {
        this.addSection({})
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager()
        assert.isEqual(vc, this.pagerVc)
    }

    @test()
    protected static async throwsIfPagerIdDoesNotMatch() {
        this.setupPager({ id: generateId() })
        this.addSectionWithPager()
        this.asserthThrowsBecausePagerNotFound(generateId())
    }

    @test()
    protected static async findsFirstPagerWithId() {
        const id = generateId()
        this.setupPager({ id })
        this.addSectionWithPager()
        this.assertCardRendersPager(id)
    }

    @test()
    protected static async findsSecondPagerWithId() {
        const id = generateId()
        this.addSectionWithPager()
        this.setupPager({ id })
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager(id)
        assert.isEqual(vc, this.pagerVc)
    }

    @test()
    protected static async totalPagersThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.totalPages())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'expected'],
        })
    }

    @test()
    protected static async throwsIfTotalPagesDoesNotMatch() {
        this.setupPager({ totalPages: 10 })
        this.assertTotalPagesThrows(11)
        this.setupPager({ totalPages: 11 })
        this.assertTotalPagesThrows(10)
    }

    @test()
    protected static async matchesOnTotalPages() {
        this.setupPager({ totalPages: 10 })
        this.assertTotalPages(10)
    }

    @test()
    protected static async cardDoesNotRenderPagerThrowsWhenMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.cardDoesNotRenderPager())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsWhenPagerIsRendered() {
        this.addSectionWithPager()
        assert.doesThrow(
            () => pagerAssert.cardDoesNotRenderPager(this.vc),
            'pager'
        )
    }

    @test()
    protected static async canFindPageInFooter() {
        this.vc.setFooter({
            pager: this.pagerVc.render(),
        })

        this.assertCardRendersPager()
    }

    @test()
    protected static throwsIfNotInFooter() {
        this.vc.setFooter({
            buttons: [],
        })

        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected static async assertCurrentPageThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.currentPage())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'expected'],
        })
    }

    @test()
    protected static async throwsIfCurrentPageDoesNotMatch() {
        this.setTotalPages(20)
        this.assertCurrentPageThrows(11)
        this.setCurrentPage(11)
        this.assertCurrentPageThrows(9)
    }

    @test()
    protected static async matchesOnCurrentPage() {
        this.setTotalPages(20)
        this.setCurrentPage(5)
        this.assertCurrentPage(5)
        this.setCurrentPage(10)
        this.assertCurrentPage(10)
        this.setCurrentPage(11)
        this.assertCurrentPage(11)
    }

    @test()
    protected static async assertRouterNotConfiguredThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.pagingNotConfigured())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async canAssertRouterIsNotConfigured() {
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
    protected static async canAssertRouterIsNotConfiguredOnCard() {
        this.setupPager({})
        this.assertPagerPagingIsNotConfigured()
    }

    @test()
    protected static async isConfiguredThrowsIfMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.pagingConfigured())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsIfTotalPagesNotConfigured() {
        this.assertPagingConfiguredThrows()
        this.setupPager({
            currentPage: 0,
        })
        this.assertPagingConfiguredThrows()
    }

    @test()
    protected static async passesIfConfigured() {
        this.setupPager({
            currentPage: 0,
            totalPages: 10,
        })

        this.assertPagingConfigured()
    }

    private static assertPagingConfiguredThrows() {
        assert.doesThrow(() => this.assertPagingConfigured(), 'configured')
    }

    private static assertPagingConfigured(): any {
        return pagerAssert.pagingConfigured(this.pagerVc)
    }

    private static assertPagerOptionsNotSetThrows() {
        assert.doesThrow(() => this.assertPagerPagingIsNotConfigured(), 'clear')
    }

    private static assertPagerPagingIsNotConfigured(): any {
        return pagerAssert.pagingNotConfigured(this.pagerVc)
    }

    private static assertCurrentPageThrows(expected: number) {
        assert.doesThrow(
            () => this.assertCurrentPage(expected),
            'setCurrentPage'
        )
    }

    private static setCurrentPage(current: number) {
        this.pagerVc.setCurrentPage(current)
    }

    private static setTotalPages(pages: number) {
        this.pagerVc.setTotalPages(pages)
    }

    private static assertCurrentPage(expected: number): any {
        return pagerAssert.currentPage(this.pagerVc, expected)
    }

    private static assertTotalPagesThrows(expected: number) {
        assert.doesThrow(() => this.assertTotalPages(expected), 'pages')
    }

    private static assertTotalPages(expected: number): any {
        return pagerAssert.totalPages(this.pagerVc, expected)
    }

    private static setupPager(options?: PagerViewControllerOptions) {
        this.pagerVc = this.Controller('pager', { ...options })
    }

    private static asserthThrowsBecausePagerNotFound(id?: string) {
        assert.doesThrow(
            () => this.assertCardRendersPager(id),
            id ? 'id' : 'pager'
        )

        pagerAssert.cardDoesNotRenderPager(this.vc, id)
    }

    private static addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private static addSectionWithPager() {
        this.addSection({
            pager: this.pagerVc.render(),
        })
    }

    private static assertCardRendersPager(id?: string) {
        return pagerAssert.cardRendersPager(this.vc, id)
    }
}
