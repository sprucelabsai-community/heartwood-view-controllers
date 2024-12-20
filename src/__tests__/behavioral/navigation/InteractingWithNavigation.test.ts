import { test, assert, generateId } from '@sprucelabs/test-utils'
import interactor from '../../../tests/utilities/interactor'
import AbstractNavigationTest from './AbstractNavigationTest'
import HasNavSkillView from './HasNavSkillView'

export default class InteractingWithNavigationTest extends AbstractNavigationTest {
    protected static controllerMap = {
        hasNav: HasNavSkillView,
    }
    private static hasNavVc: HasNavSkillView

    protected static async beforeEach() {
        await super.beforeEach()
        this.hasNavVc = this.Controller('hasNav' as any, {})
    }

    @test()
    protected static async throwsWithoutButtonInNav() {
        const vc = this.NavigationVc()
        await assert.doesThrowAsync(() =>
            interactor.clickButton(vc, generateId())
        )
    }

    @test()
    protected static async canClickFirstButtonInNav() {
        let hitCount = 0
        const id = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    id,
                    lineIcon: 'home',
                    onClick: () => {
                        hitCount++
                    },
                },
            ],
        })

        await interactor.clickButton(vc, id)

        assert.isEqual(hitCount, 1)

        await interactor.clickNavButton(vc, id)

        assert.isEqual(hitCount, 2)
    }

    @test()
    protected static async throwsWhenCantFindButtonInNav() {
        await assert.doesThrowAsync(() =>
            interactor.clickNavButton(this.hasNavVc, generateId())
        )
    }

    @test(`can click nav directly from skill view 1`, 'test', 'test2', 'test')
    @test(`can click nav directly from skill view 2`, 'test', 'test2', 'test2')
    protected static async canClickFirstButtonInNavOfSkillView(
        id1: string,
        id2: string,
        idToClick: string
    ) {
        let hitCount = 0
        const vc = this.NavigationVc({
            buttons: [
                {
                    id: id1,
                    lineIcon: 'home',
                    onClick: () => {
                        hitCount++
                    },
                },
                {
                    id: id2,
                    lineIcon: 'home',
                    onClick: () => {
                        hitCount++
                    },
                },
            ],
        })

        this.hasNavVc.setNav(vc)

        await interactor.clickNavButton(this.hasNavVc, idToClick)
        assert.isEqual(hitCount, 1)
        await interactor.clickButton(vc, idToClick)
        assert.isEqual(hitCount, 2)
    }

    @test()
    protected static async canClickDropdownButton() {
        let hitCount = 0
        const id = generateId()
        const vc = this.NavigationVc({
            buttons: [
                {
                    lineIcon: 'home',
                    id: generateId(),
                    dropdown: {
                        items: [
                            {
                                id,
                                label: 'Test',
                                onClick: () => {
                                    hitCount++
                                },
                            },
                        ],
                    },
                },
            ],
        })

        await interactor.clickNavButton(vc, id)
        assert.isEqual(hitCount, 1)
    }
}
