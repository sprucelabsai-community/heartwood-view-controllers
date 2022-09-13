import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection

export default class AssertingTalkingSprucebots extends AbstractViewControllerTest {
	@test(
		'throws with miss-matched id',
		[
			{
				talkingSprucebot: {
					id: 'test',
					sentences: [],
				},
			},
		],
		'testing'
	)
	@test(
		'throws with miss-matched id 2',
		[
			{
				talkingSprucebot: {
					id: 'testing',
					sentences: [],
				},
			},
		],
		'test'
	)
	protected static async throwsWhenNoTalkingSprucebotById(
		sections: Section[],
		id: string
	) {
		assert.doesThrow(() => this.assertRendersTalkingSprucebot(sections, id))
		const vc = this.Vc(sections)
		vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc, id)
	}

	@test(
		'passes in first section',
		[
			{
				talkingSprucebot: {
					id: 'testing',
					sentences: [],
				},
			},
		],
		'testing'
	)
	@test(
		'passes in second section',
		[
			{},
			{
				talkingSprucebot: {
					id: 'the',
					sentences: [],
				},
			},
		],
		'the'
	)
	protected static passesWhenFindsById(sections: Section[], id: string) {
		this.assertRendersTalkingSprucebot(sections, id)
	}

	private static assertRendersTalkingSprucebot(
		sections: Section[],
		idToCheck: string
	) {
		const vc = this.Vc(sections)
		vcAssert.assertCardRendersTalkingSprucebot(vc, idToCheck)

		assert.doesThrow(() =>
			vcAssert.assertCardDoesNotRenderTalkingSprucebot(vc, idToCheck)
		)
	}

	private static Vc(
		sections: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[]
	) {
		return this.Controller('card', {
			body: {
				sections,
			},
		})
	}
}
