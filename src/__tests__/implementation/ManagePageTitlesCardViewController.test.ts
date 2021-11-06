import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import interactionUtil from '../../tests/utilities/interaction.utility'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import FormBuilderViewController from '../../viewControllers/formBuilder/FormBuilder.vc'
import ManagePageTitlesCardViewController, {
	ManagePageTitlesCardViewControllerOptions,
} from '../../viewControllers/formBuilder/ManagePageTitlesCard.vc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		managePageTitles: ManagePageTitlesCardViewController
	}

	export interface ViewControllerOptionsMap {
		managePageTitles: ManagePageTitlesCardViewControllerOptions
	}
}

export default class ManagePageTitlesViewControllerTest extends AbstractViewControllerTest {
	private static _vc: ManagePageTitlesCardViewController
	private static get vc(): ManagePageTitlesCardViewController {
		if (!this._vc) {
			this._vc = this.Controller('managePageTitles', {
				onDone: () => {
					this.wasOnDoneInvoked = true
				},
				formBuilderVc: this.formBuilderVc,
			})
		}

		return this._vc
	}
	private static wasOnDoneInvoked = false
	private static formBuilderVc: FormBuilderViewController

	protected static async beforeEach() {
		await super.beforeEach()

		//@ts-ignore
		this._vc = null
		this.wasOnDoneInvoked = false
		this.formBuilderVc = this.Controller('formBuilder', {})
	}

	protected static controllerMap = {
		managePageTitles: ManagePageTitlesCardViewController,
		formBuilder: FormBuilderViewController,
	}

	@test()
	protected static needsRequiredParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('managePageTitles', {})
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['onDone', 'formBuilderVc'],
		})
	}

	@test()
	protected static canCreateManageSectionsViewController() {
		assert.isTruthy(this.vc)
		assert.isTrue(this.vc instanceof AbstractViewController)
	}

	@test()
	protected static rendersAValidCard() {
		vcAssertUtil.assertRendersValidCard(this.vc)
		vcAssertUtil.assertCardRendersHeader(this.vc)
		vcAssertUtil.assertCardRendersFooter(this.vc)
	}

	@test()
	protected static async clickingFooterPrimaryTriggersOnDone() {
		await interactionUtil.clickPrimaryInFooter(this.vc)
		assert.isTrue(this.wasOnDoneInvoked)
	}

	@test()
	protected static rendersList() {
		vcAssertUtil.assertCardRendersList(this.vc)
	}

	@test()
	protected static async assertStartsWithAsManyRowsAsThereArePagesIntheForm() {
		await this.formBuilderVc.addPage({ title: 'Page 2' })
		await this.formBuilderVc.addPage({ title: 'Page 3' })

		const listVc = this.vc.getListVc()
		vcAssertUtil.assertListRendersRows(listVc, 3)

		assert.isEqual(listVc.getRowVc(0).getValues().title, 'Page 1')
		assert.isEqual(listVc.getRowVc(1).getValues().title, 'Page 2')
		assert.isEqual(listVc.getRowVc(2).getValues().title, 'Page 3')
	}

	@test()
	protected static async updatingRowValueUpdatesPageTitle() {
		await this.formBuilderVc.addPage({ title: 'Page 2' })

		const rowVc = this.vc.getListVc().getRowVc(1)
		await rowVc.setValue('title', 'Waka')

		const page = this.formBuilderVc.getPageVc(1)
		assert.isEqual(page.getTitle(), 'Waka')
	}

	@test()
	protected static async clickingDestructiveButtonInRowDeletesPage() {
		await this.formBuilderVc.addPage({ title: 'Page 2' })
		await this.formBuilderVc.addPage({ title: 'Page 3' })
		await this.formBuilderVc.addPage({ title: 'Page 4' })

		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 4)
		let rowVc = this.vc.getListVc().getRowVc(2)
		assert.isEqual(rowVc.getValue('title'), 'Page 3')

		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() =>
				interactionUtil.clickOnDestructiveButtonInRow(this.vc.getListVc(), 2),
			() => true
		)

		assert.isEqual(this.formBuilderVc.getTotalPages(), 3)

		rowVc = this.vc.getListVc().getRowVc(2)
		assert.isEqual(rowVc.getValue('title'), 'Page 4')

		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 3)
	}

	@test()
	protected static async clickingDestructiveButtonInRowAndCancellingDoesNothing() {
		await this.formBuilderVc.addPage({ title: 'Page 2' })
		await this.formBuilderVc.addPage({ title: 'Page 3' })
		await this.formBuilderVc.addPage({ title: 'Page 4' })

		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 4)
		let rowVc = this.vc.getListVc().getRowVc(2)
		assert.isEqual(rowVc.getValue('title'), 'Page 3')

		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() =>
				interactionUtil.clickOnDestructiveButtonInRow(this.vc.getListVc(), 2),
			() => false
		)

		assert.isEqual(this.formBuilderVc.getTotalPages(), 4)
		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 4)
	}

	@test()
	protected static async clickingSecondaryButtonInTheFooterAddsPage() {
		await interactionUtil.clickSecondaryInFooter(this.vc)
		assert.isEqual(this.formBuilderVc.getTotalPages(), 2)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 2)
	}
}
