import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { EventName } from '@sprucelabs/mercury-types'
import { ListRow } from '../../types/heartwood.types'

export default class ActiveRecordFetcherImpl implements ActiveRecordFetcher {
    private connectToApi: MercuryConnectFactory
    private eventName: EventName
    private responseKey: string
    private rowTransformer: (record: Record<string, any>) => ListRow
    private filter?: (record: Record<string, any>) => boolean
    private emitTarget?: Record<string, any> | undefined
    private emitPayload?: Record<string, any> | undefined

    protected constructor(options: FetcherOptions) {
        const {
            connectToApi,
            eventName,
            responseKey,
            rowTransformer,
            filter,
            target,
            payload,
        } = options

        this.connectToApi = connectToApi
        this.eventName = eventName
        this.responseKey = responseKey
        this.rowTransformer = rowTransformer
        this.filter = filter
        this.emitTarget = target
        this.emitPayload = payload
    }

    public static Fetcher(options: FetcherOptions) {
        return new this(options)
    }

    public async fetchRecords() {
        let responseKeyError: any

        let records: Record<string, any> = []

        try {
            const client = await this.connectToApi()

            const [responsePayload] = await client.emitAndFlattenResponses(
                this.eventName,
                this.buildTargetAndPayload() as any
            )

            records = responsePayload[this.responseKey] as any[]

            if (!records) {
                responseKeyError = true
            } else {
                records = records.filter(
                    (r: any) => !this.filter || this.filter(r)
                )

                return records.map((record: any) => this.rowTransformer(record))
            }
        } catch (err: any) {
            return err
        }

        if (responseKeyError) {
            throw new Error(
                `The key '${this.responseKey}' was not found in response or no records were returned!`
            )
        }
    }

    private buildTargetAndPayload() {
        const targetAndPayload: Record<string, any> = {}

        if (this.emitTarget) {
            //@ts-ignore
            targetAndPayload.target = this.emitTarget
        }

        if (this.emitPayload) {
            //@ts-ignore
            targetAndPayload.payload = this.emitPayload
        }

        return Object.keys(targetAndPayload).length === 0
            ? undefined
            : targetAndPayload
    }

    public setTarget(target: Record<string, any>): void {
        this.emitTarget = target
    }

    public setPayload(payload: Record<string, any>): void {
        this.emitPayload = payload
    }
}

export interface ActiveRecordFetcher {
    fetchRecords(): Promise<void>
    setTarget(target: Record<string, any>): void
    setPayload(payload: Record<string, any>): void
}

interface FetcherOptions {
    eventName: EventName
    responseKey: string
    rowTransformer: (record: Record<string, any>) => ListRow
    noResultsRow?: Omit<ListRow, 'id'>
    payload?: Record<string, any>
    target?: Record<string, any>
    filter?: (record: Record<string, any>) => boolean
    connectToApi: MercuryConnectFactory
}
