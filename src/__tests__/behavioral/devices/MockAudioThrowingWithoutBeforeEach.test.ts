import { test, assert } from '@sprucelabs/test-utils'
import MockAudioController from '../../../tests/MockAudioController'
import AbstractDeviceTest from './AbstractDeviceTest'

export default class MockAudioThrowingWithoutBeforeEachTest extends AbstractDeviceTest {
    @test()
    protected static async cantConstructMockAudioControllerWithouCallingBeforeEach() {
        assert.doesThrow(() => new MockAudioController())
        this.assertNoLastController()
    }

    @test()
    protected static async beforeEachClearsLastController() {
        MockAudioController.beforeEach()
        new MockAudioController()
        MockAudioController.beforeEach()
        this.assertNoLastController()
    }

    @test()
    protected static async getLastControllerThrowsifNoControllerCreated() {
        MockAudioController.beforeEach()
        assert.doesThrow(() => MockAudioController.getLastController())
        const audio = new MockAudioController()
        assert.isEqual(audio, MockAudioController.getLastController())
    }

    private static assertNoLastController() {
        //@ts-ignore
        assert.isFalsy(MockAudioController.lastController)
    }
}
