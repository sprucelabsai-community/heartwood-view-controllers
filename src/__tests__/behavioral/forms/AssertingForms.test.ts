import { SchemaFieldNames } from '@sprucelabs/schema'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import {
    FormSection,
    RenderAsInputComponentType,
} from '../../../types/heartwood.types'
import FormViewController from '../../../viewControllers/form/Form.vc'
import { TestFormSchema, testFormSchema } from './testFormOptions'

export default class AssertingFormsTest extends AbstractViewControllerTest {
    protected static vc: FormViewController<TestFormSchema>
    protected static async beforeEach() {
        await super.beforeEach()
        this.setupFormWithField('first', 'checkbox')
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
        actual: RenderAsInputComponentType,
        expected: RenderAsInputComponentType
    ) {
        this.setupFormWithField(fieldName, actual)

        assert.doesThrow(
            () => formAssert.formFieldRendersAs(this.vc, fieldName, expected),
            'field'
        )
    }

    @test('passes on match 1', 'first', 'checkbox')
    @test('passes on match 2', 'last', 'textarea')
    protected static passesWithMatch(
        fieldName: any,
        expected: RenderAsInputComponentType
    ) {
        this.setupFormWithField(fieldName, expected)
        formAssert.formFieldRendersAs(this.vc, fieldName, expected)
    }

    @test()
    protected static throwsIfDoesNotRenderSection() {
        const sectionId = 'test'
        this.setFirstSectionId(generateId())
        assert.doesThrow(
            () => this.assertRendersSection(sectionId),
            'not find section'
        )

        formAssert.formDoesNotRendersSection(this.vc, sectionId)
    }

    @test()
    protected static canFindInFirstSection() {
        this.setFirstSectionId('test')
        this.assertRendersSection('test')
        assert.doesThrow(() =>
            formAssert.formDoesNotRendersSection(this.vc, 'test')
        )
        const id = generateId()
        this.setFirstSectionId(id)
        this.assertRendersSection(id)
    }

    @test()
    protected static canFindSectionIfNotFirst() {
        this.setSections([
            {
                id: 'aoeu',
            },
            {
                id: 'testing',
            },
        ])

        this.assertRendersSection('testing')
    }

    @test()
    protected static async canFindFormByNameInCard() {
        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: this.Vc([], 'test1').render(),
                    },
                    {
                        form: this.Vc([], 'test2').render(),
                    },
                ],
            },
        })
        assert.doesThrow(() => formAssert.cardRendersForm(vc, 'test3'))
        formAssert.cardDoesNotRenderForm(vc, 'test3')

        formAssert.cardRendersForm(vc, 'test1')
        assert.doesThrow(() => formAssert.cardDoesNotRenderForm(vc, 'test1'))

        assert.doesThrow(() => formAssert.cardRendersForm(vc, generateId()))
        formAssert.cardDoesNotRenderForm(vc, generateId())

        formAssert.cardRendersForm(vc, 'test2')
        assert.doesThrow(() => formAssert.cardDoesNotRenderForm(vc, 'test2'))
    }

    @test()
    protected static async formIsNotBuysByDefault() {
        const vc = this.Vc([], 'test1')
        formAssert.formIsNotBusy(vc)
    }

    @test()
    protected static async canFindFormInHeader() {
        const id = generateId()
        const vc = this.Controller('card', {
            header: {
                form: this.Vc([], id).render(),
            },
        })

        formAssert.cardRendersForm(vc)
        assert.doesThrow(() => formAssert.cardRendersForm(vc, generateId()))
        formAssert.cardRendersForm(vc, id)
    }

    private static assertRendersSection(sectionId: string): any {
        return formAssert.formRendersSection(this.vc, sectionId)
    }

    private static setFirstSectionId(sectionId: string) {
        this.setSections([
            {
                id: sectionId,
            },
        ])
    }

    private static setupFormWithField(
        fieldName: SchemaFieldNames<TestFormSchema>,
        renderAs: RenderAsInputComponentType
    ) {
        this.setSections([
            {
                fields: [{ name: fieldName, renderAs }],
            },
        ])
    }

    private static setSections(sections: FormSection<TestFormSchema>[]) {
        this.vc = this.Vc(sections)
    }

    private static Vc(sections: FormSection<TestFormSchema>[], id?: string) {
        return this.Controller(
            'form',
            buildForm({
                id,
                schema: testFormSchema,
                sections,
            })
        )
    }
}
