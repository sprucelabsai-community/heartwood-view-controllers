import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { ButtonGroupButton } from '../../../types/heartwood.types'
import ButtonGroupViewController, {
    ButtonGroupPendingChanges,
    ButtonGroupViewControllerOptions,
} from '../../../viewControllers/ButtonGroup.vc'

@suite()
export default class UsingAButtonGroupTest extends AbstractViewControllerTest {
    private singleSelectVc!: ButtonGroupViewController
    private onSelectInvocations!: string[][]
    private multiSelectVc!: ButtonGroupViewController
    protected controllerMap = {}
    private onClickHintInvocations: string[] = []

    protected async beforeEach() {
        await super.beforeEach()
        this.onSelectInvocations = []

        this.singleSelectVc = this.SingleSelectVc()
        this.multiSelectVc = this.MultiSelectVc()
    }

    @test()
    protected canCreateUsingAButtonGrid() {
        assert.isTruthy(this.singleSelectVc)
    }

    @test()
    protected throwsIfButtonsHaveNoIds() {
        assert.doesThrow(() =>
            this.Controller('button-group', {
                buttons: [
                    //@ts-ignore
                    {
                        label: 'no id',
                    },
                ],
            })
        )
    }

    @test()
    protected rendersButtons() {
        const buttons = this.render(this.singleSelectVc)
        assert.isLength(buttons, 3)
        assert.isEqual(buttons[0].label, 'first')
        assert.isEqual(buttons[1].label, 'second')
    }

    @test()
    protected noSelectedButtonsToStart() {
        const selected = this.singleSelectVc.getSelectedButtons()
        assert.isLength(selected, 0)
    }

    @test()
    protected isSelectedIsNullIfNothingSelectedAtFirst() {
        const buttons = this.render(this.singleSelectVc)
        assert.doesNotInclude(buttons, { isSelected: true })
        assert.doesNotInclude(buttons, { isSelected: false })
    }

    @test()
    protected async canSelectButtonAndMarkRestAsDeselected() {
        await this.singleSelectVc.selectButton('first')
        const buttons = this.render(this.singleSelectVc)
        this.assertFirstButtonSelected(buttons)
    }

    @test()
    protected async selectingSameButtonMoreThanOnceHasNoNegativeEffect() {
        await this.singleSelectVc.selectButton('first')
        await this.singleSelectVc.selectButton('first')
        await this.singleSelectVc.selectButton('first')

        assert.isLength(this.onSelectInvocations, 1)
        let buttons = this.render(this.singleSelectVc)

        this.assertFirstButtonSelected(buttons)

        await this.singleSelectVc.deselectButton('first')

        buttons = this.render(this.singleSelectVc)
        assert.doesNotInclude(buttons, { isSelected: true })
    }

    @test()
    protected async deselectingSameButtonMoreThanOnceHasNoNegativeEffect() {
        await this.singleSelectVc.selectButton('first')
        await this.singleSelectVc.deselectButton('first')
        await this.singleSelectVc.deselectButton('first')

        assert.isLength(this.onSelectInvocations, 2)

        let buttons = this.renderSingleSelectVc()
        assert.doesNotInclude(buttons, { isSelected: true })
    }

    @test()
    protected async canDeselectButton() {
        await this.singleSelectVc.selectButton('first')
        await this.singleSelectVc.deselectButton('first')

        const buttons = this.render(this.singleSelectVc)

        assert.doesNotInclude(buttons, { isSelected: true })
    }

    @test()
    protected async clickingButtonSelectsOneButton() {
        let buttons = this.render(this.singleSelectVc)
        await buttons[0].onClick?.()
        buttons = this.render(this.singleSelectVc)

        this.assertFirstButtonSelected(buttons)
    }

    @test()
    protected async onSelectFiredWhenButtonSelected() {
        await this.singleSelectVc.selectButton('first')

        assert.isLength(this.onSelectInvocations, 1)
        assert.isEqualDeep(this.onSelectInvocations[0], ['first'])
    }

    @test()
    protected async canSelectMoreThanOneButton() {
        await this.multiSelectVc.selectButton('first')
        await this.multiSelectVc.selectButton('second')

        const buttons = this.render(this.multiSelectVc)

        assert.doesInclude(buttons, { isSelected: true })
        assert.doesInclude(buttons[0], { isSelected: true })
        assert.doesInclude(buttons[1], { isSelected: true })
        assert.doesInclude(buttons[2], { isSelected: false })
        assert.doesInclude(buttons[3], { isSelected: false })
    }

    @test()
    protected async onSelectFiredWhenMultiButtonSelectedAndDeselected() {
        await this.multiSelectVc.selectButton('first')
        await this.multiSelectVc.selectButton('second')
        await this.multiSelectVc.deselectButton('first')
        await this.multiSelectVc.deselectButton('first')

        assert.isLength(this.onSelectInvocations, 3)

        assert.isEqualDeep(this.onSelectInvocations[0], ['first'])
        assert.isEqualDeep(this.onSelectInvocations[1], ['first', 'second'])
        assert.isEqualDeep(this.onSelectInvocations[2], ['second'])
    }

    @test()
    protected async clickingHintIconTriggersHintCallback() {
        let buttons = this.render(this.singleSelectVc)

        await buttons[0].onClickHintIcon?.()

        assert.isLength(this.onClickHintInvocations, 1)
        assert.isEqual(this.onClickHintInvocations[0], 'first')

        await buttons[1].onClickHintIcon?.()
        assert.isEqual(this.onClickHintInvocations[1], 'second')
    }

    @test()
    protected async canSetSelectedButtonsToStart() {
        const vc = this.MultiSelectVc({
            selected: ['first', 'second'],
        })

        const selected = vc.getSelectedButtons()
        assert.isEqualDeep(selected, ['first', 'second'])

        const buttons = this.render(vc)
        assert.doesInclude(buttons, { isSelected: true })
    }

    @test()
    protected async canCancelChangeToCancelChange() {
        let wasHit = false
        const vc = this.Factory().Controller('button-group', {
            onWillChangeSelection: () => {
                return false
            },
            onSelectionChange: () => {
                wasHit = true
            },
            buttons: [
                {
                    id: 'first',
                    label: 'first',
                },
            ],
        })

        await interactor.clickButtonInGroup(vc, 0)
        assert.isEqualDeep(vc.getSelectedButtons(), [])

        assert.isFalse(wasHit)
    }

    @test()
    protected async canCancelChangeDeselect() {
        let wasHit = false
        const vc = this.Factory().Controller('button-group', {
            selected: ['first'],
            onWillChangeSelection: () => {
                return false
            },
            buttons: [
                {
                    id: 'first',
                    label: 'first',
                },
            ],
        })

        await interactor.clickButtonInGroup(vc, 0)
        assert.isEqualDeep(vc.getSelectedButtons(), ['first'])

        assert.isFalse(wasHit)
    }

    @test()
    protected async willChangeReceivesExpectedPayload() {
        let passedToWillChange:
            | {
                  changes: ButtonGroupPendingChanges
                  selected: string[]
              }
            | undefined
        let wasSelectionChangeHit = false

        const vc = this.SingleSelectVc({
            onWillChangeSelection: (selected, changes) => {
                passedToWillChange = {
                    selected,
                    changes,
                }
            },
            onSelectionChange: () => {
                wasSelectionChangeHit = true
            },
        })

        await interactor.clickButtonInGroup(vc, 0)
        assert.isTruthy(wasSelectionChangeHit)
        assert.isEqualDeep(passedToWillChange, {
            selected: [],
            changes: {
                adding: ['first'],
                removing: [],
            },
        })

        await interactor.clickButtonInGroup(vc, 1)

        assert.isEqualDeep(passedToWillChange, {
            selected: ['first'],
            changes: {
                adding: ['second'],
                removing: ['first'],
            },
        })

        await interactor.clickButtonInGroup(vc, 2)

        assert.isEqualDeep(passedToWillChange, {
            selected: ['second'],
            changes: {
                adding: ['third'],
                removing: ['second'],
            },
        })

        await interactor.clickButtonInGroup(vc, 2)

        assert.isEqualDeep(passedToWillChange, {
            selected: ['third'],
            changes: {
                adding: [],
                removing: ['third'],
            },
        })

        await interactor.clickButtonInGroup(vc, 1)
        await interactor.clickButtonInGroup(vc, 1)

        assert.isEqualDeep(passedToWillChange, {
            selected: ['second'],
            changes: {
                adding: [],
                removing: ['second'],
            },
        })
    }

    @test()
    protected async willChangeHitsOnSettingSelectedButtons() {
        let passedSelected: string[] | undefined
        let passedChanges: ButtonGroupPendingChanges | undefined

        this.multiSelectVc = this.MultiSelectVc({
            onWillChangeSelection: (
                selected: string[],
                changes: ButtonGroupPendingChanges
            ) => {
                passedSelected = selected
                passedChanges = changes
            },
        })

        await this.multiSelectVc.setSelectedButtons(['first', 'second'])

        assert.isEqualDeep(passedSelected, [])
        assert.isEqualDeep(passedChanges, {
            adding: ['first', 'second'],
            removing: [],
        })
    }

    @test('can set buttons 1', [{ id: 'hello', label: 'world' }])
    @test('can set buttons 2', [
        { id: 'hello', label: 'world' },
        { id: 'hello2', label: 'world2' },
    ])
    protected async canSetButtons(expected: ButtonGroupButton[]) {
        this.setButtonsOnSingleSelect(expected)
        const buttons = this.renderSingleSelectVc()
        assert.doesInclude(buttons, expected)
    }

    @test()
    protected async settingButtonsTriggersRender() {
        let wasHit = false
        // view is an array of buttons, so no actual controller is returned.
        // people have to call "triggerRender" on the card
        this.singleSelectVc.triggerRender = () => {
            wasHit = true
        }
        this.setButtonsOnSingleSelect([])
        assert.isTrue(wasHit)
    }

    @test()
    protected async settingLineIconOptionsPassesToButtons() {
        const expected = this.generateRandomLineIconOptions()
        this.singleSelectVc = this.SingleSelectVc(expected)

        const [button] = this.renderSingleSelectVc()
        assert.doesInclude(button, expected)
    }

    @test()
    protected async iconOptionsOnButtonBeatOptionsOnGroup() {
        const expected = this.generateRandomLineIconOptions()
        this.singleSelectVc = this.SingleSelectVc({
            ...this.generateRandomLineIconOptions(),
            buttons: [{ id: 'first', label: 'first', ...expected }],
        })

        const [button] = this.renderSingleSelectVc()
        assert.doesInclude(button, expected)
    }

    private generateRandomLineIconOptions() {
        return {
            lineIcon: generateId() as any,
            selectedLineIcon: generateId() as any,
            lineIconPosition: generateId() as any,
        }
    }

    private setButtonsOnSingleSelect(expected: ButtonGroupButton[]) {
        this.singleSelectVc.setButtons(expected)
    }

    private assertFirstButtonSelected(
        buttons: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
    ) {
        assert.doesInclude(buttons, { isSelected: true })
        assert.doesInclude(buttons[0], { isSelected: true })
        assert.doesInclude(buttons[1], { isSelected: false })
    }

    private MultiSelectVc(
        options?: Partial<ButtonGroupViewControllerOptions>
    ): ButtonGroupViewController {
        return this.Factory().Controller('button-group', {
            shouldAllowMultiSelect: true,
            onSelectionChange: (selected) => {
                this.onSelectInvocations.push(selected)
            },
            buttons: [
                {
                    id: 'first',
                    label: 'first',
                },
                {
                    id: 'second',
                    label: 'second',
                },
                {
                    id: 'third',
                    label: 'third',
                },
                {
                    id: 'fourth',
                    label: 'fourth',
                },
            ],
            ...options,
        })
    }

    private renderSingleSelectVc() {
        return this.render(this.singleSelectVc)
    }

    private SingleSelectVc(
        options?: Partial<ButtonGroupViewControllerOptions>
    ): ButtonGroupViewController {
        return this.Controller('button-group', {
            onSelectionChange: (selected) => {
                this.onSelectInvocations.push(selected)
            },
            onClickHintIcon: (idx) => {
                this.onClickHintInvocations.push(idx)
            },
            buttons: [
                {
                    id: 'first',
                    label: 'first',
                },
                {
                    id: 'second',
                    label: 'second',
                },
                {
                    id: 'third',
                    label: 'third',
                },
            ],
            ...options,
        })
    }
}
