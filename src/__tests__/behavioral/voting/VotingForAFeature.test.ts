import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import { AbstractViewController } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class VotingForAFeature extends AbstractViewController<Card> {
	public render(): Card {
		return {}
	}
}

export default class VotingForAFeatureTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		vote: VotingForAFeature,
	}

	@test()
	protected static async askForVoteIsAFunction() {
		const vc = this.VoteVc()
		assert.isFunction(vc.askForAVote)
	}

	@test()
	protected static async invokesVoteHandler() {
		const vc = this.VoteVc()
		let wasHit = false
		vc.voteHandler = () => {
			wasHit = true
		}
		await vc.askForAVote()

		assert.isTrue(wasHit)
	}

	@test()
	protected static async canAskForVoteWithoutHandler() {
		const vc = this.VoteVc()
		await vc.askForAVote()
	}

	@test()
	protected static async passesOptions() {
		const vc = this.VoteVc()
		const actual = {
			when: true,
		}

		let options: any

		vc.voteHandler = (o: any) => {
			options = o
		}

		await vc.askForAVote(actual)

		assert.isEqual(actual, options)
	}

	@test()
	protected static canPassVoteHandlerThroughOnConstruction() {
		const voteHandler = async () => {}
		const vc = this.Controller('vote' as any, {
			voteHandler,
		})

		assert.isEqual(vc.voteHandler, voteHandler)
	}

	@test()
	protected static async waitsForVote() {
		let wasHit = false
		const vc = this.Controller('vote' as any, {
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

	private static VoteVc() {
		return this.Controller('vote' as any, {})
	}
}
