import { buildSchema } from '@sprucelabs/schema'
import { test } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { FormViewController } from '../../../types/heartwood.types'

export default class TypingFormsTest extends AbstractViewControllerTest {
    @test()
    protected static async canCreateTypingForms() {
        const vc = this.Controller(
            'form',
            buildForm({
                schema: formSchema1,
                sections: [],
            })
        ) as FormViewController<FormSchema1>

        vc.addSection({
            atIndex: 1,
            fields: ['firstName'],
        })
    }
}

const formSchema1 = buildSchema({
    id: 'typingSchema1',
    fields: {
        firstName: {
            type: 'text',
        },
        lastName: {
            type: 'text',
        },
    },
})

type FormSchema1 = typeof formSchema1
