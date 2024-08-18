import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import { CardSection, CardViewController } from '../../../types/heartwood.types'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../../../viewControllers/pagers/Pager.vc'

export default class AssertingPagersTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static pagerVc: PagerViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.setupPager()
    }

    @test()
    protected static async throwsWithMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => pagerAssert.cardRendersPager())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsIfNoSectionRendered() {
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected static async canFindPagerInFirstSection() {
        this.addSectionWithPager()
        this.assertCardRendersPager()
    }

    @test()
    protected static async throwsIfSectionWithNoPagerRendered() {
        this.addSection({})
        this.asserthThrowsBecausePagerNotFound()
    }

    @test()
    protected static async canFindPagerInSecondSection() {
        this.addSection({})
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager()
        assert.isEqual(vc, this.pagerVc)
    }

    @test()
    protected static async throwsIfPagerIdDoesNotMatch() {
        this.setupPager({ id: generateId() })
        this.addSectionWithPager()
        this.asserthThrowsBecausePagerNotFound(generateId())
    }

    @test()
    protected static async findsFirstPagerWithId() {
        const id = generateId()
        this.setupPager({ id })
        this.addSectionWithPager()
        this.assertCardRendersPager(id)
    }

    @test()
    protected static async findsSecondPagerWithId() {
        const id = generateId()
        this.addSectionWithPager()
        this.setupPager({ id })
        this.addSectionWithPager()
        const vc = this.assertCardRendersPager(id)
        assert.isEqual(vc, this.pagerVc)
    }

    private static setupPager(options?: PagerViewControllerOptions) {
        this.pagerVc = this.Controller('pager', { ...options })
    }

    private static asserthThrowsBecausePagerNotFound(id?: string) {
        assert.doesThrow(
            () => this.assertCardRendersPager(id),
            id ? 'id' : 'pager'
        )
    }

    private static addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private static addSectionWithPager() {
        this.addSection({
            pager: this.pagerVc.render(),
        })
    }

    private static assertCardRendersPager(id?: string) {
        return pagerAssert.cardRendersPager(this.vc, id)
    }
}
