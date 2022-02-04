import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { buildEventContract } from '@sprucelabs/mercury-types'
import { assertOptions, buildSchema } from '@sprucelabs/schema'
import { ViewControllerFactory } from '..'
import {
	ControllerOptions,
	ViewControllerId,
	ViewControllerMap,
} from '../types/heartwood.types'
import ToolBeltViewController from '../viewControllers/ToolBelt.vc'

export interface ToolBeltState {
	readonly id: string
	load(stateMachine: ToolBeltStateMachine): Promise<any> | any
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
		await state.load(this)
		this.state = state
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
		const old = { ...this.context }
		this.context = { ...this.context, ...updates }
		await this.emit('did-update-context', {
			old,
			updates,
		})
	}
}
