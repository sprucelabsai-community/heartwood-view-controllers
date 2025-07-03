import AbstractSpruceTest, { test, suite, assert } from '@sprucelabs/test-utils'
import { SkillViewLayout } from '../../types/heartwood.types'
import buildSkillViewLayout from '../../utilities/buildSkillViewLayout'

@suite()
export default class BuildSkillViewLayoutTest extends AbstractSpruceTest {
    @test()
    protected honorsBigLeftTyping() {
        assert.isType<SkillViewLayout>(
            buildSkillViewLayout('big-left', {
                leftCards: [],
                rightCards: [],
            })
        )
    }

    @test()
    protected honorsBigRightTyping() {
        assert.isType<SkillViewLayout>(
            buildSkillViewLayout('big-right', {
                leftCards: [],
                rightCards: [],
            })
        )
    }

    @test()
    protected honorsBigTopTyping() {
        assert.isType<SkillViewLayout>(
            buildSkillViewLayout('big-top', {
                topCards: [],
                bottomCards: [],
            })
        )
    }

    @test()
    protected honorsBigTopLeftTyping() {
        assert.isType<SkillViewLayout>(
            buildSkillViewLayout('big-top-left', {
                leftCards: [],
                rightCards: [],
                bottomCards: [],
            })
        )
    }

    @test()
    protected honorsGridTyping() {
        assert.isType<SkillViewLayout>(
            buildSkillViewLayout('grid', {
                cards: [],
            })
        )
    }
}
