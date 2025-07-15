import { buildSchema } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class FormsWithArrayFieldsTest extends AbstractViewControllerTest {
    @test()
    protected async nullValueInArrayFieldDoesNotCrashWhenGettingValues() {
        const formVc = this.Controller(
            'form',
            buildForm({
                schema: tipSchema,
                sections: [
                    {
                        fields: ['name', 'description', 'references'],
                    },
                ],
            })
        )

        await formVc.setValue('references', [null])
        const values = formVc.getValues()
        assert.isEqualDeep(values.references, [null])
    }
}

const tipSchema = buildSchema({
    id: 'tip',
    name: 'Tip',
    fields: {
        id: {
            type: 'id',
            isRequired: true,
        },
        name: {
            type: 'text',
            isRequired: true,
            label: 'Tip Name',
            hint: 'A short name for the tip',
        },
        description: {
            type: 'text',
            isRequired: false,
            label: 'Description',
            hint: 'A detailed description of the tip',
        },
        references: {
            type: 'text',
            isArray: true,
            minArrayLength: 0,
            label: 'References',
            hint: 'Links or references related to the tip',
        },
    },
})
