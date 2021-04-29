import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewController, ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel = SpruceSchemas.Heartwood.v2021_02_11.Card
export type CardViewControllerOptions = ViewModel

type Section = SpruceSchemas.Heartwood.v2021_02_11.CardSection

export default class CardViewController
	extends AbstractViewController<ViewModel>
	implements ViewController<ViewModel> {
	private model: ViewModel
	private triggerRenderFooter?: () => void
	private triggerRenderHeader?: () => void
	private triggerRenderSections: (() => void)[] = []
	private sectionVcs: ViewController<Section>[] = []

	public constructor(
		options: CardViewControllerOptions & ViewControllerOptions
	) {
		super(options)
		this.model = options
	}

	public updateFooter(footer: NonNullable<ViewModel['footer']>) {
		this.model.footer = footer
		this.triggerRenderFooter?.()
	}

	public render(): ViewModel {
		const model: ViewModel = {
			...this.model,
			controller: this,
		}

		if (this.model.body) {
			model.body = { ...this.model.body }
		}

		if (model.footer) {
			model.footer = this.buildFooterVc()
		}

		if (model.header) {
			model.header = this.buildHeaderVc()
		}

		if (model.body?.sections) {
			model.body.sections = this.buildSectionVcs()
		}

		return model
	}

	private buildSectionVcs(): Section[] {
		return this.model.body?.sections?.map(
			this.buildSectionVc.bind(this)
		) as Section[]
	}

	private buildSectionVc(_: Section, idx: number) {
		if (!this.sectionVcs[idx]) {
			const sectionVc = {
				triggerRender: () => {},
				render: () => {
					this.triggerRenderSections[idx] = sectionVc.triggerRender
					const section = this.model.body?.sections?.[idx]

					return { ...section, controller: this }
				},
			}

			this.sectionVcs[idx] = sectionVc
		}

		return { controller: this.sectionVcs[idx] }
	}

	private buildFooterVc() {
		const footerVc = {
			triggerRender: () => {},
			render: () => {
				this.triggerRenderFooter = footerVc.triggerRender
				return { ...this.model.footer, controller: this }
			},
		}

		return {
			controller: footerVc,
		}
	}

	private buildHeaderVc() {
		const headerVc = {
			triggerRender: () => {},
			render: () => {
				this.triggerRenderHeader = headerVc.triggerRender
				return { ...this.model.header, controller: this }
			},
		}

		return {
			controller: headerVc,
		}
	}

	public setHeaderTitle(title: string | null) {
		if (title === null) {
			this.unsetHeaderField('title')
			return
		}

		this.model = {
			...this.model,
			header: {
				...this.model.header,
				title,
			},
		}

		this.triggerRenderHeader?.()
	}

	public setHeaderImage(image: string | null) {
		if (image === null) {
			this.unsetHeaderField('image')
			return
		}

		this.model = {
			...this.model,
			header: {
				...this.model.header,
				image,
			},
		}

		this.triggerRenderHeader?.()
	}

	private unsetHeaderField(key: string) {
		//@ts-ignore
		delete this.model.header?.[key]

		if (Object.keys(this.model.header ?? {}).length === 0) {
			delete this.model.header
		}
	}

	public updateSection(
		idx: number,
		section: SpruceSchemas.Heartwood.v2021_02_11.CardSection
	) {
		if (!this.model.body) {
			this.model.body = {}
		}

		if (!this.model.body.sections) {
			this.model.body.sections = []
		}

		this.model.body.sections[idx] = section

		this.triggerRenderSections[idx]?.()
	}

	public setHeaderSubtitle(subtitle: string) {
		this.model = {
			...this.model,
			header: {
				...this.model.header,
				subtitle,
			},
		}

		this.triggerRenderHeader?.()
	}

	//monkey patched by view
	public payAttentionToMe() {}
}
