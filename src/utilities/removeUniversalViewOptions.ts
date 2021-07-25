export default function removeUniversalViewOptions(rendered: any) {
	delete rendered.vcFactory
	delete rendered.renderInDialogHandler
	delete rendered.confirmHandler
	delete rendered.connectToApi
	delete rendered.setTimeout
	delete rendered.clearTimeout
}
