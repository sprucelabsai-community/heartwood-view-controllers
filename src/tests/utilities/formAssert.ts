import {
    assertOptions,
    buildSchema,
    FieldDefinitions,
} from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import buildForm from '../../builders/buildForm'
import {
    BigFormViewController,
    Card,
    Form,
    FormBuilderCardViewController,
    FormInputViewController,
    FormViewController,
    InputButton,
    RenderAsInputComponent,
    SkillViewController,
    ViewController,
} from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewControllerImpl from '../../viewControllers/form/Form.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'
import { pluckAllFromView } from './assertSupport'
import { getViewId, pullCardsFromSkillView } from './vcAssert'

const formAssert = {
    views: {} as SimpleFactory,
    _setVcFactory(views: SimpleFactory) {
        this.views = views
    },

    async inputVcIsValid(inputVc: FormInputViewController) {
        assert.isFunction(
            inputVc.getValue,
            `You gotta create a 'getValue()' method on your input! Or consider having your vc extend AbstractFormInputViewController and be done! 💪`
        )

        assert.isFunction(
            inputVc.setValue,
            `You gotta create a 'setValue()' method on your input!`
        )

        assert.isFunction(
            inputVc.setHandlers,
            `You need to create a 'setHandlers(...)' method that conforms to FormInputViewController. Consider extending AbstractFormInputViewController to skip all this.`
        )

        const formVc = BuildFormVc(this.views, inputVc)
        let value = generateId()

        await inputVc.setValue(value)

        assert.isEqual(
            formVc.getValue('field'),
            value,
            `You need to make sure 'setValue()' returns 'this.setValueHandler()' from your input.`
        )

        value = generateId()

        await formVc.setValue('field', value)

        assert.isEqual(
            inputVc.getValue(),
            value,
            `You need to make sure 'getValue()' returns 'this.getValueHandler()' from your input.`
        )

        assert.isFunction(
            inputVc.getRenderedValue,
            `You need to implement 'getRenderedValue(...)' on your input!`
        )

        assert.isFunction(
            inputVc.setRenderedValue,
            `You need to implement 'setRenderedValue(...)' on your input!`
        )
    },

    formRendersSection(formVc: FormVc, sectionId: string) {
        const model = renderUtil.render(formVc)
        const match = model.sections.find((s) => s.id === sectionId)
        assert.isTruthy(
            match,
            `I could not find section '${sectionId}' in your form!`
        )
    },

    formDoesNotRendersSection(formVc: FormVc, sectionId: string) {
        try {
            this.formRendersSection(formVc, sectionId)
        } catch {
            return
        }

        assert.fail(
            `I found section '${sectionId}' in your form and did not expect to!`
        )
    },

    formRendersField(
        formVc: FormVc,
        fieldName: string,
        fieldDefinition?: Partial<FieldDefinitions>
    ) {
        const model = renderUtil.render(formVc)
        const schema = formVc.getSchema()

        for (const section of model.sections) {
            const fields = normalizeFormSectionFieldNamesUtil.toObjects(
                section.fields,
                schema
            )
            const match = fields.find((n) => n.renderOptions.name === fieldName)

            if (match) {
                if (fieldDefinition) {
                    assert.doesInclude(match, fieldDefinition)
                }

                return
            }
        }

        assert.fail(
            `Form does not render field named '${fieldName}'. Make sure it's in your form's schema and set in 'form.sections.fields'.`
        )
    },

    formDoesNotRenderField(formVc: FormVc, fieldName: string) {
        try {
            this.formRendersField(formVc, fieldName)
        } catch {
            return
        }

        assert.fail(`Form should not be rendering '${fieldName}', but it is.`)
    },

    formRendersFields(formVc: FormVc, fields: string[]) {
        for (const field of fields) {
            this.formRendersField(formVc, field)
        }
    },

    formIsDisabled(vc: FormVc) {
        assert.isFalse(
            vc.getIsEnabled(),
            'Your form is enabled and it should not be! Try this.formVc.disable()'
        )
    },

    formIsEnabled(vc: FormVc) {
        assert.isTrue(
            vc.getIsEnabled(),
            'Your form is not yet enabled! Try this.formVc.enable()'
        )
    },

    formIsBusy(vc: FormVc) {
        assert.isTrue(
            vc.getIsBusy(),
            'Your form is not busy and should be! Try this.formVc.setIsBusy(true).'
        )
    },

    formIsNotBusy(vc: FormVc) {
        assert.isFalse(
            vc.getIsBusy(),
            'Your form is still busy. Try this.formVc.setIsBusy(false) to stop it!'
        )
    },

    cardRendersForm(
        vc: ViewController<Card> | DialogViewController,
        id?: string
    ) {
        const model = renderUtil.render(vc)

        const bigForms = pluckAllFromView(model, 'bigForm')
        const forms =
            bigForms.length > 0 ? bigForms : pluckAllFromView(model, 'form')

        let form: Form | undefined | null
        for (const match of forms) {
            assert.isTrue(
                match!.controller instanceof FormViewControllerImpl,
                "Expected to find a form inside your CardViewController, but didn't find one!"
            )

            if (!id) {
                form = match
            } else if (id && renderUtil.render(match!.controller!).id === id) {
                form = match
            }
        }

        assert.isTruthy(
            form,
            `Could not find a form${id ? ` with the id of ${id}` : ''}!`
        )

        return form!.controller as
            | FormViewController<any>
            | BigFormViewController<any>
    },

    cardRendersForms(vc: ViewController<Card>, count: number) {
        const model = renderUtil.render(vc)
        const forms =
            model.body?.sections
                ?.map((s) => s.form?.controller ?? s.bigForm?.controller)
                .filter((s) => !!s) ?? []

        if (forms.length !== count) {
            assert.fail(
                `Expected your card to render ${count} form${
                    count === 1 ? '' : 's'
                }, but I found ${forms.length === 0 ? 'none' : forms.length}!`
            )
        }

        return forms as FormViewController<any>[] | BigFormViewController<any>[]
    },

    cardDoesNotRenderForm(vc: ViewController<Card>, id: string) {
        try {
            this.cardRendersForm(vc, id)
        } catch {
            return
        }

        assert.fail(
            `I found a form with the id of ${id} and did not expect to!`
        )
    },

    formFieldRendersUsingInputVc(
        vc: FormVc,
        fieldName: string,
        inputVc: FormInputViewController
    ) {
        try {
            vc.getField(fieldName)
        } catch {
            assert.fail(
                `I could not find a field called '${fieldName}' on your form!`
            )
        }

        const match = vc.getFieldVc(fieldName)

        assert.isEqual(
            match,
            inputVc,
            `Your field did not render using the input vc you passed. Make sure you are setting the vc when creating your form vc!
		
		
		
this.Controller(
	'form',
	buildForm({
		schema: formSchema,
		sections: [
			{
				fields: [
					{
						name: 'firstName',
						vc: this.myInputVc, <----- drop it in here
					},
				],
			},
		],
	})
)`
        )
    },

    fieldRendersUsingInstanceOf(
        vc: FormVc,
        fieldName: string,
        Class: new (options: any) => FormInputViewController
    ) {
        try {
            vc.getField(fieldName)
        } catch {
            assert.fail(
                `I could not find a field called '${fieldName}' on your form!`
            )
        }

        const match = vc.getFieldVc(fieldName)

        assert.isTrue(
            match instanceof Class,
            `Your field did not render using the input vc you passed. Make sure you are setting the vc when creating your form vc!
		
		
		
this.Controller(
	'form',
	buildForm({
		schema: formSchema,
		sections: [
			{
				fields: [
					{
						name: 'firstName',
						vc: this.myInputVc, <----- drop it in here
					},
				],
			},
		],
	})
)`
        )
    },

    skillViewRendersFormBuilder(
        vc: SkillViewController,
        id?: string
    ): FormBuilderCardViewController {
        const cards = pullCardsFromSkillView(vc, this.views)

        for (const vc of cards) {
            //@ts-ignore
            if (vc && vc.__isFormBuilder && (!id || getViewId(vc) === id)) {
                return vc as any
            }
        }

        assert.fail(
            `Could not find a form builder${
                id ? ` with the id ${id}` : ''
            } in your skill view!`
        )

        return {} as any
    },

    formFieldRendersAs(
        vc: FormVc,
        fieldName: string,
        expected: RenderAsInputComponent
    ) {
        assertOptions({ vc, fieldName, expected }, [
            'vc',
            'fieldName',
            'expected',
        ])

        const field = vc.getField(fieldName)
        const { renderOptions } = field

        assert.isEqual(
            renderOptions.renderAs,
            expected,
            `The field named '${fieldName}' is rendering as ${
                renderOptions.renderAs
                    ? `'${JSON.stringify(renderOptions.renderAs)}'`
                    : "it's default type"
            }, but I expected it to render as '${expected}' Try setting 'renderAs' in 'sections.fields[].renderAs'!`
        )
    },

    fieldRendersInputButton(vc: FormVc, fieldName: string, id?: string) {
        const { renderOptions } = vc.getField(fieldName)

        const inputButtons =
            (renderOptions.rightButtons as InputButton[]) || undefined
        assert.isAbove(
            inputButtons?.length ?? 0,
            0,
            `The field named '${fieldName}' is not rendering a right button! Try setting "rightButtons" in the field of your form!`
        )

        const match = inputButtons.find((b) => b.id === id)
        assert.isTruthy(
            match,
            `I could not find an input button with the id "${id}"!`
        )

        return match
    },
}

function BuildFormVc(
    views: SimpleFactory,
    inputVc: FormInputViewController
): FormViewController<FormSchema> {
    return views.Controller(
        'form',
        buildForm({
            schema: formSchema,
            sections: [
                {
                    fields: [
                        {
                            name: 'field',
                            vc: inputVc,
                        },
                    ],
                },
            ],
        })
    )
}

type FormAssert = Omit<typeof formAssert, 'views'>

export default formAssert as FormAssert

const formSchema = buildSchema({
    id: 'formAssertTest',
    fields: {
        field: {
            type: 'text',
        },
    },
})

type FormSchema = typeof formSchema

type SimpleFactory = Pick<ViewControllerFactory, 'Controller'>
export type FormVc = FormViewController<any> | BigFormViewController<any>
