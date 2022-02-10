import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import {
	AbstractViewController,
	CardViewControllerImpl,
	ListViewController,
	StickyToolPosition,
	vcAssert,
	ViewControllerId,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class TestToolCard extends AbstractViewController<Card> {
	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
		const vc = this.Controller('card', {})
		return vc.render()
	}
}

export default class AssertingStickyToolsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		testToolCard: TestToolCard,
	}

	@test()
	protected static throwsIfMissingParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertToolBeltStickyToolInstanceOf()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['toolBeltVc', 'position', 'Class'],
		})
	}

	@test()
	protected static throwsWhenNoTopStickyTool() {
		assert.doesThrow(
			() =>
				vcAssert.assertToolBeltStickyToolInstanceOf({
					toolBeltVc: this.Controller('toolBelt', {}),
					position: 'top',
					Class: {} as any,
				}),
			'no sticky tool'
		)
	}

	@test()
	protected static throwsWhenClassDoesNotMatch() {
		const vc = this.Controller('toolBelt', {})
		const card1 = this.Controller('card', {})

		vc.setStickyTool({
			card: card1.render(),
			lineIcon: 'add',
			position: 'top',
		})

		assert.doesThrow(
			() =>
				vcAssert.assertToolBeltStickyToolInstanceOf({
					toolBeltVc: vc,
					position: 'top',
					Class: ListViewController,
				}),
			'instance'
		)
	}

	@test('passes in position top', 'top', 'card', CardViewControllerImpl)
	@test('passes in position bottom', 'bottom', 'list', ListViewController)
	@test('passes in position top 2', 'top', 'testToolCard', TestToolCard)
	protected static passesIfInstanceMatches(
		position: StickyToolPosition,
		vcId: ViewControllerId,
		Class: any
	) {
		const vc = this.Controller('toolBelt', {})
		const cardVc = this.Controller(vcId, {})

		vc.setStickyTool({
			card: cardVc.render(),
			lineIcon: 'add',
			position,
		})

		const match = vcAssert.assertToolBeltStickyToolInstanceOf({
			toolBeltVc: vc,
			position,
			Class,
		})

		//@ts-ignore
		assert.isEqual(match, cardVc)
	}
}
