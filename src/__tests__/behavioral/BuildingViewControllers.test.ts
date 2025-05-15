import { DateUtil, dateUtil } from '@sprucelabs/calendar-utils'
import { AddressFieldValue } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { MapUtil } from '../../types/heartwood.types'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

interface ViewModel {}

export class TestViewController extends AbstractViewController<ViewModel> {
    public invocations = []
    public constructorOptions: any
    public constructor(options: any) {
        super(options)
        this.constructorOptions = options
    }

    public getDates() {
        return this.dates
    }
    public getMaps() {
        return this.maps
    }
    public render() {
        return {}
    }
}

export class TestViewControllerWithId extends AbstractViewController<ViewModel> {
    public id = 'throws'
    public invocations = []
    public constructorOptions: any
    public constructor(options: any) {
        super(options)
        this.constructorOptions = options
    }
    public render() {
        return {}
    }
}

export class TestSkillViewController extends AbstractSkillViewController {
    public render() {
        return {
            layouts: [],
        }
    }
}

declare module '../../types/heartwood.types' {
    interface ViewControllerMap {
        test: TestViewController
        test2: TestViewControllerWithId
        testSkillView: TestSkillViewController
    }
}

export default class BuildingViewControllersTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        test: TestViewController,
        testSkillView: TestSkillViewController,
    }
    private static factory: ViewControllerFactory
    private static vc: TestViewController

    public static async beforeEach() {
        await super.beforeEach()
        this.factory = this.Factory()
        this.vc = this.factory.Controller('test', {})
    }

    @test()
    protected static async canCreateBuildingViewControllers() {
        assert.isTruthy(this.factory)
    }

    @test()
    protected static async throwsWithoutSettingConnectToApiHandler() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            ViewControllerFactory.Factory()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['connectToApi', 'device'],
        })
    }

    @test()
    protected static async throwsWithInvalidName() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.factory.Controller('bad_name'))
        errorAssert.assertError(err, 'INVALID_VIEW_CONTROLLER_NAME')
    }

    @test()
    protected static hasController() {
        assert.isTrue(this.factory.hasController('test'))
    }

    @test()
    protected static doesNotHaveController() {
        assert.isFalse(this.factory.hasController('test-not-found'))
    }

    @test()
    protected static async getsVcFactoryInConstructorOptions() {
        assert.isTruthy(this.vc.constructorOptions.vcFactory)
    }

    @test()
    protected static async canGetVcFactory() {
        //@ts-ignore
        assert.isTruthy(this.vc.getVcFactory())
        //@ts-ignore
        assert.isEqual(this.vc.views, this.vc.getVcFactory())
    }

    @test()
    protected static builtVcGetsConnectToApiHandler() {
        assert.isTruthy(this.vc.constructorOptions.connectToApi)
    }

    @test()
    protected static canMixinControllers() {
        this.factory.mixinControllers({
            test2: TestViewController,
        })

        const vc = this.factory.Controller('test2', {})
        assert.isTruthy(vc)

        const vc2 = this.factory.Controller('test', {})
        assert.isTruthy(vc2)
    }

    @test()
    protected static controllersGetIdsSet() {
        //@ts-ignore
        assert.isEqual(this.vc.id, 'test')
    }

    @test()
    protected static viewControllerGetTypesed() {
        const vc = this.factory.Controller('test', {})
        assert.isExactType<TestViewController, typeof vc>(true)
    }

    @test()
    protected static skillViewControllerGetTyped() {
        const vc = this.factory.Controller('testSkillView', {})
        assert.isExactType<TestSkillViewController, typeof vc>(true)
    }

    @test()
    protected static throwsIfViewControllerSetsIdProperty() {
        this.factory.mixinControllers({
            test3: TestViewControllerWithId,
        })

        //@ts-ignore
        const err = assert.doesThrow(() => this.factory.Controller('test3'))

        errorAssert.assertError(err, 'INVALID_SKILL_VIEW_CONTROLLER')
    }

    @test()
    protected static controllerFactoryMethod() {
        const vc = this.Controller('testSkillView', {})
        let wasHit = false

        //@ts-ignore
        vc.views.Controller = () => {
            wasHit = true
        }

        vc.Controller('card', {})

        assert.isTrue(wasHit)
    }

    @test()
    protected static canSetVoteHandler() {
        const handler = () => {}

        //@ts-ignore
        this.factory.setVoteHandler(handler)

        const vc = this.factory.Controller('testSkillView', {})

        //@ts-ignore
        assert.isEqual(vc.voteHandler, handler)
    }

    @test('can get vc class 1', 'test', TestViewController)
    @test('can get vc class 2', 'testSkillView', TestSkillViewController)
    protected static canGetVcClass(id: any, Class: any) {
        const Actual = this.factory.getController(id)
        assert.isEqual(Actual, Class)
    }

    @test()
    protected static async datesIsDateUtil() {
        this.assertDatesInContructorOptions(dateUtil)
        this.assertDatesPropEquals(dateUtil)
    }

    @test()
    protected static async canPassDateUtilToFactory() {
        const dates = {} as any
        this.factory = this.Factory({
            dates,
        })

        this.vc = this.factory.Controller('test', {})
        this.assertDatesInContructorOptions(dates)
        this.assertDatesPropEquals(dates)
    }

    @test()
    protected static async passesThroughMapsUtil() {
        const maps: MapUtil = {
            openNavigation(_options: { to: AddressFieldValue }): void {},
        }

        this.factory = this.Factory({
            maps,
        })

        const vc = this.factory.Controller('test', {})

        assert.isEqual(vc.getMaps(), maps)
    }

    @test()
    protected static async canSetDatesLater() {
        const d = generateId() as any
        this.factory.setDates(d)
        //@ts-ignore
        assert.isEqual(this.factory.dates, d)
    }

    private static assertDatesPropEquals(expected: DateUtil) {
        assert.isEqual(this.vc.getDates(), expected)
    }

    private static assertDatesInContructorOptions(expected: DateUtil) {
        assert.isEqual(this.vc.constructorOptions.dates, expected)
    }
}
