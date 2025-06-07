import { Schema, SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { functionDelegationUtil } from '@sprucelabs/spruce-skill-utils'
import buildForm from '../../builders/buildForm'
import {
    Button,
    CardFooter,
    FormBuilder,
    FormBuilderPage,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import AbstractViewController from '../Abstract.vc'
import SwipeCardViewController from '../SwipeCard.vc'
import EditFormBuilderFieldCardViewController from './EditFormBuilderFieldCard.vc'
import EditFormBuilderSectionCardViewController, {
    EditFormBuilderSectionOptions,
    SimpleSection,
} from './EditFormBuilderSectionCard.vc'
import {
    FormBuilderPageViewController,
    FormBuilderPageViewControllerImpl,
} from './FormBuilderPage.vc'
import ManagePageTitlesCardViewController from './ManagePageTitlesCard.vc'

export default class FormBuilderCardViewController extends AbstractViewController<Card> {
    private swipeVc: SwipeCardViewController
    private footerOverride?:
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
        | null
        | undefined

    private shouldAllowEditing?: boolean
    //@ts-ignore
    private __isFormBuilder = true

    public constructor(
        options: FormBuilderCardViewControllerOptions & ViewControllerOptions
    ) {
        super(options)

        const { isBusy, footer, header, shouldAllowEditing, id } = options

        this.footerOverride = footer
        this.shouldAllowEditing = shouldAllowEditing ?? true

        this.swipeVc = this.SwipeCardVC(id, isBusy, header)

        functionDelegationUtil.delegateFunctionCalls(this, this.swipeVc)

        this.swipeVc.setTriggerRenderHandler(() => this.triggerRender())

        this.mixinControllers({
            'edit-form-builder-section':
                EditFormBuilderSectionCardViewController,
            'manage-page-titles': ManagePageTitlesCardViewController,
            'edit-form-builder-field': EditFormBuilderFieldCardViewController,
        })
    }

    private SwipeCardVC(
        id: string | undefined,
        isBusy: boolean | undefined,
        header:
            | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader
            | null
            | undefined
    ): SwipeCardViewController {
        return this.Controller('swipe-card', {
            id,
            isBusy,
            header: {
                title: 'Building your form',
                ...header,
            },
            slides: [this.buildSlideForNewPage()],
            footer: this.buildFooter(),
        })
    }

    private buildFooter(): CardFooter {
        if (this.footerOverride) {
            return this.footerOverride
        }

        const buttons: Button[] = [
            {
                id: 'add-page',
                label: 'Add page',
                onClick: this.handleClickAddPage.bind(this),
            },
        ]

        if (this.getTotalPages() > 1) {
            buttons.push({
                id: 'remove-page',
                label: 'Remove page',
                onClick: this.removePresentPage.bind(this),
            })
        }

        return {
            buttons,
        }
    }

    private buildSlideForNewPage(options?: Partial<FormBuilderPage>): {
        title: string
        form: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<Schema>
    } {
        return {
            title: this.buildNextPageTitle(),
            form: this.renderNewForm(options),
            ...options,
        }
    }

    private renderNewForm(
        options?: Partial<FormBuilderPage>
    ): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<Schema> {
        return this.Controller('form', {
            shouldShowSubmitControls: false,
            schema: options?.schema ?? {
                id: `formBuilder${this.getTotalPages() + 1}`,
                fields: {
                    field1: this.buildField(0),
                },
            },
            //@ts-ignore
            sections: options?.sections ?? [
                {
                    title: 'Section 1',
                    fields: [{ name: 'field1' }],
                },
            ],
        }).render()
    }

    public buildField(fieldIdx: number) {
        return {
            type: 'text',
            label: `Field ${fieldIdx + 1}`,
        }
    }

    private buildNextPageTitle(): string {
        return `Page ${this.getTotalPages() + 1}`
    }

    public getTotalPages() {
        return this.swipeVc?.getSlides()?.length ?? 0
    }

    public setHeaderTitle(title: string) {
        this.swipeVc.setHeaderTitle(title)
    }

    public setHeaderSubtitle(title: string) {
        this.swipeVc.setHeaderSubtitle(title)
    }

    public async addPage(
        options?: {
            atIndex?: number
            title?: string
        } & Partial<FormBuilderPage>
    ) {
        const { atIndex: idx } = options ?? {}

        if (typeof idx === 'number') {
            this.swipeVc.addSlideAtIndex(
                idx,
                this.buildSlideForNewPage(options)
            )
        } else {
            this.swipeVc.addSlide(this.buildSlideForNewPage(options))
        }

        this.swipeVc.setFooter(this.buildFooter())
    }

    public async removePage(idx: number) {
        this.swipeVc.removeSlide(idx)
        this.swipeVc.setFooter(this.buildFooter())
        await this.swipeVc.jumpToSlide(Math.max(idx - 1, 0))
    }

    public async removePresentPage() {
        const idx = this.getPresentPage()
        await this.removePage(idx)
    }

    public getPage(idx: number) {
        return this.swipeVc.getSlide(idx)
    }

    public getPageVc(idx: number): FormBuilderPageViewController {
        const slide = this.getPage(idx)
        const formVc = slide.form?.controller

        if (!formVc) {
            throw new Error(`Form not set for page ${idx}`)
        }

        return new FormBuilderPageViewControllerImpl({
            formVc,
            setTitleHandler: (title) => {
                slide.title = title
                this.triggerRender()
            },
            title: slide.title ?? '**MISSING**',
            index: idx,
            fieldBuilder: this.buildField.bind(this),
        }) as any
    }

    public getPresentPage(): number {
        return this.swipeVc.getPresentSlide()
    }

    public getPresentPageVc() {
        return this.getPageVc(this.getPresentPage())
    }

    public async jumpToPage(idx: number) {
        await this.swipeVc.jumpToSlide(idx)
    }

    public getPageVcs() {
        return (
            this.swipeVc.getSlides()?.map((_, idx) => {
                return this.getPageVc(idx)
            }) ?? []
        )
    }

    public async handleClickDeletePage() {
        const confirm = await this.confirm({
            title: 'Are you sure?',
            isDestructive: true,
        })

        if (confirm) {
            await this.removePresentPage()
        }
    }

    public async handleClickAddPage() {
        const addPageForm = this.Controller(
            'form',
            buildForm({
                id: 'addPageForm',
                schema: {
                    id: 'addPage',
                    fields: {
                        title: {
                            label: 'Page name',
                            type: 'text',
                            isRequired: true,
                        },
                    },
                },
                sections: [
                    {
                        fields: [
                            {
                                name: 'title',
                                placeholder: this.buildNextPageTitle(),
                            },
                        ],
                    },
                ],
                shouldShowCancelButton: false,
                submitButtonLabel: 'Add page',
                onSubmit: async ({ values }) => {
                    if (values.title) {
                        void dialog.hide()
                        await this.addPage({
                            title: values.title,
                        })
                    }
                },
            })
        )

        const dialog = this.renderInDialog({
            header: { title: 'Add page' },
            body: { sections: [{ form: addPageForm.render() }] },
        })
    }

    public handleClickAddSection(clickedSectionIdx: number) {
        this.getPresentPageVc().getSection(clickedSectionIdx)

        const vc = this.EditSectionVc({
            onDone: async (section) => {
                void dialog.hide()
                const pageVc = this.getPresentPageVc()
                pageVc.addSection({
                    ...section,
                    atIndex: clickedSectionIdx + 1,
                })
            },
        })
        const dialog = this.renderInDialog(vc.render())
    }

    public setShouldAllowEditing(shouldAllow: boolean) {
        this.shouldAllowEditing = shouldAllow
    }
    public getShouldAllowEditing() {
        return this.shouldAllowEditing ?? true
    }

    public handleClickEditSection(clickedSectionIdx: number) {
        const pageVc = this.getPresentPageVc()
        const section = { ...pageVc.getSection(clickedSectionIdx) }

        const fields = normalizeFormSectionFieldNamesUtil
            //@ts-ignore
            .toNames<any>(section.fields ?? [])
            .map((f) => pageVc.getField(f as never))

        //@ts-ignore
        section.fields = fields

        const vc = this.EditSectionVc({
            editingSection: section,
            onDone: async (section) => {
                void dialog.hide()
                const pageVc = this.getPresentPageVc()
                pageVc.setSection(clickedSectionIdx, section)
            },
        })
        const dialog = this.renderInDialog(vc.render())
    }

    public handleClickPageTitles() {
        const vc = this.Controller('manage-page-titles' as any, {
            onDone: () => {
                void dialog.hide()
            },
            formBuilderVc: this,
        })

        const dialog = this.renderInDialog({ ...vc.render() })
    }

    public EditSectionVc(options: {
        onDone: EditFormBuilderSectionOptions['onDone']
        editingSection?: SimpleSection
    }) {
        const { onDone, editingSection } = options

        const editSectionVc = this.Controller(
            'edit-form-builder-section' as any,
            {
                onDone,
                pageSchema: this.getPresentPageVc().getSchema(),
                editSection: editingSection,
                defaultTitle: `Section ${this.getPresentPageVc().getTotalSections() + 1}`,
            }
        ) as EditFormBuilderSectionCardViewController

        return editSectionVc
    }

    public handleClickEditField(fieldName: string) {
        const pageVc = this.getPresentPageVc()
        const field = pageVc.getField(fieldName as never) as any

        const vc = this.Controller('edit-form-builder-field', {
            name: fieldName,
            label: field.label,
            type: field.type,
            renderOptions: field.renderOptions,
            field: {
                ...field,
            },
            onDone: (fieldDefinition, renderOptions) => {
                void dialog.hide()
                const { name } = renderOptions

                pageVc.updateField(fieldName as never, {
                    newName: name,
                    fieldDefinition,
                    renderOptions,
                })
            },
        })

        const dialog = this.renderInDialog({ ...vc.render() })
    }

    public async toObject(): Promise<FormBuilder> {
        const object = renderUtil.render(this, {
            shouldStripControllers: true,
            shouldStripFunctions: true,
            shouldStripPrivateFields: true,
        })

        return {
            title: object.header?.title ?? 'MISSING',
            subtitle: object.header?.subtitle,
            pages:
                object.body?.sections?.map((s) => {
                    return {
                        title: s.title as string,
                        schema: s.form?.schema as Schema,
                        sections: s.form?.sections ?? [],
                    }
                }) ?? [],
        }
    }

    public async importObject(imported: FormBuilder<any>) {
        this.swipeVc.setHeaderTitle(imported.title)
        imported.subtitle && this.swipeVc.setHeaderSubtitle(imported.subtitle)
        this.swipeVc.setSections([])

        for (const page of imported.pages) {
            await this.addPage(page)
        }
    }

    public getValues() {
        return this.getPageVcs().map((vc) => vc.getValues())
    }

    public async setValues(values: Record<string, any>[]) {
        if (!Array.isArray(values)) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['values'],
                friendlyMessage: 'Values must be an array!',
            })
        }

        await Promise.all(
            values.map((values, idx) => this.getPageVc(idx).setValues(values))
        )
    }

    public render(): Card {
        return {
            ...this.swipeVc.render(),
            controller: this as any,
            shouldAllowEditing: this.shouldAllowEditing,
        }
    }
}

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card & {
    shouldAllowEditing?: boolean
}

export interface FormBuilderCardViewControllerOptions {
    header?: Card['header']
    footer?: Card['footer']
    shouldAllowEditing?: boolean
    id?: string
    isBusy?: boolean
}
