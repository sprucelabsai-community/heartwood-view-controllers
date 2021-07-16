/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	SkillViewController,
	SkillViewControllerLoadOptions,
} from '../types/heartwood.types'
import AbstractViewController from '../viewControllers/Abstract.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

export default abstract class AbstractSkillViewController<
		Args extends Record<string, any> = Record<string, any>
	>
	extends AbstractViewController<SkillView>
	implements SkillViewController
{
	public static id: string

	public async load(
		// eslint-disable-next-line no-unused-vars
		options: SkillViewControllerLoadOptions<Args>
	) {}
	public abstract render(): SkillView
}
