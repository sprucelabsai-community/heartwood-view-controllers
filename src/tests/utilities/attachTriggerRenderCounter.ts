import { Vc } from './assertSupport'

export function attachTriggerRenderCounter(vc: Vc) {
	//@ts-ignore
	if (!vc.__triggerRenderPatched) {
		//@ts-ignore
		vc.__renderInvocationCount = 0

		//@ts-ignore
		vc.__triggerRenderPatched = true

		const oldRender = vc.triggerRender?.bind(vc)

		vc.triggerRender = () => {
			//@ts-ignore
			vc.__renderInvocationCount++
			oldRender?.()
		}
	}
}
