import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ToolBeltStateMachine, {
	ToolBeltState,
	ToolBeltStateMachineOptions,
} from '../../../toolBelts/ToolBeltStateMachine'

export default class ToolBeltStateMachineTest extends AbstractViewControllerTest {
	private static sm: ToolBeltStateMachine

	protected static async beforeEach() {
		await super.beforeEach()
		this.sm = this.StateMachine()
	}

	@test()
	protected static throwsWhenMissingStates() {
		//@ts-ignore
		const err = assert.doesThrow(() => new ToolBeltStateMachine())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['toolBeltVc', 'Controller', 'connectToApi'],
		})
	}

	@test()
	protected static async needsStateWhenTransitioning() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => this.sm.transitionTo())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
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

		await this.transitionTo(state)

		assert.isTrue(wasHit)
		assert.isEqual(passedOptions, this.sm)
	}

	@test('can get state id 1', 'taco')
	@test('can get state id 2', 'burrito')
	protected static async canGetStateId(id: string) {
		const state = this.State({ id })
		await this.transitionTo(state)
		assert.isEqual(this.sm.getStateId(), id)
	}

	@test()
	protected static async catGetToolBeltOffMachine() {
		const vc = this.Controller('toolBelt', {})
		this.sm = this.StateMachine({ toolBeltVc: vc })

		assert.isEqual(this.sm.getToolBeltVc(), vc)
	}

	@test()
	protected static async canSetContext() {
		const state = this.State()

		const context = {}

		await this.sm.updateContext(context)
		await this.sm.transitionTo(state)

		assert.isEqualDeep(this.sm.getContext(), context)
	}

	@test()
	protected static async canSetPartsOfContext() {
		const context = {
			hello: 'world',
		}
		const context2 = {
			world: 'hello',
		}
		await this.sm.updateContext(context)
		await this.sm.updateContext(context2)

		assert.isEqualDeep(this.sm.getContext(), { ...context, ...context2 })
	}

	@test()
	protected static async canGetCurrentState() {
		const state = this.State()

		await this.sm.transitionTo(state)

		assert.isEqual(this.sm.getState(), state)
	}

	@test()
	protected static async canSetStateDuringInstantiating() {
		const context = { hello: 'world' }

		this.sm = this.StateMachine({ context })

		assert.isEqualDeep(context, this.sm.getContext())
	}

	@test()
	protected static async canSubscribeToContextChanges() {
		const originalContext = {}
		const updates = { hello: true }

		let wasHit = false
		let passedOld: any
		let passedUpdates: any

		await this.sm.on('did-update-context', ({ old, updates }) => {
			wasHit = true
			passedOld = old
			passedUpdates = updates
		})

		await this.sm.updateContext(updates)

		assert.isTrue(wasHit)
		assert.isEqualDeep(passedOld, originalContext)
		assert.isEqualDeep(passedUpdates, updates)
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
		await this.sm.transitionTo(state)

		return this.sm
	}
}
