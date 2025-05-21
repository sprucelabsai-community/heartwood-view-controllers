import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert.utility'
import { CardViewController, KeyboardKey } from '../../../types/heartwood.types'
import DialogViewController from '../../../viewControllers/Dialog.vc'
import EditFormBuilderSectionCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

@suite()
export default class EditingAFormBuilderSectionTest extends AbstractViewControllerTest {
    private formBuilderVc!: FormBuilderCardViewController
    protected controllerMap = {
        'edit-form-builder-section': EditFormBuilderSectionCardViewController,
        'form-builder-card': FormBuilderCardViewController,
    }

    protected async beforeEach() {
        await super.beforeEach()
        this.formBuilderVc = this.Controller('form-builder-card', {})
    }

    @test()
    protected handlesClickingEditSection() {
        assert.isFunction(this.formBuilderVc.handleClickEditSection)
    }

    @test('cant click bad section -1', -1)
    protected async cantClickBadSection(sectionIdx: number) {
        const err = await assert.doesThrowAsync(() =>
            this.formBuilderVc.handleClickEditSection(sectionIdx)
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test('sets instructions 1', 'Some instructions.')
    @test('sets instructions 1', 'Some instructions 2.')
    protected async setsInstructionsSettings(text: string) {
        const pageVc = this.formBuilderVc.getPageVc(0)

        pageVc.setSection(0, {
            title: 'My section title',
            type: 'text',
            text,
        })

        const { formVc, dialogVc } = await this.simulateEditSectionClick(0)

        assert.isEqual(
            (dialogVc.getCardVc() as CardViewController).getHeaderTitle(),
            'My section title'
        )

        assert.isEqualDeep(formVc.getValues(), {
            title: 'My section title',
            type: 'text',
            text,
        })
    }

    @test()
    protected async setsProperFormFieldsWhenEditClicked() {
        const pageVc = this.formBuilderVc.getPageVc(0)

        pageVc.setSectionTitle(0, 'My form section title')

        pageVc.addField(0, { label: 'waka1' })
        pageVc.addField(0, { label: 'waka2', type: 'select' })
        pageVc.addField(0, { label: 'waka3' })

        const { formVc, dialogVc, builderSectionVc } =
            await this.simulateEditSectionClick(0)

        assert.isEqual(
            (dialogVc.getCardVc() as CardViewController).getHeaderTitle(),
            'My form section title'
        )
        assert.isEqualDeep(formVc.getValues(), {
            title: 'My form section title',
            type: 'form',
            shouldRenderAsGrid: false,
        })

        const listVc = builderSectionVc.getFieldListVc()

        vcAssert.assertListRendersRows(listVc, 4)

        assert.isEqualDeep(
            listVc.getValues().map((v) => {
                delete v.rowId
                return v
            }),
            [
                {
                    fieldName: 'Field 1',
                    fieldType: 'text',
                },
                {
                    fieldName: 'waka1',
                    fieldType: 'text',
                },
                {
                    fieldName: 'waka2',
                    fieldType: 'select',
                },
                {
                    fieldName: 'waka3',
                    fieldType: 'text',
                },
            ]
        )
    }

    @test()
    protected async populatesRenderAsGrid() {
        const pageVc = this.formBuilderVc.getPageVc(0)
        const section = pageVc.getSection(0)
        section.shouldRenderAsGrid = true
        pageVc.setSection(0, section)

        const { formVc } = await this.simulateEditSectionClick(0)

        assert.isTrue(formVc.getValue('shouldRenderAsGrid'))
    }

    @test()
    protected async savesChanges() {
        const { formVc, dialogVc, builderSectionVc } =
            await this.simulateEditSectionClick(0)

        await formVc.setValue('title', 'updated section')

        builderSectionVc.addField()

        await interactor.submitForm(formVc)
        vcAssert.assertDialogWasClosed(dialogVc)

        const pageVc = this.formBuilderVc.getPresentPageVc()

        assert.isEqualDeep(pageVc.getSection(0), {
            title: 'updated section',
            shouldRenderAsGrid: false,
            type: 'form',
            fields: [
                {
                    //@ts-ignore
                    name: 'field1',
                    label: 'Field 1',
                    type: 'text',
                },
                {
                    //@ts-ignore
                    name: 'field2',
                    label: 'Field 2',
                    type: 'text',
                },
            ],
        })
    }

    @test()
    protected async hittingTabOnLastInputOnNotLastRowDoesNothing() {
        const { builderSectionVc } = await this.simulateEditSectionClick(0)

        const fieldList = builderSectionVc.getFieldListVc()

        builderSectionVc.addField()

        await interactor.keyDownOnInputInRow({
            vc: fieldList.getRowVc(0),
            key: 'Tab',
            cell: 2,
        })

        assert.isEqual(fieldList.getTotalRows(), 2)
    }

    @test('hitting T on last row does nothing', 'T')
    protected async hittingNonTabOnLastInputAddsRowWhenOnLastRow(
        char: KeyboardKey
    ) {
        const { builderSectionVc } = await this.simulateEditSectionClick(0)

        const fieldList = builderSectionVc.getFieldListVc()

        await interactor.keyDownOnInputInRow({
            vc: fieldList.getRowVc(0),
            key: char,
            cell: 2,
        })

        assert.isEqual(fieldList.getTotalRows(), 1)
    }

    @test()
    protected async hittingTabOnLastInputAddsRowWhenOnLastRow() {
        const { builderSectionVc } = await this.simulateEditSectionClick(0)

        const fieldList = builderSectionVc.getFieldListVc()

        await interactor.keyDownOnInputInRow({
            vc: fieldList.getRowVc(0),
            key: 'Tab',
            cell: 2,
        })

        assert.isEqual(fieldList.getTotalRows(), 2)
    }

    @test()
    protected async showingEditSectionDoesNotLoseFieldOptions() {
        const pageVc = this.formBuilderVc.getPageVc(0)
        //@ts-ignore
        pageVc.updateField('field1', {
            fieldDefinition: {
                label: 'Field 1',
                type: 'select',
                options: {
                    choices: [{ value: 'one', label: 'One' }],
                },
            },
        })

        const { formVc } = await this.simulateEditSectionClick()

        await interactor.submitForm(formVc)

        const fieldOptions = this.formBuilderVc
            .getPageVc(0)
            //@ts-ignore
            .getField('field1')

        assert.isEqualDeep(fieldOptions, {
            type: 'select',
            //@ts-ignore
            renderOptions: { name: 'field1' },
            label: 'Field 1',
            options: {
                choices: [{ value: 'one', label: 'One' }],
            },
        })
    }

    private async simulateEditSectionClick(clickedSectionIdx = 0) {
        const dialogVc = await vcAssert.assertRendersDialog(
            this.formBuilderVc,
            () => this.formBuilderVc.handleClickEditSection(clickedSectionIdx)
        )

        const builderSectionVc =
            dialogVc.getCardVc() as EditFormBuilderSectionCardViewController

        return {
            builderSectionVc:
                builderSectionVc as EditFormBuilderSectionCardViewController,
            dialogVc: dialogVc as DialogViewController,
            formVc: formAssert.cardRendersForm(builderSectionVc as any),
        }
    }
}
