import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { FormViewController } from '../../../types/heartwood.types'
import { FormViewControllerOptions } from '../../../viewControllers/form/Form.vc'
import {
    testFormOptions,
    TestFormSchema,
    TestFormValues,
} from './testFormOptions'

@suite()
export default class ResettingFormsTest extends AbstractViewControllerTest {
    private formVc!: FormViewController<TestFormSchema>
    protected async beforeEach() {
        await super.beforeEach()
        this.formVc = this.FormVc()
    }

    @test()
    protected async callingSetValuesForSingleFieldSetsOriginalValues() {
        const expected = generateId()
        const values: Partial<TestFormValues> = {
            last: expected,
        }

        await this.setValues(values)
        await this.setValue('last', 'Taylor Romero')
        await this.reset()

        this.assertFormValueEquals('last', expected)
    }

    @test()
    protected async callingSetValueForDifferentFieldSetsOriginalValues() {
        const expected = generateId()
        const values: Partial<TestFormValues> = {
            first: expected,
        }

        await this.setValues(values)
        await this.setValue('first', 'Taylor')
        await this.reset()

        this.assertFormValueEquals('first', expected)
    }

    @test()
    protected async canResetMultipleValues() {
        await this.setValues({
            first: 'Taylor',
            last: 'Romero',
        })

        await this.setValue('first', 'Maison')
        await this.reset()

        this.assertFormValueEquals('first', 'Taylor')
        this.assertFormValueEquals('last', 'Romero')
    }

    @test()
    protected async doesNotSetOriginalValuesIfSuppliedValuesInConstructor() {
        this.formVc = this.FormVc({
            values: {
                first: 'Taylor',
            },
        })

        await this.setValues({
            first: 'Maison',
            last: 'Romero',
        })

        await this.reset()

        this.assertFormValueEquals('first', 'Taylor')
        this.assertFormValueEquals('last', undefined)
    }

    @test()
    protected async resetHandlesNumberFieldsWithZero() {
        this.formVc = this.FormVc({
            values: {
                favoriteNumber: 0,
            },
        })

        await this.setValues({
            first: 'Taylor',
            last: 'Romero',
        })

        await this.reset()

        this.assertFormValueEquals('first', undefined)
        this.assertFormValueEquals('last', undefined)
        this.assertFormValueEquals('favoriteNumber', 0)
    }

    private FormVc(
        options?: Partial<FormViewControllerOptions<TestFormSchema>>
    ) {
        return this.Controller('form', {
            ...testFormOptions,
            ...options,
        }) as FormViewController<TestFormSchema>
    }

    private assertFormValueEquals(
        field: keyof TestFormValues,
        expected?: string | number | boolean | undefined
    ) {
        const actual = this.getValue(field)
        assert.isEqual(actual, expected, `${field} should be reset`)
    }

    private getValue(key: keyof TestFormValues) {
        return this.formVc.getValue(key)
    }

    private async reset() {
        await this.formVc.reset()
    }

    private async setValue(field: keyof TestFormValues, value: string) {
        await this.formVc.setValue(field, value)
    }

    private async setValues(values: Partial<TestFormValues>) {
        await this.formVc.setValues(values)
    }
}
