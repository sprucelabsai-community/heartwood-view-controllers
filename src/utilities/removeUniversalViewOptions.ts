export const universalViewOptionFields = [
	'vcFactory',
	'renderInDialogHandler',
	'confirmHandler',
	'voteHandler',
	'connectToApi',
	'device',
] as const

export type UniversalViewOptionFields = typeof universalViewOptionFields[number]

export default function removeUniversalViewOptions<
	R extends Record<string, any>
>(rendered: R): Omit<R, UniversalViewOptionFields> {
	const { ...options } = rendered

	delete options.vcFactory
	delete options.renderInDialogHandler
	delete options.confirmHandler
	delete options.connectToApi
	delete options.voteHandler
	delete options.device

	return options
}
