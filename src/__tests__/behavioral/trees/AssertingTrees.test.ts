import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class AssertingTreesTest extends AbstractViewControllerTest {
    @test()
    protected async canCreateAssertingTrees() {
        const assertingTrees = new AssertingTrees()
        assert.isTruthy(assertingTrees)
    }
}

class AssertingTrees {}
