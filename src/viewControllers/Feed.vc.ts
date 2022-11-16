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

	public render(): Feed {
		return this.model
	}
}

export type FeedViewControllerOptions = Feed
