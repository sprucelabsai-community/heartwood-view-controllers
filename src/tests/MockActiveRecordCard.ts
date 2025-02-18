import { assert } from '@sprucelabs/test-utils'
import renderUtil from '../utilities/render.utility'
import ActiveRecordCardViewController from '../viewControllers/activeRecord/ActiveRecordCard.vc'
import formAssert from './utilities/formAssert'
import listAssert from './utilities/listAssert'
import pagerAssert from './utilities/pagerAssert'
import vcAssert, { getViewId } from './utilities/vcAssert'

export default class MockActiveRecordCard extends ActiveRecordCardViewController {
    private rebuildSlidesCount = 0
    private refreshCount = 0

    public getSearchFormVc() {
        return this.searchFormVc!
    }

    public assertRendersSearchForm() {
        formAssert.cardRendersForm(this, 'search')
    }

    public assertDoesNotRenderSearchForm() {
        formAssert.cardDoesNotRenderForm(this, 'search')
    }

    public assertRowIsNotSelected(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.rowIsNotSelected(listVc, id)
                return
            } catch {}
        }

        assert.fail(`Row "${id}" is selected and should not be!`)
    }

    public assertRowSelected(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.rowIsSelected(listVc, id)
                return
            } catch {}
        }

        assert.fail(`Row "${id}" is not selected, but should be!`)
    }

    public getPagerVc() {
        return this.pagerVc!
    }

    public assertTotalPages(expected: number) {
        assert.isTruthy(
            this.pagerVc,
            `You have not enabled paging in your ActiveRecordCard!`
        )
        if (expected === 1) {
            pagerAssert.pagerIsCleared(this.pagerVc!)
        } else {
            pagerAssert.totalPages(this.pagerVc!, expected)
        }
        this.assertTotalSlides(expected)
    }

    public assertIsLoaded() {
        assert.isTrue(
            this.getIsLoaded(),
            `Your active record card is not loaded! Try 'this.activeRecordVc.load()' in your view's 'load(...)' method.`
        )
    }

    public assertRefreshCount(expected: number) {
        assert.isEqual(
            this.refreshCount,
            expected,
            `Your active record card has been refreshed the expected times. Try 'this.activeRecordVc.refresh()'.`
        )
    }

    public async refresh() {
        this.refreshCount++
        await super.refresh()
    }

    public assertCurrentPage(expected: number) {
        assert.isTruthy(
            this.swipeVc,
            `You have not enabled paging in your ActiveRecordCard!`
        )
        pagerAssert.cardRendersPager(this.swipeVc)
        pagerAssert.currentPage(this.pagerVc!, expected)
        assert.isEqual(
            this.swipeVc!.getPresentSlide(),
            expected,
            `The swipe controller is not on the expected slide!`
        )
    }

    public assertPagerNotConfigured() {
        pagerAssert.pagerIsCleared(this.pagerVc!)
    }

    public assertRendersPager() {
        pagerAssert.cardRendersPager(this.cardVc, 'active-pager')
    }

    public assertDoesNotRenderPager() {
        pagerAssert.cardDoesNotRenderPager(this.cardVc)
    }

    public assertRendersRow(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.listRendersRow(listVc, id)
                return
            } catch {}
        }

        assert.fail(
            `I could not find a list that renders row "${id}" inside your ActiveRecordCard (${getViewId(this)})!`
        )
    }

    public assertRowRendersContent(row: string, content: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.rowRendersContent(listVc, row, content)
                return
            } catch {}
        }

        assert.fail(
            `I could not find a list that renders row "${row}" with the content "${content}" in your ActiveRecordCard (${getViewId(this)})!`
        )
    }

    public assertRowRendersButton(row: string, buttonId?: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.rowRendersButton(listVc, row, buttonId)
                return
            } catch {}
        }

        assert.fail(
            `I could not find a list that renders row "${row}" with the button "${buttonId ?? 'any id'}" in your ActiveRecordCard (${getViewId(this)})!`
        )
    }

    public assertRowDoesNotRenderButton(row: string, buttonId?: string) {
        let foundRow = false
        for (const listVc of this.normalizedListVcs) {
            if (listVc.doesRowExist(row)) {
                listAssert.rowDoesNotRenderButton(listVc, row, buttonId)
                foundRow = true
            }
        }

        assert.isTrue(
            foundRow,
            `I could not find a row "${row}" in your ActiveRecordCard (${getViewId(this)})!`
        )
    }

    private get normalizedListVcs() {
        return this.listVc ? [this.listVc] : this.listVcs
    }

    public assertDoesNotRenderRow(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.listDoesNotRenderRow(listVc, id)
            } catch {
                assert.fail(
                    `Your ActiveRecordCard (${getViewId(this)}) renders the row "${id}" and it def should not be!`
                )
            }
        }
    }

    public assertTotalSlides(expected: number) {
        const model = renderUtil.render(this.swipeVc!)
        assert.isLength(
            model.body?.sections,
            expected,
            `Total slides did not match expected!`
        )

        for (let i = 0; i < expected; i++) {
            const expected = `list-${i}`
            listAssert.cardRendersList(this.swipeVc!, expected)
        }

        assert.isLength(
            this.listVcs,
            expected,
            `Total number of lists did not match expected!`
        )
    }

    public assertPagerIsCleared() {
        pagerAssert.pagerIsCleared(this.pagerVc!)
    }

    public assertDoesNotRenderFooter() {
        vcAssert.assertCardDoesNotRenderFooter(this.cardVc)
    }

    public assertRendersFooter() {
        vcAssert.assertCardRendersFooter(this.cardVc)
    }

    public getSwipeVc() {
        return this.swipeVc!
    }

    public getCardVc() {
        return this.cardVc!
    }

    public getListVcs() {
        return this.listVcs
    }

    public rebuildSlidesForPaging() {
        this.rebuildSlidesCount++
        return super.rebuildSlidesForPaging()
    }

    public assertRebuildSlideCountEquals(expected: number) {
        assert.isEqual(
            this.rebuildSlidesCount,
            expected,
            `Rebuild slide count did not match expected!`
        )
    }

    public resetRebuildSlideCount() {
        this.rebuildSlidesCount = 0
    }
}
