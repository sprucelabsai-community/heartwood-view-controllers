import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import {
    TalkingSprucebot,
    ViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default class TalkingSprucebotViewController
    extends AbstractViewController<TalkingSprucebot>
    implements ViewController<TalkingSprucebot>
{
    private model: TalkingSprucebot
    private playResolver?: () => void

    public constructor(
        options: TalkingSprucebotViewControllerOptions & ViewControllerOptions
    ) {
        super(options)

        if (!options.sentences[0]?.words) {
            throw new SchemaError({
                code: 'MISSING_PARAMETERS',
                parameters: ['sentences'],
                friendlyMessage:
                    'You must provide at least one sentence with words for the Talking Sprucebot.',
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
    private async triggerComplete() {
        await this.model.onComplete?.()
        this.playResolver?.()
    }

    public async play(): Promise<void> {
        this.model.isPlaying = true
        this.playHandler()
        return new Promise((resolve) => {
            this.playResolver = resolve as any
        })
    }

    public restart() {
        this.restartHandler()
    }
    public pause() {
        this.model.isPlaying = false
        this.pauseHandler()
    }

    public getIsPlaying() {
        return this.model.isPlaying !== false
    }

    public setSentences(sentences: Sentence[]) {
        this.model.sentences = sentences
        this.triggerRender()
    }

    public render(): TalkingSprucebot {
        return { ...this.model, controller: this }
    }
}

export type Sentence =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentence

export interface TalkingSprucebotViewControllerOptions
    extends TalkingSprucebot {}
