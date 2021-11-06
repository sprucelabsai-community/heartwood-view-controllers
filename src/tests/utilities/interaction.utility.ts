import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert } from '@sprucelabs/test'
import { ListViewController } from '../..'
import { KeyboardKey, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import LoginViewController from '../../viewControllers/Login.vc'

type CardVc =
	ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
type FormVc = FormViewController<any> | BigFormViewController<any>

const interactionUtil = {
	async click(
		button?: {
			onClick?: ((options?: any) => void | Promise<void>) | null | undefined
		} | null,
		onClickOptions?: Record<string, any>
	) {
		//@ts-ignore
		const { onClick } = button ?? {}

		assert.isFunction(
			onClick,
			'Clicking failed because button does not have onClick set.'
		)
		//@ts-ignore
		await onClick(
			onClickOptions ?? {
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
			}
		)
	},

	async clickInFooter(
		vc: CardVc | FormVc,
		type: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button['type']
	) {
		const model = renderUtil.render(vc)
		const primary = pluckButtons(model).find((b) => b.type === type)

		//@ts-ignore
		if (!primary && model.shouldShowSubmitControls) {
			//@ts-ignore
			await this.submitForm(vc)
			return
		}

		assert.isTruthy(
			primary,
			`Your footer doesn't have button with type=${type} to click.`
		)

		return this.click(primary)
	},

	async clickPrimaryInFooter(vc: CardVc | FormVc) {
		return this.clickInFooter(vc, 'primary')
	},

	async clickSecondaryInFooter(vc: CardVc | FormVc) {
		return this.clickInFooter(vc, 'secondary')
	},

	async clickDestructiveInFooter(vc: CardVc | FormVc) {
		return this.clickInFooter(vc, 'destructive')
	},

	async clickOnDestructiveButtonInRow(
		listVc: ListViewController,
		row: number | 'string'
	) {
		const vc =
			typeof row === 'number' ? listVc.getRowVc(row) : listVc.getRowVcById(row)

		const model = renderUtil.render(vc)
		const destructiveButton = model.cells
			.map((c) => c.button)
			.find((button) => button?.type === 'destructive')

		assert.isTruthy(
			destructiveButton,
			`There is no button with type=destructive in this row to click!`
		)

		await this.click(destructiveButton, { rowVc: vc })
	},

	async submitForm(vc: FormVc) {
		if ((vc as BigFormViewController<any>).getTotalSlides) {
			const bigFormVc = vc as BigFormViewController<any>
			await bigFormVc.jumpToSlide(bigFormVc.getTotalSlides() - 1)
		}

		//@ts-ignore
		await renderUtil.render(vc).onSubmit?.()
	},

	async submitLoginForm(vc: LoginViewController, demoNumber: string) {
		if (demoNumber) {
			const formVc = vc.getLoginForm()

			//@ts-ignore
			const oldHandler = vc.loginHandler
			const promise = new Promise((resolve, reject) => {
				//@ts-ignore
				vc.loginHandler = async () => {
					//@ts-ignore
					await oldHandler?.()

					//@ts-ignore
					resolve()
				}
				//@ts-ignore

				vc.loginFailedHandler = (err) => {
					reject(err)
				}
			})

			formVc.setValue('phone', demoNumber)

			await formVc.submit()

			formVc.setValue('code', demoNumber.substr(demoNumber.length - 4))

			await promise

			return
		}
		assert.fail('Expected a LoginFormController')
	},

	async keyDownOnElementInRow(options: {
		vc: ListRowViewController
		key: KeyboardKey
		cellIdx: number
	}) {
		const model = renderUtil.render(options.vc)
		const cell = model.cells[options.cellIdx]
		const element = cell.button || cell.selectInput || cell.textInput

		if (!element) {
			assert.fail(
				`No button, selectInput, or textInput set cell ${options.cellIdx} does not have \`onKeyDown\` set.`
			)
		}
		//@ts-ignore
		if (!element.onKeyDown) {
			assert.fail(
				`Your element in cell ${options.cellIdx} does not have \`onKeyDown\` set.`
			)
		}

		//@ts-ignore
		await element.onKeyDown({ key: options.key, rowVc: options.vc })
	},
}

export default interactionUtil

function pluckButtons(
	model:
		| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
		| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any>
) {
	//@ts-ignore
	return (model.criticalError?.buttons ??
		model.footer?.buttons ??
		[]) as SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
}
