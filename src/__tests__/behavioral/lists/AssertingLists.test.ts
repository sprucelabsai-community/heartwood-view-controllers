import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test'
import {
	AbstractViewController,
	vcAssert,
	ViewControllerOptions,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/Card.vc'

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

	protected static Vc(listIds: string[]): ListVc {
		//@ts-ignore
		return this.Controller('listVc', { listIds })
	}
}
