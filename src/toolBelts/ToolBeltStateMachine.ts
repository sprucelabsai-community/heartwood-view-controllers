import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { buildEventContract } from '@sprucelabs/mercury-types'
import { assertOptions, buildSchema } from '@sprucelabs/schema'
import { cloneDeepWith } from 'lodash'
import {
	ControllerOptions,
	ViewControllerId,
	ViewControllerMap,
} from '../types/heartwood.types'
import ToolBeltViewController from '../viewControllers/ToolBelt.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'

export interface ToolBeltState {
	readonly id: string
	load(stateMachine: ToolBeltStateMachine): Promise<any> | any
	destroy?: () => Promise<any> | any
}
export interface ToolBeltStateMachineOptions<
	Context extends Record<string, any> = Record<string, any>
> {
	toolBeltVc: ToolBeltViewController
	vcFactory: ViewControllerFactory
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
	private vcFactory: ViewControllerFactory

	public constructor(options: ToolBeltStateMachineOptions<Context>) {
		super(eventContract)

		assertOptions(options, ['toolBeltVc', 'vcFactory', 'connectToApi'])

		const { toolBeltVc, vcFactory, connectToApi, context = {} } = options

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

	public async updateContext(updates: Partial<Context>) {
		const typesToClone = ['Object']
		const cloned = cloneDeepWith(updates, (item) => {
			if (typesToClone.indexOf(item?.__proto__?.constructor?.name) === -1) {
				return item
			}
		})
		const old = { ...this.context }
		const newContext = { ...this.context, ...cloned }

		if (deepEqual(this.context, newContext)) {
			return
		}

		this.context = newContext

		await this.emit('did-update-context', {
			old,
			updates: cloned,
		})
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
