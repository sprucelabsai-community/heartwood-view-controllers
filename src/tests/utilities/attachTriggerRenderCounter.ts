import { Vc } from './assertSupport'

export function attachTriggerRenderCounter(vc: Vc) {
	//@ts-ignore
	if (!vc.__triggerRenderPatched) {
		//@ts-ignore
		vc.__triggerRenderPatched = true

		//@ts-ignore
		vc.__renderInvocationCount = 0

		vc.setTriggerRenderHandler(() => {
			//@ts-ignore
			vc.__renderInvocationCount++
		})
	}
}
