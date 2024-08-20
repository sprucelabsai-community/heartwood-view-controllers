import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    ViewController,
    Card,
    SkillViewController,
    ActiveRecordPagingOptions,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import ActiveRecordCardViewController from '../../viewControllers/activeRecord/ActiveRecordCard.vc'
import vcAssert from './vcAssert'

const activeRecordCardAssert = {
    isActiveRecordCard(vc: ViewController<Card>) {
        const rendered = renderUtil.render(vc)
        assert.isTruthy(
            vc instanceof ActiveRecordCardViewController ||
                //@ts-ignore
                vc.__activeRecordParent ||
                //@ts-ignore
                rendered?.controller?.getParent?.() instanceof
                    ActiveRecordCardViewController,
            `The card you sent was not an active record card!`
        )
    },

    skillViewRendersActiveRecordCard(svc: SkillViewController, id?: string) {
        const cardVc = vcAssert.assertSkillViewRendersCard(svc, id)

        assert.isTruthy(
            //@ts-ignore
            cardVc.__isActiveRecord,
            `I expected to find an active record card with the id of ${id}, but I didn't!`
        )

        //@ts-ignore
        return cardVc.__activeRecordParent as ActiveRecordCardViewController
    },

    assertPagingOptionsEqual(
        vc: ActiveRecordCardViewController,
        expected: ActiveRecordPagingOptions
    ) {
        assertOptions({ vc, expected }, ['vc', 'expected'])

        const model = renderUtil.render(vc)
        const { controller } = model.footer?.pager ?? {}

        assert.isTruthy(
            controller,
            `You have not enabled paging on your ActiveRecordCard!`
        )

        assert.isEqual(
            //@ts-ignore
            vc.pagingOptions,
            expected,
            `Your page size does not match!`
        )
    },
}

export default activeRecordCardAssert
