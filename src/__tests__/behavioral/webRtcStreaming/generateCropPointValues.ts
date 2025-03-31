import { WebRtcCropPoint } from '../../../types/heartwood.types'

export default function generateCropPointValues(): WebRtcCropPoint {
    return {
        heightPercent: Date.now() * Math.random(),
        widthPercent: Date.now() * Math.random(),
        xPercent: Date.now() * Math.random(),
        yPercent: Date.now() * Math.random(),
    }
}
