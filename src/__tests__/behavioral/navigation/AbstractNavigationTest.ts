import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { NavigationViewControllerOptions } from '../../../viewControllers/navigation/Navigation.vc'

export default abstract class AbstractNavigationTest extends AbstractViewControllerTest {
    protected NavigationVc(navigation?: NavigationViewControllerOptions) {
        return this.Controller('navigation', { ...navigation })
    }
}
