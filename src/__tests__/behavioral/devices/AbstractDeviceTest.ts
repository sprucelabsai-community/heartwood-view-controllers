import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import SpyDevice from '../../../tests/SpyDevice'
import MockDeviceVc from './MockDeviceVc'

export default class AbstractDeviceTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        mock: MockDeviceVc,
    }
    protected static vc: MockDeviceVc

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('mock' as any, {}) as MockDeviceVc
    }

    protected static get device() {
        return this.vc.getDevice() as SpyDevice
    }
}
