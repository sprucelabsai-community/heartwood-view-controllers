/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	SkillViewController,
	SkillViewControllerLoadOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type SkillView = SpruceSchemas.Heartwood.v2021_02_11.SkillView

export default abstract class AbstractSkillViewController
	extends AbstractViewController<SkillView>
	implements SkillViewController {
	public abstract id: string
	// eslint-disable-next-line no-unused-vars
	public async load(options: SkillViewControllerLoadOptions) {}
	public abstract render(): SkillView
}
