import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import SpruceError from '../../errors/SpruceError'
import {
    ListRow,
    RowValues,
    TriggerRenderHandler,
    ViewController,
} from '../../types/heartwood.types'
import listUtil from './list.utility'
import ListCellViewController from './ListCell.vc'

export default class ListRowViewController
    implements
        ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow>
{
    private cellVcs: ListCellViewController[] = []
    private get model() {
        return this.getModelHandler()
    }

    private setValueHandler: (name: string, value: any) => void | Promise<void>
    private getValuesHandler: () => Record<string, any>
    private deleteRowHandler: () => void
    private _isLastRow: boolean
    private setIsSelectedHandler: (isSelected: boolean) => void
    private setIsEnabledHandler: (isEnabled: boolean) => void
    private getModelHandler: () => ListRow
    private id: string

    public constructor(
        options: ListRow & {
            setValue: (name: string, value: any) => void | Promise<void>
            getValues: () => Record<string, any>
            deleteRow: () => void
            setIsSelected: (isSelected: boolean) => void
            setIsEnabled: (isEnabled: boolean) => void
            getModel: () => ListRow
            isLastRow: boolean
            id: string
        }
    ) {
        const {
            setValue,
            getValues,
            deleteRow,
            setIsSelected,
            isLastRow,
            getModel,
            setIsEnabled,
            id,
        } = options

        this.getModelHandler = getModel
        this.id = id
        this.setValueHandler = setValue
        this.getValuesHandler = getValues
        this.deleteRowHandler = deleteRow
        this.setIsSelectedHandler = setIsSelected
        this.setIsEnabledHandler = setIsEnabled

        this._isLastRow = isLastRow
    }

    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public async setValue(name: string, value: any) {
        await this._setValue(name, value)
        this.triggerRender()
    }

    private async _setValue(name: string, value: any) {
        await this.setValueHandler(name, value)
    }

    public hasInput(name: string): boolean {
        return this.model.cells.reduce((hasInput, cell) => {
            return hasInput || !!listUtil.getInputFromCell(cell, name)
        }, false)
    }

    public getValues(): RowValues {
        return this.getValuesHandler()
    }

    public getValue(fieldName: string): any {
        const values = this.getValues()

        if (fieldName in values) {
            return values[fieldName]
        }

        throw new SchemaError({
            code: 'INVALID_PARAMETERS',
            parameters: ['fieldName'],
            friendlyMessage: `I could not find an input named '${fieldName}' in row '${this.getId()}'!`,
        })
    }

    public isLastRow(): boolean {
        return this._isLastRow
    }

    public delete() {
        this.deleteRowHandler()
    }

    public getId() {
        return this.model.id
    }

    public getIsSelected(): boolean {
        return this.model.isSelected ?? false
    }

    public setIsEnabled(isEnabled: boolean) {
        this.setIsEnabledHandler(isEnabled)
        this.triggerRender()
    }

    public getIsEnabled() {
        return this.model.isEnabled !== false
    }

    public setIsSelected(isSelected: boolean) {
        this.setIsSelectedHandler(isSelected)
        this.triggerRender()
    }

    public getIsDeleted() {
        return !this.getModelHandler()
    }

    public getCellVc(idx: number) {
        if (!this.cellVcs[idx]) {
            const cell = this.model.cells[idx]

            if (!cell) {
                throw new SchemaError({
                    code: 'INVALID_PARAMETERS',
                    parameters: ['cellIdx'],
                })
            }

            this.cellVcs[idx] = new ListCellViewController({
                getViewModel: () => this.model?.cells[idx],
                setValue: this._setValue.bind(this),
            })
        }

        return this.cellVcs[idx]
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow {
        if (this.getIsDeleted()) {
            throw new SpruceError({ code: 'ROW_DELETED', row: this.id })
        }

        const model = this.model

        return {
            ...model,
            controller: this,
            cells: model.cells.map((_cell, idx) => ({
                ...this.getCellVc(idx).render(),
            })),
        }
    }
}
