import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { CountdownTimer } from '../../../types/heartwood.types'
import CountdownTimerViewController, {
    CountdownTimerViewControllerOptions,
} from '../../../viewControllers/countdownTimer/CountdownTimer.vc'

@suite()
export default class ControllingCountdownTimersTest extends AbstractViewControllerTest {
    private vc!: CountdownTimerViewController
    private model!: CountdownTimer
    protected async beforeEach() {
        await super.beforeEach()
        this.reload()
    }

    @test()
    protected async rendersSetStartHandler() {
        assert.isFunction(this.model.setStartHandler)
    }

    @test()
    protected async rendersItselfAsController() {
        assert.isEqual(this.model.controller, this.vc)
    }

    @test('passes expected end 1', 1)
    @test('passes expected end 2', 2)
    protected async clickingStartOnTimerCallsHandler(toMs: number) {
        let wasHit = false
        let passedToMs: number | undefined

        this.model.setStartHandler((toMs) => {
            passedToMs = toMs
            wasHit = true
        })

        this.vc.start(toMs)

        assert.isTrue(wasHit)
        assert.isEqual(passedToMs, toMs)

        assert.isEqual(this.render(this.vc).endDateMs, toMs)
    }

    @test()
    protected async onCompleteIsPassedThrough() {
        const onComplete = () => {}

        this.reload({
            onComplete,
        })

        assert.isEqual(this.model.onComplete, onComplete)
    }

    @test(`passes end date ms through options to rendered model 1`, 0)
    @test(`passes end date ms through options to rendered model 2`, 1)
    @test(`passes end date ms through options to rendered model 3`, 2)
    protected async passesEndDateMsThroughOptionsToRenderedModel(
        endDateMs: number
    ) {
        this.reload({ endDateMs })
        assert.isEqual(this.model.endDateMs, endDateMs)
    }

    @test()
    protected async setStopHandlerIsAFunction() {
        assert.isFunction(this.model.setStopHandler)
    }

    @test()
    protected async callingStopCallsStopHandler() {
        let wasHit = false

        this.model.setStopHandler(() => {
            wasHit = true
        })

        this.vc.stop()

        assert.isTrue(wasHit)
    }

    @test()
    protected async returnsNullEndDateMsIfStopped() {
        this.vc.start(Date.now() + 1000)
        this.vc.stop()
        const model = this.render(this.vc)
        assert.isNull(model.endDateMs)
    }

    private reload(options?: Partial<CountdownTimerViewControllerOptions>) {
        this.vc = this.Controller('countdown-timer', { ...options })
        this.model = this.render(this.vc)
    }
}
