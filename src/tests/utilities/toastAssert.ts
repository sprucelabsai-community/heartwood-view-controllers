import { assert } from '@sprucelabs/test-utils'
import AbstractController from '../../viewControllers/AbstractController'

const toastAssert = {
    async rendersToast(vc: AbstractController, cb: () => any | Promise<any>) {
        let wasHit = false
        //@ts-ignore
        vc.toastHandler = () => {
            wasHit = true
        }

        await cb()

        assert.isTrue(
            wasHit,
            `No toast rendered. Try calling this.toast({...}) in your vc!`
        )
    },

    async doesNotRenderToast(
        vc: AbstractController,
        cb: () => any | Promise<any>
    ) {
        try {
            await this.rendersToast(vc, cb)
        } catch {
            return
        }

        assert.fail('Toast was rendered when it should not have been.')
    },
}

export default toastAssert
