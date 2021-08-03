import EventEmitter from 'events'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'
import { Authenticator } from '../types/heartwood.types'

type Person = SpruceSchemas.Spruce.v2020_07_22.Person

type DidLoginPayload = (payload: { token: string; person: Person }) => void
type DidLogoutPayload = (payload: { person: Person }) => void

export interface Storage {
	removeItem(key: string): void
	setItem(key: string, value: string): void
	getItem(key: string): string | null
}

interface Payloads {
	'did-login': DidLoginPayload
	'did-logout': DidLogoutPayload
}

export default class AuthenticatorImpl implements Authenticator {
	private static instance: Authenticator | null
	private static storage: Storage | null

	private eventEmitter: EventEmitter
	private storage: Storage

	private constructor(storage: Storage) {
		this.eventEmitter = new EventEmitter()
		this.storage = storage
	}

	public static getInstance() {
		if (!this.storage) {
			throw new SpruceError({ code: 'MISSING_STORAGE' })
		}

		if (!this.instance) {
			this.instance = new this(this.storage)
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

	public getProxyToken(): string | null {
		return this.storage.getItem('proxyToken') ?? null
	}

	public setProxyToken(token: string) {
		this.storage.setItem('proxyToken', token)
	}

	public getPerson() {
		const person = this.storage.getItem('person')
		return person ? JSON.parse(person) : null
	}

	public isLoggedIn(): boolean {
		return !!this.getSessionToken()
	}

	public clearSession() {
		const person = JSON.parse(this.storage.getItem('person') ?? '{}')

		this.storage.removeItem('sessionToken')
		this.storage.removeItem('person')
		this.storage.removeItem('proxyToken')

		this.eventEmitter.emit('did-logout', { person })
	}

	public addEventListener<N extends 'did-login' | 'did-logout'>(
		name: N,
		cb: Payloads[N]
	) {
		this.eventEmitter.addListener(name, cb)
	}
}
