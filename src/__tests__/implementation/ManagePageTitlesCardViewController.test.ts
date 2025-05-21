import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import interactor from '../../tests/utilities/interactor'
import vcAssert from '../../tests/utilities/vcAssert.utility'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import FormBuilderCardViewController from '../../viewControllers/formBuilder/FormBuilderCard.vc'
import ManagePageTitlesCardViewController, {
    ManagePageTitlesCardViewControllerOptions,
} from '../../viewControllers/formBuilder/ManagePageTitlesCard.vc'

@suite()
export default class ManagePageTitlesViewControllerTest extends AbstractViewControllerTest {
    protected controllerMap = {
        'manage-page-titles': ManagePageTitlesCardViewController,
        'form-builder-card': FormBuilderCardViewController,
    }

    private _vc!: ManagePageTitlesCardViewController
    private get vc(): ManagePageTitlesCardViewController {
        if (!this._vc) {
            this._vc = this.Controller('manage-page-titles', {
                onDone: () => {
                    this.wasOnDoneInvoked = true
                },
                formBuilderVc: this.formBuilderVc,
            })
        }

        return this._vc
    }
    private wasOnDoneInvoked = false
    private formBuilderVc!: FormBuilderCardViewController

    protected async beforeEach() {
        await super.beforeEach()

        //@ts-ignore
        this._vc = null
        this.wasOnDoneInvoked = false
        this.formBuilderVc = this.Controller('form-builder-card', {})
    }

    @test()
    protected needsRequiredParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.Controller('manage-page-titles', {})
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['onDone', 'formBuilderVc'],
        })
    }

    @test()
    protected canCreateManageSectionsViewController() {
        assert.isTruthy(this.vc)
        assert.isTrue(this.vc instanceof AbstractViewController)
    }

    @test()
    protected rendersAValidCard() {
        vcAssert.assertRendersValidCard(this.vc)
        vcAssert.assertCardRendersHeader(this.vc)
        vcAssert.assertCardRendersFooter(this.vc)
    }

    @test()
    protected async clickingFooterPrimaryTriggersOnDone() {
        await interactor.clickPrimaryInFooter(this.vc)
        assert.isTrue(this.wasOnDoneInvoked)
    }

    @test()
    protected rendersList() {
        vcAssert.assertCardRendersList(this.vc)
    }

    @test()
    protected async assertStartsWithAsManyRowsAsThereArePagesIntheForm() {
        await this.formBuilderVc.addPage({ title: 'Page 2' })
        await this.formBuilderVc.addPage({ title: 'Page 3' })

        const listVc = this.vc.getListVc()
        vcAssert.assertListRendersRows(listVc, 3)

        assert.isEqual(listVc.getRowVc(0).getValues().title, 'Page 1')
        assert.isEqual(listVc.getRowVc(1).getValues().title, 'Page 2')
        assert.isEqual(listVc.getRowVc(2).getValues().title, 'Page 3')
    }

    @test()
    protected async updatingRowValueUpdatesPageTitle() {
        await this.formBuilderVc.addPage({ title: 'Page 2' })

        const rowVc = this.vc.getListVc().getRowVc(1)
        await rowVc.setValue('title', 'Waka')

        const page = this.formBuilderVc.getPageVc(1)
        assert.isEqual(page.getTitle(), 'Waka')
    }

    @test()
    protected async clickingDestructiveButtonInRowDeletesPage() {
        await this.formBuilderVc.addPage({ title: 'Page 2' })
        await this.formBuilderVc.addPage({ title: 'Page 3' })
        await this.formBuilderVc.addPage({ title: 'Page 4' })

        vcAssert.assertListRendersRows(this.vc.getListVc(), 4)
        let rowVc = this.vc.getListVc().getRowVc(2)
        assert.isEqual(rowVc.getValue('title'), 'Page 3')

        const confirmVc = await vcAssert.assertRendersConfirm(this.vc, () =>
            interactor.clickDestructiveInRow(this.vc.getListVc(), 2)
        )

        await confirmVc.accept()

        assert.isEqual(this.formBuilderVc.getTotalPages(), 3)

        rowVc = this.vc.getListVc().getRowVc(2)
        assert.isEqual(rowVc.getValue('title'), 'Page 4')

        vcAssert.assertListRendersRows(this.vc.getListVc(), 3)
    }

    @test()
    protected async clickingDestructiveButtonInRowAndCancellingDoesNothing() {
        await this.formBuilderVc.addPage({ title: 'Page 2' })
        await this.formBuilderVc.addPage({ title: 'Page 3' })
        await this.formBuilderVc.addPage({ title: 'Page 4' })

        vcAssert.assertListRendersRows(this.vc.getListVc(), 4)
        let rowVc = this.vc.getListVc().getRowVc(2)
        assert.isEqual(rowVc.getValue('title'), 'Page 3')

        const confirmVc = await vcAssert.assertRendersConfirm(this.vc, () =>
            interactor.clickDestructiveInRow(this.vc.getListVc(), 2)
        )

        await confirmVc.decline()

        assert.isEqual(this.formBuilderVc.getTotalPages(), 4)
        vcAssert.assertListRendersRows(this.vc.getListVc(), 4)
    }

    @test()
    protected async clickingSecondaryButtonInTheFooterAddsPage() {
        await interactor.clickSecondaryInFooter(this.vc)
        assert.isEqual(this.formBuilderVc.getTotalPages(), 2)
        vcAssert.assertTriggerRenderCount(this.vc, 1)

        vcAssert.assertListRendersRows(this.vc.getListVc(), 2)
    }
}

declare module '../../types/heartwood.types' {
    interface ViewControllerMap {
        'manage-page-titles': ManagePageTitlesCardViewController
    }

    export interface ViewControllerOptionsMap {
        'manage-page-titles': ManagePageTitlesCardViewControllerOptions
    }
}
