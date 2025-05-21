import { buildSchema } from '@sprucelabs/schema'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import FormViewController from '../../../viewControllers/form/Form.vc'

@suite()
export default class RenderingInputsTest extends AbstractViewControllerTest {
    private vc!: FormViewController<FormSchema>

    protected async beforeEach() {
        await super.beforeEach()

        this.vc = this.Controller(
            'form',
            buildForm({
                schema: formSchema,
                sections: [
                    {
                        id: 'section1',
                        fields: ['firstName', 'lastName'],
                    },
                    {
                        id: 'section2',
                        fields: ['phone'],
                    },
                ],
            })
        )
    }

    @test()
    protected async throwsWhenSettingRenderForBadField() {
        const err = assert.doesThrow(() => this.setTriggerRender(generateId()))

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected async setsForValidField() {
        this.setTriggerRender('firstName')
        this.setTriggerRender('lastName')
    }

    @test()
    protected async throwsWhenGettingRenderForBadField() {
        const err = assert.doesThrow(() => this.getTriggerRender(generateId()))

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected canGetRenderCallbackForInput() {
        this.assertSettingTriggerRenderGetsIt('firstName')
        this.assertSettingTriggerRenderGetsIt('lastName')
        const cb1 = this.getTriggerRender('firstName')
        const cb2 = this.getTriggerRender('lastName')
        assert.isNotEqual(cb1, cb2)
    }

    @test('triggers render for firstName', 'firstName')
    @test('triggers render for lastName', 'lastName')
    protected async settingValueTriggersRenderOnTheFieldOnly(fieldName: any) {
        let wasHit = false

        this.setTriggerRender(fieldName, () => {
            wasHit = true
        })
        assert.isFalse(wasHit)

        await this.vc.setValue(fieldName, generateId())

        assert.isTrue(wasHit)
    }

    private assertSettingTriggerRenderGetsIt(name: string) {
        const cb = () => {}
        this.setTriggerRender(name, cb)
        const actual = this.getTriggerRender(name)
        assert.isEqual(actual, cb)
    }

    private setTriggerRender(name: string, cb?: () => void) {
        this.vc.setTriggerRenderForInput(name as any, cb ?? (() => {}))
    }

    private getTriggerRender(name: string) {
        //@ts-ignore
        return this.vc.getTriggerRenderForInput(name as any)
    }
}

const formSchema = buildSchema({
    id: 'renderForm',
    fields: {
        firstName: {
            type: 'text',
        },
        lastName: {
            type: 'text',
        },
        phone: {
            type: 'phone',
        },
    },
})

type FormSchema = typeof formSchema
