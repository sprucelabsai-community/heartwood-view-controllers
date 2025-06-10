import { assert } from '@sprucelabs/test-utils'
import {
    Card,
    CardViewController,
    ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ActiveRecordListViewController from '../../viewControllers/activeRecord/ActiveRecordList.vc'
import { pluckAllFromView } from './assertSupport'
import vcAssert from './vcAssert'

const activeRecordListAssert = {
    cardRendersActiveRecordList(vc: ViewController<Card>, id?: string) {
        const model = renderUtil.render(vc)

        let match: any
        const lists = pluckAllFromView(model, 'list')

        if (id != undefined) {
            for (const list of lists) {
                if (list?.id === id) {
                    match = list
                    break
                }
            }
        } else {
            match = lists[0]
        }

        return vcAssert.assertRendersAsInstanceOf(
            match?.controller,
            ActiveRecordListViewController,
            id
                ? `I could not find an active record list with the id '${id}' in your CardViewController.`
                : `I could not find an active record list in your CardViewController.`
        )
    },

    cardDoesNotRendersActiveRecordList(vc: CardViewController, id?: string) {
        try {
            this.cardRendersActiveRecordList(vc, id)
        } catch {
            return
        }
        assert.fail(
            `I found an active record list in your CardViewController when I expected not to.`
        )
    },
}

export default activeRecordListAssert
