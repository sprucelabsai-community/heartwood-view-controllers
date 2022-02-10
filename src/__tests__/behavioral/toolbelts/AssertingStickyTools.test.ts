import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { CardViewControllerImpl, StickyToolPosition, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class AssertingStickyToolsTest extends AbstractViewControllerTest {
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

		vc.setStickyTool({
			card: {},
			lineIcon: 'add',
			position: 'top',
		})

		assert.doesThrow(
			() =>
				vcAssert.assertToolBeltStickyToolInstanceOf({
					toolBeltVc: vc,
					position: 'top',
					Class: {} as any,
				}),
			'instance'
		)
	}

	@test('passes in position top', 'top')
	@test('passes in position bottom', 'bottom')
	protected static passesIfInstanceMatches(position: StickyToolPosition) {
		const vc = this.Controller('toolBelt', {})
		const cardVc = this.Controller('card', {})

		vc.setStickyTool({
			card: cardVc.render(),
			lineIcon: 'add',
			position,
		})

		const match = vcAssert.assertToolBeltStickyToolInstanceOf({
			toolBeltVc: vc,
			position,
			Class: CardViewControllerImpl,
		})

		assert.isEqual(match, cardVc)
	}
}
