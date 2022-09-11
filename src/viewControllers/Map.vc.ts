import { cloneDeep } from '@sprucelabs/schema'
import {
	Map,
	MapPin,
	MapZoom,
	ViewControllerOptions,
} from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class MapViewController extends AbstractViewController<Map> {
	private model: Omit<Map, 'controller'>

	public constructor(
		options: ViewControllerOptions & MapViewControllerOptions
	) {
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

	public addPin(expected: MapPin) {
		if (!this.model.pins) {
			this.model.pins = []
		}
		this.model.pins?.push(expected)
		this.triggerRender()
	}

	public getZoom() {
		return this.model.zoom
	}

	public setZoom(zoom: MapZoom) {
		this.model.zoom = zoom
		this.triggerRender()
	}

	public render(): Map {
		return {
			...this.model,
			controller: this,
		}
	}
}

export type MapViewControllerOptions = Omit<Map, 'controller'>
