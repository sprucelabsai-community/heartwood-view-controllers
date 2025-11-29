import { MercuryConnectFactory } from '@sprucelabs/mercury-client'
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import {
    buildEventContract,
    MercuryAggregateResponse,
} from '@sprucelabs/mercury-types'
import {
    assertOptions,
    buildSchema,
    cloneDeep,
    ValuesWithPaths,
} from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { isEqual } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import {
    ControllerOptions,
    SimpleViewControllerFactory,
    ViewControllerId,
    ViewControllerMap,
} from '../types/heartwood.types'
import ToolBeltViewController from '../viewControllers/ToolBelt.vc'
const set = require('object-set')

export default class ToolBeltStateMachine<
    Context extends Record<string, any> = Record<string, any>,
    ContextWithDotKeys extends ValuesWithPaths<Partial<Context>> =
        ValuesWithPaths<Partial<Context>>,
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

    public getContext(updatesToMixin?: ContextWithDotKeys): Context {
        return updatesToMixin && Object.keys(updatesToMixin).length > 0
            ? (this.getContextMixingInUpdates(updatesToMixin)
                  .newContext as Context)
            : (this.context as Context)
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

    public async updateContext(updates: ContextWithDotKeys) {
        this.updateContextPromise = this._updateContext(updates)
        return this.updateContextPromise
    }

    private async _updateContext(
        updates: ContextWithDotKeys
    ): Promise<boolean> {
        let { newContext, expandedUpdates } =
            this.getContextMixingInUpdates(updates)

        if (isEqual(this.context, newContext)) {
            return false
        }

        const old = { ...this.context }

        let results = await this.emit('will-update-context', {
            current: this.context,
            updates: expandedUpdates,
        })

        this.assertNoErrorsInResponse(results)

        let mixin: Partial<Context> | undefined
        let shouldAllowUpdates = true

        for (const { payload } of results.responses) {
            if (payload?.mixin) {
                if (!mixin) {
                    mixin = {}
                }
                mixin = { ...mixin, ...payload?.mixin }
            }

            shouldAllowUpdates =
                shouldAllowUpdates && payload?.shouldAllowUpdates !== false
        }

        if (!shouldAllowUpdates) {
            return false
        }

        if (mixin) {
            newContext = {
                ...newContext,
                ...mixin,
            }
        }

        this.context = newContext

        results = await this.emit('did-update-context', {
            old,
            updates: expandedUpdates,
        })

        this.assertNoErrorsInResponse(results)

        return true
    }

    private getContextMixingInUpdates(updates: ContextWithDotKeys): {
        newContext: Context
        clonedUpdates: ContextWithDotKeys
        expandedUpdates: Partial<Context>
    } {
        let clonedUpdates = clone(updates)

        const expandedUpdates: Partial<Context> = {}
        const newContext = clone(this.context ?? {}) as Context

        for (const key of Object.keys(clonedUpdates)) {
            if (key.includes('.')) {
                set(expandedUpdates, key, clonedUpdates[key])
                set(newContext, key, clonedUpdates[key])
            } else {
                //@ts-ignore
                newContext[key] = clonedUpdates[key]
                //@ts-ignore
                expandedUpdates[key] = clonedUpdates[key]
            }
        }

        return {
            newContext,
            clonedUpdates: clonedUpdates as ContextWithDotKeys,
            expandedUpdates,
        }
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

export interface ToolBeltState {
    readonly id: string
    load(stateMachine: ToolBeltStateMachine): Promise<any> | any
    destroy?: () => Promise<any> | any
}

export interface ToolBeltStateMachineOptions<
    Context extends Record<string, any> = Record<string, any>,
> {
    toolBeltVc: ToolBeltViewController
    vcFactory: SimpleViewControllerFactory
    connectToApi: MercuryConnectFactory
    context?: Partial<Context>
}

type ControllerFactory = <
    N extends ViewControllerId,
    O extends ControllerOptions<N>,
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
                    mixin: {
                        type: 'raw',
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
function clone<Context extends Record<string, any> = Record<string, any>>(
    updates: Partial<Context>
) {
    const typesToClone = ['Object', 'Array']
    let clonedUpdates = cloneDeep(updates, (item) => {
        if (typesToClone.indexOf(item?.__proto__?.constructor?.name) === -1) {
            return item
        }
    })
    return clonedUpdates
}
