import { assert, test, suite } from '@sprucelabs/test-utils'
import { AbstractSkillViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

//@ts-ignore
jest.spyOn(process, 'on').mockImplementation(() => {})

class Confirm extends AbstractSkillViewController {
    public async doConfirm() {
        await this.confirm({ subtitle: 'you sure?' })
        throw new Error('testing an error')
    }

    public render() {
        return {
            layouts: [],
        }
    }
}

@suite()
export default class HandlingErrorsInConfirmsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        confirmSvc: Confirm,
    }

    @test.skip('figure out how to test this')
    protected async shouldThrowUnhandledError() {
        //@ts-ignore
        const vc = this.Controller('confirmSvc', {}) as Confirm
        const confirmVc = await vcAssert.assertRendersConfirm(vc, () =>
            vc.doConfirm()
        )

        await assert.doesThrowAsync(() => confirmVc.accept())
    }

    @test()
    protected needOneTestSoReporterShowsPassing() {}
}
