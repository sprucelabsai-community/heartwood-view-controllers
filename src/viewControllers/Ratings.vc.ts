import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas, ViewControllerOptions } from '..'
import AbstractViewController from './Abstract.vc'

type Ratings = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings
export type RatingsViewControllerOptions = Ratings

export default class RatingsViewController extends AbstractViewController<Ratings> {
    private model: Ratings

    public constructor(options: ViewControllerOptions & Ratings) {
        super(options)

        const value = options.value
        const icon = options.icon

        this.assertValidIcon(icon)
        this.assertValueInRange(value)

        this.model = {
            canBeChanged: false,
            ...options,
        }
    }

    private assertValidIcon(icon: string | null | undefined) {
        if (icon && icon !== 'star' && icon !== 'radio') {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['icon'],
                friendlyMessage: `Render as can only be 'star' or 'radio'.`,
            })
        }
    }

    private assertValueInRange(value?: number | null) {
        if (value && (value < 0 || value > 1)) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['value'],
                friendlyMessage: 'Rating value must be between zero and one.',
            })
        }
    }

    public setIcon(icon: NonNullable<Ratings['icon']>) {
        this.assertValidIcon(icon)
        this.model.icon = icon
        this.triggerRender()
    }

    public getIcon() {
        return this.model.icon
    }

    public setCanBeChanged(canBeChanged: boolean) {
        this.model.canBeChanged = canBeChanged
    }

    public getCanBeChanged(): boolean {
        return this.model.canBeChanged ?? false
    }

    public setValue(value: number) {
        this.assertValueInRange(value)
        this.model.value = value
        this.model.onChange?.(value)
        this.triggerRender()
    }

    public getValue() {
        return this.model.value
    }

    public render(): Ratings {
        return {
            //@ts-ignore
            controller: this,
            ...this.model,
        }
    }
}
