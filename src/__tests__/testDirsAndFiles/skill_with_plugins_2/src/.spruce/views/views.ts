import ReserveSkillViewController from '../../skillViewControllers/Reserve.svc'
import ReserveCardViewController from '../../viewControllers/ReserveCard.vc'
import Plugin2 from '../../viewPlugins/plugin2.view.plugin'
import Plugin3 from '../../viewPlugins/plugin3.view.plugin'

const vcs = {
    ReserveSkillViewController,
    ReserveCardViewController
}

export const pluginClasses = {
    plugin2: Plugin2,
    plugin3: Plugin3
}

//@ts-ignore
heartwood(vcs, pluginClasses)

export default vcs