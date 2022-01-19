import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { assertOptions } from '@sprucelabs/schema'
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
export interface ToolBeltStateMachineOptions {
	toolBeltVc: ToolBeltViewController
	Controller: ControllerFactory
	connectToApi: MercuryConnectFactory
}

type ControllerFactory = <
	N extends ViewControllerId,
	O extends ControllerOptions<N>
>(
	name: N,
	options: O
) => ViewControllerMap[N]

export default class ToolBeltStateMachine<
	Context extends Record<string, any> = Record<string, any>
> {
	private state?: ToolBeltState
	private toolBeltVc: ToolBeltViewController
	private context?: Partial<Context> = {}

	public Controller: ControllerFactory
	public connectToApi: MercuryConnectFactory

	public constructor(options: ToolBeltStateMachineOptions) {
		assertOptions(options, ['toolBeltVc', 'Controller', 'connectToApi'])

		const { toolBeltVc, Controller, connectToApi } = options

		this.toolBeltVc = toolBeltVc
		this.Controller = Controller
		this.connectToApi = connectToApi
	}

	public async transitionTo(state: ToolBeltState) {
		assertOptions({ state }, ['state'])
		await state.load(this)
		this.state = state
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

	public setContext(options: Partial<Context>) {
		this.context = { ...this.context, ...options }
	}
}
