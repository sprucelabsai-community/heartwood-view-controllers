import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { Navigation } from '../../../types/heartwood.types'

export default abstract class AbstractNavigationTest extends AbstractViewControllerTest {
    protected NavigationVc(navigation?: Navigation) {
        return this.Controller('navigation', { ...navigation })
    }
}
