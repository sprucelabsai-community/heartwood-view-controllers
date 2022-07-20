import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Authenticator } from '../../../types/heartwood.types'
import { Location, Organization, Person } from '../../../types/local.types'
import ConfirmJoinCardViewController, {
	ConfirmJoinCardViewControllerOptions,
} from '../../../viewControllers/login/ConfirmJoinCard.vc'
import {
	generateLocationValues,
	generateOrgValues,
	generatePersonValues,
} from '../../support/EventFaker'

export default class ConfirmJoinCardTest extends AbstractViewControllerTest {
	private static vc: ConfirmJoinCardViewController
	private static org: Organization

	private static authenticator: FakeAuthenticator
	private static person: Person
	private static location: Location

	protected static async beforeEach() {
		await super.beforeEach()

		this.org = generateOrgValues()
		this.location = generateLocationValues({ organizationId: this.org.id })
		this.person = generatePersonValues()
		this.authenticator = new FakeAuthenticator()
		this.authenticator.person = this.person

		this.vc = this.Vc({
			organizationId: this.org.id,
		})

		await this.eventFaker.fakeGetOrganization(() => this.org)
		await this.eventFaker.fakeGetLocation(() => this.location)
	}

	@test()
	protected static requiredParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('confirmJoinCard', {})
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: [
				'organizationId',
				'onError',
				'onAccept',
				'onDecline',
				'viewContext',
				'authenticator',
			],
		})
	}

	@test()
	protected static async expectedOrgPassedToGetOrg() {
		const orgId = generateId()
		this.vc = this.Vc({
			organizationId: orgId,
		})

		await this.loadVc()

		assert.isEqual(
			this.eventFaker.lastGetOrgTargetAndPayload?.target.organizationId,
			orgId
		)
	}

	@test()
	protected static async eventErrorTriggersOnError() {
		await this.eventFaker.fakeGetOrganization(() => assert.fail('error!'))

		let passedErr: any

		this.vc = this.Vc({
			onError: (err: any) => {
				passedErr = err
			},
		})

		const alertVc = await vcAssert.assertRendersAlert(this.vc, () =>
			this.loadVc()
		)

		await alertVc.hide()
		await this.wait(1)

		assert.isTrue(passedErr instanceof Error)
	}

	@test()
	protected static async knowsIfLoadedWithGoodOrg() {
		assert.isFalse(this.vc.getIsLoaded())
		await this.vc.load()
		assert.isTrue(this.vc.getIsLoaded())
	}

	@test()
	protected static async busyBeforeAndAfter() {
		vcAssert.assertCardIsBusy(this.vc)
		await this.vc.load()
		vcAssert.assertCardIsNotBusy(this.vc)
	}

	@test()
	protected static async getsBackOrg() {
		await this.vc.load()
		assert.isEqualDeep(this.org, this.vc.getOrg())
	}

	@test()
	protected static async loadsLocation() {
		const vc = this.Vc({
			organizationId: this.org.id,
			locationId: this.location.id,
		})

		await vc.load()

		assert.isEqualDeep(this.location, vc.getLocation())
		assert.isEqual(
			this.eventFaker.lastGetLocationTargetAndPayload?.target.locationId,
			this.location.id
		)
	}

	@test()
	protected static hasJoinButton() {
		vcAssert.assertCardRendersButtons(this.vc, ['accept', 'reject'])
	}

	@test()
	protected static async clickingAcceptCallsAcceptHandler() {
		let wasHit = false
		const vc = this.Vc({
			onAccept: () => {
				wasHit = true
			},
		})

		assert.isEqual(wasHit, false)
		await interactor.clickButton(vc, 'accept')
		assert.isEqual(wasHit, true)
	}

	@test()
	protected static async callingAcceptDirectlyCallAcceptHandler() {
		let wasHit = false
		const vc = this.Vc({
			onAccept: () => {
				wasHit = true
			},
		})

		await vc.accept()

		assert.isTrue(wasHit)
	}

	@test()
	protected static async clickingDeclineCallsDeclineHandler() {
		let wasHit = false
		const vc = this.Vc({
			onDecline: () => {
				wasHit = true
			},
		})

		assert.isEqual(wasHit, false)
		await interactor.clickButton(vc, 'reject')
		assert.isEqual(wasHit, true)
	}

	@test()
	protected static async callingRejectDirectlyCallRejectHandler() {
		let wasHit = false
		const vc = this.Vc({
			onDecline: () => {
				wasHit = true
			},
		})

		await vc.decline()

		assert.isTrue(wasHit)
	}

	private static Vc(
		options?: Partial<ConfirmJoinCardViewControllerOptions>
	): ConfirmJoinCardViewController {
		return this.Controller('confirmJoinCard', {
			organizationId: this.org.id,
			viewContext: {},
			authenticator: this.authenticator,
			onError: () => {},
			onAccept: () => {},
			onDecline: () => {},
			...options,
		})
	}

	private static async loadVc() {
		await this.vc.load()
	}
}

class FakeAuthenticator implements Authenticator {
	public person: SpruceSchemas.Spruce.v2020_07_22.Person | null = null

	public getPerson(): SpruceSchemas.Spruce.v2020_07_22.Person | null {
		return this.person
	}
	public setSessionToken(
		_token: string,
		_person: SpruceSchemas.Spruce.v2020_07_22.Person
	): void {
		throw new Error('Method not implemented.')
	}
	public getSessionToken(): string | null {
		throw new Error('Method not implemented.')
	}
	public isLoggedIn(): boolean {
		throw new Error('Method not implemented.')
	}
	public clearSession(): void {
		throw new Error('Method not implemented.')
	}
	public addEventListener<N extends 'did-login' | 'did-logout'>(
		_name: N,
		_cb: any
	): void {
		throw new Error('Method not implemented.')
	}
}
