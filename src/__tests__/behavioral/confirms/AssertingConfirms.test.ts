import { assert, test } from '@sprucelabs/test-utils'
import { AbstractSkillViewController, interactor, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

class TestSvc extends AbstractSkillViewController {
    public getListVc() {
        return this.Controller('list', {
            rows: [
                {
                    id: 'test',
                    cells: [],
                },
            ],
        })
    }

    public async throwsInsteadOfConfirm() {
        throw new Error('oh no!')
    }

    public async throwsAfterConfirm() {
        const didAccept = await this.confirm({ subtitle: 'Are you sure?' })
        console.log(didAccept)
        throw new Error('test')
    }

    public render() {
        return {
            layouts: [],
        }
    }
}

export default class AssertingConfirmsTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        testSvc: TestSvc,
    }

    private static vc: TestSvc

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        //@ts-ignore
        this.vc = this.Controller('testSvc', {}) as TestSvc
    }

    @test()
    protected static async passesBackErrorInConfirm() {
        const err = await assert.doesThrowAsync(() =>
            vcAssert.assertRendersConfirm(this.vc, async () =>
                interactor.clickRow(this.vc.getListVc(), 0)
            )
        )

        assert.doesInclude(err.message, 'onClick')
    }

    @test()
    protected static async throwingDoesNotCrashTests() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersConfirm(this.vc, async () =>
                this.vc.throwsInsteadOfConfirm()
            )
        )
    }

    @test()
    protected static async throwingAfterAcceptDoesNotThrowCrashTests() {
        const confirmVc = await vcAssert.assertRendersConfirm(
            this.vc,
            async () => this.vc.throwsAfterConfirm()
        )

        await assert.doesThrowAsync(() => confirmVc.accept())
    }

    @test()
    protected static async throwingAfterDeclineDoesNotThrowCrashTests() {
        const confirmVc = await vcAssert.assertRendersConfirm(
            this.vc,
            async () => this.vc.throwsAfterConfirm()
        )

        await assert.doesThrowAsync(() => confirmVc.decline())
    }
}
