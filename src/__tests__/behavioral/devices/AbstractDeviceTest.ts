import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import SpyDevice from '../../../tests/SpyDevice'
import MockDeviceVc from './MockDeviceVc'

export default class AbstractDeviceTest extends AbstractViewControllerTest {
    protected controllerMap = {
        mock: MockDeviceVc,
    }
    protected vc!: MockDeviceVc

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('mock' as any, {}) as MockDeviceVc
    }

    protected get device() {
        return this.vc.getDevice() as SpyDevice
    }
}
