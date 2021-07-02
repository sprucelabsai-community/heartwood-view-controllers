import { SpruceError } from '@sprucelabs/schema'
import { ViewControllerOptions } from '../../types/heartwood.types'
import CardViewController from '../Card.vc'
import ListViewController, { ListRow } from '../list/List.vc'
import FormBuilderViewController from './FormBuilder.vc'

export interface ManageSectionTitlesCardViewControllerOptions {
	onDone(): void
	formBuilderVc: FormBuilderViewController
}
export default class ManageSectionTitlesCardViewController extends CardViewController {
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

		this.model = {
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
				],
			},
		}
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
}
