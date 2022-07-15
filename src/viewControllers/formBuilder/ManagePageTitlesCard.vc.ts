import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { ListRow, ViewControllerOptions } from '../../types/heartwood.types'
import CardViewController from '../card/Card.vc'
import ListViewController from '../list/List.vc'
import FormBuilderCardViewController from './FormBuilderCard.vc'

export interface ManagePageTitlesCardViewControllerOptions {
	onDone(): void
	formBuilderVc: FormBuilderCardViewController
}
export default class ManagePageTitlesCardViewController extends CardViewController {
	private listVc: ListViewController
	private formBuilderVc: FormBuilderCardViewController

	public constructor(
		options: ManagePageTitlesCardViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		assertOptions(options, ['onDone', 'formBuilderVc'])

		this.formBuilderVc = options.formBuilderVc

		this.listVc = this.Controller('list', {
			columnWidths: ['fill'],
			rows: this.renderRows(),
		})

		this.model = {
			header: {
				title: 'Manage pages',
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
						type: 'secondary',
						label: 'Add row',
						onClick: () => {
							void this.formBuilderVc.addPage()
							this.listVc.setRows(this.renderRows())
							this.triggerRender()
						},
					},
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

	private renderRows(): ListRow[] {
		const pages = this.formBuilderVc.getPageVcs()
		const rows: ListRow[] = []

		for (const page of pages) {
			rows.push({
				id: page.getId(),
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
								const didConfirm = await this.confirm({
									isDestructive: true,
									title: 'Are you sure?',
								})

								if (didConfirm) {
									await this.formBuilderVc.removePage(page.getIndex())
									this.listVc.setRows(this.renderRows())
								}
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
