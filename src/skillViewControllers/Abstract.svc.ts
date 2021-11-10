/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	SkillViewController,
	SkillViewControllerLoadOptions,
} from '../types/heartwood.types'
import AbstractViewController from '../viewControllers/Abstract.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
type ToolBelt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt

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

	public async focus(): Promise<void> {}
	public async blur(): Promise<void> {}

	public renderToolBelt(): ToolBelt | null {
		return null
	}

	public abstract render(): SkillView
}
