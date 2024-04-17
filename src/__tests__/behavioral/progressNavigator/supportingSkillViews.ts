import { generateId } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import { ViewControllerOptions } from '../../../types/heartwood.types'
import ProgressNavigatorViewController from '../../../viewControllers/progressNavigator/ProgressNavigator.vc'

export class NoProgressSkillView extends AbstractSkillViewController {
    public render() {
        return {
            layouts: [],
        }
    }
}
export class WithProgressSkillView extends AbstractSkillViewController {
    public progressNavigator: ProgressNavigatorViewController
    public constructor(options: ViewControllerOptions) {
        super(options)
        this.progressNavigator = this.Controller('progress-navigator', {
            steps: [
                {
                    id: generateId(),
                    label: 'Step 1',
                },
            ],
        })
    }

    public renderProgressNavigator() {
        return this.progressNavigator.render()
    }
    public render() {
        return {
            layouts: [],
        }
    }
}
export class WithProgressWithoutControllerSkillView extends AbstractSkillViewController {
    public renderProgressNavigator() {
        return {
            steps: [],
        }
    }
    public render() {
        return {
            layouts: [],
        }
    }
}
