import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import {
    AbstractAppController,
    AbstractViewController,
    ViewControllerOptions,
    VoteOptions,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class VotingForAFeature extends AbstractViewController<Card> {
    public render(): Card {
        return {}
    }
}

class SpyAppController extends AbstractAppController {
    public static id = 'test-app-controller'
}

@suite()
export default class VotingForAFeatureTest extends AbstractViewControllerTest {
    protected controllerMap = {
        vote: VotingForAFeature,
    }

    protected async beforeEach() {
        await super.beforeEach()
        this.getFactory().setAppController(SpyAppController)
    }

    @test()
    protected async askForVoteIsAFunctionOnViewController() {
        const vc = this.VoteVc()
        assert.isFunction(vc.askForAVote)
    }

    @test()
    protected async askForVoteIsAFunctionOnAppController() {
        const app = this.AppVc()

        //@ts-ignore
        assert.isFunction(app.askForAVote)
    }

    @test('invokes vote handler on view controller', 'VoteVc')
    @test('invokes vote handler on app controller', 'AppVc')
    protected async invokesVoteHandler(methodName: 'VoteVc' | 'AppVc') {
        let wasHit = false

        const controller = this[methodName]({
            voteHandler: async () => {
                wasHit = true
            },
        })

        await controller.askForAVote()

        assert.isTrue(wasHit)
    }

    @test()
    protected async canAskForVoteWithoutHandler() {
        const vc = this.VoteVc()
        await vc.askForAVote()
    }

    @test('passes options to vote handler', 'VoteVc')
    @test('passes options to vote handler', 'AppVc')
    protected async passesOptions(methodName: 'VoteVc' | 'AppVc') {
        const actual = {
            when: true,
            howCoolWouldItBeIf: generateId(),
            featureKey: generateId(),
            skillNamespace: generateId(),
        } as VoteOptions

        let passedOptions: VoteOptions | undefined
        const vc = this[methodName]({
            voteHandler: async (options: any) => {
                passedOptions = options
            },
        })

        await vc.askForAVote(actual)

        assert.isEqual(actual, passedOptions)
    }

    @test()
    protected canPassVoteHandlerThroughOnConstruction() {
        const voteHandler = async () => {}
        const vc = this.Controller('vote' as any, {
            voteHandler,
        })

        assert.isEqual(vc.voteHandler, voteHandler)
    }

    @test('vc waits for vote', 'VoteVc')
    @test('app waits for vote', 'AppVc')
    protected async waitsForVote(methodName: 'VoteVc' | 'AppVc') {
        let wasHit = false
        const vc = this[methodName]({
            voteHandler: async () => {
                await this.wait(10)
                wasHit = true
            },
        })

        const promise = vc.askForAVote()

        assert.isFalse(wasHit)

        await promise

        assert.isTrue(wasHit)
    }

    private AppVc(options?: Partial<ViewControllerOptions>) {
        return this.getFactory().App(
            'test-app-controller' as any,
            options
        ) as SpyAppController
    }

    private VoteVc(options?: Partial<ViewControllerOptions>) {
        return this.Controller('vote' as any, { ...options })
    }
}
