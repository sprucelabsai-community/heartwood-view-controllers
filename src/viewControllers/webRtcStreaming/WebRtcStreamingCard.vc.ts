import { assertOptions } from '@sprucelabs/schema'
import { CardViewControllerImpl } from '../..'
import { Card, ViewControllerOptions } from '../../types/heartwood.types'
import { WebRtcStreamer } from '../../webRtcStreaming/WebRtcStreamer'

export default class WebRtcStreamingCardViewController extends CardViewControllerImpl {
    public static id = 'web-rtc-streaming-card'

    public constructor(
        options: ViewControllerOptions &
            WebRtcStreamingCardViewControllerOptions
    ) {
        super(options)
    }

    public setStreamer(streamer: WebRtcStreamer, sectionIdx = 0) {
        assertOptions({ streamer }, ['streamer'])

        if (this.getTotalSections() === 0) {
            this.addSection({
                webRtcStreamer: streamer,
            })
        } else {
            this.updateSection(sectionIdx, {
                webRtcStreamer: streamer,
            })
        }
    }
}

export interface WebRtcStreamingCardViewControllerOptions extends Card {}
