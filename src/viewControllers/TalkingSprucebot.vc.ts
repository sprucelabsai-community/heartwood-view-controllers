import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import { ViewController, ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebot

export interface TalkingSprucebotViewControllerOptions extends ViewModel {}

export default class TalkingSprucebotViewController
	extends AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	private model: ViewModel
	private playResolver?: () => void

	public constructor(
		options: TalkingSprucebotViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		if (!options.sentences[0]?.words) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: ['sentences'],
			})
		}

		this.model = {
			avatar: {
				stateOfMind: 'chill',
			},
			size: 'medium',
			...options,
		}
	}

	private playHandler() {}
	private restartHandler() {}
	private pauseHandler() {}

	//@ts-ignore
	private triggerComplete() {
		this.model.onComplete?.()
		this.playResolver?.()
	}

	public async play(): Promise<void> {
		this.playHandler()
		return new Promise((resolve) => {
			this.playResolver = resolve as any
		})
	}

	public restart() {
		this.restartHandler()
	}
	public pause() {
		this.pauseHandler()
	}

	public render(): ViewModel {
		//@ts-ignore
		return { ...this.model, controller: this }
	}
}
