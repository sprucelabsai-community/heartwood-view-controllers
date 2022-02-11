import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import { ViewController, ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
export type CardViewControllerOptions = ViewModel

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type Body = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody
type Header = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader

export default class CardViewController<V extends ViewModel = ViewModel>
	extends AbstractViewController<V>
	implements ViewController<V>
{
	protected model: V
	private triggerRenderFooter?: () => void
	private triggerRenderHeader?: () => void
	private triggerRenderSections: (() => void)[] = []
	private sectionVcs: ViewController<Section>[] = []

	public constructor(options: V & ViewControllerOptions) {
		super(options)
		this.model = options
	}

	public setFooter(footer: V['footer']) {
		const hadFooter = !!this.model.footer
		this.model.footer = footer
		if (!footer || !hadFooter) {
			this.triggerRender()
		} else {
			this.triggerRenderFooter?.()
		}
	}

	public getHasCriticalError() {
		return !!this.model.criticalError
	}

	public setCriticalError(criticalError: ViewModel['criticalError']) {
		this.model.criticalError = criticalError
		this.triggerRender()
	}

	public clearCriticalError() {
		delete this.model.criticalError
		this.triggerRender()
	}

	private buildSectionVcs(): Section[] {
		return this.model.body?.sections?.map?.(
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

	public setHeaderSubtitle(subtitle: string | null) {
		this.model = {
			...this.model,
			header: {
				...this.model.header,
				subtitle,
			},
		}

		this.triggerRenderHeader?.()
	}

	public getHeaderTitle(): string | undefined {
		return this.model.header?.title ?? undefined
	}

	public getHeaderSubtitle(): string | undefined {
		return this.model.header?.subtitle ?? undefined
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

	public getSection(idx: number) {
		const section = this.getSections()?.[idx]
		if (!section) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `There is no section at index ${idx}.`,
				parameters: ['sectionIdx'],
			})
		}

		return section
	}

	public setSection(idx: number, section: Section) {
		this.ensureSectionsExist()

		if (!this.model.body?.sections?.[idx]) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Can't update section at index ${idx} because there isn't one.`,
				parameters: ['sectionIdx'],
			})
		}

		if (this.model.body?.sections) {
			this.model.body.sections[idx] = section
			this.triggerRenderSections[idx]?.()
		}
	}

	public setSections(sections: Section[]) {
		this.ensureSectionsExist()
		if (this.model.body) {
			this.model.body.sections = [...sections]
		}

		this.triggerRender()
	}

	private ensureSectionsExist() {
		if (!this.model.body) {
			this.model.body = {}
		}

		if (!this.model.body.sections) {
			this.model.body.sections = []
		}
	}

	public addSection(section: Section) {
		this.ensureSectionsExist()
		const sections = this.model.body?.sections
		if (sections) {
			sections.push(section)
		}

		this.triggerRender()
	}

	public getSections() {
		return this.model.body?.sections
	}

	public removeSection(idx: number) {
		this.model.body?.sections?.splice(idx, 1)
		this.triggerRender()
	}

	public addSectionAtIndex(idx: number, section: Section) {
		const sections = this.getSections() ?? []
		sections.splice(idx, 0, section)

		this.ensureSectionsExist()

		if (this.model.body?.sections) {
			this.model.body.sections = sections
		}

		this.triggerRender()
	}

	public getTotalSections(): number {
		return this.model.body?.sections?.length ?? 0
	}

	public isBusy(): boolean {
		return this.model.body?.isBusy ?? false
	}

	public getIsFooterEnabled(): boolean {
		return this.model.footer?.isEnabled ?? true
	}

	public disableFooter() {
		this.model.footer = {
			...this.model.footer,
			isEnabled: false,
		}
		this.triggerRender()
	}

	public enableFooter() {
		this.model.footer = {
			...this.model.footer,
			isEnabled: true,
		}
		this.triggerRender()
	}

	public setIsBusy(isBusy: boolean) {
		if (!this.model.body) {
			this.model.body = {}
		}

		this.model.body.isBusy = isBusy

		this.triggerRender()
	}

	public setFooterIsBusy(isBusy: boolean) {
		if (this.model.footer) {
			this.model.footer.isBusy = isBusy
			this.triggerRender()
		}
	}

	public setBody(body: Body) {
		this.model.body = { ...body }
		this.triggerRender()
	}

	//monkey patched by view
	public payAttentionToMe() {}

	public setHeader(header: Header | null) {
		const oldHeader = this.model.header
		this.model.header = header

		if (header && oldHeader) {
			this.triggerRenderHeader?.()
		} else {
			this.triggerRender()
		}
	}

	public render(): V {
		const model: V = {
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
}
