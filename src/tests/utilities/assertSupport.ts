import { SelectChoice } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test-utils'
import AppController from '../../__tests__/testDirsAndFiles/skill_with_app/src/App.ac'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import {
    ConfirmOptions,
    ViewController,
    Router,
    CardSection,
    Card,
    TriggerRenderHandler,
    RouterDestination,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import AbstractAppController from '../../viewControllers/Abstract.ac'
import sectionIdOrIdxToIdx from '../../viewControllers/card/sectionIdOrIdxToIdx'

export type Vc = ViewController<any>
export const WAIT_TIMEOUT = 5000
export interface AssertConfirmViewController {
    accept: () => any | Promise<any>
    decline: () => any | Promise<any>
    options: ConfirmOptions
}

export function pluckAllFromView<K extends keyof CardSection>(
    model: Card,
    key: K
): CardSection[K][] {
    const matches =
        model.body?.sections?.map((s) => s?.[key]).filter((k) => !!k) ?? []
    //@ts-ignore
    if (model.header?.[key]) {
        matches.push(model.header[key])
    }
    return matches
}

export function pluckFirstFromCard<K extends keyof CardSection>(
    model: Card,
    key: K
) {
    return pluckAllFromView(model, key)[0] as CardSection[K]
}

export interface SelectViewController {
    getChoices: () => SelectChoice[]
    getIsRequired: () => boolean
}

export interface AssertRedirectOptions {
    router: Router
    action: () => Promise<any> | any
    destination?: Partial<RouterDestination>
}

export interface ButtonViewController {
    render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
    triggerRender(): void
    setTriggerRenderHandler(handler: TriggerRenderHandler): void
}

export function getVcName(
    vc: ViewController<any> | AbstractAppController | AppController
) {
    return (
        //@ts-ignore
        vc.id ??
        Object.getPrototypeOf(vc)?.constructor?.name ??
        //@ts-ignore
        vc.costructor?.name ??
        `view controller`
    )
}

export function getControllerType(
    vc: ViewController<any> | AbstractAppController | AppController
) {
    return vc instanceof AbstractAppController
        ? 'App'
        : vc instanceof AbstractSkillViewController
          ? 'SkillView'
          : 'ViewController'
}

export async function wait(...promises: (Promise<any> | undefined | any)[]) {
    return new Promise<any>((resolve, reject) => {
        let isDone = false

        const done = () => {
            if (!isDone) {
                isDone = true
                clearTimeout(timeout)

                setTimeout(() => {
                    //@ts-ignore
                    resolve()
                }, 0)
            }

            isDone = true
        }

        const catcher = (err: any) => {
            clearTimeout(timeout)
            if (!isDone) {
                isDone = true
                reject(err)
            }
        }

        const timeout = setTimeout(done, WAIT_TIMEOUT)

        for (const promise of promises) {
            promise?.catch?.(catcher)?.then?.(done)
        }
    })
}

export function assertToolInstanceOf(
    tool: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool,
    Class: any
): ViewController<any> {
    const checks = [
        tool?.card?.controller,
        //@ts-ignore
        tool?.card?.controller?.getParent?.(),
    ]

    let anyControllersFound = !!checks.find((c) => !!c)

    if (!anyControllersFound) {
        assert.fail(`You are not rendering a good card. Make sure you are rendering a controller, like:

public render() { 
	return { controller: this }
}

or

public render() {
	return this.cardVc.render()
}

`)
    }

    for (const check of checks) {
        const match = isVcInstanceOf(check, Class)
        if (match) {
            return match as any
        }
    }

    return null as any
}

export function isVcInstanceOf<C>(vc: any, Class: new () => C): C | false {
    if (vc) {
        let parent = vc

        while (parent) {
            if (parent instanceof Class) {
                return parent
            }

            if (parent.getParent?.() === parent) {
                break
            }
            parent = parent.getParent?.()
        }
    }

    return false
}

export function checkForCardSection(
    vc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>,
    sectionIdOrIdx: string | number
) {
    const model = renderUtil.render(vc)
    const sections = model.body?.sections ?? []
    const idx = sectionIdOrIdxToIdx(sections, sectionIdOrIdx)
    const match = sections[idx]
    assert.isTruthy(
        match,
        `I could not find a section called '${sectionIdOrIdx}' in your card!`
    )
    return match
}
