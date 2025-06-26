import AbstractSpruceTest, { test, suite, assert } from '@sprucelabs/test-utils'
import buildSkillViewLayout, {
    BigLeftLayout,
    BigRightLayout,
    BigTopLayout,
    BigTopLeftLayout,
    GridLayout,
} from '../../utilities/buildSkillViewLayout'

@suite()
export default class BuildSkillViewLayoutTest extends AbstractSpruceTest {
    @test()
    protected honorsBigLeftTyping() {
        assert.isType<BigLeftLayout>(
            buildSkillViewLayout('big-left', {
                leftCards: [],
                rightCards: [],
            })
        )
    }

    @test()
    protected honorsBigRightTyping() {
        assert.isType<BigRightLayout>(
            buildSkillViewLayout('big-right', {
                leftCards: [],
                rightCards: [],
            })
        )
    }

    @test()
    protected honorsBigTopTyping() {
        assert.isType<BigTopLayout>(
            buildSkillViewLayout('big-top', {
                topCards: [],
                bottomCards: [],
            })
        )
    }

    @test()
    protected honorsBigTopLeftTyping() {
        assert.isType<BigTopLeftLayout>(
            buildSkillViewLayout('big-top-left', {
                leftCards: [],
                rightCards: [],
                bottomCards: [],
            })
        )
    }

    @test()
    protected honorsGridTyping() {
        assert.isType<GridLayout>(
            buildSkillViewLayout('grid', {
                cards: [],
            })
        )
    }
}
