import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import ButtonGroupViewController, {
    ButtonGroupChanges,
    ButtonGroupViewControllerOptions,
    SelectionChangeHandler,
} from '../../../viewControllers/ButtonGroup.vc'

@suite()
export default class InteractingWithButtonGroupsTest extends AbstractViewControllerTest {
    private vc!: ButtonGroupViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.With3Buttons()
    }

    @test()
    protected async throwsWhenMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.clickButtonInGroup()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['buttonGroupVc', 'buttonIdOrIdx'],
        })
    }

    @test('throws when cant find button 1', 'not-found', 'test')
    @test('throws when cant find button 2', 'test', 'not-found')
    protected async throwsWhenCantFindButtonById(
        buttonId: string,
        lookupId: string
    ) {
        this.vc = this.Controller('button-group', {
            buttons: [
                {
                    id: buttonId,
                },
            ],
        })

        await assert.doesThrowAsync(
            () => this.clickButton(lookupId),
            'could not find'
        )
    }

    @test()
    protected async noErrorWhenFindingButton() {
        await this.clickButton('test')
    }

    @test()
    protected async setsValue() {
        await this.clickButton('test')

        this.assertSelected(['test'])

        await this.clickButton('not-found')

        this.assertSelected(['not-found'])
    }

    @test('throws with bad 1', 10)
    @test('throws with bad 2', 5)
    protected async throwsWithBadNumberIndex(idx: number) {
        await assert.doesThrowAsync(
            () => this.clickButton(idx),
            `could not find`
        )
    }

    @test('passes with good 1', 0)
    @test('passes with good 2', 1)
    protected async passesWithGoodIndex(idx: number) {
        await this.clickButton(idx)
    }

    @test()
    protected async passesExpectedChangesToChangeHandler() {
        let passedChanged: any

        this.VcWithChangeHandler(
            (_: string[], changed: ButtonGroupChanges): void => {
                passedChanged = changed
            }
        )

        await this.clickButton('test')

        assert.isEqualDeep(passedChanged, { added: ['test'], removed: [] })

        await this.clickButton('test')

        assert.isEqualDeep(passedChanged, { added: [], removed: ['test'] })

        await this.clickButton('second')

        assert.isEqualDeep(passedChanged, { added: ['second'], removed: [] })

        await this.clickButton('second')

        assert.isEqualDeep(passedChanged, { added: [], removed: ['second'] })
    }

    @test()
    protected async passesDeselectedWithSelected() {
        let passedChanged: any

        this.VcWithChangeHandler(
            (_: string[], changed: ButtonGroupChanges): void => {
                passedChanged = changed
            }
        )

        await this.clickButton('test')
        await this.clickButton('second')

        assert.isEqualDeep(passedChanged, {
            added: ['second'],
            removed: ['test'],
        })

        await this.clickButton('third')

        assert.isEqualDeep(passedChanged, {
            added: ['third'],
            removed: ['second'],
        })
    }

    @test()
    protected async passesExpectedChangesWithMultiSelect() {
        let passedChanged: any

        this.VcWithChangeHandler(
            (_: string[], changed: ButtonGroupChanges): void => {
                passedChanged = changed
            },
            true
        )

        await this.clickButton('test')

        assert.isEqualDeep(passedChanged, { added: ['test'], removed: [] })

        await this.clickButton('second')

        assert.isEqualDeep(passedChanged, { added: ['second'], removed: [] })
    }

    private VcWithChangeHandler(
        changeHandler: SelectionChangeHandler,
        isMultiSelect = false
    ) {
        this.vc = this.Vc({
            onSelectionChange: changeHandler,
            shouldAllowMultiSelect: isMultiSelect,
            buttons: [
                {
                    id: 'test',
                },
                {
                    id: 'second',
                },
                {
                    id: 'third',
                },
            ],
        })
    }

    private assertSelected(expected: string[]) {
        const selected = this.vc.getSelectedButtons()
        assert.isEqualDeep(selected, expected)
    }

    private clickButton(lookupId: string | number): any {
        return interactor.clickButtonInGroup(this.vc, lookupId)
    }

    private With3Buttons() {
        return this.Vc({
            buttons: [
                { id: 'not-found' },
                {
                    id: 'test',
                },
                {
                    id: 'third',
                },
            ],
        })
    }

    private Vc(options: ButtonGroupViewControllerOptions) {
        return this.Controller('button-group', { ...options })
    }
}
