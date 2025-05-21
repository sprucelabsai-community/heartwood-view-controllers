import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { RatingsInputComponentIcon } from '../../../types/heartwood.types'
import RatingsViewController, {
    RatingsViewControllerOptions,
} from '../../../viewControllers/Ratings.vc'

@suite()
export default class ControllingARatingsViewTest extends AbstractViewControllerTest {
    private vc!: RatingsViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected canRenderWithoutOptions() {
        this.render(this.vc)
    }

    @test('1.1 out of range', 1.1)
    @test('-1 out of range', -1)
    protected throwsIfValueOutOfRange(value: number) {
        const err = assert.doesThrow(() => this.Vc({ value }))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['value'],
        })

        const err2 = assert.doesThrow(() => this.vc.setValue(value))
        errorAssert.assertError(err2, 'INVALID_PARAMETERS', {
            parameters: ['value'],
        })
    }

    @test('0.3 is in range', 0.3)
    @test('0.2 is in range', 0.2)
    @test('0.2 is in range', 0.99)
    @test('0 is in range', 0)
    protected acceptsValueInRange(value: number) {
        this.vc = this.Vc({ value })
        this.assertRendersValue(value)
    }

    @test('set value to 0.3', 0.3)
    @test('set value to 0.2', 0.2)
    protected canSetValueLater(value: number) {
        this.vc.setValue(value)
        assert.isEqual(this.vc.getValue(), value)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.assertRendersValue(value)
    }

    @test('on change with 0.5', 0.5)
    @test('on change with 0.15', 0.15)
    protected triggersOnChangeWhenValueBeingChanged(value: number) {
        let wasHit = false
        let passedValue: number | undefined
        this.vc = this.Vc({
            onChange: (value) => {
                wasHit = true
                passedValue = value
            },
        })

        assert.isFalse(wasHit)

        this.vc.setValue(value)

        assert.isTrue(wasHit)
        assert.isEqual(passedValue, value)
    }

    @test()
    protected throwsWithBadRendersAs() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.Vc({ icon: 'aoeu' }))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['icon'],
        })
    }

    @test()
    protected canSetToValidIcon() {
        assert.isEqual(this.Vc().getIcon(), undefined)
        let vc = this.Vc({ icon: 'star' })
        assert.isEqual(vc.getIcon(), 'star')
        assert.isEqual(this.render(this.Vc({ icon: 'radio' })).icon, 'radio')
    }

    @test()
    protected throwsWhenSettingRenderAsToInvalidValueLater() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.Vc().setIcon('aoeu'))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['icon'],
        })
    }

    @test('can set to radio later', 'radio')
    @test('can set to star later', 'star')
    protected canSetValidRenderAsLater(icon: RatingsInputComponentIcon) {
        this.vc.setIcon(icon)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        assert.isEqual(this.render(this.vc).icon, icon)
    }

    @test()
    protected canControlEditableStatus() {
        assert.isFalse(this.vc.getCanBeChanged())
        assert.isFalse(this.render(this.vc).canBeChanged)

        this.vc.setCanBeChanged(true)
        assert.isTrue(this.render(this.vc).canBeChanged)
        assert.isTrue(this.vc.getCanBeChanged())

        this.vc.setCanBeChanged(false)
        assert.isFalse(this.vc.getCanBeChanged())
        assert.isFalse(this.render(this.vc).canBeChanged)
    }

    @test()
    protected canPassAndRenderEditableStatus() {
        this.vc = this.Vc({
            canBeChanged: true,
        })

        assert.isTrue(this.vc.getCanBeChanged())
    }

    private Vc(options?: RatingsViewControllerOptions): RatingsViewController {
        return this.Controller('ratings', { ...options })
    }

    private assertRendersValue(value: number) {
        const model = this.render(this.vc)
        assert.isEqual(model.value, value)
    }
}
