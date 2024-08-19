import { test, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor, { PagerButton } from '../../../tests/utilities/interactor'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

export default class InteractingWithPagersTest extends AbstractViewControllerTest {
    private static vc: PagerViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        const options = {}
        this.setupVc(options)
    }

    @test()
    protected static async interactorThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.clickPagerButton()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'button'],
        })
    }

    @test()
    protected static async throwsIfPagerNotConfigured() {
        await assert.doesThrowAsync(
            () => this.clickButton('next'),
            'configured'
        )
    }

    @test()
    protected static async failsIfClickingPreviouOnFirstPage() {
        this.setupVc({
            currentPage: 0,
            totalPages: 10,
        })

        await assert.doesThrowAsync(() => this.clickPrevious(), 'first page')
    }

    @test()
    protected static async clickingNextIncrementsPage() {
        this.setupVc({
            currentPage: 0,
            totalPages: 10,
        })

        await this.clickNext()
        this.assertCurrentPage(1)
        await this.clickNext()
        this.assertCurrentPage(2)
    }

    @test()
    protected static async clickingNextPastLastPageThrows() {
        this.setupVc({
            currentPage: 9,
            totalPages: 10,
        })

        await this.assertClickNextThrows()
    }

    @test()
    protected static async clickingNextThrowsWithDifferentPages() {
        this.setupVc({
            currentPage: 5,
            totalPages: 6,
        })

        await this.assertClickNextThrows()
    }

    @test()
    protected static async clickingPreviousDecrementsPage() {
        this.setupVc({
            currentPage: 5,
            totalPages: 6,
        })

        await this.clickPrevious()
        this.assertCurrentPage(4)
        await this.clickPrevious()
        this.assertCurrentPage(3)
    }

    @test()
    protected static async canJumpToSpecificPage() {
        this.setupVc({
            currentPage: 5,
            totalPages: 6,
        })

        await this.clickButton(2)
        this.assertCurrentPage(2)

        await this.clickButton(4)
        this.assertCurrentPage(4)
    }

    private static async assertClickNextThrows() {
        await assert.doesThrowAsync(() => this.clickNext(), 'last page')
    }

    private static clickPrevious(): any {
        return this.clickButton('previous')
    }

    private static async clickNext() {
        await this.clickButton('next')
    }

    private static assertCurrentPage(expected: number) {
        pagerAssert.currentPage(this.vc, expected)
    }

    private static clickButton(button: PagerButton) {
        return interactor.clickPagerButton(this.vc, button)
    }

    private static setupVc(options: PagerViewControllerOptions) {
        this.vc = this.Controller('pager', options ?? {})
    }
}
