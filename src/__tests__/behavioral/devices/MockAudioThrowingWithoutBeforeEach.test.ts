import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import MockAudioController from '../../../tests/MockAudioController'
import AbstractDeviceTest from './AbstractDeviceTest'

@suite()
export default class MockAudioThrowingWithoutBeforeEachTest extends AbstractDeviceTest {
    @test()
    protected async cantConstructMockAudioControllerWithouCallingBeforeEach() {
        assert.doesThrow(() => new MockAudioController(generateId()))
        this.assertNoLastController()
    }

    @test()
    protected async beforeEachClearsLastController() {
        MockAudioController.beforeEach()
        new MockAudioController(generateId())
        MockAudioController.beforeEach()
        this.assertNoLastController()
    }

    @test()
    protected async getLastControllerThrowsifNoControllerCreated() {
        MockAudioController.beforeEach()
        assert.doesThrow(() => MockAudioController.getLastController())
        const audio = new MockAudioController(generateId())
        assert.isEqual(audio, MockAudioController.getLastController())
    }

    private assertNoLastController() {
        //@ts-ignore
        assert.isFalsy(MockAudioController.lastController)
    }
}
