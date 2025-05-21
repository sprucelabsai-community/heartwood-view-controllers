import { assert, test, suite } from '@sprucelabs/test-utils'
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

@suite()
export default class AssertingConfirmsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        testSvc: TestSvc,
    }

    private vc!: TestSvc

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        //@ts-ignore
        this.vc = this.Controller('testSvc', {}) as TestSvc
    }

    @test()
    protected async passesBackErrorInConfirm() {
        const err = await assert.doesThrowAsync(() =>
            vcAssert.assertRendersConfirm(this.vc, async () =>
                interactor.clickRow(this.vc.getListVc(), 0)
            )
        )

        assert.doesInclude(err.message, 'onClick')
    }

    @test()
    protected async throwingDoesNotCrashTests() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersConfirm(this.vc, async () =>
                this.vc.throwsInsteadOfConfirm()
            )
        )
    }

    @test()
    protected async throwingAfterAcceptDoesNotThrowCrashTests() {
        const confirmVc = await vcAssert.assertRendersConfirm(
            this.vc,
            async () => this.vc.throwsAfterConfirm()
        )

        await assert.doesThrowAsync(() => confirmVc.accept())
    }

    @test()
    protected async throwingAfterDeclineDoesNotThrowCrashTests() {
        const confirmVc = await vcAssert.assertRendersConfirm(
            this.vc,
            async () => this.vc.throwsAfterConfirm()
        )

        await assert.doesThrowAsync(() => confirmVc.decline())
    }
}
