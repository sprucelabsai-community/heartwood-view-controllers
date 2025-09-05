import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ToastMessage } from '../../types/heartwood.types'
import MockToastMessageHandler from './MockToastMessageHandler'

const toastAssert = {
    async rendersToast(cb: () => any | Promise<any>) {
        await cb()

        const handlerMessage = MockToastMessageHandler.getInstance()
        const lastMessage = handlerMessage.assertDidSendMessage()
        return lastMessage
    },

    async doesNotRenderToast(cb: () => any | Promise<any>) {
        try {
            await this.rendersToast(cb)
        } catch {
            return
        }

        assert.fail('Toast was rendered when it should not have been.')
    },

    async toastMatches(
        action: (message?: Partial<ToastMessage>) => Promise<any> | any,
        message: Partial<ToastMessage>
    ) {
        assertOptions({ action, message }, ['action', 'message'])
        const handlerMessage = MockToastMessageHandler.getInstance()

        await action()

        const lastMessage = handlerMessage.assertLastMessageMatches(message)
        return lastMessage
    },
}

export default toastAssert
