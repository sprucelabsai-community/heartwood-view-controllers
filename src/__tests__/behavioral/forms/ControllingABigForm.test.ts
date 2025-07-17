import { buildSchema } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import buildBigForm from '../../../builders/buildBigForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../../tests/constants'
import vcAssert from '../../../tests/utilities/vcAssert'
import BigFormViewController from '../../../viewControllers/BigForm.vc'

const testFormSchema = buildSchema({
    id: 'bigFormTest',
    fields: {
        phone: {
            type: 'phone',
            isRequired: true,
        },
        pin: {
            type: 'number',
            isRequired: true,
        },
        optional: {
            type: 'text',
        },
    },
})

type TestFormSchema = typeof testFormSchema

@suite()
export default class ControllingABigFormTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: BigFormViewController<TestFormSchema>

    protected async beforeEach() {
        await super.beforeEach()

        this.vc = this.Controller(
            'big-form',
            buildBigForm({
                schema: testFormSchema,
                sections: [
                    {
                        fields: ['phone'],
                    },
                    {
                        fields: ['pin'],
                    },
                    {
                        fields: ['optional'],
                    },
                ],
            })
        ) as any
    }

    @test()
    protected async canGetVc() {
        assert.isTruthy(this.vc)
    }

    @test()
    protected requiredFieldMissingInvalid() {
        const isValid = this.vc.isSlideValid(0)
        assert.isFalse(isValid)
    }

    @test()
    protected async failsWithInvalidPhoneNumber() {
        await this.vc.setValue('phone', '12341234')
        const isValid = this.vc.isSlideValid(0)
        assert.isFalse(isValid)
    }

    @test()
    protected async passesWithValidNumber() {
        await this.vc.setValue('phone', DEMO_NUMBER)

        const isValid = this.vc.isSlideValid(0)
        assert.isTrue(isValid)

        assert.isFalse(this.vc.isSlideValid(1))
    }

    @test()
    protected startsAtFirstSlide() {
        assert.isEqual(this.vc.getPresentSlide(), 0)
    }

    @test()
    protected async canSetCurrentSlide() {
        await this.vc.jumpToSlide(1)
        assert.isEqual(this.vc.getPresentSlide(), 1)
    }

    @test()
    protected async settingNegativeSlideGoesToZero() {
        await this.vc.jumpToSlide(-1)
        assert.isEqual(this.vc.getPresentSlide(), 0)
    }

    @test()
    protected async settingTooHighOfSlideSetsToLast() {
        await this.vc.jumpToSlide(9999)
        assert.isEqual(this.vc.getPresentSlide(), 2)
    }

    @test()
    protected async settingCurrentSlideReplaysThatSlidesTalkingSprucebot() {
        let wasHit = false
        let whatWasHit = -1

        this.vc.replaySlideHeading = (idx) => {
            wasHit = true
            whatWasHit = idx
        }

        await this.vc.jumpToSlide(2)

        assert.isTrue(wasHit)
        assert.isEqual(whatWasHit, 2)
    }

    @test()
    protected async submittingLastSlideInvokesOnSubmitCallback() {
        let onSubmitSlideCount = 0
        let onSubmitCount = 0
        let onSubmitSlideOptions: any | undefined
        let onSubmitOptions: any | undefined

        this.vc.setOnSubmitSlide((options) => {
            onSubmitSlideCount++
            onSubmitSlideOptions = options
        })

        this.vc.setOnSubmit((options) => {
            onSubmitCount++
            onSubmitOptions = options
        })

        await this.vc.setValues({
            optional: 'yay',
            phone: '555-555-5555',
            pin: 123,
        })

        await this.vc.submit()

        assert.isEqual(onSubmitSlideCount, 1)
        assert.isEqual(onSubmitCount, 0)

        await this.vc.submit()

        assert.isEqual(onSubmitSlideCount, 2)
        assert.isEqual(onSubmitCount, 0)

        await this.vc.submit()

        assert.isEqual(onSubmitSlideCount, 3)
        assert.isEqual(onSubmitCount, 1)

        assert.isEqual(onSubmitSlideOptions, onSubmitOptions)
    }

    @test()
    protected async canCancelSubmitByReturningFalseFromSubmitSlide() {
        this.vc.setOnSubmitSlide(() => {
            if (this.vc.getIsLastSlide()) {
                return false
            }

            return
        })

        let wasHit = false
        this.vc.setOnSubmit(() => {
            wasHit = true
        })

        await this.vc.setValues({
            optional: 'yay',
            phone: '555-555-5555',
            pin: 123,
        })

        await this.submit()
        await this.submit()
        await this.submit()

        assert.isFalse(wasHit)
    }

    @test()
    protected async passesErrorsToForm() {
        await this.submit()
        const errors = this.vc.getErrorsByField()
        assert.isEqual(errors.phone?.[0].code, 'MISSING_PARAMETER')
        assert.isEqual(errors.pin?.[0].code, 'MISSING_PARAMETER')
    }

    @test()
    protected async doesNotReturnErrorIfFieldIsFilledOut() {
        await this.vc.setValue('phone', DEMO_NUMBER)
        await this.submit()

        const errors = this.vc.getErrorsByField()
        assert.isEqual(errors.pin, undefined)
    }

    @test()
    protected async triggersRenderEvenOnInvalidSubmit() {
        await this.submit()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test('can set shouldRenderFirstFieldsLabel to false', false)
    @test('can set shouldRenderFirstFieldsLabel to true', true)
    protected async canSetShouldRenderFirstFieldsLabel(expected: boolean) {
        this.setShouldRenderFirstFieldsLabel(expected)
        const model = this.renderForm()
        assert.isEqual(
            model.shouldRenderFirstFieldsLabel,
            expected,
            'Did not set shouldRenderFirstFieldsLabel properly'
        )
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test('can set shouldRenderSlideTitles to true', true)
    @test('can set shouldRenderSlideTitles to false', false)
    protected async canSetShouldRenderSlideTitle(expected: boolean) {
        this.vc.setShouldRenderSlideTitles(expected)
        const model = this.renderForm()
        assert.isEqual(
            model.shouldRenderSlideTitles,
            expected,
            'Did not set shouldRenderSlideTitles properly'
        )
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private renderForm() {
        return this.render(this.vc)
    }

    private setShouldRenderFirstFieldsLabel(should: boolean) {
        this.vc.setShouldRenderFirstFieldsLabel(should)
    }

    private async submit() {
        await this.vc.submit()
    }
}
