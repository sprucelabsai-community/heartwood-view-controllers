import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { FormBuilder } from '../../../types/heartwood.types'
import FormBuilderCardViewController, {
    FormBuilderCardViewControllerOptions,
} from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

@suite()
export default class GettingFormBuilderValuesTest extends AbstractViewControllerTest {
    protected controllerMap: Record<string, any> = {
        'form-builder-card': FormBuilderCardViewController,
    }

    private readonly singlePageForm: FormBuilder = {
        title: 'Building your form',
        pages: [
            {
                title: 'Page 1',
                schema: {
                    id: 'formBuilder1',
                    fields: {
                        field1: {
                            type: 'text',
                            label: 'Field 1',
                        },
                        firstName: {
                            type: 'text',
                            label: 'First name',
                        },
                        lastName: {
                            type: 'text',
                            label: 'Last name',
                        },
                        email: {
                            type: 'text',
                            label: 'Email',
                        },
                    },
                },
                sections: [
                    {
                        title: 'Section 1',
                        shouldRenderAsGrid: false,
                        fields: [
                            {
                                //@ts-ignore
                                name: 'firstName',
                            },
                            {
                                //@ts-ignore
                                name: 'lastName',
                            },
                            {
                                //@ts-ignore
                                name: 'email',
                            },
                        ],
                    },
                ],
            },
        ],
    }

    private readonly multiPageForm: FormBuilder = {
        title: 'Building your form',
        pages: [
            {
                title: 'Page 1',
                schema: {
                    id: 'formBuilder1',
                    fields: {
                        field1: {
                            type: 'text',
                            label: 'Field 1',
                        },
                        firstName: {
                            type: 'text',
                            label: 'First name',
                        },
                        lastName: {
                            type: 'text',
                            label: 'Last name',
                        },
                        email: {
                            type: 'text',
                            label: 'Email',
                        },
                    },
                },
                sections: [
                    {
                        title: 'Section 1',
                        shouldRenderAsGrid: false,
                        fields: [
                            {
                                //@ts-ignore
                                name: 'firstName',
                            },
                            {
                                //@ts-ignore
                                name: 'lastName',
                            },
                            {
                                //@ts-ignore
                                name: 'email',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Page 1',
                schema: {
                    id: 'formBuilder1',
                    fields: {
                        firstName: {
                            type: 'text',
                            label: 'First name',
                        },
                        lastName: {
                            type: 'text',
                            label: 'Last name',
                        },
                        email: {
                            type: 'text',
                            label: 'Email',
                        },
                    },
                },
                sections: [
                    {
                        title: 'Section 1',
                        shouldRenderAsGrid: false,
                        fields: [
                            {
                                //@ts-ignore
                                name: 'firstName',
                            },
                            {
                                //@ts-ignore
                                name: 'lastName',
                            },
                            {
                                //@ts-ignore
                                name: 'email',
                            },
                        ],
                    },
                ],
            },
        ],
    }

    @test()
    protected canCreateGettingFormBuilderValues() {
        const vc = this.Vc()
        assert.isFunction(vc.getValues)
    }

    @test()
    protected getsGoodStartingValues() {
        const values = this.Vc().getValues()
        assert.isEqualDeep(values, [{ field1: undefined }])
    }

    @test()
    protected async firstPageCanHaveMultipleFields() {
        const vc = this.Vc()
        await vc.importObject(this.singlePageForm)

        const expected = {
            firstName: 'hey',
            lastName: 'there!',
            email: 'whatever@whatever.com',
        }

        await vc.getPageVc(0).setValues(expected)

        const values = vc.getValues()

        assert.isEqualDeep(values, [expected])
    }

    @test('cant set bad values {object}', { waka: true })
    protected async cantSetBadValues(expected: any) {
        const vc = this.Vc()
        await vc.importObject(this.singlePageForm)

        const err = await assert.doesThrowAsync(() => vc.setValues(expected))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['values'],
        })
    }

    @test()
    protected async canSetGoodValuesToSinglePageForm() {
        const vc = this.Vc()
        await vc.importObject(this.singlePageForm)

        const expected = [
            { firstName: 'tay', email: undefined, lastName: undefined },
        ]
        await vc.setValues(expected)

        const values = vc.getValues()
        assert.isEqualDeep(values, expected)
    }

    @test()
    protected async canSetGoodValuesToMultiPageForm() {
        const vc = this.Vc()
        await vc.importObject(this.multiPageForm)

        const expected = [{ firstName: 'tay' }, { firstName: 'tayayay' }]
        await vc.setValues(expected)

        const values = vc.getValues()
        assert.isEqualDeep(values, [
            { firstName: 'tay', email: undefined, lastName: undefined },
            { firstName: 'tayayay', email: undefined, lastName: undefined },
        ])
    }

    @test()
    protected async secondPageWorks() {
        const vc = this.Vc()
        await vc.importObject(this.multiPageForm)

        const expected1 = {
            firstName: 'what',
            lastName: 'aoeu!',
            email: 'whataoeuaoever@whatever.com',
        }
        const expected2 = {
            firstName: 'that',
            lastName: 'theaoeuaoeure!',
            email: 'whatever@whaaoeutever.com',
        }

        await vc.getPageVc(0).setValues(expected1)
        await vc.getPageVc(1).setValues(expected2)

        const values = vc.getValues()

        assert.isEqualDeep(values, [expected1, expected2])
    }

    private Vc(options?: FormBuilderCardViewControllerOptions) {
        return this.Controller('form-builder-card', { ...options })
    }
}
