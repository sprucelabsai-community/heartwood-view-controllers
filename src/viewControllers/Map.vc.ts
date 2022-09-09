import { cloneDeep } from '@sprucelabs/schema'
import { Map, MapPin, ViewControllerOptions } from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class MapViewController extends AbstractViewController<Map> {
	private model: Omit<Map, 'controller'>

	public constructor(options: ViewControllerOptions) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public getPins() {
		return this.model.pins
	}

	public setPins(pins: MapPin[]) {
		this.model.pins = cloneDeep(pins)
		this.triggerRender()
	}

	public render(): Map {
		return {
			...this.model,
			controller: this,
		}
	}
}

export type MapViewControllerOptions = Map
