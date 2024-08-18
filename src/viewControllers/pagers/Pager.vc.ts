import { SchemaError } from '@sprucelabs/schema'
import { Pager, ViewControllerOptions } from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class PagerViewController extends AbstractViewController<Pager> {
    private model: PagerViewControllerOptions
    private onChangeHandler?: Pager['onChangePage']
    public constructor(
        options: ViewControllerOptions & PagerViewControllerOptions
    ) {
        super(options)
        const { onChangePage, ...model } = removeUniversalViewOptions(options)
        this.model = model
        this.onChangeHandler = onChangePage
    }

    public setTotalPages(totalPages: number) {
        this.model.totalPages = totalPages
        this.triggerRender()
    }

    public setCurrentPage(page: number) {
        if (this.model.currentPage === page) {
            return
        }
        this.assertValidCurrentPage(page)
        this.model.currentPage = page
        this.onChangeHandler?.(page)
        this.triggerRender()
    }

    private assertValidCurrentPage(page: number) {
        const totalPages = this.model.totalPages

        if (!totalPages || page < 0 || page >= totalPages) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['currentPage'],
                friendlyMessage:
                    totalPages === undefined
                        ? 'You must set the total pages before setting the current page.'
                        : `Your current page must be greater than -1 and less than ${this.model.totalPages}.`,
            })
        }
    }

    public getTotalPages() {
        return this.model.totalPages ?? -1
    }

    public getCurrentPage() {
        return this.model.currentPage ?? -1
    }

    public render(): Pager {
        return {
            controller: this,
            setCurrentPage: (page) => {
                return this.setCurrentPage(page)
            },
            ...this.model,
        }
    }
}

export type PagerViewControllerOptions = Omit<
    Pager,
    'controller' | 'setCurrentPage'
>
