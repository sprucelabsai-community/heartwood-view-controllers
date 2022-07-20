import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import {
	Authenticator,
	Card,
	CardViewController,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import buildAcceptCardSections, { buildList } from './buildAcceptCardSections'

export default class ConfirmJoinCardViewController extends AbstractViewController<Card> {
	public static id = 'confirm-join-card'
	private cardVc: CardViewController
	private isLoaded = false
	private organizationId: string
	private org?: SpruceSchemas.Spruce.v2020_07_22.Organization
	private location?: SpruceSchemas.Spruce.v2020_07_22.Location
	private locationId?: string
	private onErrorHandler: (err: Error) => void | Promise<void>
	private onAcceptHandler: () => void | Promise<void>
	private onDeclineHandler: () => void | Promise<void>
	private viewContext: ConfirmJoinViewContext
	private authenticator: Authenticator

	public constructor(
		options: ViewControllerOptions & ConfirmJoinCardViewControllerOptions
	) {
		super(options)

		assertOptions(options, [
			'organizationId',
			'onError',
			'onAccept',
			'onDecline',
			'viewContext',
			'authenticator',
		])

		this.organizationId = options.organizationId
		this.locationId = options.locationId
		this.onErrorHandler = options.onError
		this.onAcceptHandler = options.onAccept
		this.onDeclineHandler = options.onDecline
		this.viewContext = options.viewContext
		this.authenticator = options.authenticator

		this.cardVc = this.CardVc()
	}

	private CardVc(): CardViewController {
		return this.Controller('card', {
			header: {
				title: 'Ready to join?',
				subtitle: 'This is so exciting!',
			},
			body: {
				isBusy: true,
			},
			footer: {
				buttons: [
					{
						id: 'accept',
						label: 'Accept!',
						type: 'primary',
						onClick: () => this.accept(),
					},
					{
						id: 'reject',
						label: 'Reject!',
						type: 'destructive',
						onClick: () => this.decline(),
					},
				],
			},
		})
	}

	public async accept() {
		await this.onAcceptHandler()
	}

	public async decline() {
		await this.onDeclineHandler()
	}

	public getIsLoaded() {
		return this.isLoaded
	}

	public async load() {
		try {
			const client = await this.connectToApi()

			await Promise.all([
				this.optionallyLoadLocation(client),
				this.loadOrg(client),
			])

			this.isLoaded = true

			const person = this.authenticator.getPerson()

			const listVc = this.Controller(
				'list',
				buildList({
					firstName: person?.firstName ?? '*** nothing provided ***',
					lastName: person?.lastName ?? '*** nothing provided ***',
					phone: person?.phone ?? '',
					onClickToggle: () =>
						this.askForAVote({
							featureKey: 'selectable-perms',
							skillNamespace: 'invite',
							howCoolWouldItBeIf:
								'you could hide specific bits of information about yourself, even stay anonymous?',
						}),
				})
			)

			this.cardVc.setSections([
				...buildAcceptCardSections({
					orgName: this.org?.name ?? 'a company',
					roleName: this.viewContext.roleName ?? 'Guest',
				}),
				{
					list: listVc.render(),
				},
			])

			this.cardVc.setIsBusy(false)
		} catch (err: any) {
			await this.alert({ message: err.message })
			await this.onErrorHandler(err)
		}
	}

	private async loadOrg(client: MercuryClient) {
		const results = await client.emit('get-organization::v2020_12_25', {
			target: {
				organizationId: this.organizationId,
			},
		})

		const { organization } = eventResponseUtil.getFirstResponseOrThrow(results)

		this.org = organization
	}

	private async optionallyLoadLocation(client: MercuryClient) {
		if (this.locationId) {
			const [{ location }] = await client.emitAndFlattenResponses(
				'get-location::v2020_12_25',
				{
					target: {
						locationId: this.locationId,
					},
				}
			)

			this.location = location
		}
	}

	public getOrg() {
		return this.org
	}

	public getViewContext() {
		return this.viewContext
	}

	public getLocation() {
		return this.location
	}

	public render() {
		return this.cardVc.render()
	}
}

export interface ConfirmJoinViewContext {
	roleName?: string | undefined | null
}

export interface ConfirmJoinCardViewControllerOptions {
	organizationId: string
	locationId?: string
	onError: (err: Error) => void | Promise<void>
	onAccept: () => void | Promise<void>
	onDecline: () => void | Promise<void>
	viewContext: ConfirmJoinViewContext
	authenticator: Authenticator
}
