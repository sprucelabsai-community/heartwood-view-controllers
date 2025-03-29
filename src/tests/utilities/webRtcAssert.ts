import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, Card } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import WebRtcPlayerViewController from '../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import { pluckAllFromView } from './assertSupport'

const webRtcAssert = {
    cardRendersPlayer: (
        vc: ViewController<Card>,
        id?: string
    ): WebRtcPlayerViewController => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const players = pluckAllFromView(model, 'webRtcPlayer')

        assert.isAbove(
            players.length,
            0,
            `Your card is not rendering a webrtc player!. Try:\n\nthis.player = this.Controller('web-rtc-player', {})\nthis.cardVc = this.Controller('card', { webRtcPlayer: this.player.render() })`
        )

        if (id) {
            for (const player of players) {
                if (player?.id === id) {
                    return player.controller! as WebRtcPlayerViewController
                }
            }
            assert.fail(
                `I could not find a webRtcPlayerViewController with the id: "${id}"`
            )
        }

        return players[0]!.controller! as WebRtcPlayerViewController
    },
}

export default webRtcAssert
