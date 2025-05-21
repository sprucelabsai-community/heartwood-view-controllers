import { cloneDeep } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ToolBeltStateMachine, {
    ToolBeltState,
    ToolBeltStateMachineOptions,
} from '../../../toolBelts/ToolBeltStateMachine'
const set = require('object-set')

@suite()
export default class ToolBeltStateMachineTest extends AbstractViewControllerTest {
    private sm!: ToolBeltStateMachine

    protected async beforeEach() {
        await super.beforeEach()
        this.sm = this.StateMachine()
    }

    @test()
    protected throwsWhenMissingStates() {
        //@ts-ignore
        const err = assert.doesThrow(() => new ToolBeltStateMachine())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['toolBeltVc', 'vcFactory', 'connectToApi'],
        })
    }

    @test()
    protected async needsStateWhenTransitioning() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => this.sm.transitionTo())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['state'],
        })
    }

    @test()
    protected async canTransitionToState() {
        const state = this.State()
        await this.transitionTo(state)
    }

    @test()
    protected async callsLoadOnTransition() {
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
    protected async canGetStateId(id: string) {
        const state = this.State({ id })
        await this.transitionTo(state)
        assert.isEqual(this.sm.getStateId(), id)
    }

    @test()
    protected async catGetToolBeltOffMachine() {
        const vc = this.Controller('tool-belt', {})
        this.sm = this.StateMachine({ toolBeltVc: vc })

        assert.isEqual(this.sm.getToolBeltVc(), vc)
    }

    @test()
    protected async canSetContext() {
        const state = this.State()

        const context = {}

        await this.sm.updateContext(context)
        await this.sm.transitionTo(state)

        this.assertContextEquals(context)
    }

    @test()
    protected async canSetPartsOfContext() {
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
    protected async canGetCurrentState() {
        const state = this.State()

        await this.transitionTo(state)

        assert.isEqual(this.getState(), state)
    }

    @test()
    protected async canSetStateDuringInstantiating() {
        const context = { hello: 'world' }

        this.sm = this.StateMachine({ context })

        assert.isEqualDeep(context, this.sm.getContext())
    }

    @test()
    protected async canSubscribeToContextChanges() {
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

        await this.updateContext(updates)

        assert.isTrue(wasHit)
        assert.isEqualDeep(passedOld, originalContext)
        assert.isEqualDeep(passedUpdates, updates)
    }

    @test('can cancel context update 1', { go: 'buddy' })
    @test('can cancel context update 2', { what: 'the!?' })
    @test('can cancel context update 3', { what: 'the!?' }, { no: 'more' })
    protected async canCancelContextUpdates(
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
    protected async updatingContextReturnsTrueByDefault() {
        await this.sm.on('will-update-context', () => {
            return {}
        })

        await this.assertContextUpdateNotBlocked({ yes: 'please' })
        await this.assertContextUpdateBlocked({ yes: 'please' })
    }

    @test()
    protected async anyListenerCanCancelUpdates() {
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
    protected canGetVcFactory() {
        const vcFactory = this.getFactory()
        this.sm = this.StateMachine({ vcFactory })
        assert.isEqual(this.sm.getVcFactory(), vcFactory)
    }

    @test()
    protected async copiesContextDeep() {
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

        await this.updateContext(context)

        const actual = this.sm.getContext()

        assert.isNotEqual(hello, actual.hello)
        assert.isNotEqual(hello, passedChanges.hello)
        assert.isEqual(instance, actual.instance)
    }

    @test('does not emit if same 1', { whatever: { pizza: true } })
    @test('does not emit if same 2', { howdy: { ho: false } })
    @test('does not emit if same 3', { cheesy: () => {} })
    protected async doesNotEmitIfContextHasNotChanged(updates: any) {
        await this.sm.updateContext(updates)

        let wasDidHit = false
        let wasWillHit = false

        await this.sm.on('will-update-context', () => {
            wasWillHit = true
            return {}
        })

        await this.sm.on('did-update-context', () => {
            wasDidHit = true
        })

        await this.updateContext(cloneDeep(updates))

        assert.isFalse(wasDidHit)
        assert.isFalse(wasWillHit)
    }

    @test()
    protected async callsDestroyWhenTransitioningAwayFromState() {
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

    @test()
    protected async canWaitUntilContextUpdateIsDone() {
        let willUpdateHit = false
        let didUpdateHit = false

        await this.sm.on('will-update-context', async () => {
            await new Promise((resolve) => setTimeout(resolve, 100))

            willUpdateHit = true
        })

        await this.sm.on('did-update-context', async () => {
            await new Promise((resolve) => setTimeout(resolve, 100))

            didUpdateHit = true
        })

        void this.updateContext({ test: true })

        await this.sm.waitForContextUpdate()

        assert.isTrue(willUpdateHit)
        assert.isTrue(didUpdateHit)
    }

    @test()
    protected async willUpdateThrowingCausesSmToThrow() {
        await this.sm.on('will-update-context', async () => {
            assert.fail('you know it!')
        })

        await assert.doesThrowAsync(() => this.updateContext({ test: true }))
    }

    @test()
    protected async didUpdateThrowingCausesSmToThrow() {
        await this.sm.on('did-update-context', async () => {
            assert.fail('oh you think?')
        })

        await assert.doesThrowAsync(() => this.updateContext({ test: true }))
    }

    @test()
    protected async canMakeDotSyntaxUpdates() {
        await this.assertSettingContextThenUpdatingEquals(
            {
                what: {
                    the: false,
                },
                hello: 'world',
            },
            { 'what.the': true },
            { what: { the: true }, hello: 'world' }
        )
    }

    @test()
    protected async canMakeDotSyntaxUpdates2() {
        await this.assertSettingContextThenUpdatingEquals(
            {
                what: {
                    the: false,
                },
                hello: 'world',
            },
            { 'what.the': true, hello: 'there' },
            { what: { the: true }, hello: 'there' }
        )
    }

    @test()
    protected async canMakeDotSyntaxUpdates3() {
        await this.assertSettingContextThenUpdatingEquals(
            {
                hey: {
                    you: 'then',
                    yes: 'please',
                },
                hello: 'world',
            },
            { 'hey.you': 'later' },
            {
                hey: {
                    you: 'later',
                    yes: 'please',
                },
                hello: 'world',
            }
        )
    }

    @test()
    protected async updatingUsingDotSyntaxTriggersChangeListeners() {
        await this.sm.updateContext({
            hello: {
                world: true,
                test: 'again',
            },
        })

        let hitCount = 0

        await this.sm.on('did-update-context', () => {
            hitCount++
        })

        await this.sm.on('will-update-context', () => {
            hitCount++
            return {}
        })

        await this.sm.updateContext({
            'hello.world': false,
        })

        assert.isEqual(hitCount, 2)
    }

    @test()
    protected async stripsOutUndefinedsBeforeCheckingIfChanges() {
        await this.updateContext({
            test: {
                one: 'two',
            },
        })

        let hitCount = 0
        await this.sm.on('did-update-context', () => {
            hitCount++
        })

        await this.updateContext({
            what: undefined,
            test: {
                one: 'two',
            },
        })

        assert.isEqual(hitCount, 0)
    }

    @test(
        'can mixin context in will update 1',
        {
            hey: 'there',
        },
        {
            hello: 'world',
        }
    )
    @test(
        'can mixin context in will update 2',
        {
            hey: 'there',
            how: 'now',
        },
        {
            hello: 'world',
            cow: 'oy oy',
        }
    )
    protected async canMixinContextInWillUpdate(
        context: Record<string, any>,
        mixin: Record<string, any>
    ) {
        await this.mixIntoContextDuringWillUpdate(mixin)
        await this.updateContext(context)
        this.assertContextEquals({
            ...mixin,
            ...context,
        })
    }

    @test()
    protected async canMixinFromMultipleListeners() {
        await this.mixIntoContextDuringWillUpdate({
            hey: 'there',
        })

        await this.mixIntoContextDuringWillUpdate({
            how: 'now',
        })

        await this.updateContext({
            hello: 'world',
        })

        this.assertContextEquals({
            hello: 'world',
            hey: 'there',
            how: 'now',
        })
    }

    @test()
    protected async gettingContextMixingInChangesDoesNotMixinIfEmptyObject() {
        //@ts-ignore
        this.sm.getContextMixingInUpdates = () =>
            //@ts-ignore
            assert.fail('should not be called')

        this.sm.getContext({})
    }

    @test()
    protected async canMixinValuesWithArraySyntax() {
        await this.updateContext({
            hey: {
                stuff: [
                    {
                        title: 'tay',
                    },
                    {
                        title: 'ry',
                    },
                ],
            },
        })

        let hitCount = 0
        await this.sm.on('did-update-context', () => {
            hitCount++
        })

        await this.updateContext({
            'hey.stuff[0].title': 'mike',
        })

        assert.isEqual(hitCount, 1)
        this.assertFirstElementInArraysTitleEquals('mike')

        await this.updateContext({
            'hey.stuff[0].title': 'spike',
        })

        this.assertFirstElementInArraysTitleEquals('spike')
        assert.isEqual(hitCount, 2)
    }

    private assertFirstElementInArraysTitleEquals(expected: string) {
        const context = this.getContext()
        assert.isEqual(context.hey.stuff[0].title, expected)
    }

    private async mixIntoContextDuringWillUpdate(mixin: Record<string, any>) {
        await this.sm.on('will-update-context', () => {
            return {
                mixin,
            }
        })
    }

    private async assertSettingContextThenUpdatingEquals(
        starting: Record<string, any>,
        updates: Record<string, any>,
        expected: Record<string, any>
    ) {
        await this.updateContext(starting)
        let expectedUpdates = {}
        for (const key of Object.keys(updates)) {
            if (key.includes('.')) {
                set(expectedUpdates, key, updates[key])
            } else {
                //@ts-ignore
                expectedUpdates[key] = updates[key]
            }
        }

        await this.sm.on('did-update-context', ({ updates }) => {
            assert.isEqualDeep(updates, expectedUpdates)
        })

        const actual = this.sm.getContext(updates)
        assert.isEqualDeep(
            actual,
            expected,
            `getContext() did not properly mixin updates.`
        )

        await this.updateContext(updates)
        this.assertContextEquals(expected)
    }

    private State(state?: Partial<ToolBeltState>) {
        return {
            id: `${new Date().getTime() * Math.random()}`,
            async load() {},
            ...state,
        }
    }

    private async updateContext(context: any) {
        await this.sm.updateContext(context)
    }

    public getState() {
        return this.sm.getState()
    }

    private StateMachine(options?: Partial<ToolBeltStateMachineOptions>) {
        return new ToolBeltStateMachine({
            toolBeltVc: this.Controller('tool-belt', {}),
            vcFactory: this.getFactory(),
            connectToApi: this.mercury.getApiClientFactory(),
            ...options,
        })
    }

    private async transitionTo(state: ToolBeltState) {
        await this.sm.transitionTo(state)

        return this.sm
    }

    private async assertContextUpdateNotBlocked(updates: { yes: string }) {
        let response = await this.sm.updateContext(updates)
        assert.isTrue(response)
    }

    private assertContextEquals(context: Record<string, any>) {
        assert.isEqualDeep(this.getContext(), context)
    }
    private getContext() {
        return this.sm.getContext()
    }

    private async assertContextUpdateBlocked(updates: Record<string, any>) {
        const response = await this.sm.updateContext(updates)
        assert.isFalse(response)
    }
}
