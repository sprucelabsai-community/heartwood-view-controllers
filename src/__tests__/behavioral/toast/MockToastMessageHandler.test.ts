import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ToastMessage } from '../../../types/heartwood.types'
import MockToastMessageHandler from './MockToastMessageHandler'

@suite()
export default class MockToastMessageHandlerTest extends AbstractViewControllerTest {
    private handler = MockToastMessageHandler.Handler()

    @test()
    protected async throwIfNoInstance() {
        MockToastMessageHandler.clearInstance()
        await this.assertGetInstanceThrowsAsExpected()
    }

    @test()
    protected async setInstanceThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            MockToastMessageHandler.setInstance()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['instance'],
        })
    }

    @test()
    protected async canSetInstance() {
        const instance = MockToastMessageHandler.Handler()
        MockToastMessageHandler.setInstance(instance)
        const instance2 = MockToastMessageHandler.getInstance()
        assert.isEqual(
            instance,
            instance2,
            'get instance should return the instance passed to setInstance'
        )
    }

    @test()
    protected async handleMessageThrowsIfMissing() {
        const err = await assert.doesThrowAsync(() =>
            // @ts-ignore
            this.handler.handleMessage()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['message'],
        })
    }

    @test()
    protected async canHandleMessage() {
        await this.handleMessage()
    }

    @test()
    protected async throwsIfAssertLastMessageEqualsIsMissingParameters() {
        const err = await assert.doesThrowAsync(() =>
            // @ts-ignore
            this.handler.assertLastMessageEquals()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['message'],
        })
    }
    @test()
    protected async canAssertLastMessageEquals() {
        const expected = this.generateRandomToastMessageValues()
        assert.doesThrow(
            () => this.assertLastMessageEquals(expected),
            'not equal'
        )
    }

    @test()
    protected async canAssertLastMessageEqualsExpected() {
        const message = this.handleMessage()
        this.assertLastMessageEquals(message)
    }

    @test()
    protected async throwsIfAssertHandledMessagesEqualIsMissingParameters() {
        const err = assert.doesThrow(() =>
            // @ts-ignore
            this.handler.assertHandledMessagesEqual()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['messages'],
        })
    }

    @test()
    protected async throwsIfMessagesDoNotEqual() {
        const message1 = this.generateRandomToastMessageValues()
        assert.doesThrow(
            () => this.assertHandledMessagesEqual([message1]),
            'not equal'
        )
    }

    @test()
    protected async canMatchSingleHandledMessages() {
        const message1 = this.handleMessage()
        this.assertHandledMessagesEqual([message1])
    }

    @test()
    protected async canMatchMultipleHandledMessages() {
        const message1 = this.handleMessage()
        const message2 = this.handleMessage()
        const message3 = this.handleMessage()
        this.assertHandledMessagesEqual([message1, message2, message3])
    }

    @test()
    protected async clearingInstanceClearsInstance() {
        MockToastMessageHandler.clearInstance()
        await this.assertGetInstanceThrowsAsExpected()
    }

    @test()
    protected async didSendMessageThrowsIfNoMessage() {
        assert.doesThrow(() => this.handler.assertDidSendMessage())
    }

    @test()
    protected async knowsIfDidSendMessage() {
        this.handleMessage()
        this.handler.assertDidSendMessage()
    }

    private async assertGetInstanceThrowsAsExpected() {
        await assert.doesThrowAsync(
            () => MockToastMessageHandler.getInstance(),
            "Make sure setup your ViewControllerFactory's toastHandler to use MockToastMessageHandler.Handler().handleMessage() and that you've called MockToastMessageHandler.setInstance() with the handler instance."
        )
    }

    private assertHandledMessagesEqual(expected: ToastMessage[]) {
        this.handler.assertHandledMessagesEqual(expected)
    }

    private assertLastMessageEquals(expected: ToastMessage) {
        this.handler.assertLastMessageEquals(expected)
    }

    private handleMessage() {
        const message = this.generateRandomToastMessageValues()
        this.handler.handleMessage(message)
        return message
    }

    private generateRandomToastMessageValues(): ToastMessage {
        return {
            content: generateId(),
        }
    }
}
