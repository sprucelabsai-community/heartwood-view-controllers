import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import {
    AbstractAppController,
    AbstractSkillViewController,
    ViewControllerOptions,
} from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import CardViewController from '../../viewControllers/card/Card.vc'

class DestroyViewController extends AbstractSkillViewController {
    public cardVc!: CardViewController
    public cardVc2!: CardViewController
    public constructor(options: ViewControllerOptions) {
        super(options)

        this.cardVc = this.Controller('card', { header: { title: 'hey!' } })
        this.cardVc2 = this.Controller('card', {})
    }

    public render() {
        return {
            layouts: [],
        }
    }
}

class NoChildrenViewController extends AbstractSkillViewController {
    public constructor(options: ViewControllerOptions) {
        super(options)
    }

    public render() {
        return {
            layouts: [],
        }
    }
}

class DestroyAppController extends AbstractAppController {
    public static id = 'destroy'
    public cardVc!: CardViewController
    public cardVc2!: CardViewController
    public constructor(options: ViewControllerOptions) {
        super(options)

        this.cardVc = this.Controller('card', { header: { title: 'hey!' } })
        this.cardVc2 = this.Controller('card', {})
    }
}

class NoChildrenAppController extends AbstractAppController {
    public static id = 'noChildren'
    public cardVc!: CardViewController
    public cardVc2!: CardViewController
    public constructor(options: ViewControllerOptions) {
        super(options)

        this.cardVc = this.Controller('card', { header: { title: 'hey!' } })
        this.cardVc2 = this.Controller('card', {})
    }
}

declare module '../../types/heartwood.types' {
    interface ViewControllerMap {
        destroy: DestroyViewController
        noChildren: NoChildrenViewController
    }
}

@suite()
export default class DestroyingVcsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        destroy: DestroyViewController,
        noChildren: NoChildrenViewController,
    }

    protected async beforeEach() {
        await super.beforeEach()
        this.getFactory().setAppController(DestroyAppController)
        this.getFactory().setAppController(NoChildrenAppController)
    }

    @test('view has destroy method', 'Controller')
    @test('app has destroy method', 'App')
    protected async factoryHasDestroy(method: Method) {
        //@ts-ignore
        const vc = this[method]('noChildren' as any, {})

        //@ts-ignore
        assert.isFunction(vc.destroy)

        //@ts-ignore
        await vc.destroy()
    }

    @test('view destroy calls destroy on children', 'Controller')
    @test('app destroy calls destroy on children', 'App')
    protected async destroyCallsDestroyOnChildren(method: Method) {
        //@ts-ignore
        const vc = this[method]('destroy', {})

        //@ts-ignore
        assert.isFalsy(vc.cardVc.wasDestroyed)

        //@ts-ignore
        await vc.destroy()

        //@ts-ignore
        assert.isTrue(vc.cardVc.wasDestroyed)

        //@ts-ignore
        assert.isTrue(vc.cardVc2.wasDestroyed)
    }

    @test('view destroy with no children does not crash', 'Controller')
    @test('app destroy with no children does not crash', 'App')
    protected async destroyWithNoChildren(method: Method) {
        //@ts-ignore
        const vc = this[method]('noChildren', {})
        await vc.destroy()
    }

    @test()
    protected async destroysChildEvenWithoutLocalReference() {
        const vc = this.Vc()
        const card = vc.cardVc

        //@ts-ignore
        card.destroy

        //@ts-ignore
        delete vc.cardVc

        //@ts-ignore
        await vc.destroy()

        //@ts-ignore
        assert.isTrue(card.wasDestroyed)
    }

    @test()
    protected async callingDestroyTwiceThrows() {
        const vc = this.Vc()

        await vc.destroy()

        const err = await assert.doesThrowAsync(() => vc.destroy())

        errorAssert.assertError(err, 'VIEW_ALREADY_DESTROYED')
    }

    @test()
    protected async doesNotDoubleDestroyChildren() {
        const vc = this.Vc()
        await vc.cardVc.destroy()
        await vc.destroy()
    }

    private Vc() {
        return this.Controller('destroy', {})
    }
}

type Method = 'Controller' | 'App'
