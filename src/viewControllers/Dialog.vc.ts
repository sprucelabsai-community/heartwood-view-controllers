import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { CardViewControllerImpl } from '..'
import {
    LayoutWidth,
    ViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default class DialogViewController extends AbstractViewController<Dialog> {
    private closeResolver?: () => void
    private closePromise?: Promise<unknown>
    private onCloseHandler?: DialogOptions['onClose']
    private transitionOutHandler?: () => Promise<void>
    private isVisible = false
    private cardVc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
    private shouldShowCloseButton: boolean
    private width?: LayoutWidth | null

    public constructor(
        options: ViewControllerOptions & Omit<DialogOptions, 'closeHandler'>
    ) {
        super(options)

        this.width = options.width
        this.shouldShowCloseButton = options.shouldShowCloseButton !== false
        this.cardVc = options.controller ?? this.Controller('card', options)
        this.onCloseHandler = options.onClose
        this.isVisible = !!options.isVisible
    }

    protected async handleClose() {
        await this.hide()
    }

    public show() {
        this.isVisible = true
        this.triggerRender()
    }

    public getIsVisible() {
        return this.isVisible
    }

    public getShouldShowCloseButton() {
        return this.shouldShowCloseButton
    }

    public async hide() {
        const results = await this.onCloseHandler?.()

        if (results === false) {
            return
        }

        await this.transitionOutHandler?.()

        this.isVisible = false

        this.closeResolver?.()
        this.triggerRender()

        await this.cardVc?.didHide?.()

        //@ts-ignore
        const cardParent = this.cardVc?.getParent?.()
        //@ts-ignore
        const myParent = this.getParent?.()

        if (cardParent && cardParent !== myParent) {
            await cardParent.didHide?.()
        }
    }

    public getCardVc() {
        return this.cardVc
    }

    public setIsBusy(isBusy: boolean) {
        ;(this.cardVc as CardViewControllerImpl)?.setIsBusy?.(isBusy)
        this.triggerRender()
    }

    public async wait() {
        if (!this.closeResolver) {
            this.closePromise = new Promise((resolve) => {
                this.closeResolver = resolve as any
            })
        }

        await this.closePromise
    }

    public render(): DialogOptions {
        return {
            ...this.cardVc.render(),
            width: this.width,
            //@ts-ignore
            controller: this,
            cardController: this.cardVc,
            isVisible: this.isVisible,
            shouldShowCloseButton: this.shouldShowCloseButton,
            closeHandler:
                this.shouldShowCloseButton !== false
                    ? this.handleClose.bind(this)
                    : undefined,
        }
    }
}

export type DialogOptions =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card &
        SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog

type Dialog = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog
export type DialogViewControllerOptions = Omit<Dialog, 'closeHandler'>
