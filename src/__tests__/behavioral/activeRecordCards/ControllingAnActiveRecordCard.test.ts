import { MercuryClient, MercuryClientFactory } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER_ACTIVE_RECORD } from '../../../tests/constants'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import ActiveRecordCardViewController, {
	ActiveRecordCardViewControllerOptions,
} from '../../../viewControllers/ActiveRecordCard.vc'

type Organization = SpruceSchemas.Spruce.v2020_07_22.Organization
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

		const results = await client.emit('list-organizations::v2020_12_25', {
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		const { organizations } = eventResponseUtil.getFirstResponseOrThrow(results)

		await Promise.all(
			organizations.map((org) =>
				client.emit('delete-organization::v2020_12_25', {
					target: {
						organizationId: org.id,
					},
				})
			)
		)
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
		const vc = this.Vc()

		vcAssertUtil.assertRendersValidCard(vc)
		vcAssertUtil.assertCardIsBusy(vc)
	}

	@test()
	protected static async canSetCardHeader() {
		const header = {
			title: `${Math.random()}`,
		}
		const vc = this.Vc({
			header,
		})

		const model = this.render(vc)
		//@ts-ignore
		assert.isEqual(model.header.title, header.title)
	}

	@test()
	protected static async canSetCardFooter() {
		const footer = {
			buttons: [{ label: `${Math.random()}` }],
		}

		const vc = this.Vc({
			footer,
		})

		const model = this.render(vc)
		//@ts-ignore
		assert.isEqualDeep(model.footer.buttons, footer.buttons)
	}

	@test()
	protected static rendersList() {
		const vc = this.Vc()

		const listVc = vcAssertUtil.assertCardRendersList(vc)
		assert.isEqual(listVc, vc.getListVc())
		vcAssertUtil.assertListRendersRows(listVc, 0)
	}

	@test()
	protected static async canSetIsBusyOnCard() {
		const vc = this.Vc({})

		assert.isFalse(vc.getIsLoaded())

		await vc.load()

		assert.isTrue(vc.getIsLoaded())

		const cardVc = vc.getCardVc()

		assert.isFalse(cardVc.isBusy())

		vc.setIsBusy(true)

		assert.isTrue(cardVc.isBusy())

		vc.setIsBusy(false)

		assert.isFalse(cardVc.isBusy())
	}

	@test()
	protected static async cantLoadTwice() {
		const vc = this.Vc({})
		await vc.load()
		await assert.doesThrowAsync(() => vc.load())
	}

	@test()
	protected static async cantRefreshUntilLoaded() {
		const vc = this.Vc({})
		await assert.doesThrowAsync(() => vc.refresh())
	}

	@test()
	protected static async rendersNoResultsWhenNoResultsReturned() {
		const vc = await this.NoResultsVc({
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		vcAssertUtil.assertCardIsNotBusy(vc)
		vcAssertUtil.assertListRendersRow(vc.getListVc(), 'no-results')

		vcAssertUtil.assertRowRendersContent(
			vc.getListVc(),
			'no-results',
			'no results'
		)
	}

	@test()
	protected static async canCustomizeEmptyRow() {
		const vc = await this.NoResultsVc({
			payload: {
				shouldOnlyShowMine: true,
			},
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

	@test()
	protected static async canBeSetToThrow() {
		ActiveRecordCardViewController.setShouldThrowOnResponseError(true)

		await assert.doesThrowAsync(() =>
			this.MockResultsVc(() => {
				throw new SchemaError({
					code: 'NOT_IMPLEMENTED',
					instructions: 'gonna make it work',
				})
			})
		)
	}

	@test()
	protected static async showsAnErrorRowOnError() {
		ActiveRecordCardViewController.setShouldThrowOnResponseError(false)

		const vc = await this.MockResultsVc(() => {
			throw new SchemaError({
				code: 'NOT_IMPLEMENTED',
				instructions: 'gonna make it work',
			})
		})

		vcAssertUtil.assertListRendersRow(vc.getListVc(), 'error')
		vcAssertUtil.assertListDoesNotRenderRow(vc.getListVc(), 'no-results')
	}

	@test()
	protected static async listsMyOrganizations() {
		const organizations = await this.seedOrganizations()

		const vc = this.Vc({
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		await vc.load()

		vcAssertUtil.assertListRendersRows(vc.getListVc(), organizations.length)

		for (const org of organizations) {
			vcAssertUtil.assertListRendersRow(vc.getListVc(), org.id)
			vcAssertUtil.assertRowRendersContent(vc.getListVc(), org.id, org.name)
		}
	}

	@test()
	protected static async canRefreshToGetNewRecords() {
		const organizations: Organization[] = []
		const vc = await this.MockResultsVc(async () => ({
			organizations,
		}))

		const listVc = vc.getListVc()
		vcAssertUtil.assertListRendersRows(listVc, 1)

		organizations.push({
			id: 'aoeuaou',
			name: 'new org',
			slug: 'my-org',
			dateCreated: new Date().getTime(),
		})

		organizations.push({
			id: 'aoeuaoeuaoteu',
			name: 'new org',
			slug: 'my-org',
			dateCreated: new Date().getTime(),
		})

		await vc.refresh()

		vcAssertUtil.assertListDoesNotRenderRow(listVc, 'not-found')

		vcAssertUtil.assertListRendersRows(
			listVc,
			organizations.map((o) => o.id)
		)

		const oldOrgs = [...organizations]

		organizations.pop()
		organizations.pop()

		organizations.push({
			id: 'thnatoehu',
			name: 'new org',
			slug: 'my-org',
			dateCreated: new Date().getTime(),
		})

		await vc.refresh()

		for (const org of oldOrgs) {
			vcAssertUtil.assertListDoesNotRenderRow(listVc, org.id)
		}
	}

	@test('can delete row for org 0', 0)
	@test('can delete row for org 1', 1)
	protected static async canDeleteRow(idx: number) {
		const organizations = await this.seedOrganizations()
		const organization = organizations[idx]

		const vc = this.Vc({
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		await vc.load()

		vc.deleteRow(organization.id)

		vcAssertUtil.assertListDoesNotRenderRow(vc.getListVc(), organization.id)
	}

	@test()
	protected static async usesRowTransformer() {
		const organization = await this.seedOrganization()

		const vc = this.Vc({
			payload: {
				shouldOnlyShowMine: true,
			},
			rowTransformer: (organization: any) => {
				return {
					id: organization.id,
					cells: [
						{
							text: {
								content: 'waka',
							},
						},
					],
				}
			},
		})

		await vc.load()

		vcAssertUtil.assertRowRendersContent(
			vc.getListVc(),
			organization.id,
			'waka'
		)

		assert.doesThrow(() =>
			vcAssertUtil.assertRowRendersContent(
				vc.getListVc(),
				organization.id,
				organization.name
			)
		)
	}

	@test()
	protected static async throwsWithBadResponseKey() {
		const organization = await this.seedOrganization()

		const vc = this.Vc({
			eventName: 'list-locations::v2020_12_25',
			target: {
				organizationId: organization.id,
			},
		})

		await assert.doesThrowAsync(() => vc.load())
		assert.isEqualDeep(vc.getTarget(), {
			organizationId: organization.id,
		})
	}

	@test()
	protected static async typesEverything() {
		buildActiveRecordCard({
			eventName: 'list-organizations::v2020_12_25',
			responseKey: 'organizations',
			rowTransformer: (_org) => ({ cells: [] }),
			filter: (_org) => true,
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		buildActiveRecordCard({
			eventName: 'list-locations::v2020_12_25',
			responseKey: 'locations',
			rowTransformer: (_loc) => ({ cells: [] }),
			target: {
				organizationId: '2345',
			},
		})
	}

	@test('can set column widths 1', ['fill', 'content'])
	@test('can set column widths 2', ['content', 'fill'])
	protected static async passesThroughListProps(columnWidths: any[]) {
		const vc = this.Vc({
			columnWidths,
		})

		const listVc = vc.getListVc()

		const model = this.render(listVc)

		assert.isEqualDeep(model.columnWidths, columnWidths)
	}

	@test('can set render dividers 1', true)
	@test('can set render dividers 2', false)
	protected static async passesThroughShouldRenderDividers(
		shouldRenderRowDividers: boolean
	) {
		const vc = this.Vc({
			shouldRenderRowDividers,
		})

		const listVc = vc.getListVc()

		const model = this.render(listVc)

		assert.isEqualDeep(model.shouldRenderRowDividers, shouldRenderRowDividers)
	}

	@test()
	protected static canGetTarget() {
		const vc1 = this.Vc({
			target: {
				hello: 'world',
			},
		})

		assert.isEqualDeep(vc1.getTarget(), { hello: 'world' })
	}

	@test()
	protected static canSetTarget() {
		const vc1 = this.Vc({
			target: {
				hello: 'world',
			},
		})

		vc1.setTarget({ goodbye: 'world' })
		assert.isEqualDeep(vc1.getTarget(), { goodbye: 'world' })

		vc1.setTarget({ once: 'twice' })
		assert.isEqualDeep(vc1.getTarget(), { once: 'twice' })
	}

	@test()
	protected static async canFilterResults() {
		const organizations = await this.seedOrganizations()

		const vc = this.Vc({
			filter: (organization) => {
				return organization.id !== organizations[0].id
			},
			payload: {
				shouldOnlyShowMine: true,
			},
		})

		await vc.load()

		vcAssertUtil.assertListDoesNotRenderRow(vc.getListVc(), organizations[0].id)
	}

	@test('can set to tall', 'tall')
	@test('can set to standard', 'standard')
	protected static canSetDefaultRowHeight(height: any) {
		const vc = this.Vc({
			defaultRowHeight: height,
		})

		const listVc = vc.getListVc()

		assert.isEqual(this.render(listVc).defaultRowHeight, height)
	}

	@test()
	protected static async canGetRecordsBackAfterLoad() {
		const { vc, organizations } = await this.seedAndGetVc()

		assert.doesThrow(() => vc.getRecords())

		await vc.load()

		const records = vc.getRecords()

		assert.isEqualDeep(records, organizations)
	}

	@test()
	protected static async canUpdateRowDirectly() {
		const { vc, organizations } = await this.seedAndGetVc()

		assert.doesThrow(() => vc.upsertRow(organizations[0].id, { cells: [] }))

		let passedId: any
		let passedRow: any

		vc.getListVc().upsertRow = (id: any, row: any) => {
			passedId = id
			passedRow = row
		}

		await vc.load()

		vc.upsertRow(organizations[0].id, { cells: [] })
		assert.isEqual(passedId, organizations[0].id)
		assert.isEqualDeep(passedRow, { cells: [] })

		vc.upsertRow(organizations[0].id, { cells: [{ lineIcon: 'info' }] })
		assert.isEqualDeep(passedRow, { cells: [{ lineIcon: 'info' }] })
	}

	private static async seedAndGetVc() {
		const organizations = await this.seedOrganizations()

		const vc = this.Vc({
			payload: {
				shouldOnlyShowMine: true,
			},
		})
		return { vc, organizations }
	}

	private static async seedOrganizations() {
		let organizations = await Promise.all(
			new Array(5).fill(0).map(() => this.seedOrganization())
		)

		organizations = organizations.sort((a, b) => {
			return a.dateCreated > b.dateCreated ? 1 : -1
		})

		return organizations
	}

	private static async seedOrganization() {
		const results = await this.client.emit('create-organization::v2020_12_25', {
			payload: {
				name: 'New org!',
			},
		})

		const { organization } = eventResponseUtil.getFirstResponseOrThrow(results)

		return organization
	}

	private static Vc(options?: Partial<ActiveRecordCardViewControllerOptions>) {
		return this.Controller('activeRecordCard', {
			...buildActiveRecordCard({
				eventName: 'list-organizations::v2020_12_25',
				responseKey: 'organizations',
				rowTransformer: (organization) => {
					return {
						id: organization.id,
						cells: [
							{
								text: {
									content: organization.name,
								},
							},
						],
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
			return {
				organizations: [],
			}
		}

		const vc = await this.MockResultsVc(cb, options)
		return vc
	}

	private static async MockResultsVc(
		cb: () => Promise<{ organizations: any[] }>,
		options?: Partial<ActiveRecordCardViewControllerOptions>
	) {
		const client = await this.getMercuryFixture().connectToApi()

		await client.on('list-organizations::v2020_12_25', cb)

		const vc = this.Vc(options)

		await vc.load()
		return vc
	}
}
