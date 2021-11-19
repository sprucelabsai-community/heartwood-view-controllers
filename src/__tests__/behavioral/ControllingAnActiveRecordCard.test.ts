import { MercuryClient, MercuryClientFactory } from '@sprucelabs/mercury-client'
import { SchemaError } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER_ACTIVE_RECORD } from '../../tests/constants'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import ActiveRecordCardViewController, {
	ActiveRecordCardViewControllerOptions,
	buildActiveRecord,
} from '../../viewControllers/ActiveRecordCard.vc'

export default class ControllingAnActiveRecordCardTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		activeRecordCard: ActiveRecordCardViewController,
	}

	protected static client: MercuryClient

	protected static async beforeEach() {
		await super.beforeEach()

		MercuryClientFactory.setIsTestMode(true)

		const { client } = await this.getMercuryFixture().loginAsDemoPerson(
			DEMO_NUMBER_ACTIVE_RECORD
		)

		this.client = client
	}

	@test()
	protected static creatingActiveRecordWithoutRequiredParamsThrows() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Controller('activeRecordCard', {}))

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['eventName', 'rowTransformer', 'responseKey'],
		})
	}

	@test()
	protected static rendersBusyCardToStart() {
		const vc = ControllingAnActiveRecordCardTest.Vc()

		vcAssertUtil.assertRendersValidCard(vc)
		vcAssertUtil.assertCardIsBusy(vc)
	}

	@test()
	protected static rendersList() {
		const vc = this.Vc()

		const listVc = vcAssertUtil.assertCardRendersList(vc)
		assert.isEqual(listVc, vc.getListVc())
		vcAssertUtil.assertListRendersRows(listVc, 0)
	}

	@test()
	protected static async rendersNoResultsWhenNoResultsReturned() {
		const vc = await this.NoResultsVc()

		vcAssertUtil.assertCardIsNotBusy(vc)
		vcAssertUtil.assertListRendersRow(vc.getListVc(), 'no-results')

		vcAssertUtil.assertRowRendersContent(
			vc.getListVc(),
			'no-results',
			'no results'
		)
	}

	@test.only()
	protected static async canCustomizeEmptyRow() {
		debugger
		const vc = await this.NoResultsVc({
			noResultsRow: {
				cells: [
					{
						text: {
							content: 'oh no!!',
						},
					},
				],
			},
		})

		vcAssertUtil.assertRowRendersContent(
			vc.getListVc(),
			'no-results',
			'oh no!!'
		)
	}

	@test.only()
	protected static async showsAnErrorRowOnError() {
		const vc = await this.MockResultsVc(() => {
			debugger
			throw new SchemaError({
				code: 'NOT_IMPLEMENTED',
				instructions: 'gonna make it work',
			})
		})

		vcAssertUtil.assertListRendersRow(vc.getListVc(), 'error')
	}

	private static Vc(options?: Partial<ActiveRecordCardViewControllerOptions>) {
		return this.Controller('activeRecordCard', {
			...buildActiveRecord({
				eventName: 'list-organizations::v2020_12_25',
				responseKey: 'organizations',
				rowTransformer: (organization) => {
					return {
						id: organization.id,
						cells: [],
					}
				},
			}),
			...options,
		})
	}

	private static async NoResultsVc(
		options?: Partial<ActiveRecordCardViewControllerOptions>
	) {
		const cb = async () => {
			debugger
			return {
				organizations: [],
			}
		}

		const vc = await this.MockResultsVc(cb, options)
		return vc
	}

	private static async MockResultsVc(
		cb: () => Promise<{ organizations: never[] }>,
		options?: Partial<ActiveRecordCardViewControllerOptions>
	) {
		const client = await this.getMercuryFixture().connectToApi()

		await client.on('list-organizations::v2020_12_25', cb)

		const vc = this.Vc(options)

		await vc.start()
		return vc
	}
}
