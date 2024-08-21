import { assert } from '@sprucelabs/test-utils'
import renderUtil from '../utilities/render.utility'
import ActiveRecordCardViewController from '../viewControllers/activeRecord/ActiveRecordCard.vc'
import listAssert from './utilities/listAssert'
import pagerAssert from './utilities/pagerAssert'

export default class MockActiveRecordCard extends ActiveRecordCardViewController {
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
        pagerAssert.totalPages(this.pagerVc!, expected)
        this.assertTotalSlides(expected)
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

    public assertRendersRow(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.listRendersRow(listVc, id)
                return
            } catch {}
        }

        assert.fail(`I could not find a list that renders row "${id}"!`)
    }

    public assertRowRendersContent(row: string, content: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.rowRendersContent(listVc, row, content)
                return
            } catch {}
        }

        assert.fail(
            `I could not find a list that renders row "${row}" with the content: ${content}!`
        )
    }

    private get normalizedListVcs() {
        return this.listVc ? [this.listVc] : this.listVcs
    }

    public assertDoesNotRenderRow(id: string) {
        for (const listVc of this.normalizedListVcs) {
            try {
                listAssert.listDoesNotRenderRow(listVc, id)
                return
            } catch {}
        }

        assert.fail(
            `I found a list that renders row "${id}" and I didn't expect to!`
        )
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
    }

    public assertPagerIsCleared() {
        pagerAssert.pagerIsCleared(this.pagerVc!)
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
}
