import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ProgressNavigatorStep } from '../../../types/heartwood.types'
import ProgressNavigatorViewController, {
    ProgressNavigatorViewControllerOptions,
} from '../../../viewControllers/progressNavigator/ProgressNavigator.vc'

export default abstract class AbstractProgressNavigatorTest extends AbstractViewControllerTest {
    protected vc!: ProgressNavigatorViewController

    protected completeStep(stepId: string): any {
        return this.vc.completeStep(stepId)
    }

    protected reload(options: ProgressNavigatorViewControllerOptions) {
        this.vc = this.Vc(options)
    }

    protected generatRandomStep(): ProgressNavigatorStep {
        return {
            id: generateId(),
            label: generateId(),
        }
    }

    protected Vc(options: ProgressNavigatorViewControllerOptions) {
        return this.Controller('progress-navigator', options)
    }

    protected setCurrentStep(stepId: string): any {
        return this.vc.setCurrentStep(stepId)
    }
}
