import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import StubRtcStatsReport from '../../../tests/StubRtcStatsReport'
import generateCropPointValues from '../../../tests/utilities/generateCropPointValues'
import webRtcInteractor from '../../../tests/utilities/webRtcInteractor'
import { WebRtcCropPoint } from '../../../types/heartwood.types'
import WebRtcPlayerViewController from '../../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import WebRtcConnectionImpl, {
    WebRtcConnectionState,
    WebRtcStateChangeEvent,
} from '../../../webRtcStreaming/WebRtcConnection'

@suite()
export default class InteractingWithWebRtcPlayersTest extends AbstractViewControllerTest {
    private vc!: WebRtcPlayerViewController
    private static originalRtcPeerConnection: new (
        config: RTCConfiguration
    ) => RTCPeerConnection | MockRtcPeerConnection
    private lastState?: WebRtcConnectionState
    private lastStateChangeEvent?: WebRtcStateChangeEvent

    protected static async beforeAll() {
        await super.beforeAll()
        this.originalRtcPeerConnection = WebRtcConnectionImpl.RTCPeerConnection
    }

    protected async beforeEach() {
        await super.beforeEach()
        WebRtcConnectionImpl.RTCPeerConnection = MockRtcPeerConnection
        this.vc = this.Controller('web-rtc-player', {
            onStateChange: (state, event) => {
                this.lastState = state
                this.lastStateChangeEvent = event
            },
        })
    }

    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcInteractor.simulateCrop()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async passesWithRequired() {
        let passedPoint: WebRtcCropPoint | undefined
        const vc = this.Controller('web-rtc-player', {
            onCrop: (point) => {
                passedPoint = point
            },
        })
        const cropPoint = generateCropPointValues()
        await webRtcInteractor.simulateCrop(vc, cropPoint)
        assert.isTruthy(
            passedPoint,
            'You should call onCrop from the view model'
        )

        assert.isEqualDeep(
            cropPoint,
            passedPoint,
            'You should pass the crop point to the callback'
        )
    }

    @test()
    protected async simulateStateChangeThrowsHelpfulErrorIfNoOnStateChangeCallback() {
        this.vc = this.Controller('web-rtc-player', {})
        const name = 'createdOffer'
        await assert.doesThrowAsync(
            () => this.simulateStateChange(name),
            'onStateChange'
        )
    }

    @test()
    protected async simulateStateChangeThrowsIfNotUsingMockPeerConnection() {
        WebRtcConnectionImpl.RTCPeerConnection =
            InteractingWithWebRtcPlayersTest.originalRtcPeerConnection
        await assert.doesThrowAsync(
            () => this.simulateStateChange('createdOffer'),
            'MockRtcPeerConnection'
        )
    }

    @test()
    protected async canSimulateStateChanges() {
        this.assertStateChangeHandlerNotFired()

        await this.simulateStateChange('createdOffer')
        this.assertLastStateChangeEquals('createdOffer')

        await this.simulateStateChange('suppliedAnswer')
        this.assertLastStateChangeEquals('suppliedAnswer')
    }

    @test()
    protected async canSimulateStateChangeWithEvent() {
        const event = {
            stats: new StubRtcStatsReport(),
        }
        await this.simulateStateChange('error', event)
        assert.isEqual(
            this.lastStateChangeEvent,
            event,
            'Event should match what was passed'
        )
    }

    private assertLastStateChangeEquals(expected: WebRtcConnectionState) {
        assert.isEqual(
            this.lastState,
            expected,
            'State should match what was passed'
        )
    }

    private assertStateChangeHandlerNotFired() {
        assert.isFalsy(this.lastState, 'State should not have been set yet')
    }

    private simulateStateChange<State extends WebRtcConnectionState>(
        state: State,
        event?: WebRtcStateChangeEvent<State>
    ): any {
        return webRtcInteractor.simulateStateChange(this.vc, state, event)
    }
}
