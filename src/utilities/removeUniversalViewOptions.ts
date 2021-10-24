export default function removeUniversalViewOptions(rendered: any) {
	const { ...options } = rendered

	delete options.vcFactory
	delete options.renderInDialogHandler
	delete options.confirmHandler
	delete options.connectToApi

	return options
}
