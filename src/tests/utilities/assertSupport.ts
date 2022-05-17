import { SelectChoice } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
	ConfirmOptions,
	ViewController,
	Router,
} from '../../types/heartwood.types'
import { CardSection, Card } from './vcAssert'

export type Vc = ViewController<any>
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
