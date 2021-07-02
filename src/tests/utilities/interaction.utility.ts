import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert } from '@sprucelabs/test'
import { ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import FormViewController from '../../viewControllers/Form.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'

type CardVc = ViewController<SpruceSchemas.Heartwood.v2021_02_11.Card>
type FormVc = FormViewController<any>

const interactionUtil = {
	async click(onClick: (() => void | Promise<void>) | null | undefined) {
		assert.isFunction(onClick, 'Clicking failed because onClick is not set.')
		//@ts-ignore
		await onClick({
			altKey: false,
			bubbles: true,
			button: 0,
			buttons: 0,
			cancelable: true,
			clientX: 269,
			clientY: 433,
			ctrlKey: false,
			currentTarget: `button.button.has_label`,
			defaultPrevented: false,
			detail: 9,
			eventPhase: 3,
			getModifierState: () => {},
			isDefaultPrevented: () => {},
			isPropagationStopped: () => {},
			isTrusted: true,
			metaKey: false,
			movementX: 0,
			movementY: 0,
			nativeEvent: {},
			pageX: 269,
			pageY: 433,
			relatedTarget: null,
			screenX: 2317,
			screenY: 612,
			shiftKey: false,
			target: `button.button.has_label`,
			timeStamp: 19915.5,
			title: 'Page 10',
			type: 'click',
			view: {},
		})
	},

	async clickPrimaryInFooter(vc: CardVc) {
		const model = renderUtil.render(vc)
		const primary = model.footer?.buttons?.find((b) => b.type === 'primary')
		assert.isTruthy(
			primary,
			`Your footer doesn't have button with type=primary to click.`
		)

		return this.click(primary.onClick)
	},

	async clickSecondaryInFooter(vc: CardVc | FormVc) {
		const model = renderUtil.render(vc)
		const secondary = model.footer?.buttons?.find((b) => b.type === 'secondary')
		assert.isTruthy(
			secondary,
			`Your footer doesn't button with type=secondary footer to click.`
		)

		return this.click(secondary.onClick)
	},

	async clickOnDestructiveButton(vc: ListRowViewController) {
		const model = renderUtil.render(vc)
		const destructiveButton = model.cells
			.map((c) => c.button)
			.find((button) => button?.type === 'destructive')

		assert.isTruthy(
			destructiveButton,
			`There is no button with type=destructive in this row to click!`
		)

		await this.click(destructiveButton.onClick)
	},

	async submitForm(vc: FormVc) {
		await vc.submit()
	},
}

export default interactionUtil
