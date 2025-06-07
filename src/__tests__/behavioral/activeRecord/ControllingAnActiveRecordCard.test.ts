import {
    MercuryClientFactory,
    MercuryTestClient,
} from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardFooter, CriticalError } from '../../../types/heartwood.types'
import ActiveRecordCardViewController, {
    ActiveRecordCardViewControllerOptions,
} from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'

@suite()
export default class ControllingAnActiveRecordCardTest extends AbstractViewControllerTest {
    private organizations: Organization[] = []

    protected async beforeEach() {
        await super.beforeEach()

        MercuryTestClient.setShouldRequireLocalListeners(true)
        MercuryClientFactory.setIsTestMode(true)

        await this.eventFaker.fakeListOrganizations(() => {
            return this.organizations
        })

        this.getFactory().setController(
            'active-record-card',
            SpyActiveRecordCard
        )
        await this.eventFaker.fakeListLocations()

        this.organizations = []
    }

    @test()
    protected creatingActiveRecordWithoutRequiredParamsThrows() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.Controller('active-record-card', {})
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['eventName', 'rowTransformer', 'responseKey'],
        })
    }

    @test()
    protected rendersBusyCardToStart() {
        const vc = this.Vc()

        vcAssert.assertRendersValidCard(vc)
        vcAssert.assertCardIsBusy(vc)
    }

    @test()
    protected async canSetCardHeader() {
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
    protected async canSetCardFooter() {
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
    protected rendersList() {
        const vc = this.Vc()

        const listVc = vcAssert.assertCardRendersList(vc)
        assert.isEqual(listVc, vc.getListVc())
        vcAssert.assertListRendersRows(listVc, 0)
    }

    @test('sets id on list 1', 'test')
    @test('sets id on list 2', 'waka')
    protected listIdIsSetBasedOnCardId(id: string) {
        const vc = this.Vc({ id })
        assert.isEqual(this.render(vc.getListVc()).id, id)
    }

    @test()
    protected async canSetIsBusyOnCard() {
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
    protected async cantLoadTwice() {
        const vc = this.Vc({})
        await vc.load()
        await assert.doesThrowAsync(() => vc.load())
    }

    @test()
    protected async cantRefreshUntilLoaded() {
        const vc = this.Vc({})
        await assert.doesThrowAsync(() => vc.refresh())
    }

    @test()
    protected async rendersNoResultsWhenNoResultsReturned() {
        const vc = await this.fakeListOrgsNoResultsAndLoad({
            payload: {
                shouldOnlyShowMine: true,
            },
        })

        vcAssert.assertCardIsNotBusy(vc)
        vcAssert.assertListRendersRow(vc.getListVc(), 'no-results')

        vcAssert.assertRowRendersContent(
            vc.getListVc(),
            'no-results',
            'no results'
        )
    }

    @test('can get/set payload 1', { test: true })
    @test('can get/set payload 2', { taco: 'bravo' })
    protected async canGetPayload(expected: any) {
        const vc = this.Vc({
            payload: expected,
        })

        assert.isEqualDeep(vc.getPayload(), expected)
    }

    @test()
    protected async canCustomizeEmptyRow() {
        const vc = await this.fakeListOrgsNoResultsAndLoad({
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

        vcAssert.assertRowRendersContent(
            vc.getListVc(),
            'no-results',
            'oh no!!'
        )
    }

    @test()
    protected async canBeSetToThrow() {
        ActiveRecordCardViewController.setShouldThrowOnResponseError(true)

        await assert.doesThrowAsync(() =>
            this.fakeListOrgsAndLoad(() => {
                throw new SchemaError({
                    code: 'NOT_IMPLEMENTED',
                    instructions: 'gonna make it work',
                })
            })
        )
    }

    @test()
    protected async showsAnErrorRowOnError() {
        ActiveRecordCardViewController.setShouldThrowOnResponseError(false)

        const vc = await this.fakeListOrgsAndLoad(() => {
            throw new SchemaError({
                code: 'NOT_IMPLEMENTED',
                instructions: 'gonna make it work',
            })
        })

        vcAssert.assertListRendersRow(vc.getListVc(), 'error')
        vcAssert.assertListDoesNotRenderRow(vc.getListVc(), 'no-results')
    }

    @test()
    protected async listsMyOrganizations() {
        const organizations = await this.seedOrganizations()

        const vc = this.Vc({
            payload: {
                shouldOnlyShowMine: true,
            },
        })

        await vc.load()

        vcAssert.assertListRendersRows(vc.getListVc(), organizations.length)

        for (const org of organizations) {
            vcAssert.assertListRendersRow(vc.getListVc(), org.id)
            vcAssert.assertRowRendersContent(vc.getListVc(), org.id, org.name)
        }
    }

    @test()
    protected async canRefreshToGetNewRecords() {
        const vc = await this.VcLoaded({})

        const listVc = vc.getListVc()
        vcAssert.assertListRendersRows(listVc, 1)

        this.organizations.push({
            id: `${new Date().getTime() * Math.random()}`,
            name: 'new org',
            slug: 'my-org',
            dateCreated: new Date().getTime(),
        })

        this.organizations.push({
            id: `${new Date().getTime() * Math.random()}`,
            name: 'new org',
            slug: 'my-org',
            dateCreated: new Date().getTime(),
        })

        await vc.refresh()

        vcAssert.assertListDoesNotRenderRow(listVc, 'not-found')

        vcAssert.assertListRendersRows(
            listVc,
            this.organizations.map((o) => o.id)
        )

        const oldOrgs = [...this.organizations]

        this.organizations.pop()
        this.organizations.pop()

        this.organizations.push({
            id: `${new Date().getTime() * Math.random()}`,
            name: 'new org',
            slug: 'my-org',
            dateCreated: new Date().getTime(),
        })

        await vc.refresh()

        for (const org of oldOrgs) {
            vcAssert.assertListDoesNotRenderRow(listVc, org.id)
        }
    }

    @test('can delete row for org 0', 0)
    @test('can delete row for org 1', 1)
    protected async canDeleteRow(idx: number) {
        const organizations = await this.seedOrganizations()
        const organization = organizations[idx]

        const vc = this.Vc({
            payload: {
                shouldOnlyShowMine: true,
            },
        })

        await vc.load()

        vc.deleteRow(organization.id)

        vcAssert.assertListDoesNotRenderRow(vc.getListVc(), organization.id)
    }

    @test()
    protected async listCallsTriggerRenderOnceForEntireLoad() {
        const vc = this.Vc()

        await vc.load()

        vcAssert.assertTriggerRenderCount(vc.getListVc(), 1)

        await vc.refresh()

        vcAssert.assertTriggerRenderCount(vc.getListVc(), 2)
    }

    @test()
    protected async usesRowTransformer() {
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

        vcAssert.assertRowRendersContent(
            vc.getListVc(),
            organization.id,
            'waka'
        )

        assert.doesThrow(() =>
            vcAssert.assertRowRendersContent(
                vc.getListVc(),
                organization.id,
                organization.name
            )
        )
    }

    @test()
    protected async throwsWithBadResponseKey() {
        const organization = await this.seedOrganization()

        const vc = this.Vc({
            eventName: 'list-locations::v2020_12_25',
            target: {
                organizationId: organization.id,
            },
        })

        const err = await assert.doesThrowAsync(() => vc.load())
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['responseKey'],
        })
        assert.isEqualDeep(vc.getTarget(), {
            organizationId: organization.id,
        })
    }

    @test()
    protected async typesEverything() {
        buildActiveRecordCard({
            eventName: 'list-organizations::v2020_12_25',
            responseKey: 'organizations',
            rowTransformer: (o) => ({ id: o.id, cells: [] }),
            filter: (_org) => true,
            payload: {
                shouldOnlyShowMine: true,
            },
        })

        buildActiveRecordCard({
            eventName: 'list-locations::v2020_12_25',
            responseKey: 'locations',
            rowTransformer: (l) => ({ id: l.id, cells: [] }),
            target: {
                organizationId: '2345',
            },
        })
    }

    @test('can set column widths 1', ['fill', 'content'])
    @test('can set column widths 2', ['content', 'fill'])
    protected async passesThroughListProps(columnWidths: any[]) {
        const vc = this.Vc({
            columnWidths,
        })

        const listVc = vc.getListVc()

        const model = this.render(listVc)

        assert.isEqualDeep(model.columnWidths, columnWidths)
    }

    @test('can set render dividers 1', true)
    @test('can set render dividers 2', false)
    protected async passesThroughShouldRenderDividers(
        shouldRenderRowDividers: boolean
    ) {
        const vc = this.Vc({
            shouldRenderRowDividers,
        })

        const listVc = vc.getListVc()

        const model = this.render(listVc)

        assert.isEqualDeep(
            model.shouldRenderRowDividers,
            shouldRenderRowDividers
        )
    }

    @test()
    protected canGetTarget() {
        const vc1 = this.Vc({
            target: {
                hello: 'world',
            },
        })

        assert.isEqualDeep(vc1.getTarget(), { hello: 'world' })
    }

    @test()
    protected canSetTarget() {
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
    protected async canFilterResults() {
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

        vcAssert.assertListDoesNotRenderRow(vc.getListVc(), organizations[0].id)
    }

    @test('can set to tall', 'tall')
    @test('can set to standard', 'standard')
    protected canSetDefaultRowHeight(height: any) {
        const vc = this.Vc({
            defaultRowHeight: height,
        })

        const listVc = vc.getListVc()

        assert.isEqual(this.render(listVc).defaultRowHeight, height)
    }

    @test()
    protected async canGetRecordsBackAfterLoad() {
        const { vc, organizations } = await this.seedAndGetVc()

        assert.doesThrow(() => vc.getRecords())

        await vc.load()

        const records = vc.getRecords()

        const sorter = (a: any, b: any) => (a.id > b.id ? 1 : -1)

        assert.isEqualDeep(records.sort(sorter), organizations.sort(sorter))
    }

    @test()
    protected async canUpdateRowDirectly() {
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

    @test('can add row directly 1', {
        id: 'test',
        cells: [],
    })
    @test('can add row directly 1', {
        id: 'test2',
        cells: [
            {
                text: {
                    content: 'hey',
                },
            },
        ],
    })
    protected async canAddRowDirectly(newRow: Record<string, any>) {
        const vc = this.Vc({})

        vc.addRow(newRow as any)

        const expected = this.render(vc.getListVc()).rows[0]

        assert.doesInclude(expected, newRow)
    }

    @test()
    protected async showsNoResultsIfFilterDropsTheRecords() {
        const { vc } = await this.seedAndGetVc({
            filter: () => false,
        })

        await vc.load()
        await vc.refresh()

        vcAssert.assertListRendersRow(vc.getListVc(), 'no-results')
    }

    @test()
    protected async deletingLastRowShowsNoResults() {
        const {
            vc,
            organizations: [org1, org2],
        } = await this.seedAndGetVc({ totalOrgs: 2 })

        await vc.load()
        vc.deleteRow(org1.id)

        vcAssert.assertListDoesNotRenderRow(vc.getListVc(), 'no-results')

        vc.deleteRow(org2.id)

        vcAssert.assertListRendersRow(vc.getListVc(), 'no-results')
    }

    @test()
    protected async customRowsRemovedWhenNoResultsRendered() {
        this.organizations = []
        const vc = this.Vc()
        await this.assertListLoadingClearsCustomRow(vc)
    }

    @test()
    protected async errorRemovesCustomRows() {
        await this.eventFaker.fakeListOrganizations(() => assert.fail('nope'))
        const vc = this.Vc()
        await this.assertListLoadingClearsCustomRow(vc)
    }

    @test()
    protected async loadingRemovesCustomRows() {
        await this.seedOrganization()
        const vc = this.Vc()
        await this.assertListLoadingClearsCustomRow(vc)
    }

    @test()
    protected async canGetRowVCs() {
        await this.seedOrganization()
        await this.seedOrganization()
        const vc = this.Vc()
        await vc.load()
        assert.isEqual(vc.getRowVc(0), vc.getListVc().getRowVc(0))
        assert.isEqual(vc.getRowVc(1), vc.getListVc().getRowVc(1))
    }

    @test()
    protected async canGetValues() {
        const vc = this.Vc()

        const expected = [
            {
                [generateId()]: generateId(),
            },
        ]

        vc.getListVc().getValues = () => expected

        await vc.load()

        const actual = vc.getValues()

        assert.isEqual(actual, expected)
    }

    @test()
    protected async canSetHeaderTitle() {
        const title = generateId()
        const vc = this.Vc()
        vc.setHeaderTitle(title)
        assert.isEqual(vc.getCardVc().getHeaderTitle(), title)
    }

    @test()
    protected async canSetHeaderSubtitle() {
        const title = generateId()
        const vc = this.Vc()
        vc.setHeaderSubtitle(title)
        assert.isEqual(vc.getCardVc().getHeaderSubtitle(), title)
    }

    @test()
    protected async canSetFooter() {
        const vc = this.Vc()
        let passedFooter: CardFooter | undefined
        vc.getCardVc().setFooter = (footer: CardFooter) => {
            passedFooter = footer
        }

        const footer: CardFooter = {
            isBusy: true,
        }

        vc.setFooter(footer)
        assert.isEqual(passedFooter, footer)
    }

    @test()
    protected async canEnableDisableFooter() {
        const vc = this.Vc()
        vc.disableFooter()
        vcAssert.assertCardFooterIsDisabled(vc)
        vc.enableFooter()
        vcAssert.assertCardFooterIsEnabled(vc)
    }

    @test()
    protected async canSetCriticalError() {
        const vc = this.Vc()
        const error: CriticalError = {
            buttons: [
                {
                    id: generateId(),
                    label: generateId(),
                },
            ],
            message: generateId(),
            title: generateId(),
        }
        assert.isFalse(vc.getHasCriticalError())
        vc.setCriticalError(error)
        assert.isTrue(vc.getHasCriticalError())
        assert.isEqualDeep(this.render(vc.getCardVc()).criticalError, error)

        vc.clearCriticalError()
        assert.isFalse(vc.getHasCriticalError())
    }

    @test()
    protected async canSetPayload() {
        const vc = this.Vc({
            payload: {
                hello: 'again',
            },
        })

        vc.setPayload({
            no: 'way',
        })

        assert.isEqualDeep(vc.getPayload(), {
            no: 'way',
        })

        vc.setPayload({
            taco: 'bravo',
        })

        assert.isEqualDeep(vc.getPayload(), {
            taco: 'bravo',
        })
    }

    @test()
    protected async exposesRowSelectionMethods() {
        const [{ id: id1 }, { id: id2 }, { id: id3 }] =
            await this.seedOrganizations()

        const vc = this.Vc()
        await vc.load()

        const listVc = vc.getListVc()

        assert.isFalse(vc.isRowSelected(id1))

        listAssert.rowIsNotSelected(listVc, id1)

        vc.selectRow(id1)

        listAssert.rowIsSelected(listVc, id1)

        assert.isTrue(vc.isRowSelected(id1))

        vc.selectRow(id2)
        listAssert.rowIsSelected(listVc, id2)

        vc.deselectRow(id1)
        listAssert.rowIsNotSelected(listVc, id1)

        vc.deselectRow(id2)
        listAssert.rowIsNotSelected(listVc, id2)

        vc.setSelectedRows([id1, id2])

        listAssert.rowIsSelected(listVc, id1)
        listAssert.rowIsSelected(listVc, id2)

        vc.setSelectedRows([id3])

        assert.isTrue(vc.isRowSelected(id3))

        listAssert.rowIsNotSelected(listVc, id1)
        listAssert.rowIsNotSelected(listVc, id2)
        listAssert.rowIsSelected(listVc, id3)
    }

    @test()
    protected async canCheckIfRowExists() {
        await this.seedOrganization()
        const vc = this.Vc()
        await vc.load()
        assert.isFalse(vc.doesRowExist(generateId()))
        assert.isTrue(vc.doesRowExist(this.organizations[0].id))
    }

    private async assertListLoadingClearsCustomRow(vc: SpyActiveRecordCard) {
        vc.addRow({ id: 'test', cells: [] })
        await vc.load()
        assert.isEqual(vc.getListVc().getTotalRows(), 1)
    }

    private async seedAndGetVc(
        options?: Partial<ActiveRecordCardViewControllerOptions> & {
            totalOrgs?: number
        }
    ) {
        const organizations = await this.seedOrganizations(options?.totalOrgs)

        const vc = this.Vc({
            payload: {
                shouldOnlyShowMine: true,
            },
            ...options,
        })
        return { vc, organizations }
    }

    private async seedOrganizations(totalOrgs = 5) {
        let organizations = await Promise.all(
            new Array(totalOrgs).fill(0).map(() => this.seedOrganization())
        )

        organizations = organizations.sort((a, b) => {
            return a.dateCreated > b.dateCreated ? 1 : -1
        })

        return organizations
    }

    private async seedOrganization() {
        const organization = {
            id: `${new Date().getTime() * Math.random()}`,
            name: 'New org ' + this.organizations.length,
            slug: 'new-org-' + this.organizations.length,
            dateCreated: new Date().getTime(),
        }

        this.organizations.push(organization)

        return organization
    }

    private Vc(
        options?: Partial<ActiveRecordCardViewControllerOptions>
    ): SpyActiveRecordCard {
        return this.Controller('active-record-card', {
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
        }) as SpyActiveRecordCard
    }

    private async fakeListOrgsNoResultsAndLoad(
        options?: Partial<ActiveRecordCardViewControllerOptions>
    ) {
        const cb = async () => {
            return {
                organizations: [],
            }
        }

        const vc = await this.fakeListOrgsAndLoad(cb, options)
        return vc
    }

    private async fakeListOrgsAndLoad(
        cb: () => Promise<{ organizations: any[] }>,
        options?: Partial<ActiveRecordCardViewControllerOptions>
    ) {
        const client = await this.mercury.connectToApi()

        await client.on('list-organizations::v2020_12_25', cb)

        const vc = await this.VcLoaded(options)
        return vc
    }

    private async VcLoaded(
        options?: Partial<ActiveRecordCardViewControllerOptions>
    ) {
        const vc = this.Vc(options)
        await vc.load()
        return vc
    }
}

type Organization = SpruceSchemas.Spruce.v2020_07_22.Organization

class SpyActiveRecordCard extends ActiveRecordCardViewController {
    public getListVc() {
        return this.listVc!.getListVc()
    }

    public getCardVc() {
        return this.cardVc
    }

    public isRowSelected(row: string | number): boolean {
        return this.listVc ? this.listVc?.isRowSelected(row) : false
    }
}
