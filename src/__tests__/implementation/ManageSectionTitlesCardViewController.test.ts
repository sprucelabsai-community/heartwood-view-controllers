import { SpruceError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import interactionUtil from '../../tests/utilities/interaction.utility'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import {
	CardViewController,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import FormBuilderViewController from '../../viewControllers/formBuilder/FormBuilder.vc'
import ListViewController, { ListRow } from '../../viewControllers/list/List.vc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		manageSectionTitles: ManageSectionTitlesCardViewController
	}

	export interface ViewControllerOptionsMap {
		manageSectionTitles: ManageSectionTitlesCardViewControllerOptions
	}
}

interface ManageSectionTitlesCardViewControllerOptions {
	onDone(): void
	onCancel(): void
	formBuilderVc: FormBuilderViewController
}

class ManageSectionTitlesCardViewController extends AbstractViewController<SpruceSchemas.Heartwood.v2021_02_11.Card> {
	private cardVc: CardViewController
	private listVc: ListViewController
	private formBuilderVc: FormBuilderViewController

	public constructor(
		options: ManageSectionTitlesCardViewControllerOptions &
			ViewControllerOptions
	) {
		super(options)

		const missing = []
		if (!options.onDone) {
			missing.push('onDone')
		}

		if (!options.onCancel) {
			missing.push('onCancel')
		}

		if (!options.formBuilderVc) {
			missing.push('formBuilderVc')
		}

		if (missing.length > 0) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
		}

		this.formBuilderVc = options.formBuilderVc

		this.listVc = this.vcFactory.Controller('list', {
			columnWidths: ['fill'],
			rows: this.buildRows(),
		})

		this.cardVc = this.vcFactory.Controller('card', {
			header: {
				title: 'Manage sections',
			},
			body: {
				sections: [
					{
						list: this.listVc.render(),
					},
				],
			},
			footer: {
				buttons: [
					{
						type: 'primary',
						label: 'Done',
						onClick: () => {
							options.onDone()
						},
					},
					{
						type: 'secondary',
						label: 'Cancel',
						onClick: () => {
							options.onCancel()
						},
					},
				],
			},
		})
	}

	private buildRows(): ListRow[] {
		const pages = this.formBuilderVc.getPageVcs()
		const rows: ListRow[] = []

		for (const page of pages) {
			rows.push({
				cells: [
					{
						textInput: {
							name: 'title',
							value: page.getTitle(),
							onChange: (value?: string) => {
								if (value) {
									page.setTitle(value)
								}
							},
						},
					},
					{
						button: {
							lineIcon: 'delete',
							type: 'destructive',
							onClick: async () => {
								await this.formBuilderVc.removePage(page.getIndex())
								this.listVc.setRows(this.buildRows())
							},
						},
					},
				],
			})
		}

		return rows
	}

	public getListVc() {
		return this.listVc
	}

	public render() {
		return {
			...this.cardVc.render(),
		}
	}
}

export default class ManageSectionsViewControllerTest extends AbstractViewControllerTest {
	private static _vc: ManageSectionTitlesCardViewController
	private static get vc(): ManageSectionTitlesCardViewController {
		if (!this._vc) {
			this._vc = this.Controller('manageSectionTitles', {
				onDone: () => {
					this.wasOnDoneInvoked = true
				},
				onCancel: () => {
					this.wasOnCancelInvoked = true
				},
				formBuilderVc: this.formBuilderVc,
			})
		}

		return this._vc
	}
	private static wasOnDoneInvoked = false
	private static wasOnCancelInvoked = false
	private static formBuilderVc: FormBuilderViewController

	protected static async beforeEach() {
		//@ts-ignore
		this._vc = null
		this.wasOnDoneInvoked = false
		this.wasOnCancelInvoked = false
		this.formBuilderVc = this.Controller('formBuilder', {})
	}

	protected static controllerMap = {
		manageSectionTitles: ManageSectionTitlesCardViewController,
	}

	@test()
	protected static needsRequiredParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('manageSectionTitles', {})
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['onDone', 'onCancel', 'formBuilderVc'],
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
		vcAssertUtil.assertRendersCardHeader(this.vc)
		vcAssertUtil.assertRendersCardFooter(this.vc)
	}

	@test()
	protected static async clickingFooterPrimaryTriggersOnDone() {
		await interactionUtil.clickPrimaryInFooter(this.vc)
		assert.isTrue(this.wasOnDoneInvoked)
	}

	@test()
	protected static async clickingSecondaryTriggersOnCancel() {
		await interactionUtil.clickSecondaryInFooter(this.vc)
		assert.isTrue(this.wasOnCancelInvoked)
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

		await interactionUtil.clickOnDestructiveButton(rowVc)

		assert.isEqual(this.formBuilderVc.getTotalPages(), 3)

		rowVc = this.vc.getListVc().getRowVc(2)
		assert.isEqual(rowVc.getValue('title'), 'Page 4')

		vcAssertUtil.assertListRendersRows(this.vc.getListVc(), 3)
	}
}
