import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, Card, Pager } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import PagerViewController from '../../viewControllers/pagers/Pager.vc'
import { pluckAllFromView } from './assertSupport'

const pagerAssert = {
    cardRendersPager(vc: ViewController<Card>, id?: string) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const pagers = pluckAllFromView(model, 'pager')

        if (model.footer?.pager) {
            pagers.push(model.footer.pager)
        }

        assert.isAbove(pagers.length, 0, `Your card is not rendering a pager!`)

        if (id) {
            const match = pagers.find((pager) => pager?.id === id)
            assert.isTruthy(
                match,
                `I could not find a pager with the id "${id}"!`
            )

            return match.controller as PagerViewController
        }

        return pagers[0]?.controller as PagerViewController
    },

    cardDoesNotRenderPager(vc: ViewController<Card>, id?: string) {
        assertOptions({ vc }, ['vc'])

        try {
            this.cardRendersPager(vc, id)
        } catch {
            return
        }

        assert.fail(`Your card is rendering a pager and should not be!`)
    },

    totalPages(vc: ViewController<Pager>, expected: number) {
        assertOptions({ vc, expected }, ['vc', 'expected'])

        const model = renderUtil.render(vc)

        assert.isEqual(
            model.totalPages,
            expected,
            `Total pages did not match expected! Try 'this.pagerVc.setTotalPages(${expected})'!`
        )
    },

    currentPage(vc: ViewController<Pager>, expected: number) {
        assertOptions(
            {
                vc,
                expected,
            },
            ['vc', 'expected']
        )

        const model = renderUtil.render(vc)

        assert.isEqual(
            model.currentPage,
            expected,
            `Current page did not match! Try 'this.pagerVc.setCurrentPage(${expected})'!`
        )
    },

    pagerIsCleared(vc: ViewController<Pager>) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)

        assert.isUndefined(
            model.currentPage,
            `Your Pager is configured and should not be! Try 'this.pagerVc.clear()'!`
        )

        assert.isUndefined(
            model.totalPages,
            `Your Pager is configured and should not be! Try 'this.pagerVc.clear()'!`
        )
    },

    pagerIsConfigured(vc: ViewController<Pager>) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)

        assert.isNumber(
            model.currentPage,
            `Your pager is not configured, and it should be. This involves calling 'this.pagerVc.setTotalPages()' and 'this.pagerVc.setCurrentPage()'!`
        )

        assert.isNumber(
            model.totalPages,
            `Your pager is not configured, and it should be. This involves calling 'this.pagerVc.setTotalPages()' and 'this.pagerVc.setCurrentPage()'!`
        )
    },
}

export default pagerAssert
