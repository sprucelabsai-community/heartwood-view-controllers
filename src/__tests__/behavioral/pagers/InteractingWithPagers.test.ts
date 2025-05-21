import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor, { PagerButton } from '../../../tests/utilities/interactor'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

@suite()
export default class InteractingWithPagersTest extends AbstractViewControllerTest {
    private vc!: PagerViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        const options = {}
        this.setupVc(options)
    }

    @test()
    protected async interactorThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.clickPagerButton()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'button'],
        })
    }

    @test()
    protected async throwsIfPagerNotConfigured() {
        await assert.doesThrowAsync(
            () => this.clickButton('next'),
            'configured'
        )
    }

    @test()
    protected async failsIfClickingPreviouOnFirstPage() {
        this.setupVc({
            currentPage: 0,
            totalPages: 10,
        })

        await assert.doesThrowAsync(() => this.clickPrevious(), 'first page')
    }

    @test()
    protected async clickingNextIncrementsPage() {
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
    protected async clickingNextPastLastPageThrows() {
        this.setupVc({
            currentPage: 9,
            totalPages: 10,
        })

        await this.assertClickNextThrows()
    }

    @test()
    protected async clickingNextThrowsWithDifferentPages() {
        this.setupVc({
            currentPage: 5,
            totalPages: 6,
        })

        await this.assertClickNextThrows()
    }

    @test()
    protected async clickingPreviousDecrementsPage() {
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
    protected async canJumpToSpecificPage() {
        this.setupVc({
            currentPage: 5,
            totalPages: 6,
        })

        await this.clickButton(2)
        this.assertCurrentPage(2)

        await this.clickButton(4)
        this.assertCurrentPage(4)
    }

    private async assertClickNextThrows() {
        await assert.doesThrowAsync(() => this.clickNext(), 'last page')
    }

    private clickPrevious(): any {
        return this.clickButton('previous')
    }

    private async clickNext() {
        await this.clickButton('next')
    }

    private assertCurrentPage(expected: number) {
        pagerAssert.currentPage(this.vc, expected)
    }

    private clickButton(button: PagerButton) {
        return interactor.clickPagerButton(this.vc, button)
    }

    private setupVc(options: PagerViewControllerOptions) {
        this.vc = this.Controller('pager', options ?? {})
    }
}
