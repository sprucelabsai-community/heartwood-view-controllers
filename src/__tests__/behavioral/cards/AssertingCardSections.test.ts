import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection

export default class AssertingCardSectionsTest extends AbstractViewControllerTest {
	@test('does not find with no sections', [], 'test')
	@test('does not find with miss-matched id', [{ id: 'testing' }], 'test')
	protected static throwsIfNoSection(sections: Section[], lookupId: string) {
		assert.doesThrow(
			() => this.assertFindsSection(sections, lookupId),
			'find a section'
		)
	}

	@test(
		'finds matching first section',
		[
			{
				id: 'test',
			},
		],
		'test'
	)
	@test(
		'finds matching first section different id',
		[
			{
				id: 'testing',
			},
		],
		'testing'
	)
	@test(
		'finds matching in later section',
		[
			{ id: 'test' },
			{
				id: 'testing',
			},
		],
		'testing'
	)
	protected static passesInFirstSection(sections: Section[], lookupId: string) {
		this.assertFindsSection(sections, lookupId)
	}

	private static assertFindsSection(sections: Section[], sectionId: string) {
		vcAssert.assertCardRendersSection(this.CardVc(sections), sectionId)
	}

	private static CardVc(sections?: Section[]) {
		return this.Controller('card', { body: { sections } })
	}
}
