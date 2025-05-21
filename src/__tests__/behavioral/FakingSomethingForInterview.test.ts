import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

@suite()
export default class FakingSomethingForInterviewTest extends AbstractViewControllerTest {
    private fake!: FakingSomethingForInterview
    @test()
    protected async beforeEach() {
        await super.beforeEach()
        this.fake = new FakingSomethingForInterview()
    }

    @test()
    protected canReturnTrue() {
        this.assertTrue()
    }

    @test()
    protected canOverrideTrue() {
        this.setResponseTo(false)
        this.assertFalse()
        this.setResponseTo(true)
        this.assertTrue()
    }

    private setResponseTo(response: boolean) {
        this.fake.setResponseTo(response)
    }

    private assertTrue() {
        assert.isTrue(this.fake.getResults())
    }

    private assertFalse() {
        assert.isFalse(this.fake.getResults())
    }
}

class FakingSomethingForInterview {
    private result = true
    public setResponseTo(results: boolean) {
        this.result = results
    }
    public getResults(): boolean {
        return this.result
    }
}
