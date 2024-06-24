import { dateUtil, durationUtil } from '@sprucelabs/calendar-utils'
import { assert } from '@sprucelabs/test-utils'
import { ViewController } from '../../types/heartwood.types'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

let isConfiguredBeforeEach = false

const vcDurationAssert = {
    beforeEach(views: Pick<ViewControllerFactory, 'setDates'>) {
        isConfiguredBeforeEach = true
        views.setDates({
            ...dateUtil,
        })
    },

    durationUtilIsConfiguredForVc(vc: ViewController<any>) {
        assert.isTrue(
            isConfiguredBeforeEach,
            'You have to call `vcDurationAssert.beforeEach(this.views)` in your test.'
        )
        assert.isEqual(
            durationUtil.dates,
            //@ts-ignore
            vc.dates,
            'durationUtil is not configured for your vc. Try `durationUtil.dates = this.dates` in your view controller.'
        )
    },
}

export default vcDurationAssert
