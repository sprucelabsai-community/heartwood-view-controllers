import {
	Router,
	SkillViewController,
	SkillViewControllerArgs,
	SkillViewControllerArgsMap,
	SkillViewControllerMap,
} from '../types/heartwood.types'

export default class SpyRouter implements Router {
	public static redirectResponse = {}

	public lastRedirect?: {
		id: string
		args: any
	}
	public async redirect<Id extends never>(
		id: Id,
		args?: SkillViewControllerArgs<Id, SkillViewControllerArgsMap>
	): Promise<SkillViewControllerMap[Id]> {
		this.lastRedirect = {
			id,
			args,
		}

		return SpyRouter.redirectResponse as any
	}

	public async back(): Promise<
		SkillViewController<Record<string, any>> | undefined
	> {
		return undefined
	}
}
