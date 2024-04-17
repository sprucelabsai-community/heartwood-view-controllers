import { Vc } from './assertSupport'

export function attachTriggerRenderCounter(
    vc: Pick<Vc, 'setTriggerRenderHandler'>
) {
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
