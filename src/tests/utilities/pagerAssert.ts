import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, Card } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import PagerViewController from '../../viewControllers/pagers/Pager.vc'
import { pluckAllFromView } from './assertSupport'

const pagerAssert = {
    cardRendersPager(vc: ViewController<Card>, id?: string) {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const pagers = pluckAllFromView(model, 'pager')

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
}

export default pagerAssert
