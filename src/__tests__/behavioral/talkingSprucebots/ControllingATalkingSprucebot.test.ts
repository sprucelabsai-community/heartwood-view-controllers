import { validateSchemaValues } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import talkingSprucebotSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/talkingSprucebot.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import TalkingSprucebotViewController, {
    Sentence,
    TalkingSprucebotViewControllerOptions,
} from '../../../viewControllers/TalkingSprucebot.vc'

@suite()
export default class ControllingATalkingSprucebotTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: TalkingSprucebotViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.TalkingSprucebot()
    }

    @test()
    protected mustPassAtLeastOneSentence() {
        const err = assert.doesThrow(() =>
            this.Controller('talking-sprucebot', {
                sentences: [],
            })
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['sentences'],
        })

        //@ts-ignore
        assert.doesThrow(() => this.Controller('talking-sprucebot', {}))
    }

    @test()
    protected passesThroughAllOptionsToModel() {
        const key = `${Math.random()}`

        this.vc = this.Controller('talking-sprucebot', {
            sentences: [{ words: 'yay' }],
            [key]: true,
        })

        const model = this.renderVc()

        //@ts-ignore
        assert.isTrue(model[key])
    }

    @test()
    protected canCreateATalkingSprucebot() {
        const model = this.renderVc()

        //@ts-ignore
        assert.isTrue(
            model.controller instanceof TalkingSprucebotViewController
        )

        //@ts-ignore
        delete model.controller

        validateSchemaValues(talkingSprucebotSchema, model)
    }

    @test()
    protected async playPauseRestartInvokeHandlers() {
        //@ts-ignore
        assert.isFunction(this.vc.playHandler)
        //@ts-ignore
        assert.isFunction(this.vc.pauseHandler)
        //@ts-ignore
        assert.isFunction(this.vc.restartHandler)

        let wasPlayHit = false

        //@ts-ignore
        this.vc.playHandler = () => {
            wasPlayHit = true
        }

        void this.vc.play()

        await this.wait(0)

        assert.isTrue(wasPlayHit)

        let wasPauseHit = false

        //@ts-ignore
        this.vc.pauseHandler = () => {
            wasPauseHit = true
        }

        void this.vc.pause()

        await this.wait(0)

        assert.isTrue(wasPauseHit)

        let wasRestartHit = false

        //@ts-ignore
        this.vc.restartHandler = () => {
            wasRestartHit = true
        }

        void this.vc.restart()

        await this.wait(0)

        assert.isTrue(wasRestartHit)
    }

    @test()
    protected async onCompleteCalledWhenOnCompleteIsInvoked() {
        let wasHit = false

        this.vc = this.TalkingSprucebot({
            onComplete: () => {
                wasHit = true
            },
            sentences: [
                {
                    words: 'how in the world are you?',
                },
            ],
        })

        //@ts-ignore
        await this.vc.triggerComplete()

        assert.isTrue(wasHit)
    }

    @test()
    protected async playHoldsUntilTriggerComplete() {
        this.vc = this.TalkingSprucebot({
            sentences: [
                {
                    words: 'how in the world are you?',
                },
            ],
        })

        const promise = this.vc.play()

        let wasHit = false
        const timeout = setTimeout(async () => {
            wasHit = true

            //@ts-ignore
            await this.vc.triggerComplete()
        }, 100)

        await promise

        clearTimeout(timeout)

        assert.isTrue(wasHit)
    }

    @test()
    protected defaultSizeIsMedium() {
        const model = this.renderVc()
        assert.isEqual(model.size, 'medium')
    }

    @test()
    protected canSetSize() {
        this.vc = this.TalkingSprucebot({
            size: 'small',
            sentences: [
                {
                    words: 'how in the world are you?',
                },
            ],
        })
        const model = this.renderVc()
        assert.isEqual(model.size, 'small')
    }

    @test()
    protected defaultAvatarChilling() {
        const model = this.renderVc()
        assert.isEqualDeep(model.avatar, {
            stateOfMind: 'chill',
        })
    }

    @test()
    protected canSetAvatar() {
        this.vc = this.TalkingSprucebot({
            size: 'small',
            avatar: {
                size: 'large',
                stateOfMind: 'accomplished',
            },
            sentences: [
                {
                    words: 'how in the world are you?',
                },
            ],
        })
        const model = this.renderVc()
        assert.isEqualDeep(model.avatar, {
            size: 'large',
            stateOfMind: 'accomplished',
        })
    }

    @test()
    protected async knowsWhenPlaying() {
        this.assertIsPlaying()
        this.vc.pause()
        this.assertIsNotPlaying()
        void this.vc.play()
        await this.wait(0)
        this.assertIsPlaying()
    }

    @test('can update sentences 1', [
        {
            words: 'hey there!',
        },
    ])
    @test('can update sentences 2', [
        {
            words: 'what the?',
        },
        {
            words: 'hey hey',
        },
    ])
    protected async canSetNewSententences(updated: Sentence[]) {
        this.vc.setSentences(updated)
        const model = this.renderVc()
        assert.isEqualDeep(model.sentences, updated)
    }

    @test()
    protected async settingSentenceTriggersRender() {
        this.vc.setSentences([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private assertIsNotPlaying() {
        assert.isFalse(this.vc.getIsPlaying())
    }

    private assertIsPlaying() {
        assert.isTrue(this.vc.getIsPlaying())
    }

    private TalkingSprucebot(
        options?: TalkingSprucebotViewControllerOptions
    ): TalkingSprucebotViewController {
        return this.Controller('talking-sprucebot', {
            sentences: [
                {
                    words: 'how in the world are you?',
                },
            ],
            ...options,
        })
    }

    private renderVc() {
        return this.render(this.vc)
    }
}
