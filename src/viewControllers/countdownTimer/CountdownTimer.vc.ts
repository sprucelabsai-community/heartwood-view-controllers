import {
    CountdownTimer,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'

export default class CountdownTimerViewController extends AbstractViewController<CountdownTimer> {
    private startHandler?: (to: number) => void
    private onCompleteHandler?: (() => void) | null | undefined
    private endDateMs?: number | null

    public constructor(
        options: ViewControllerOptions & CountdownTimerViewControllerOptions
    ) {
        super(options)
        const { onComplete, endDateMs } = options
        this.onCompleteHandler = onComplete
        this.endDateMs = endDateMs
    }

    public start(toMs: number) {
        this.endDateMs = toMs
        this.startHandler?.(toMs)
    }

    public render(): CountdownTimer {
        return {
            controller: this,
            onComplete: this.onCompleteHandler,
            endDateMs: this.endDateMs,
            setStartHandler: (handler) => {
                this.startHandler = handler
            },
        }
    }
}

export type CountdownTimerViewControllerOptions = Omit<
    CountdownTimer,
    'controller' | 'setStartHandler'
>
