import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { ActiveRecordCardViewController, vcAssertUtil } from '../../..'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ViewControllerOptions } from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

declare module '../../../types/heartwood.types' {
	interface ViewControllerMap {
		genericSkillView: GenericSkillView
	}

	interface ViewControllerOptionsMap {
		genericSkillView: SkillView
	}
}

class GenericSkillView extends AbstractSkillViewController {
	private model: SkillView

	public constructor(options: ViewControllerOptions & SkillView) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public render(): SkillView {
		return this.model
	}
}

export default class AssertingActiveRecordCardsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		genericSkillView: GenericSkillView,
	}

	@test()
	protected static throwsIfNoActiveRecord() {
		const vc = this.Controller('genericSkillView', {
			layouts: [],
		})

		assert.doesThrow(() =>
			vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc)
		)
	}

	@test()
	protected static canTellIfHasActiveRecord() {
		const vc = this.Controller('genericSkillView', {
			layouts: [
				{
					cards: [
						this.renderActiveRecordCard(),
						this.renderActiveRecordCard('test'),
					],
				},
			],
		})

		vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc)

		assert.doesThrow(() =>
			vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc, 'test2')
		)

		vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc, 'test')
	}

	@test()
	protected static canTellIfPlainCardPassed() {
		const cardVc = this.Controller('card', {})
		const vc = this.Controller('genericSkillView', {
			layouts: [
				{
					cards: [cardVc.render()],
				},
			],
		})

		assert.doesThrow(() =>
			vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc)
		)
		assert.doesThrow(() => vcAssertUtil.assertIsActiveRecordCard(cardVc))
	}

	@test()
	protected static returnsActiveCardControllerInstance() {
		const active = this.ActiveRecordCard()
		const vc = this.Controller('genericSkillView', {
			layouts: [
				{
					cards: [active.render()],
				},
			],
		})

		const match = vcAssertUtil.assertSkillViewRendersActiveRecordCard(vc)
		assert.isEqual(active, match)

		assert.isTrue(match instanceof ActiveRecordCardViewController)
		vcAssertUtil.assertIsActiveRecordCard(match)
		vcAssertUtil.assertIsActiveRecordCard(match.getCardVc())
	}

	private static renderActiveRecordCard(
		id?: string
	): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
		return this.ActiveRecordCard(id).render()
	}

	private static ActiveRecordCard(id?: string) {
		return this.Controller(
			'activeRecordCard',
			buildActiveRecordCard({
				id,
				eventName: 'list-organizations::v2020_12_25',
				responseKey: 'organizations',
				rowTransformer: () => ({ cells: [] }),
			})
		)
	}
}
