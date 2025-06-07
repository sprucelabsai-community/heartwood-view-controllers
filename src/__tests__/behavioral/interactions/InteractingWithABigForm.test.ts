import { assert, generateId, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import buildBigForm from '../../../builders/buildBigForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { BigFormOnSubmitOptions, Card } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import BigFormViewController, {
    BigFormViewControllerOptions,
} from '../../../viewControllers/BigForm.vc'
import {
    testFormOptions,
    TestFormSchema,
    testFormSchema,
    TestFormValues,
} from '../forms/testFormOptions'

class NoFocusViewController extends AbstractViewController<Card> {
    public render(): Card {
        return {}
    }
}

@suite()
export default class InteractingWithABigFormTest extends AbstractViewControllerTest {
    protected bigFormVc!: BigFormViewController<TestFormSchema>
    protected controllerMap: Record<string, any> = {
        noFocus: NoFocusViewController,
    }

    protected async beforeEach() {
        await super.beforeEach()
        this.bigFormVc = this.BigFormVc()
    }

    @test()
    protected async throwsWhenNoOnCancelHandlerSet() {
        const formVc = this.Controller('form', testFormOptions)
        await assert.doesThrowAsync(() => interactor.cancelForm(formVc))
    }

    @test()
    protected async callsCancelHandler() {
        let wasHit = false
        const formVc = this.Controller('form', {
            ...testFormOptions,
            onCancel: () => {
                wasHit = true
            },
        })

        await interactor.cancelForm(formVc)
        assert.isTrue(wasHit)
    }

    @test()
    protected async submitSlideThrowsWhenMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.submitBigFormSlide()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async submittingSlideTriggersCallback() {
        let wasHit = false

        await this.submitSlideOnNewBigForm({
            values: {
                first: generateId(),
                nickname: generateId(),
            },
            onSubmitSlide: () => {
                wasHit = true
            },
        })

        assert.isTrue(wasHit)
    }

    @test()
    protected async passesExpectedParamsToOnSubmitSlide() {
        let passedOptions: BigFormOnSubmitOptions<any> | undefined

        await this.submitSlideOnNewBigForm({
            values: {
                first: generateId(),
                nickname: generateId(),
            },
            onSubmitSlide(options) {
                //@ts-ignore
                passedOptions = options
            },
        })

        //@ts-ignore
        const { options } = this.bigFormVc.buildOnSubmitOptions()
        options.presentSlide = 0

        //@ts-ignore
        delete options.controller
        //@ts-ignore
        delete passedOptions?.controller

        //@ts-ignore
        assert.isEqualDeep(passedOptions, options)
    }

    @test()
    protected async onSubmitSlideWithOnSubmitHandlerDoesNotThrow() {
        await this.submitSlideOnNewBigForm({
            values: {
                first: generateId(),
                nickname: generateId(),
            },
            sections: [{ fields: ['first'] }],
            onSubmit() {},
        })
    }

    @test()
    protected async submitListSlideTriggersOnSubmit() {
        let onSubmitCount = 0
        let onSubmitSlideCount = 0

        await this.submitSlideOnNewBigForm({
            values: {
                first: generateId(),
                nickname: generateId(),
            },
            onSubmit() {
                onSubmitCount++
            },
            onSubmitSlide() {
                onSubmitSlideCount++
            },
        })

        assert.isEqual(onSubmitCount, 0)
        assert.isEqual(onSubmitSlideCount, 1)

        await this.bigFormVc.jumpToSlide(this.bigFormVc.getTotalSlides() - 1)
        await this.submitSlide()

        assert.isEqual(onSubmitCount, 1)
        assert.isEqual(onSubmitSlideCount, 2)

        await this.submitSlide()

        assert.isEqual(onSubmitCount, 2)
        assert.isEqual(onSubmitSlideCount, 3)
    }

    @test()
    protected async submittingOnFirstSlideThrowsIfRequiredFieldsNotCompleted() {
        this.bigFormVc = this.BigFormVc({})
        await assert.doesThrowAsync(() => this.submitSlide())

        await this.bigFormVc.setValue('first', generateId())

        await this.submitSlide()

        assert.isEqual(this.bigFormVc.getPresentSlide(), 1)
    }

    @test()
    protected async focusingFieldWithoutFocusHookThrows() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => interactor.focus())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenVcDoesNotImplementFocusEvents() {
        const vc = this.NoFocusVc()
        await assert.doesThrowAsync(
            () => interactor.focus(vc),
            /willFocus|didFocus/
        )
    }

    @test()
    protected async invokesWillFocus() {
        const vc = this.NoFocusVc()
        let wasHit = false

        vc.willFocus = () => {
            wasHit = true
        }

        await interactor.focus(vc)
        assert.isTrue(wasHit)
    }

    @test()
    protected async invokesDidFocusSecond() {
        const vc = this.NoFocusVc()

        let wasHit = ''

        vc.didFocus = () => {
            wasHit = 'didFocus'
        }

        vc.willFocus = () => {
            wasHit = 'willFocus'
        }

        await interactor.focus(vc)
        assert.isEqual(wasHit, 'didFocus')
    }

    @test()
    protected async doesNotThrowWithOnlyDidFocus() {
        const vc = this.NoFocusVc()
        vc.didFocus = () => {}
        await interactor.focus(vc)
    }

    @test()
    protected async focusingFieldWithoutBlurHookThrows() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => interactor.blur())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenVcDoesNotImplementBlurEvents() {
        const vc = this.NoFocusVc()
        await assert.doesThrowAsync(
            () => interactor.blur(vc),
            /willBlur|didBlur/
        )
    }

    @test()
    protected async invokesWillBlur() {
        const vc = this.NoFocusVc()
        let wasHit = false

        vc.willBlur = () => {
            wasHit = true
        }

        await interactor.blur(vc)
        assert.isTrue(wasHit)
    }

    @test()
    protected async invokesDidBlurSecond() {
        const vc = this.NoFocusVc()

        let wasHit = ''

        vc.didBlur = () => {
            wasHit = 'didBlur'
        }

        vc.willBlur = () => {
            wasHit = 'willBlur'
        }

        await interactor.blur(vc)
        assert.isEqual(wasHit, 'didBlur')
    }

    @test()
    protected async doesNotThrowWithOnlyDidBlur() {
        const vc = this.NoFocusVc()
        vc.didBlur = () => {}
        await interactor.blur(vc)
    }

    @test()
    protected async canStepThroughEntireBigForm() {
        let wasHit = false

        this.bigFormVc = this.BigFormVc({
            onSubmit: () => {
                wasHit = true
            },
            sections: [
                {
                    fields: ['first', 'last'],
                },
                {
                    fields: ['nickname'],
                },
                {
                    fields: ['anotherField'],
                },
            ],
        })

        await this.assertSubmittingThrows()

        await this.setValues({
            first: generateId(),
        })

        await this.submitSlide()

        await this.assertSubmittingThrows()

        await this.setValues({
            nickname: generateId(),
        })

        await this.submitSlide()

        assert.isFalse(wasHit)
        await this.submitSlide()
        assert.isTrue(wasHit)
    }

    private async setValues(values: Partial<TestFormValues>) {
        await this.bigFormVc.setValues(values)
    }

    private async assertSubmittingThrows() {
        await assert.doesThrowAsync(() => this.submitSlide())
    }

    private NoFocusVc() {
        return this.Controller('noFocus' as any, {})
    }

    private async submitSlideOnNewBigForm(
        options?: Partial<BigFormViewControllerOptions<TestFormSchema>>
    ) {
        this.bigFormVc = this.BigFormVc(options)
        await this.submitSlide()
    }

    private async submitSlide() {
        await interactor.submitBigFormSlide(this.bigFormVc)
    }

    protected BigFormVc(
        options?: Partial<BigFormViewControllerOptions<TestFormSchema>>
    ) {
        return this.Controller(
            'big-form',
            buildBigForm({
                schema: testFormSchema,
                sections: [
                    { fields: ['first', 'favoriteNumber'] },
                    { fields: ['last', 'nickname'] },
                ],
                ...options,
            })
        )
    }
}
