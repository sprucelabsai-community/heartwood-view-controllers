import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import {
	buildEventContract,
	MercuryAggregateResponse,
} from '@sprucelabs/mercury-types'
import { assertOptions, buildSchema } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { cloneDeep } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import {
	ControllerOptions,
	SimpleViewControllerFactory,
	ViewControllerId,
	ViewControllerMap,
} from '../types/heartwood.types'
import ToolBeltViewController from '../viewControllers/ToolBelt.vc'

export interface ToolBeltState {
	readonly id: string
	load(stateMachine: ToolBeltStateMachine): Promise<any> | any
	destroy?: () => Promise<any> | any
}

export interface ToolBeltStateMachineOptions<
	Context extends Record<string, any> = Record<string, any>
> {
	toolBeltVc: ToolBeltViewController
	vcFactory: SimpleViewControllerFactory
	connectToApi: MercuryConnectFactory
	context?: Partial<Context>
}

type ControllerFactory = <
	N extends ViewControllerId,
	O extends ControllerOptions<N>
>(
	name: N,
	options: O
) => ViewControllerMap[N]

const eventContract = buildEventContract({
	eventSignatures: {
		['did-update-context']: {
			emitPayloadSchema: buildSchema({
				id: 'did-update-context',
				fields: {
					old: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'Record<string, any>',
						},
					},
					updates: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'Record<string, any>',
						},
					},
				},
			}),
		},
		['will-update-context']: {
			emitPayloadSchema: buildSchema({
				id: 'will-update-context-emit',
				fields: {
					current: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'Record<string, any>',
						},
					},
					updates: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'Record<string, any>',
						},
					},
				},
			}),
			responsePayloadSchema: buildSchema({
				id: 'will-update-context-response',
				fields: {
					shouldAllowUpdates: {
						type: 'boolean',
						defaultValue: true,
					},
				},
			}),
		},
	},
})

type EventContract = typeof eventContract

export default class ToolBeltStateMachine<
	Context extends Record<string, any> = Record<string, any>
> extends AbstractEventEmitter<EventContract> {
	private state?: ToolBeltState
	private toolBeltVc: ToolBeltViewController
	private context?: Partial<Context> = {}

	public Controller: ControllerFactory
	public connectToApi: MercuryConnectFactory
	private vcFactory: SimpleViewControllerFactory
	private updateContextPromise?: Promise<boolean>

	public constructor(options: ToolBeltStateMachineOptions<Context>) {
		super(eventContract)

		const {
			toolBeltVc,
			vcFactory,
			connectToApi,
			context = {},
			//@ts-ignore
		} = assertOptions(options, ['toolBeltVc', 'vcFactory', 'connectToApi'])

		this.toolBeltVc = toolBeltVc
		this.Controller = vcFactory.Controller.bind(vcFactory)
		this.vcFactory = vcFactory
		this.connectToApi = connectToApi
		this.context = context
	}

	public async transitionTo(state: ToolBeltState) {
		assertOptions({ state }, ['state'])

		const destroyPromise = this.state?.destroy?.()

		this.state = state

		await state.load(this)

		await destroyPromise
	}

	public getVcFactory() {
		return this.vcFactory
	}

	public getContext() {
		return this.context as Context
	}

	public getStateId(): string | undefined {
		return this.state?.id
	}

	public getState() {
		return this.state
	}

	public getToolBeltVc() {
		return this.toolBeltVc
	}

	public async waitForContextUpdate() {
		await this.updateContextPromise
	}

	public async updateContext(updates: Partial<Context>) {
		this.updateContextPromise = this._updateContext(updates)
		return this.updateContextPromise
	}

	private async _updateContext(updates: Partial<Context>): Promise<boolean> {
		const typesToClone = ['Object']
		const cloned = cloneDeep(updates, (item) => {
			if (typesToClone.indexOf(item?.__proto__?.constructor?.name) === -1) {
				return item
			}
		})

		const old = { ...this.context }
		const newContext = { ...this.context, ...cloned }

		if (deepEqual(this.context, newContext)) {
			return false
		}

		let results = await this.emit('will-update-context', {
			current: this.context,
			updates,
		})

		this.assertNoErrorsInResponse(results)

		if (
			results.responses.find((r) => r.payload?.shouldAllowUpdates === false)
		) {
			return false
		}

		this.context = newContext

		results = await this.emit('did-update-context', {
			old,
			updates: cloned,
		})

		this.assertNoErrorsInResponse(results)

		return true
	}

	private assertNoErrorsInResponse(results: MercuryAggregateResponse<any>) {
		const { errors } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			results,
			SpruceError
		)

		if (errors) {
			throw errors[0]
		}
	}
}

const deepEqual = function (x: any, y: any) {
	if (x === y) {
		return true
	} else if (
		typeof x == 'object' &&
		x != null &&
		typeof y == 'object' &&
		y != null
	) {
		if (Object.keys(x).length != Object.keys(y).length) {
			return false
		}

		for (let prop in x) {
			if (Object.prototype.hasOwnProperty.call(y, prop)) {
				if (!deepEqual(x[prop], y[prop])) {
					return false
				}
			} else {
				return false
			}
		}

		return true
	} else {
		return false
	}
}
