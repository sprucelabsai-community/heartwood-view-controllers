import { DateUtil, dateUtil } from '@sprucelabs/calendar-utils'
import { AddressFieldValue } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { MapUtil } from '../../types/heartwood.types'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

interface ViewModel {}

export class TestViewController extends AbstractViewController<ViewModel> {
    public invocations = []
    public constructorOptions!: any
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
    public constructorOptions!: any
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

@suite()
export default class BuildingViewControllersTest extends AbstractViewControllerTest {
    protected controllerMap = {
        test: TestViewController,
        testSkillView: TestSkillViewController,
    }
    private factory!: ViewControllerFactory
    private vc!: TestViewController

    public async beforeEach() {
        await super.beforeEach()
        this.factory = this.Factory()
        this.vc = this.factory.Controller('test', {})
    }

    @test()
    protected async canCreateBuildingViewControllers() {
        assert.isTruthy(this.factory)
    }

    @test()
    protected async throwsWithoutSettingConnectToApiHandler() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            ViewControllerFactory.Factory()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['connectToApi', 'device'],
        })
    }

    @test()
    protected async throwsWithInvalidName() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.factory.Controller('bad_name'))
        errorAssert.assertError(err, 'INVALID_VIEW_CONTROLLER_NAME')
    }

    @test()
    protected hasController() {
        assert.isTrue(this.factory.hasController('test'))
    }

    @test()
    protected doesNotHaveController() {
        assert.isFalse(this.factory.hasController('test-not-found'))
    }

    @test()
    protected async getsVcFactoryInConstructorOptions() {
        assert.isTruthy(this.vc.constructorOptions.vcFactory)
    }

    @test()
    protected async canGetVcFactory() {
        //@ts-ignore
        assert.isTruthy(this.vc.getVcFactory())
        //@ts-ignore
        assert.isEqual(this.vc.views, this.vc.getVcFactory())
    }

    @test()
    protected builtVcGetsConnectToApiHandler() {
        assert.isTruthy(this.vc.constructorOptions.connectToApi)
    }

    @test()
    protected canMixinControllers() {
        this.factory.mixinControllers({
            test2: TestViewController,
        })

        const vc = this.factory.Controller('test2', {})
        assert.isTruthy(vc)

        const vc2 = this.factory.Controller('test', {})
        assert.isTruthy(vc2)
    }

    @test()
    protected controllersGetIdsSet() {
        //@ts-ignore
        assert.isEqual(this.vc.id, 'test')
    }

    @test()
    protected viewControllerGetTypesed() {
        const vc = this.factory.Controller('test', {})
        assert.isExactType<TestViewController, typeof vc>(true)
    }

    @test()
    protected skillViewControllerGetTyped() {
        const vc = this.factory.Controller('testSkillView', {})
        assert.isExactType<TestSkillViewController, typeof vc>(true)
    }

    @test()
    protected throwsIfViewControllerSetsIdProperty() {
        this.factory.mixinControllers({
            test3: TestViewControllerWithId,
        })

        //@ts-ignore
        const err = assert.doesThrow(() => this.factory.Controller('test3'))

        errorAssert.assertError(err, 'INVALID_SKILL_VIEW_CONTROLLER')
    }

    @test()
    protected controllerFactoryMethod() {
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
    protected canSetVoteHandler() {
        const handler = () => {}

        //@ts-ignore
        this.factory.setVoteHandler(handler)

        const vc = this.factory.Controller('testSkillView', {})

        //@ts-ignore
        assert.isEqual(vc.voteHandler, handler)
    }

    @test('can get vc class 1', 'test', TestViewController)
    @test('can get vc class 2', 'testSkillView', TestSkillViewController)
    protected canGetVcClass(id: any, Class: any) {
        const Actual = this.factory.getController(id)
        assert.isEqual(Actual, Class)
    }

    @test()
    protected async datesIsDateUtil() {
        this.assertDatesInContructorOptions(dateUtil)
        this.assertDatesPropEquals(dateUtil)
    }

    @test()
    protected async canPassDateUtilToFactory() {
        const dates = {} as any
        this.factory = this.Factory({
            dates,
        })

        this.vc = this.factory.Controller('test', {})
        this.assertDatesInContructorOptions(dates)
        this.assertDatesPropEquals(dates)
    }

    @test()
    protected async passesThroughMapsUtil() {
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
    protected async canSetDatesLater() {
        const d = generateId() as any
        this.factory.setDates(d)
        //@ts-ignore
        assert.isEqual(this.factory.dates, d)
    }

    private assertDatesPropEquals(expected: DateUtil) {
        assert.isEqual(this.vc.getDates(), expected)
    }

    private assertDatesInContructorOptions(expected: DateUtil) {
        assert.isEqual(this.vc.constructorOptions.dates, expected)
    }
}
