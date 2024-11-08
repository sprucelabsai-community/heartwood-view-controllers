import ReserveSkillViewController from '../../skillViewControllers/Reserve.svc'
import ReserveCardViewController from '../../viewControllers/ReserveCard.vc'
import Plugin2 from '../../viewPlugins/plugin2.view.plugin'
import Plugin3 from '../../viewPlugins/plugin3.view.plugin'

const vcs = {
    ReserveSkillViewController,
    ReserveCardViewController
}

export const pluginsByName = {
    plugin2: Plugin2,
    plugin3: Plugin3
}

//@ts-ignore
heartwood(vcs, pluginsByName)

export default vcs