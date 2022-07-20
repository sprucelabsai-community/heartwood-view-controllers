import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { generateId } from '@sprucelabs/test-utils'
import { Location, Organization, Person } from '../../types/local.types'

export default class EventFaker {
	private client: MercuryClient
	public lastGetOrgTargetAndPayload?: GetOrgTargetAndPayload
	public lastGetLocationTargetAndPayload?: GetLocationTargetAndPayload
	public constructor(client: MercuryClient) {
		this.client = client
	}

	public async fakeRequestPin(challenge?: string) {
		await this.client.off('request-pin::v2020_12_25')
		await this.client.on('request-pin::v2020_12_25', () => {
			return {
				challenge: challenge ?? generateId(),
			}
		})
	}

	public async fakeGetOrganization(cb?: () => void | Organization) {
		await this.client.off('get-organization::v2020_12_25')
		await this.client.on(
			'get-organization::v2020_12_25',
			(targetAndPayload) => {
				this.lastGetOrgTargetAndPayload = targetAndPayload
				return {
					organization: cb?.() ?? generateOrgValues(),
				}
			}
		)
	}

	public async fakeGetLocation(cb?: () => void | Location) {
		await this.client.off('get-location::v2020_12_25')
		await this.client.on('get-location::v2020_12_25', (targetAndPayload) => {
			this.lastGetLocationTargetAndPayload = targetAndPayload
			return {
				location: cb?.() ?? generateLocationValues(),
			}
		})
	}

	public async fakeConfirmPin(options?: {
		cb?: (
			targetAndPayload: SpruceSchemas.Mercury.v2020_12_25.ConfirmPinEmitTargetAndPayload
		) => void
		personId?: string
	}) {
		const { cb, personId } = options ?? {}
		await this.client.off('confirm-pin::v2020_12_25')
		await this.client.on('confirm-pin::v2020_12_25', (targetAndPayload) => {
			cb?.(targetAndPayload)
			return {
				token: generateId(),
				person: generatePersonValues({ id: personId }),
			}
		})
	}
}
export function generatePersonValues(values?: Partial<Person>): Person {
	return {
		id: generateId(),
		casualName: generateId(),
		dateCreated: 0,
		...values,
	}
}

export function generateOrgValues(): Organization {
	return {
		id: generateId(),
		dateCreated: 0,
		name: generateId(),
		slug: generateId(),
	}
}

export function generateLocationValues(values?: Partial<Location>): Location {
	return {
		id: generateId(),
		name: generateId(),
		slug: generateId(),
		organizationId: generateId(),
		dateCreated: new Date().getTime(),
		...values,
		address: {
			city: generateId(),
			country: generateId(),
			province: generateId(),
			street1: generateId(),
			zip: generateId(),
			...values?.address,
		},
	}
}

type GetOrgTargetAndPayload =
	SpruceSchemas.Mercury.v2020_12_25.GetOrganizationEmitTargetAndPayload

type GetLocationTargetAndPayload =
	SpruceSchemas.Mercury.v2020_12_25.GetLocationEmitTargetAndPayload
