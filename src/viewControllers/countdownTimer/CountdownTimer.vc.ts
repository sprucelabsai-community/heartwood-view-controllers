import {
	CountdownTimer,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'

export default class CountdownTimerViewController extends AbstractViewController<CountdownTimer> {
	private startHandler?: (to: number) => void
	private onCompleteHandler?: (() => void) | null | undefined

	public constructor(
		options: ViewControllerOptions & CountdownTimerViewControllerOptions
	) {
		super(options)
		const { onComplete } = options
		this.onCompleteHandler = onComplete
	}

	public start(toMs: number) {
		this.startHandler?.(toMs)
	}

	public render(): CountdownTimer {
		return {
			controller: this,
			onComplete: this.onCompleteHandler,
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
