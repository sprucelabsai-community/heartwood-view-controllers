import { assert } from '@sprucelabs/test-utils'
import { AudioController } from '../types/heartwood.types'

export default class MockAudioController implements AudioController {
    private status: 'pending' | 'stopped' | 'playing' | 'paused' = 'pending'
    private volume = 0
    private sourceUrl?: string

    public constructor() {}

    public setVolume(volume: number): void {
        this.volume = volume
    }

    public async getVolume() {
        return this.volume
    }

    public assertVolumeSetTo(expected: number) {
        assert.isEqual(
            this.volume,
            expected,
            `Volume was not set to expected. Try audio.setVolume(${expected})`
        )
    }

    public setSourceUrl(url: string): void {
        this.sourceUrl = url
    }

    public assertSourceUrlSetTo(expected: string) {
        assert.isEqual(
            this.sourceUrl,
            expected,
            `Source URL was not set to expected. Try audio.setSourceUrl('${expected}')`
        )
    }

    public play(): void {
        this.status = 'playing'
    }

    public assertIsPlaying() {
        assert.isEqual(
            this.status,
            'playing',
            `Audio is not playing when it should be. Try audio.play()`
        )
    }

    public assertIsNotPlaying() {
        assert.isNotEqual(
            this.status,
            'playing',
            `Audio is playing when it should not be. Try audio.stop() or audio.pause() or don't start it at all.`
        )
    }

    public pause(): void {
        assert.isEqual(
            this.status,
            'playing',
            `Audio is not playing so you can't pause.`
        )
        this.status = 'paused'
    }

    public assertIsPaused() {
        assert.isEqual(
            this.status,
            'paused',
            `Audio is not paused when it should be. Try audio.pause()`
        )
    }

    public assertIsStopped() {
        assert.isEqual(
            this.status,
            'stopped',
            `Audio was not stopped. Try audio.stope()`
        )
    }

    public stop(): void {
        assert.isEqual(
            this.status,
            'playing',
            "Audio is not playing so you can't stop it."
        )

        this.status = 'stopped'
    }
}
