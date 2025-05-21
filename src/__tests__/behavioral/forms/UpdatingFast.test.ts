import { buildSchema } from '@sprucelabs/schema'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import AbstractInputViewController from '../../../viewControllers/form/AbstractInput.vc'
import FormViewController, {
    FormViewControllerOptions,
} from '../../../viewControllers/form/Form.vc'

@suite()
export default class UpdatingFastTest extends AbstractViewControllerTest {
    private vc!: FormViewController<FastTypingSchema>

    protected async beforeEach() {
        await super.beforeEach()
        let timeout = 100

        const views = this.getFactory()
        views.setController('fastInput', InputViewController)

        this.vc = this.Vc({
            onWillChange: async () => {
                await new Promise((r) => setTimeout(r, (timeout -= 10)))
            },
        })
    }

    @test()
    protected async lastUpdateWinsEvenIfFirstIsDelayed() {
        await this.all([this.setValue1('1'), this.setValue1('2')])
        this.assertValue1Equals('2')
    }

    @test()
    protected async canSetValuesToSeveralFieldsAtOnce() {
        await this.all([
            this.setValue1('1'),
            this.setValue2('2'),
            this.setValue1('2'),
            this.setValue2('3'),
        ])

        this.assertValue1Equals('2')
        this.assertValue2Equals('3')
    }

    @test()
    protected async handlesTwoSetsOfUpdates() {
        await this.updateValue1FiveTimes()
        this.assertValue1Equals('5')
        await this.updateValue1FiveTimes()
        this.assertValue1Equals('5')

        await this.all([
            this.updateValue2FiveTimes(),
            this.updateValue1FiveTimes(),
            this.updateValue2FiveTimes(),
            this.updateValue1FiveTimes(),
        ])

        this.assertValue1Equals('5')
        this.assertValue2Equals('5')
    }

    @test()
    protected async updatesValueWhileProcessing() {
        const expected = ''
        let hitCount = 0
        this.vc.setTriggerRenderForInput('field1', () => {
            hitCount++
        })

        const promise = this.setValue1(expected)
        assert.isEqual(hitCount, 1)
        const actual = this.vc.getValue('field1', {
            shouldIncludePendingValues: true,
        })
        assert.isEqual(actual, expected)
        assert.isEqual(hitCount, 1)
        await promise
        assert.isEqual(hitCount, 2)
    }

    @test()
    protected async updatesRenderedValueWhileProcessing() {
        const inputVc = this.setupFormWithInputVc()

        await inputVc.setRenderedValue('')

        const expected = generateId()

        this.setField1UsingSetValueHandler(expected)

        assert.isEqual(inputVc.getRenderedValue(), expected)

        await this.wait()
    }

    @test()
    protected async noPendingSetInRenderedValueIfNotAlreadySet() {
        const inputVc = this.setupFormWithInputVc()
        this.setField1UsingSetValueHandler(generateId())
        assert.isUndefined(inputVc.getRenderedValue())
    }

    @test()
    protected async cancellingWillChangeTriggersRenderStill() {
        this.vc = this.Vc({
            onWillChange: async () => {
                await new Promise((r) => setTimeout(r, 10))

                return false
            },
        })

        let hitCount = 0

        //@ts-ignore
        this.vc.triggerRenderForInput = () => {
            hitCount++
        }

        const waiting = this.setRandomValue1()
        assert.isEqual(hitCount, 1)

        await waiting

        assert.isEqual(hitCount, 2)
    }

    @test()
    protected async cancellingWillChangeTriggersRender() {
        await this.setValue1(generateId())

        const hits: string[] = []

        this.vc = this.Vc({
            onWillChange: async () => {
                hits.push('onWillChange')
                return false
            },
        })

        //@ts-ignore
        this.vc.triggerRenderForInput = (name) => {
            hits.push(name)
        }

        //@ts-ignore
        this.vc.deletePendingValue = () => {
            hits.push('deletePendingValue')
        }

        await this.setRandomValue1()

        assert.isEqualDeep(hits, [
            'field1',
            'onWillChange',
            'deletePendingValue',
            'field1',
        ])
    }

    private async setRandomValue1() {
        await this.setValue1(generateId())
    }

    private setField1UsingSetValueHandler(expected: string) {
        const { setValue } = this.render(this.vc)
        setValue('field1', expected)
    }

    private setupFormWithInputVc() {
        const inputVc = this.Controller('fastInput' as any, {
            onChangeRenderedValue: async () => {
                await new Promise((r) => setTimeout(r, 10))
            },
        })

        this.vc = this.Vc({
            sections: [
                {
                    fields: [
                        {
                            name: 'field1',
                            vc: inputVc,
                        },
                    ],
                },
            ],
        })
        return inputVc as InputViewController
    }

    private async updateValue1FiveTimes() {
        await this.all([
            this.setValue1('1'),
            this.setValue1('2'),
            this.setValue1('3'),
            this.setValue1('4'),
            this.setValue1('5'),
        ])
    }

    private async updateValue2FiveTimes() {
        await this.all([
            this.setValue2('1'),
            this.setValue2('2'),
            this.setValue2('3'),
            this.setValue2('4'),
            this.setValue2('5'),
        ])
    }

    private async all(all: Promise<void>[]) {
        await Promise.all(all)
    }

    private assertValue1Equals(expected: string) {
        assert.isEqual(this.getValue1(), expected)
    }
    private assertValue2Equals(expected: string) {
        assert.isEqual(this.getValue2(), expected)
    }

    private getValue1(): string | null | undefined {
        return this.vc.getValue('field1')
    }

    private getValue2(): string | null | undefined {
        return this.vc.getValue('field2')
    }

    private async setValue1(value: string): Promise<void> {
        return this.vc.setValue('field1', value)
    }

    private async setValue2(value: string): Promise<void> {
        return this.vc.setValue('field2', value)
    }

    private Vc(options?: Partial<FormViewControllerOptions<FastTypingSchema>>) {
        return this.Controller(
            'form',
            buildForm({
                schema: fastTypingSchema,
                sections: [
                    {
                        fields: ['field1', 'field2'],
                    },
                ],
                ...options,
            })
        )
    }
}

const fastTypingSchema = buildSchema({
    id: 'fastTyping',
    fields: {
        field1: {
            type: 'text',
        },
        field2: {
            type: 'text',
        },
    },
})

type FastTypingSchema = typeof fastTypingSchema

class InputViewController extends AbstractInputViewController {}
