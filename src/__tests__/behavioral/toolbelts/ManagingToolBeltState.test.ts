import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ToolBeltStateMachine, {
	ToolBeltState,
	ToolBeltStateMachineOptions,
} from '../../../toolBelts/ToolBeltStateMachine'

export default class ToolBeltStateMachineTest extends AbstractViewControllerTest {
	@test()
	protected static throwsWhenMissingStates() {
		//@ts-ignore
		const err = assert.doesThrow(() => new ToolBeltStateMachine())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['toolBeltVc', 'Controller', 'connectToApi'],
		})
	}

	@test()
	protected static async needsStateWhenTransitioning() {
		const sm = this.StateMachine()

		//@ts-ignore
		const err = await assert.doesThrowAsync(() => sm.transitionTo())

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['state'],
		})
	}

	@test()
	protected static async canTransitionToState() {
		const state = this.State()
		await this.transitionTo(state)
	}

	@test()
	protected static async callsLoadOnTransition() {
		let wasHit = false
		let passedOptions: any
		const state = this.State({
			async load(sm) {
				wasHit = true
				passedOptions = sm
			},
		})

		const sm = await this.transitionTo(state)

		assert.isTrue(wasHit)
		assert.isEqual(passedOptions, sm)
	}

	@test('can get state id 1', 'taco')
	@test('can get state id 2', 'burrito')
	protected static async canGetStateId(id: string) {
		const state = this.State({ id })
		const sm = await this.transitionTo(state)
		assert.isEqual(sm.getStateId(), id)
	}

	@test()
	protected static async catGetToolBeltOffMachine() {
		const vc = this.Controller('toolBelt', {})
		const sm = this.StateMachine({ toolBeltVc: vc })

		assert.isEqual(sm.getToolBeltVc(), vc)
	}

	@test()
	protected static async canSetContext() {
		const sm = this.StateMachine()
		const state = this.State()

		const context = {}
		sm.setContext(context)

		await sm.transitionTo(state)

		assert.isEqualDeep(sm.getContext(), context)
	}

	@test()
	protected static async canSetPartsOfContext() {
		const sm = this.StateMachine()
		const context = {
			hello: 'world',
		}
		const context2 = {
			world: 'hello',
		}
		sm.setContext(context)
		sm.setContext(context2)

		assert.isEqualDeep(sm.getContext(), { ...context, ...context2 })
	}

	@test()
	protected static async canGetCurrentState() {
		const state = this.State()

		const sm = this.StateMachine()
		await sm.transitionTo(state)

		assert.isEqual(sm.getState(), state)
	}

	@test()
	protected static async canSetStateDuringInstantiating() {
		const context = { hello: 'world' }
		const sm = this.StateMachine({ context })

		assert.isEqualDeep(context, sm.getContext())
	}

	private static State(state?: Partial<ToolBeltState>) {
		return {
			id: `${new Date().getTime() * Math.random()}`,
			async load() {},
			...state,
		}
	}

	private static StateMachine(options?: Partial<ToolBeltStateMachineOptions>) {
		return new ToolBeltStateMachine({
			toolBeltVc: this.Controller('toolBelt', {}),
			Controller: this.Controller.bind(this),
			connectToApi: this.mercury.getApiClientFactory(),
			...options,
		})
	}

	private static async transitionTo(state: ToolBeltState) {
		const sm = this.StateMachine()
		await sm.transitionTo(state)

		return sm
	}
}
