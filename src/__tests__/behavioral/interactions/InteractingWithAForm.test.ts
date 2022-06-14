import { assert, test } from '@sprucelabs/test'
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
} from '../forms/testFormOptions'

class NoFocusViewController extends AbstractViewController<Card> {
	public render(): Card {
		return {}
	}
}

export default class InteractingWithAFormTest extends AbstractViewControllerTest {
	protected static bigFormVc: BigFormViewController<TestFormSchema>
	protected static controllerMap: Record<string, any> = {
		noFocus: NoFocusViewController,
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.bigFormVc = this.BigFormVc()
	}

	@test()
	protected static async throwsWhenNoOnCancelHandlerSet() {
		const formVc = this.Controller('form', testFormOptions)
		await assert.doesThrowAsync(() => interactor.cancelForm(formVc))
	}

	@test()
	protected static async callsCancelHandler() {
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
	protected static async submittingBigFormOnNotLastSlideThrows() {
		await assert.doesThrowAsync(
			() => interactor.submitForm(this.bigFormVc),
			'last slide'
		)
	}

	@test()
	protected static async submitSlideThrowsWhenMissing() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			interactor.submitBigFormSlide()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async submitSlideThrowsWithoutOnSubmits() {
		await assert.doesThrowAsync(
			() =>
				//@ts-ignore
				interactor.submitBigFormSlide(this.bigFormVc),
			'onSubmitSlide'
		)
	}

	@test()
	protected static async submittingSlideTriggersCallback() {
		let wasHit = false

		await this.submitSlide({
			onSubmitSlide: () => {
				wasHit = true
			},
		})

		assert.isTrue(wasHit)
	}

	@test()
	protected static async passesExpectedParamsToOnSubmitSlide() {
		let passedOptions: BigFormOnSubmitOptions<any> | undefined

		await this.submitSlide({
			onSubmitSlide(options) {
				passedOptions = options
			},
		})

		//@ts-ignore
		const { options } = this.bigFormVc.buildOnSubmitOptions()
		assert.isEqualDeep(passedOptions, options)
	}

	@test()
	protected static async onSubmitSlideWithOnSubmitHandlerDoesNotThrow() {
		await this.submitSlide({
			sections: [{ fields: ['first'] }],
			onSubmit() {},
		})
	}

	@test()
	protected static async submitListSlideTriggersOnSubmit() {
		let onSubmitCount = 0
		let onSubmitSlideCount = 0

		await this.submitSlide({
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
		await this.submitBigForm()

		assert.isEqual(onSubmitCount, 1)
		assert.isEqual(onSubmitSlideCount, 2)

		await this.submitBigForm()

		assert.isEqual(onSubmitCount, 2)
		assert.isEqual(onSubmitSlideCount, 3)
	}

	@test()
	protected static async focusingFieldWithoutFocusHookThrows() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => interactor.focus())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async throwsWhenVcDoesNotImplementFocusEvents() {
		const vc = this.NoFocusVc()
		await assert.doesThrowAsync(
			() => interactor.focus(vc),
			/willFocus|didFocus/
		)
	}

	@test()
	protected static async invokesWillFocus() {
		const vc = this.NoFocusVc()
		let wasHit = false

		vc.willFocus = () => {
			wasHit = true
		}

		await interactor.focus(vc)
		assert.isTrue(wasHit)
	}

	@test()
	protected static async invokesDidFocusSecond() {
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
	protected static async doesNotThrowWithOnlyDidFocus() {
		const vc = this.NoFocusVc()
		vc.didFocus = () => {}
		await interactor.focus(vc)
	}

	@test()
	protected static async focusingFieldWithoutBlurHookThrows() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => interactor.blur())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async throwsWhenVcDoesNotImplementBlurEvents() {
		const vc = this.NoFocusVc()
		await assert.doesThrowAsync(() => interactor.blur(vc), /willBlur|didBlur/)
	}

	@test()
	protected static async invokesWillBlur() {
		const vc = this.NoFocusVc()
		let wasHit = false

		vc.willBlur = () => {
			wasHit = true
		}

		await interactor.blur(vc)
		assert.isTrue(wasHit)
	}

	@test()
	protected static async invokesDidBlurSecond() {
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
	protected static async doesNotThrowWithOnlyDidBlur() {
		const vc = this.NoFocusVc()
		vc.didBlur = () => {}
		await interactor.blur(vc)
	}

	private static NoFocusVc() {
		return this.Controller('noFocus' as any, {})
	}

	private static async submitSlide(
		options?: Partial<BigFormViewControllerOptions<TestFormSchema>>
	) {
		this.bigFormVc = this.BigFormVc(options)
		await this.submitBigForm()
	}

	private static async submitBigForm() {
		await interactor.submitBigFormSlide(this.bigFormVc)
	}

	protected static BigFormVc(
		options?: Partial<BigFormViewControllerOptions<TestFormSchema>>
	) {
		return this.Controller(
			'bigForm',
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
