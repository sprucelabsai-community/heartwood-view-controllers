import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { MercuryEventEmitter } from '@sprucelabs/mercury-types'
import { Person } from '@sprucelabs/spruce-core-schemas'
import SpruceError from '../errors/SpruceError'
import {
    AuthContract,
    authContract,
    Authenticator,
    Storage,
} from '../types/heartwood.types'

export default class AuthenticatorImpl implements Authenticator {
    public static Class?: new (storage: Storage) => Authenticator

    private static instance: Authenticator | null
    private static storage: Storage | null

    protected emitter: MercuryEventEmitter<AuthContract>
    protected storage: Storage

    protected constructor(storage: Storage) {
        this.emitter = new AuthEmitter()
        this.storage = storage
    }

    public static getInstance() {
        if (!this.storage) {
            throw new SpruceError({ code: 'MISSING_STORAGE' })
        }

        if (!this.instance) {
            this.instance = new (this.Class ?? this)(this.storage)
        }

        return this.instance
    }

    public static reset() {
        this.instance = null
        this.storage = null
    }

    public static setStorage(storage: Storage | null) {
        this.storage = storage
    }

    public setSessionToken(token: string, person: Person) {
        this.storage.setItem('sessionToken', token)
        this.storage.setItem('person', JSON.stringify(person))
        void this.emitter.emit('did-login', { token, person })
    }

    public getSessionToken() {
        return this.storage.getItem('sessionToken') ?? null
    }

    public getPerson(): Person | null {
        const person = this.storage.getItem('person')
        return person ? JSON.parse(person) : null
    }

    public isLoggedIn(): boolean {
        return !!this.getSessionToken()
    }

    public async clearSession() {
        if (!this.isLoggedIn()) {
            return
        }
        const person = JSON.parse(this.storage.getItem('person') ?? '{}')
        await this.emitter.emit('will-logout', { person })

        this.storage.removeItem('sessionToken')
        this.storage.removeItem('person')

        await this.emitter.emit('did-logout', { person })
    }

    public addEventListener: MercuryEventEmitter<AuthContract>['on'] = async (
        name,
        cb
    ) => {
        await this.emitter.on(name, cb)
    }
}

class AuthEmitter extends AbstractEventEmitter<AuthContract> {
    public constructor() {
        super(authContract)
    }
}
