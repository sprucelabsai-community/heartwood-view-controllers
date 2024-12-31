import EventEmitter from 'events'
import { Person } from '@sprucelabs/spruce-core-schemas'
import SpruceError from '../errors/SpruceError'
import {
    Authenticator,
    AuthenticatorEventName,
    AuthenticatorEventPayloads,
    Storage,
} from '../types/heartwood.types'

export default class AuthenticatorImpl implements Authenticator {
    public static Class?: new (storage: Storage) => Authenticator

    private static instance: Authenticator | null
    private static storage: Storage | null

    protected eventEmitter: EventEmitter<AuthenticatorEmitterMap>
    protected storage: Storage

    protected constructor(storage: Storage) {
        this.eventEmitter = new EventEmitter<AuthenticatorEmitterMap>()
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
        this.eventEmitter.emit('did-login', { token, person })
    }

    public getSessionToken() {
        return this.storage.getItem('sessionToken') ?? null
    }

    public getPerson() {
        const person = this.storage.getItem('person')
        return person ? JSON.parse(person) : null
    }

    public isLoggedIn(): boolean {
        return !!this.getSessionToken()
    }

    public clearSession() {
        if (!this.isLoggedIn()) {
            return
        }
        const person = JSON.parse(this.storage.getItem('person') ?? '{}')
        this.eventEmitter.emit('will-logout', { person })

        this.storage.removeItem('sessionToken')
        this.storage.removeItem('person')

        this.eventEmitter.emit('did-logout', { person })
    }

    public addEventListener<N extends AuthenticatorEventName>(
        name: N,
        cb: AuthenticatorEventPayloads[N]
    ) {
        //@ts-ignore
        this.eventEmitter.addListener(name, cb)
    }
}

export interface AuthenticatorEmitterMap {
    'did-login': {
        token: string
        person: Person
    }[]
    'will-logout': {
        person: Person
    }[]
    'did-logout': {
        person: Person
    }[]
}
