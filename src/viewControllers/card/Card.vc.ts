import { SchemaError } from '@sprucelabs/schema'
import {
    Card,
    CardBody,
    CardFooter,
    CardFooterLayout,
    CardHeader,
    CardSection,
    CriticalError,
    TriggerRenderHandler,
    ViewController,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import sectionIdOrIdxToIdx from './sectionIdOrIdxToIdx'

export default class CardViewController<V extends Card = Card>
    extends AbstractViewController<V>
    implements ViewController<V>
{
    protected model: V
    private triggerRenderFooter?: () => void
    private triggerRenderHeader?: () => void
    private triggerRenderSections: (() => void)[] = []
    private sectionVcs: SectionVc[] = []
    private footerLayout?: CardFooterLayout

    public constructor(options: V & ViewControllerOptions) {
        super(options)
        this.model = options
    }

    public setFooter(footer: V['footer']) {
        const hadFooter = !!this.model.footer
        this.model.footer = footer
        if (this.model.footer) {
            this.model.footer.layout = this.footerLayout
        }
        if (!footer || !hadFooter) {
            this.triggerRender()
        } else {
            this.triggerRenderFooter?.()
        }
    }

    public getHasCriticalError() {
        return !!this.model.criticalError
    }

    public setCriticalError(criticalError: CriticalError) {
        this.model.criticalError = criticalError
        this.triggerRender()
    }

    public clearCriticalError() {
        delete this.model.criticalError
        this.triggerRender()
    }

    private buildSectionVcs(): CardSection[] {
        return this.model.body?.sections?.map?.((_, idx) => ({
            controller: this.getSectionVc(idx),
        })) as CardSection[]
    }

    public getSectionVc(section: string | number) {
        let idx: number = this.assertValidIdOrIdx(section)
        if (this.model.body?.sections?.[idx]?.controller) {
            return this.model.body.sections[idx]
                .controller as ViewController<CardSection>
        }
        if (!this.sectionVcs[idx]) {
            const sectionVc = this.SectionVc(idx)
            this.sectionVcs[idx] = sectionVc
        }

        return this.sectionVcs[idx]
    }

    private SectionVc(idx: number): ViewController<CardSection> {
        const sectionVc: SectionVc = {
            triggerRender: () => {},
            idx,
            setTriggerRenderHandler(handler: TriggerRenderHandler) {
                this.triggerRender = handler
            },
            render: () => {
                const idx = sectionVc.idx!
                this.triggerRenderSections[idx] = sectionVc.triggerRender
                const section = this.model.body?.sections?.[idx]
                return {
                    ...section,
                    controller: this.getSectionVc(idx),
                }
            },
        }

        return sectionVc
    }

    private buildFooterVc(): CardFooter {
        const footerVc = {
            triggerRender: () => {},
            render: () => {
                this.triggerRenderFooter = footerVc.triggerRender
                return { ...this.model.footer, controller: this }
            },
            setTriggerRenderHandler(handler: TriggerRenderHandler) {
                this.triggerRender = handler
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
            setTriggerRenderHandler(handler: TriggerRenderHandler) {
                this.triggerRender = handler
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

        const hasHeader = !!this.model.header

        this.model = {
            ...this.model,
            header: {
                ...this.model.header,
                title,
            },
        }

        if (hasHeader) {
            this.triggerRenderHeader?.()
        } else {
            this.triggerRender()
        }
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

    public getHeader() {
        return this.model.header
    }

    public getFooter() {
        return this.model.footer
    }

    public getHeaderSubtitle(): string | undefined {
        return this.model.header?.subtitle ?? undefined
    }

    public setHeaderImage(image: string | null) {
        if (image === null) {
            this.unsetHeaderField('image')
            this.triggerRenderHeader?.()
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

    public setBackgroundImage(image: string | null) {
        this.model.backgroundImage = image
        this.triggerRender()
    }

    private unsetHeaderField(key: string) {
        //@ts-ignore
        delete this.model.header?.[key]

        if (Object.keys(this.model.header ?? {}).length === 0) {
            delete this.model.header
        }
    }

    public getSection(idOrIdx: number | string) {
        const idx = this.sectionIdOrIdxToIdx(idOrIdx)
        const section = this.getSections()?.[idx]

        if (!section) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                friendlyMessage: `There is no section at  '${idOrIdx}'.`,
                parameters: ['sectionIdx'],
            })
        }

        return section
    }

    private sectionIdOrIdxToIdx(idOrIdx: string | number): number {
        return sectionIdOrIdxToIdx(this.getSections() ?? [], idOrIdx)
    }

    public updateSection(
        idOrIdx: number | string,
        updates: Partial<CardSection>
    ) {
        let idx: number = this.assertValidIdOrIdx(idOrIdx)
        if (this.model.body?.sections?.[idx]) {
            this.model.body.sections[idx] = {
                ...this.model.body.sections[idx],
                ...updates,
            }
        }

        const controller = updates.controller
        if (controller) {
            this.triggerRender()
        } else {
            const vc = this.getSectionVc(idx)
            vc.triggerRender()
        }
    }

    public setSection(idOrIdx: number | string, section: CardSection) {
        this.ensureSectionsExist()

        let idx: number = this.assertValidIdOrIdx(idOrIdx)

        if (this.model.body?.sections) {
            const existingId = this.model.body?.sections?.[idx]?.id
            if (existingId) {
                section.id = existingId
            }
            this.model.body.sections[idx] = section
            this.triggerRenderSections[idx]?.()
        }
    }

    private assertValidIdOrIdx(idOrIdx: string | number) {
        let idx: number = sectionIdOrIdxToIdx(this.getSections(), idOrIdx)
        if (!this.model.body?.sections?.[idx]) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                friendlyMessage: `Can't update section at index ${idOrIdx} because there isn't one.`,
                parameters: ['section'],
            })
        }
        return idx
    }

    public setSections(sections: CardSection[]) {
        this.ensureSectionsExist()

        if (this.model.body) {
            this.model.body.sections = [...sections]
        }

        this.sectionVcs = sections.map(
            (section) => section.controller as ViewController<CardSection>
        )

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

    public addSection(section: CardSection) {
        this.ensureSectionsExist()

        const sections = this.model.body?.sections
        if (sections) {
            sections.push(section)
        }

        this.sectionVcs.push(section.controller as ViewController<CardSection>)

        this.triggerRender()
    }

    public getSections() {
        return this.model.body?.sections
    }

    public removeSection(idOrIdx: number | string) {
        const idx = this.assertValidIdOrIdx(idOrIdx)
        this.model.body?.sections?.splice(idx, 1)
        this.sectionVcs.splice(idx, 1)
        this.sectionVcs.forEach((vc, i) => {
            if (vc) {
                vc.idx = i
            }
        })
        this.triggerRender()
    }

    public addSectionAtIndex(idx: number, section: CardSection) {
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

    public getIsFooterBusy(): boolean {
        return this.model.footer?.isBusy ?? false
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

    public setBody(body: CardBody | null | undefined) {
        this.model.body = body ? { ...body } : body
        this.triggerRender()
    }

    public getBody() {
        return this.model.body
    }

    //monkey patched by view
    public payAttentionToMe() {}

    public setHeader(header: CardHeader | null | undefined) {
        const oldHeader = this.model.header
        this.model.header = header

        if (header && oldHeader) {
            this.triggerRenderHeader?.()
        } else {
            this.triggerRender()
        }
    }

    public setFooterLayout(layout: CardFooterLayout) {
        this.footerLayout = layout
        if (this.model.footer) {
            this.model.footer.layout = layout
        }

        this.triggerRenderFooter?.()
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

export type CardViewControllerOptions = Card

type SectionVc = ViewController<CardSection> & {
    idx?: number
}
