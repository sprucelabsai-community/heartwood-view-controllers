import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import cloneDeep from 'lodash/cloneDeep'
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
			parameters: ['toolBeltVc', 'vcFactory', 'connectToApi'],
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

	@test('can cancel context update 1', { go: 'team' })
	@test('can cancel context update 2', { what: 'the!?' })
	@test('can cancel context update 3', { what: 'the!?' }, { no: 'more' })
	protected static async canCancelContextUpdates(
		current: Record<string, any>,
		updates = { go: 'team' }
	) {
		let wasHit = false

		await this.sm.updateContext(current)

		let passedCurrent: any
		let passedUpdates: any

		await this.sm.on('will-update-context', ({ current, updates }) => {
			wasHit = true
			passedCurrent = current
			passedUpdates = updates
			return {
				shouldAllowUpdates: false,
			}
		})

		await this.assertContextUpdateBlocked(updates)
		assert.isTrue(wasHit)
		assert.isEqualDeep(current, passedCurrent)
		assert.isEqualDeep(passedUpdates, updates)

		assert.isEqualDeep(this.sm.getContext(), current)
	}

	@test()
	protected static async updatingContextReturnsTrueByDefault() {
		await this.sm.on('will-update-context', () => {
			return {}
		})

		await this.assertContextUpdateNotBlocked({ yes: 'please' })
		await this.assertContextUpdateBlocked({ yes: 'please' })
	}

	@test()
	protected static async anyListenerCanCancelUpdates() {
		await this.sm.on('will-update-context', () => {
			return {}
		})
		await this.sm.on('will-update-context', () => {
			return {
				shouldAllowUpdates: false,
			}
		})
		let response = await this.sm.updateContext({ yes: 'please' })
		assert.isFalse(response)
	}

	@test()
	protected static canGetVcFactory() {
		const vcFactory = this.getFactory()
		this.sm = this.StateMachine({ vcFactory })
		assert.isEqual(this.sm.getVcFactory(), vcFactory)
	}

	@test()
	protected static async copiesContextDeep() {
		class Test {
			public test = 'true'
		}

		const instance = new Test()

		const hello = {
			hello: 'world',
		}

		const context = {
			hello,
			instance,
		}

		let passedChanges: any

		await this.sm.on('did-update-context', ({ updates }) => {
			passedChanges = updates
		})

		await this.sm.updateContext(context)

		const actual = this.sm.getContext()

		assert.isNotEqual(hello, actual.hello)
		assert.isNotEqual(hello, passedChanges.hello)
		assert.isEqual(instance, actual.instance)
	}

	@test('does not emit if same 1', { whatever: { pizza: true } })
	@test('does not emit if same 2', { howdy: { ho: false } })
	@test('does not emit if same 3', { cheesy: () => {} })
	protected static async doesNotEmitIfContextHasNotChanged(updates: any) {
		await this.sm.updateContext(updates)

		let wasHit = false

		await this.sm.on('did-update-context', () => {
			wasHit = true
		})

		await this.sm.updateContext(cloneDeep(updates))

		assert.isFalse(wasHit)
	}

	@test()
	protected static async callsDestroyWhenTransitioningAwayFromState() {
		let state1DestroyCount = 0

		const state1 = this.State({
			destroy: async () => {
				state1DestroyCount++
			},
		})

		const state2 = this.State()

		await this.transitionTo(state1)
		assert.isEqual(state1DestroyCount, 0)

		await this.transitionTo(state2)
		assert.isEqual(state1DestroyCount, 1)
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
			vcFactory: this.getFactory(),
			connectToApi: this.mercury.getApiClientFactory(),
			...options,
		})
	}

	private static async transitionTo(state: ToolBeltState) {
		await this.sm.transitionTo(state)

		return this.sm
	}

	private static async assertContextUpdateNotBlocked(updates: { yes: string }) {
		let response = await this.sm.updateContext(updates)
		assert.isTrue(response)
	}

	private static async assertContextUpdateBlocked(
		updates: Record<string, any>
	) {
		const response = await this.sm.updateContext(updates)
		assert.isFalse(response)
	}
}
