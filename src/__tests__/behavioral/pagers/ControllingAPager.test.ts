import { assert, errorAssert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { PagerViewController } from '../../../types/heartwood.types'
import { PagerViewControllerOptions } from '../../../viewControllers/pagers/Pager.vc'

export default class ControllingAPagerTest extends AbstractViewControllerTest {
    private static vc: PagerViewController
    private static onChangePagePage?: number

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        delete this.onChangePagePage
        this.setup({})
    }

    @test()
    protected static async canCreateControllingAPager() {
        this.Controller('pager', {})
    }

    @test()
    protected static async rendersItselfAsController() {
        this.setup({})
        assert.isEqual(this.model.controller, this.vc)
    }

    @test('passes through page options 1', 10, 5)
    @test('passes through page options 2', 11, 1)
    protected static async passesThroughPageOptions(
        totalPages: number,
        currentPage: number
    ) {
        this.setup({ totalPages, currentPage })

        this.assertTotalPagesEquals(totalPages)
        assert.isEqual(this.model.currentPage, currentPage)
    }

    @test()
    public static settingTotalPagesUpdatesViewModel() {
        this.setTotalPages(10)
        this.assertTotalPagesEquals(10)

        this.setTotalPages(20)
        this.assertTotalPagesEquals(20)
    }

    @test()
    protected static settingTotalPagesTriggersRender() {
        this.setTotalPages(5)
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected static settingCurrentPageToNegativeThrows() {
        this.setTotalPages(2)
        this.assertSetCurrentPageThrows(-1)
    }

    @test()
    protected static async settingCurrentPageToHigherThanTotalPagesThrows() {
        this.setTotalPages(2)
        this.assertSetCurrentPageThrows(3)
        this.assertSetCurrentPageThrows(2)
    }

    @test()
    protected static canSetCurrentPage() {
        this.setTotalPages(2)
        this.setCurrentPage(1)
    }

    @test()
    protected static async throwsIfTotalPagesNotSet() {
        this.assertSetCurrentPageThrows(1)
    }

    @test()
    protected static async setCurrentPageTriggersRender() {
        this.setTotalPages(2)
        this.setCurrentPage(1)
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected static currentPageSetsCorrectly() {
        this.setTotalPages(10)
        this.assertCurrentPageSetsCorrectly(1)
        this.assertCurrentPageSetsCorrectly(5)
    }

    @test()
    protected static settingCurrentPageInvokesCallback() {
        this.setTotalPages(10)
        this.assertSetCurrentPageCallbackPassesPageThrough(5)
        this.assertSetCurrentPageCallbackPassesPageThrough(3)
    }

    @test()
    protected static async canGetTotalpages() {
        this.setTotalPages(5)
        this.assertGetTotalPagesReturns(5)

        this.setTotalPages(10)
        this.assertGetTotalPagesReturns(10)
    }

    @test()
    protected static async canGetCurrentPage() {
        this.setTotalPages(10)
        this.setCurrentPage(5)

        this.assertGetCurrentPageReturns(5)

        this.setCurrentPage(3)
        this.assertGetCurrentPageReturns(3)
    }

    @test()
    protected static async getTotalPagesReturnsNegativeOneIfNotSet() {
        this.assertGetTotalPagesReturns(-1)
    }

    @test()
    protected static async getCurrentPageReturnsNegativeOneIfNotSet() {
        this.assertGetCurrentPageReturns(-1)
    }

    private static assertGetCurrentPageReturns(expected: number) {
        assert.isEqual(this.vc.getCurrentPage(), expected)
    }

    private static assertGetTotalPagesReturns(expected: number) {
        assert.isEqual(this.vc.getTotalPages(), expected)
    }

    private static assertSetCurrentPageCallbackPassesPageThrough(page: number) {
        this.model.setCurrentPage(page)
        assert.isEqual(this.onChangePagePage, page)
        this.assertCurrentPageEquals(page)
    }

    private static assertCurrentPageSetsCorrectly(current: number) {
        this.setCurrentPage(current)
        this.assertCurrentPageEquals(current)
    }

    private static assertCurrentPageEquals(current: number) {
        assert.isEqual(
            this.model.currentPage,
            current,
            'Current page not set correctly'
        )
    }

    private static assertTriggerRenderCount(expected: number) {
        vcAssert.assertTriggerRenderCount(this.vc, expected)
    }

    private static assertSetCurrentPageThrows(current: number) {
        const err = assert.doesThrow(() => this.setCurrentPage(current))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['currentPage'],
        })
    }

    private static setCurrentPage(current: number): any {
        return this.vc.setCurrentPage(current)
    }

    private static setTotalPages(pages: number) {
        this.vc.setTotalPages(pages)
    }

    private static assertTotalPagesEquals(totalPages: number) {
        assert.isEqual(this.model.totalPages, totalPages)
    }

    private static get model() {
        return this.render(this.vc)
    }

    private static setup(options: PagerViewControllerOptions) {
        this.vc = this.Controller('pager', {
            onChangePage: (page) => {
                this.onChangePagePage = page
            },
            ...options,
        })
    }
}
