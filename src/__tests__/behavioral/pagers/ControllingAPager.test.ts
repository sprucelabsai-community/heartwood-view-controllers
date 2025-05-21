import { assert, errorAssert, test, suite } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

@suite()
export default class ControllingAPagerTest extends AbstractViewControllerTest {
    private vc!: PagerViewController
    private onChangePagePage?: number

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        delete this.onChangePagePage
        this.setup({})
    }

    @test()
    protected async canCreateControllingAPager() {
        this.Controller('pager', {})
    }

    @test()
    protected async rendersItselfAsController() {
        this.setup({})
        assert.isEqual(this.model.controller, this.vc)
    }

    @test('passes through page options 1', 10, 5)
    @test('passes through page options 2', 11, 1)
    protected async passesThroughPageOptions(
        totalPages: number,
        currentPage: number
    ) {
        this.setup({ totalPages, currentPage })

        this.assertTotalPagesEquals(totalPages)
        assert.isEqual(this.model.currentPage, currentPage)
    }

    @test()
    public settingTotalPagesUpdatesViewModel() {
        this.setTotalPages(10)
        this.assertTotalPagesEquals(10)

        this.setTotalPages(20)
        this.assertTotalPagesEquals(20)
    }

    @test()
    protected settingTotalPagesTriggersRender() {
        this.setTotalPages(5)
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected settingCurrentPageToNegativeThrows() {
        this.setTotalPages(2)
        this.assertSetCurrentPageThrows(-1)
    }

    @test()
    protected async settingCurrentPageToHigherThanTotalPagesThrows() {
        this.setTotalPages(2)
        this.assertSetCurrentPageThrows(3)
        this.assertSetCurrentPageThrows(2)
    }

    @test()
    protected canSetCurrentPage() {
        this.setTotalPages(2)
        this.setCurrentPage(1)
    }

    @test()
    protected async throwsIfTotalPagesNotSet() {
        this.assertSetCurrentPageThrows(1)
    }

    @test()
    protected async setCurrentPageTriggersRender() {
        this.setTotalPages(2)
        this.setCurrentPage(1)
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected currentPageSetsCorrectly() {
        this.setTotalPages(10)
        this.assertCurrentPageSetsCorrectly(1)
        this.assertCurrentPageSetsCorrectly(5)
    }

    @test()
    protected settingCurrentPageInvokesCallback() {
        this.setTotalPages(10)
        this.assertSetCurrentPageCallbackPassesPageThrough(5)
        this.assertSetCurrentPageCallbackPassesPageThrough(3)
    }

    @test()
    protected async canGetTotalpages() {
        this.setTotalPages(5)
        this.assertGetTotalPagesReturns(5)

        this.setTotalPages(10)
        this.assertGetTotalPagesReturns(10)
    }

    @test()
    protected async canGetCurrentPage() {
        this.setTotalPages(10)
        this.setCurrentPage(5)

        this.assertGetCurrentPageReturns(5)

        this.setCurrentPage(3)
        this.assertGetCurrentPageReturns(3)
    }

    @test()
    protected async getTotalPagesReturnsNegativeOneIfNotSet() {
        this.assertGetTotalPagesReturns(-1)
    }

    @test()
    protected async getCurrentPageReturnsNegativeOneIfNotSet() {
        this.assertGetCurrentPageReturns(-1)
    }

    @test()
    protected async doesNotTriggerOnChangePageIfCurrentPageIsSetToSameValue() {
        this.setTotalPages(2)
        this.setCurrentPage(1)
        delete this.onChangePagePage
        this.setCurrentPage(1)
        assert.isUndefined(this.onChangePagePage)
    }

    @test()
    protected canClearPagingSettings() {
        this.setTotalPages(10)
        this.setCurrentPage(5)
        this.clear()
        assert.isUndefined(this.model.currentPage)
        assert.isUndefined(this.model.totalPages)
    }

    @test()
    protected clearTriggerRender() {
        this.clear()
        this.assertTriggerRenderCount(1)
    }

    private clear() {
        this.vc.clear()
    }

    private assertGetCurrentPageReturns(expected: number) {
        assert.isEqual(this.vc.getCurrentPage(), expected)
    }

    private assertGetTotalPagesReturns(expected: number) {
        assert.isEqual(this.vc.getTotalPages(), expected)
    }

    private assertSetCurrentPageCallbackPassesPageThrough(page: number) {
        this.model.setCurrentPage(page)
        assert.isEqual(this.onChangePagePage, page)
        this.assertCurrentPageEquals(page)
    }

    private assertCurrentPageSetsCorrectly(current: number) {
        this.setCurrentPage(current)
        this.assertCurrentPageEquals(current)
    }

    private assertCurrentPageEquals(current: number) {
        assert.isEqual(
            this.model.currentPage,
            current,
            'Current page not set correctly'
        )
    }

    private assertTriggerRenderCount(expected: number) {
        vcAssert.assertTriggerRenderCount(this.vc, expected)
    }

    private assertSetCurrentPageThrows(current: number) {
        const err = assert.doesThrow(() => this.setCurrentPage(current))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['currentPage'],
        })
    }

    private setCurrentPage(current: number): any {
        return this.vc.setCurrentPage(current)
    }

    private setTotalPages(pages: number) {
        this.vc.setTotalPages(pages)
    }

    private assertTotalPagesEquals(totalPages: number) {
        assert.isEqual(this.model.totalPages, totalPages)
    }

    private get model() {
        return this.render(this.vc)
    }

    private setup(options: PagerViewControllerOptions) {
        this.vc = this.Controller('pager', {
            onChangePage: (page) => {
                this.onChangePagePage = page
            },
            ...options,
        })
    }
}
