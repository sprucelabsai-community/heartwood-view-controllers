import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import { AbstractViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class AssertingForVotes extends AbstractViewController<Card> {
	public afterVote = false

	public async vote() {
		await this.askForAVote({
			featureKey: 'booking',
			skillNamespace: 'organization',
			howCoolWouldItBeIf: 'you could do anything you wanted at any time?',
		})

		this.afterVote = true
	}

	public async doNotVote() {}

	public render(): Card {
		return {}
	}
}

export default class AssertingForVotesTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		vote: AssertingForVotes,
	}

	private static vc: AssertingForVotes

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('vote' as any, {})
	}

	@test()
	protected static async canCreateAssertingForVotes() {
		await assert.doesThrowAsync(() =>
			vcAssert.assertAsksForAVote(this.vc, () => this.vc.doNotVote())
		)
	}

	@test()
	protected static async knowsWhenToVote() {
		await this.vote()
	}

	@test()
	protected static async getsBackVoteController() {
		const voteVc = await this.vote()
		assert.isFunction(voteVc.castVote)
	}

	@test()
	protected static async waitsForVoteToBeCast() {
		const vc = await this.vote()

		assert.isFalse(this.vc.afterVote)

		await vc.castVote()

		assert.isTrue(this.vc.afterVote)
	}

	private static async vote() {
		return await vcAssert.assertAsksForAVote(this.vc, () => this.vc.vote())
	}
}
