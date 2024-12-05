export const universalViewOptionFields = [
    'vcFactory',
    'renderInDialogHandler',
    'confirmHandler',
    'voteHandler',
    'connectToApi',
    'device',
    'dates',
    'maps',
    'toastHandler',
    'log',
    'plugins',
    'renderLockScreenHandler',
] as const

export type UniversalViewOptionFields =
    (typeof universalViewOptionFields)[number]

export default function removeUniversalViewOptions<
    R extends Record<string, any>,
>(rendered: R): Omit<R, UniversalViewOptionFields> {
    const { ...options } = rendered

    for (const key of universalViewOptionFields) {
        delete options[key]
    }

    return options
}
