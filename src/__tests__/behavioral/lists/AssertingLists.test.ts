import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test-utils'
import {
	AbstractViewController,
	vcAssert,
	ViewControllerOptions,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/card/Card.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class ListVc extends AbstractViewController<Card> {
	private cardVc: CardViewController
	public constructor(options: ViewControllerOptions & { listIds: string[] }) {
		super(options)

		const { listIds = [] } = options

		const sections = listIds.map((id) => ({
			list: this.Controller('list', {
				id,
				rows: [],
			}).render(),
		}))

		this.cardVc = this.Controller('card', {
			body: {
				sections,
			},
		})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
		return this.cardVc.render()
	}
}

export default class AssertingListsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		listVc: ListVc,
	}

	@test()
	protected static throwsIfCantFindListWithId() {
		assert.doesThrow(() =>
			vcAssert.assertCardRendersList(this.Vc(['waka']), 'not-found')
		)

		vcAssert.assertCardDoesNotRenderList(this.Vc(['waka']), 'not-found')
	}

	@test()
	protected static findsOneById() {
		vcAssert.assertCardRendersList(this.Vc(['not-found']), 'not-found')
		assert.doesThrow(() =>
			vcAssert.assertCardDoesNotRenderList(this.Vc(['not-found']), 'not-found')
		)
	}

	@test()
	protected static findsByIdIfNotFirstSection() {
		vcAssert.assertCardRendersList(
			this.Vc(['yes', 'no', 'not-found-2']),
			'not-found-2'
		)
	}

	@test()
	protected static canTellIfRowIsEnabled() {
		const vc = this.Controller('list', {})
		vc.addRow({
			id: 'first',
			isEnabled: false,
			cells: [],
		})
		vc.addRow({
			id: 'second',
			isEnabled: false,
			cells: [],
		})

		assert.doesThrow(() => vcAssert.assertRowIsEnabled(vc, 'first'))
		vcAssert.assertRowIsDisabled(vc, 'second')

		vc.getRowVc(0).setIsEnabled(true)

		vcAssert.assertRowIsEnabled(vc, 'first')
		assert.doesThrow(() => vcAssert.assertRowIsDisabled(vc, 'first'))

		assert.doesThrow(() => vcAssert.assertRowIsEnabled(vc, 'second'))
		vcAssert.assertRowIsDisabled(vc, 'second')
	}

	@test()
	protected static settingEnabledTriggersRender() {
		const vc = this.Controller('list', {})
		vc.addRow({
			id: 'first',
			cells: [],
		})

		const rowVc = vc.getRowVc(0)

		vcAssert.attachTriggerRenderCounter(rowVc)
		rowVc.setIsEnabled(true)
		vcAssert.assertTriggerRenderCount(rowVc, 1)
	}

	protected static Vc(listIds: string[]): ListVc {
		//@ts-ignore
		return this.Controller('listVc', { listIds })
	}
}
