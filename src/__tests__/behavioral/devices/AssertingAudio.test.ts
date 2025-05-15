import { test, assert, generateId } from '@sprucelabs/test-utils'
import MockAudioController from '../../../tests/MockAudioController'
import AbstractDeviceTest from './AbstractDeviceTest'

export default class AssertingAudioTest extends AbstractDeviceTest {
    private static audio: MockAudioController
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.audio = new MockAudioController()
    }

    @test()
    protected static async knowsIfPlaying() {
        this.play()
        assert.doesThrow(() => this.assertAudioNotPlaying())
        this.assertIsPlaying()
    }

    @test()
    protected static async knowsIfNotPlaying() {
        assert.doesThrow(() => this.assertIsPlaying())
        this.assertAudioNotPlaying()
    }

    @test()
    protected static async pausingBeforePlayingThrows() {
        assert.doesThrow(() => this.pause())
    }

    @test()
    protected static async knowsIfPaused() {
        assert.doesThrow(() => this.assertIsPaused())
        this.play()
        assert.doesThrow(() => this.assertIsPaused())
        this.pause()
        this.assertIsPaused()
    }

    @test()
    protected static async stopThrowsIfNotPayling() {
        assert.doesThrow(() => this.stop())
    }

    @test()
    protected static async canStopIfPlaying() {
        this.play()
        this.stop()
    }

    @test()
    protected static async knowsIfStopped() {
        assert.doesThrow(() => this.assertIsStopped())
        this.play()
        this.stop()
        this.assertIsStopped()
    }

    @test()
    protected static async setVolumeSendsExpectedCommand() {
        this.setVolume(0.5)
        this.assertVolumeEquals(0.5)
        assert.doesThrow(() => this.assertVolumeEquals(0.1))

        this.device.allCommands = []
        this.setVolume(0.1)
        this.assertVolumeEquals(0.1)
        assert.doesThrow(() => this.assertVolumeEquals(0.5))
    }

    @test('can get volume 0.4', 0.4)
    @test('can get volume 0.5', 0.5)
    protected static async getsVolumeFromTheatreSettings(expected: number) {
        this.setVolume(expected)
        const actual = await this.audio.getVolume()
        assert.isEqual(actual, expected)
    }

    @test()
    protected static async knowsSourceUrl() {
        const url = generateId()
        this.audio.setSourceUrl(url)
        this.assertSourceUrlSetTo(url)
        assert.doesThrow(() => this.assertSourceUrlSetTo(generateId()))
    }

    private static assertSourceUrlSetTo(url: string) {
        this.audio.assertSourceUrlSetTo(url)
    }

    private static assertIsStopped() {
        this.audio.assertIsStopped()
    }

    private static stop() {
        this.audio.stop()
    }

    private static assertIsPaused() {
        this.audio.assertIsPaused()
    }

    private static pause() {
        return this.audio.pause()
    }

    private static play() {
        this.audio.play()
    }

    private static assertIsPlaying() {
        return this.audio.assertIsPlaying()
    }

    private static assertAudioNotPlaying() {
        this.audio.assertIsNotPlaying()
    }

    private static assertVolumeEquals(expected: number) {
        this.audio.assertVolumeSetTo(expected)
    }

    private static setVolume(volume: number) {
        this.audio.setVolume(volume)
    }
}
