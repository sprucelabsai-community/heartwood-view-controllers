import ReserveSkillViewController from '../../skillViewControllers/Reserve.svc'
import ReserveCardViewController from '../../viewControllers/ReserveCard.vc'
import Plugin1 from '../../viewPlugins/plugin1.view.plugin'

const vcs = {
    ReserveSkillViewController,
    ReserveCardViewController
}

export const pluginClasses = {
    plugin1: Plugin1
}

//@ts-ignore
heartwood({ vcs, pluginClasses })

export default vcs