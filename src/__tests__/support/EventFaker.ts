import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { generateId } from '@sprucelabs/test-utils'

export default class EventFaker {
	private client: MercuryClient
	public constructor(client: MercuryClient) {
		this.client = client
	}

	public async fakeRequestPin(challenge?: string) {
		await this.client.on('request-pin::v2020_12_25', () => {
			return {
				challenge: challenge ?? generateId(),
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
