import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import LockScreenSkillViewController from '../../skillViewControllers/LockScreen.svc'
import AbstractAppController from '../../viewControllers/Abstract.ac'
import { getControllerType, getVcName } from './assertSupport'

const lockScreenAssert = {
    async actionRendersLockScreen(
        svcOrApp: AbstractSkillViewController | AbstractAppController,
        action: () => Promise<any> | any
    ) {
        assertOptions(
            {
                svcOrApp,
                action,
            },
            ['svcOrApp', 'action']
        )

        let lockScreen: LockScreenSkillViewController | undefined

        const originalRenderLockScreen =
            //@ts-ignore
            svcOrApp.renderLockScreen.bind(svcOrApp)

        //@ts-ignore
        svcOrApp.renderLockScreen = (options) => {
            lockScreen = originalRenderLockScreen(options)
            return lockScreen
        }

        await action()

        assert.isTruthy(
            lockScreen,
            `You did not call this.renderLockScreen in your ${getControllerType(svcOrApp)} called ${getVcName(svcOrApp)}`
        )

        return lockScreen!
    },
}

export default lockScreenAssert
