import { MercuryClient, MercuryClientFactory } from '@sprucelabs/mercury-client'
import { coreEventContracts } from '@sprucelabs/mercury-core-events'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import {
    eventContractUtil,
    eventDiskUtil,
    eventResponseUtil,
} from '@sprucelabs/spruce-event-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { DEMO_NUMBER } from '../constants'
import 'dotenv/config'

const TEST_HOST = process.env.TEST_HOST ?? process.env.HOST

export default class MercuryFixture {
    private clientPromise?: Promise<MercuryClient>
    private cwd: string

    public static shouldAutoImportContracts = true

    public static async beforeEach() {
        MercuryClientFactory.reset()
        //@ts-ignore
        MercuryClientFactory.setDefaultContract(coreEventContracts[0])
    }

    public constructor(cwd: string) {
        this.cwd = cwd
        if (!this.cwd) {
            throw new SchemaError({
                code: 'MISSING_PARAMETERS',
                friendlyMessage: 'Mercury fixture needs cwd.',
                parameters: ['options.cwd'],
            })
        }
    }

    /** @ts-ignore */
    public async connectToApi() {
        if (this.clientPromise) {
            return this.clientPromise
        }

        if (!TEST_HOST) {
            throw new SchemaError({
                code: 'MISSING_PARAMETERS',
                parameters: ['env.HOST'],
                friendlyMessage: `Oops! Before you can do any tests that involve Mercury you need to run \`spruce set.remote\` to point to an environment of your choosing.`,
            })
        }

        this.setDefaultContractToLocalEventsIfExist()

        this.clientPromise = MercuryClientFactory.Client({
            host: TEST_HOST,
            shouldReconnect: false,
            allowSelfSignedCrt:
                TEST_HOST.includes('https://localhost') ||
                TEST_HOST.includes('https://127.0.0.1'),
        })

        return this.clientPromise
    }

    private setDefaultContractToLocalEventsIfExist() {
        if (
            MercuryFixture.shouldAutoImportContracts &&
            diskUtil.doesBuiltHashSprucePathExist(this.cwd)
        ) {
            try {
                const combinedContract =
                    eventDiskUtil.resolveCombinedEventsContractFile(this.cwd)

                const contracts = require(combinedContract).default
                const combined = eventContractUtil.unifyContracts([
                    ...contracts,
                    ...coreEventContracts,
                ])

                if (combined) {
                    MercuryClientFactory.setDefaultContract(combined)
                }
            } catch {
                //ignored
            }
        }
    }

    /** @ts-ignore */
    public getApiClientFactory() {
        return this.connectToApi.bind(this)
    }

    public async destroy() {
        if (this.clientPromise) {
            const client = await this.clientPromise
            await client.disconnect()
            this.clientPromise = undefined
        }
    }

    public async loginAsDemoPerson(phone: string = DEMO_NUMBER): Promise<{
        person: SpruceSchemas.Spruce.v2020_07_22.Person
        client: MercuryClient
        token: string
    }> {
        if (!phone || phone.length === 0) {
            throw new SchemaError({
                code: 'MISSING_PARAMETERS',
                parameters: ['env.DEMO_NUMBER'],
            })
        }

        const client = await this.connectToApi()

        const requestPinResults = await client.emit(
            'request-pin::v2020_12_25',
            {
                payload: { phone },
            }
        )

        const { challenge } =
            eventResponseUtil.getFirstResponseOrThrow(requestPinResults)

        const pin = phone.substr(-4)
        const confirmPinResults = await client.emit(
            'confirm-pin::v2020_12_25',
            {
                payload: { challenge, pin },
            }
        )

        const { person, token } =
            eventResponseUtil.getFirstResponseOrThrow(confirmPinResults)

        //@ts-ignore
        client.auth = { person }

        return { person, client, token }
    }
}
