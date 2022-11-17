import { SchemaError } from '@sprucelabs/schema'
import { FeedItem } from '@sprucelabs/spruce-core-schemas'
import { Feed, ViewControllerOptions } from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class FeedViewController extends AbstractViewController<Feed> {
	private model: Feed
	public constructor(
		options: ViewControllerOptions & FeedViewControllerOptions
	) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public addItem(item: FeedItem) {
		this.model.items.push(item)
		this.triggerRender()
	}

	public removeItem(id: string) {
		const originaLength = this.getTotalItems()
		this.model.items = this.model.items.filter((i) => i.id !== id)

		if (originaLength === this.getTotalItems()) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: 'I could not find that item to remove it!',
				parameters: ['itemId'],
			})
		}

		this.triggerRender()
	}

	public setItems(items: FeedItem[]) {
		this.model.items = items
		this.triggerRender()
	}

	private getTotalItems() {
		return this.model.items.length
	}

	public render(): Feed {
		return { ...this.model, controller: this }
	}
}

export type FeedViewControllerOptions = Feed
