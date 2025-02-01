import { MercuryClient } from '@sprucelabs/mercury-client'
import {
    Location,
    Organization,
    SpruceSchemas,
} from '@sprucelabs/spruce-core-schemas'
import { generateId } from '@sprucelabs/test-utils'

export default class EventFaker {
    private client: MercuryClient
    public constructor(client: MercuryClient) {
        this.client = client
    }

    public async fakeListPeople(cb?: () => void | ListPerson[]) {
        await this.client.on('list-people::v2020_12_25', () => {
            return {
                people: cb?.() ?? [],
            }
        })
    }

    public generateLocationValues() {
        return {
            id: generateId(),
            dateCreated: Date.now(),
            slug: generateId(),
            name: generateId(),
            organizationId: generateId(),
            address: {
                city: generateId(),
                country: generateId(),
                province: generateId(),
                street1: generateId(),
                zip: generateId(),
            },
        }
    }

    public async fakeRequestPin(challenge?: string) {
        await this.client.on('request-pin::v2020_12_25', () => {
            return {
                challenge: challenge ?? generateId(),
            }
        })
    }

    public async fakeListLocations(
        cb?: (
            targetAndPayload: ListLocationsTargetAndPayload
        ) => void | Location[] | Promise<void | Location[]>
    ) {
        await this.client.on(
            'list-locations::v2020_12_25',
            async (targetAndPayload) => {
                return {
                    locations: (await cb?.(targetAndPayload)) ?? [],
                }
            }
        )
    }

    public async fakeListOrganizations(
        cb?: (
            targetAndPayload: ListOrganizationsTargetAndPayload
        ) => void | Organization[]
    ) {
        await this.client.on(
            'list-organizations::v2020_12_25',
            (targetAndPayload) => {
                return {
                    organizations: cb?.(targetAndPayload) ?? [],
                }
            }
        )
    }

    public async fakeConfirmPin(options?: {
        cb?: (
            targetAndPayload: SpruceSchemas.Mercury.v2020_12_25.ConfirmPinEmitTargetAndPayload
        ) => void
        personId?: string
    }) {
        const { cb, personId } = options ?? {}

        await this.client.on('confirm-pin::v2020_12_25', (targetAndPayload) => {
            cb?.(targetAndPayload)
            return {
                token: generateId(),
                person: {
                    id: personId ?? generateId(),
                    casualName: 'Hey',
                    dateCreated: 0,
                },
            }
        })
    }
}

export type ListLocationsTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.ListLocationsEmitTargetAndPayload

export type ListOrganizationsTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.ListOrganizationsEmitTargetAndPayload

export type ListPerson = SpruceSchemas.Mercury.v2020_12_25.ListPerson
