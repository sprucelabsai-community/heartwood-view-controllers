import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
	ListRow,
	RowStyle,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

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
	private static vc: ListViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('list', {})
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
		this.addRow({
			id: 'first',
			isEnabled: false,
		})
		this.addRow({
			id: 'second',
			isEnabled: false,
		})

		this.assertRowIsDisabled('first')
		this.assertRowIsDisabled('second')

		this.enableRow(0)

		this.assertRowIsEnabled('first')
		this.assertRowIsDisabled('second')
	}

	@test()
	protected static settingEnabledTriggersRender() {
		this.addRow({
			id: 'first',
		})

		const rowVc = this.getRow(0)

		vcAssert.attachTriggerRenderCounter(rowVc)
		rowVc.setIsEnabled(true)
		vcAssert.assertTriggerRenderCount(rowVc, 1)
	}

	@test()
	protected static canAssertRowStyle() {
		this.addRow({
			id: 'style',
			style: 'critical',
		})

		this.assertRowStyle(0, 'critical')
		assert.doesThrow(() => this.assertRowStyle(0, 'standard'))

		this.addRow({
			id: 'testing',
		})

		this.assertRowStyle('testing', 'standard')
		this.assertRowStyle(1, 'standard')
	}

	private static assertRowStyle(row: number | string, style: RowStyle) {
		vcAssert.assertRowIsStyle(this.vc, row, style)
	}

	private static getRow(row: number | string) {
		return this.vc.getRowVc(row)
	}

	private static enableRow(row: number | string) {
		this.vc.getRowVc(row).setIsEnabled(true)
	}

	private static assertRowIsEnabled(row: string | number) {
		vcAssert.assertRowIsEnabled(this.vc, row)
		assert.doesThrow(() => vcAssert.assertRowIsDisabled(this.vc, 'first'))
	}

	private static assertRowIsDisabled(row: string | number) {
		assert.doesThrow(() => vcAssert.assertRowIsEnabled(this.vc, row))
		vcAssert.assertRowIsDisabled(this.vc, row)
	}

	private static addRow(view: Partial<ListRow>) {
		this.vc.addRow({ cells: [], ...view })
	}

	protected static Vc(listIds: string[]): ListVc {
		//@ts-ignore
		return this.Controller('listVc', { listIds })
	}
}
