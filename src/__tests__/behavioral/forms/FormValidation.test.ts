import { buildSchema } from '@sprucelabs/schema'
import { test, suite } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import FormViewController from '../../../viewControllers/form/Form.vc'

@suite()
export default class FormValidationTest extends AbstractViewControllerTest {
    @test()
    protected async notSettingRequiredFieldInNestedSchemaDoesNotThrow() {
        const formVc: FormViewController<NestedFieldTestSchema> =
            this.Controller(
                'form',
                buildForm({
                    id: 'nestedFields',
                    sections: [
                        {
                            fields: ['name', 'favoritePeople'],
                        },
                    ],
                    schema: nestedFieldTestSchema,
                })
            )

        await formVc.setValues({
            name: 'test',
            //@ts-ignore
            favoritePeople: [
                {
                    relationship: 'friend',
                },
            ],
        })
    }
}

type NestedFieldTestSchema = typeof nestedFieldTestSchema

const nestedFieldTestSchema = buildSchema({
    id: 'nestedFields',
    fields: {
        name: {
            type: 'text',
            label: 'Name',
            isRequired: true,
        },
        favoritePeople: {
            type: 'schema',
            options: {
                schema: buildSchema({
                    id: 'nestedTestFields',
                    fields: {
                        name: {
                            isRequired: true,
                            type: 'text',
                        },
                        relationship: {
                            type: 'select',
                            options: {
                                choices: [],
                            },
                        },
                    },
                }),
            },
        },
    },
})
