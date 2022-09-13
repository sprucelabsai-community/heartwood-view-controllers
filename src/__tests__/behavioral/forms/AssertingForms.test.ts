import { SchemaFieldNames } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { FormViewController, RenderAsComponent } from '../../..'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import { TestFormSchema, testFormSchema } from './testFormOptions'

export default class AssertingFormsTest extends AbstractViewControllerTest {
	protected static vc: FormViewController<TestFormSchema>
	protected static async beforeEach() {
		await super.beforeEach()
		this.setupForm('first', 'checkbox')
	}

	@test()
	protected static failsIfRendersAsMissingRequired() {
		//@ts-ignore
		const err = assert.doesThrow(() => formAssert.formFieldRendersAs())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'fieldName', 'expected'],
		})
	}

	@test()
	protected static throwsWhenFieldNotFound() {
		assert.doesThrow(
			() => formAssert.formFieldRendersAs(this.vc, 'bad', 'textarea'),
			'field'
		)
	}

	@test('throws with missmatch 1', 'first', 'checkbox', 'textarea')
	@test('throws with missmatch 2', 'first', 'textarea', 'checkbox')
	protected static throwsWhenRenderAsMissMatches(
		fieldName: any,
		actual: RenderAsComponent,
		expected: RenderAsComponent
	) {
		this.setupForm(fieldName, actual)

		assert.doesThrow(
			() => formAssert.formFieldRendersAs(this.vc, fieldName, expected),
			'field'
		)
	}

	@test('passes on match 1', 'first', 'checkbox')
	@test('passes on match 2', 'last', 'textarea')
	protected static passesWithMatch(
		fieldName: any,
		expected: RenderAsComponent
	) {
		this.setupForm(fieldName, expected)
		formAssert.formFieldRendersAs(this.vc, fieldName, expected)
	}

	private static setupForm(
		fieldName: SchemaFieldNames<TestFormSchema>,
		renderAs: RenderAsComponent
	) {
		this.vc = this.Controller(
			'form',
			buildForm({
				schema: testFormSchema,
				sections: [
					{
						fields: [{ name: fieldName, renderAs }],
					},
				],
			})
		)
	}
}
