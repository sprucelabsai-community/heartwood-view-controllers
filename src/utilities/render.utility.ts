import { attachTriggerRenderCounter } from '../tests/utilities/attachTriggerRenderCounter'
import { ViewController } from '../types/heartwood.types'
import removeUniversalViewOptions from './removeUniversalViewOptions'

function renderItems(
    item: Record<string, any> | any[] = {},
    options?: RenderOptions
) {
    let rendered: Record<string, any> | any = Array.isArray(item) ? [] : {}
    const keys = Array.isArray(item)
        ? item.map((_, idx) => idx)
        : Object.keys(item)

    for (const key of keys) {
        if (RENDER_ITEMS_IGNORE_KEYS.indexOf(`${key}`) > -1) {
            //@ts-ignore
            rendered[key] = item[key]
        } else {
            //@ts-ignore
            const thisItem = item[key]

            if (
                typeof thisItem === 'function' &&
                options?.shouldStripFunctions
            ) {
                //skip
            } else {
                rendered[key] = renderItem(thisItem, options)
            }
        }
    }

    if (options?.shouldStripPrivateFields !== false) {
        rendered = Array.isArray(rendered)
            ? rendered
            : removeUniversalViewOptions(rendered)
    }

    return rendered
}

function renderItem(thisItem: any, options?: RenderOptions): any {
    if (Array.isArray(thisItem)) {
        return thisItem.map((i) => renderItem(i, options))
    } else if (thisItem?.controller) {
        attachTriggerRenderCounter(thisItem.controller)

        const item = { ...renderItems(thisItem.controller.render(), options) }

        if (options?.shouldStripControllers) {
            delete item.controller
        }

        return item
    } else if (isPlainObject(thisItem)) {
        return renderItems(thisItem, options)
    } else {
        return thisItem
    }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object
    )
}

const renderUtil = {
    render<
        VC extends Pick<
            ViewController<any>,
            'render' | 'setTriggerRenderHandler'
        >,
    >(vc: VC, options?: RenderOptions): ReturnType<VC['render']> {
        if (!vc) {
            throw new Error('You tried to render something falsy!')
        }
        if (typeof vc?.render !== 'function') {
            throw new Error(
                `Your view controller does not have a render function!`
            )
        }
        attachTriggerRenderCounter(vc)
        const model = vc.render()
        const rendered = renderItem(model, options)

        return rendered as any
    },
}

export default renderUtil

export interface RenderOptions {
    shouldStripPrivateFields?: boolean
    shouldStripControllers?: boolean
    shouldStripFunctions?: boolean
}

const RENDER_ITEMS_IGNORE_KEYS = ['controller', 'schema']
