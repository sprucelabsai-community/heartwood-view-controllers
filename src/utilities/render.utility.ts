import cloneDeep from 'lodash/cloneDeep'
import isObjectLike from 'lodash/isObjectLike'
import AbstractViewController from '../viewControllers/Abstract.vc'

interface RenderOptions {
	shouldReturnPrivateFields: boolean
}

function renderItems(
	item: Record<string, any> | any[] = {},
	options?: RenderOptions
) {
	let rendered: Record<string, any> | any = Array.isArray(item) ? [] : {}
	const keys = Array.isArray(item)
		? item.map((_, idx) => idx)
		: Object.keys(item)

	for (const key of keys) {
		//@ts-ignore
		const thisItem = item[key]
		rendered[key] = renderItem(thisItem, options)
	}

	if (!options?.shouldReturnPrivateFields) {
		removeHiddenFields(rendered)
	}

	return rendered
}

function renderItem(thisItem: any, options?: RenderOptions): any {
	if (Array.isArray(thisItem)) {
		return thisItem.map((i) => renderItem(i, options))
	} else if (thisItem?.controller) {
		return thisItem.controller.render()
	} else if (isObjectLike(thisItem)) {
		return renderItems(thisItem, options)
	} else {
		return thisItem
	}
}

const renderUtil = {
	render<VC extends AbstractViewController<any>>(
		vc: VC,
		options?: RenderOptions
	): ReturnType<VC['render']> {
		const model = cloneDeep(vc.render())
		const rendered = renderItems(model, options)

		return rendered as any
	},
}

function removeHiddenFields(rendered: any) {
	delete rendered.vcFactory
	delete rendered.renderInDialogHandler
	delete rendered.confirmHandler
	delete rendered.connectToApi
}

export default renderUtil
