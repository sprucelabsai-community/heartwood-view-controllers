import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ToastMessage } from '../../types/heartwood.types'

export default class MockToastMessageHandler {
    private static instance?: MockToastMessageHandler
    private lastMessage?: ToastMessage
    private lastHandledMessages: ToastMessage[] = []

    private constructor() {}

    public static getInstance(): MockToastMessageHandler {
        if (!this.instance) {
            throw new Error(ERROR_MESSAGE_NO_TOAST_HANDLER_INSTANCE_SET)
        }
        return this.instance
    }

    public static setInstance(instance?: MockToastMessageHandler) {
        assertOptions({ instance }, ['instance'])
        this.instance = instance
    }

    public static Handler() {
        return new MockToastMessageHandler()
    }

    public static clearInstance() {
        delete this.instance
    }

    public handleMessage(message: ToastMessage) {
        assertOptions({ message }, ['message'])
        this.lastMessage = message
        this.lastHandledMessages.push(message)
    }

    public assertLastMessageEquals(message: ToastMessage) {
        assertOptions({ message }, ['message'])
        assert.isEqualDeep(
            message,
            this.lastMessage,
            'The last toast message does not equal expected.'
        )
    }

    public assertLastMessageMatches(message: Partial<ToastMessage>) {
        assert.doesInclude(
            this.lastMessage,
            message,
            'The last toast message does not match the expected properties.'
        )
        return this.lastMessage!
    }

    public assertDidSendMessage() {
        assert.isTruthy(
            this.lastMessage,
            'No toast message was sent. Try this.toast({...}) in your vc!'
        )
        return this.lastMessage!
    }

    public assertHandledMessagesEqual(messages: ToastMessage[]) {
        assertOptions({ messages }, ['messages'])
        assert.isEqualDeep(
            messages,
            this.lastHandledMessages,
            'Handled messages do not equal expected.'
        )
    }
}

export const ERROR_MESSAGE_NO_TOAST_HANDLER_INSTANCE_SET =
    "Make sure setup your ViewControllerFactory's toastHandler to use MockToastMessageHandler.Handler().handleMessage() and that you've called MockToastMessageHandler.setInstance() with the handler instance."
