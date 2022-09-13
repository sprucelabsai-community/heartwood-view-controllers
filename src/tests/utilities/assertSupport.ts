import { SelectChoice } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test-utils'
import {
	ConfirmOptions,
	ViewController,
	Router,
	CardSection,
	Card,
} from '../../types/heartwood.types'

export type Vc = ViewController<any>
export const WAIT_TIMEOUT = 5000
export interface ConfirmViewController {
	accept: () => any | Promise<any>
	decline: () => any | Promise<any>
	options: ConfirmOptions
}

export function pluckAllFromCard<K extends keyof CardSection>(
	model: Card,
	key: K
): CardSection[K][] {
	return model.body?.sections?.map((s) => s?.[key]).filter((k) => !!k) ?? []
}

export function pluckFirstFromCard(model: Card, key: keyof CardSection) {
	return pluckAllFromCard(model, key)[0] as any
}

export interface SelectViewController {
	getChoices: () => SelectChoice[]
	getIsRequired: () => boolean
}

export interface AssertRedirectOptions {
	router: Router
	action: () => Promise<any> | any
	destination?: {
		id?: string
		args?: Record<string, any>
	}
}

export interface ButtonViewController {
	render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
	triggerRender(): void
}

export function getVcName(vc: ViewController<any>) {
	return (
		//@ts-ignore
		vc.id ?? Object.getPrototypeOf(vc)?.constructor?.name ?? `view controller`
	)
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
			} else {
				throw err
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
		if (vc instanceof Class) {
			return vc
		} else if (vc?.getParent?.() instanceof Class) {
			return vc.getParent()
		} else if (vc?.getParent?.()?.getParent?.() instanceof Class) {
			return vc?.getParent?.()?.getParent?.()
		}
	}

	return false
}
