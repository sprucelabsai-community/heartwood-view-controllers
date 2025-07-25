import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import MockAudioController from '../../../tests/MockAudioController'
import { AudioControllerStatus } from '../../../types/heartwood.types'
import AbstractDeviceTest from './AbstractDeviceTest'

@suite()
export default class AssertingAudioTest extends AbstractDeviceTest {
    private audioFileUrl = generateId()
    private audio!: MockAudioController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        MockAudioController.beforeEach()
        this.audio = new MockAudioController(this.audioFileUrl)
    }

    @test()
    protected async knowsIfPlaying() {
        this.play()
        assert.doesThrow(() => this.assertAudioNotPlaying())
        this.assertIsPlaying()
    }

    @test()
    protected async knowsIfNotPlaying() {
        assert.doesThrow(() => this.assertIsPlaying())
        this.assertAudioNotPlaying()
    }

    @test()
    protected async pausingBeforePlayingThrows() {
        assert.doesThrow(() => this.pause())
    }

    @test()
    protected async knowsIfPaused() {
        assert.doesThrow(() => this.assertIsPaused())
        this.play()
        assert.doesThrow(() => this.assertIsPaused())
        this.pause()
        this.assertIsPaused()
    }

    @test()
    protected async stopThrowsIfNotPayling() {
        assert.doesThrow(() => this.stop())
    }

    @test()
    protected async canStopIfPlaying() {
        this.play()
        this.stop()
    }

    @test()
    protected async knowsIfStopped() {
        assert.doesThrow(() => this.assertIsStopped())
        this.play()
        this.stop()
        this.assertIsStopped()
    }

    @test()
    protected async tracksVolumeLevels() {
        this.setVolume(0.5)
        this.assertVolumeEquals(0.5)
        assert.doesThrow(() => this.assertVolumeEquals(0.1))

        this.setVolume(0.1)
        this.assertVolumeEquals(0.1)
        assert.doesThrow(() => this.assertVolumeEquals(0.5))
    }

    @test('can get volume 0.4', 0.4)
    @test('can get volume 0.5', 0.5)
    protected async getsVolumeFromTheatreSettings(expected: number) {
        this.setVolume(expected)
        const actual = await this.audio.getVolume()
        assert.isEqual(actual, expected)
    }

    @test()
    protected async knowsSourceUrl() {
        this.assertSourceUrlSetTo(this.audioFileUrl)
        assert.doesThrow(() => this.assertSourceUrlSetTo(generateId()))
    }

    @test()
    protected async tracksLastAudioController() {
        assert.isEqual(this.audio, MockAudioController.getLastController())
    }

    @test()
    protected async tracksAllAudioControllers() {
        const audioFileUrl2 = generateId()
        const audio2 = new MockAudioController(audioFileUrl2)

        const controllers = MockAudioController.getAllControllers()
        assert.isEqualDeep(controllers, [this.audio, audio2])
    }

    @test()
    protected async knowsStatus() {
        this.assertAudioStatusEquals('pending')
        this.play()
        this.assertAudioStatusEquals('playing')
        this.pause()
        this.assertAudioStatusEquals('paused')
        this.stop()
        this.assertAudioStatusEquals('stopped')
    }

    private assertAudioStatusEquals(expected: AudioControllerStatus) {
        assert.isEqual(this.audio.getStatus(), expected)
    }

    private assertSourceUrlSetTo(url: string) {
        this.audio.assertSourceUrlSetTo(url)
    }

    private assertIsStopped() {
        this.audio.assertIsStopped()
    }

    private stop() {
        this.audio.stop()
    }

    private assertIsPaused() {
        this.audio.assertIsPaused()
    }

    private pause() {
        return this.audio.pause()
    }

    private play() {
        this.audio.play()
    }

    private assertIsPlaying() {
        return this.audio.assertIsPlaying()
    }

    private assertAudioNotPlaying() {
        this.audio.assertIsNotPlaying()
    }

    private assertVolumeEquals(expected: number) {
        this.audio.assertVolumeSetTo(expected)
    }

    private setVolume(volume: number) {
        this.audio.setVolume(volume)
    }
}
