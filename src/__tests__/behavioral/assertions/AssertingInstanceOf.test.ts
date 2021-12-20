import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import {
	AbstractSkillViewController,
	AbstractViewController,
	ActiveRecordCardViewController,
	vcAssertUtil,
} from '../../..'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/Card.vc'
import FormViewController from '../../../viewControllers/Form.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class FancyCardViewController extends AbstractViewController<Card> {
	public cardVc: any
	public constructor(options: any) {
		super(options)
		this.cardVc = this.Controller('card', {})
	}

	public render(): Card {
		return this.cardVc.render()
	}
}

class ActiveCard extends AbstractViewController<Card> {
	private activeRecordVc: ActiveRecordCardViewController
	public constructor(options: any) {
		super(options)

		this.activeRecordVc = this.Controller(
			'activeRecordCard',
			buildActiveRecordCard({
				id: 'active',
				eventName: 'list-skills::v2020_12_25',
				responseKey: 'skills',
				rowTransformer: (s) => ({
					id: s.id,
					cells: [],
				}),
			})
		)
	}

	public render() {
		return this.activeRecordVc.render()
	}
}

class ActiveRecordSkillViewController extends AbstractSkillViewController {
	private activeCardVc: ActiveCard
	public constructor(options: any) {
		super(options)
		//@ts-ignore
		this.activeCardVc = this.Controller('activeCard', {})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [
				{
					cards: [this.activeCardVc.render()],
				},
			],
		}
	}
}

class DialogSkillViewController extends AbstractSkillViewController {
	private dialogCardVc: DialogCardViewController
	public constructor(options: any) {
		super(options)
		//@ts-ignore
		this.dialogCardVc = this.Controller('dialogCard', {}) as any
	}

	public async showDialog() {
		this.renderInDialog({
			...this.dialogCardVc.render(),
		})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [
				{
					cards: [],
				},
			],
		}
	}
}

class DialogCardViewController extends AbstractViewController<Card> {
	private cardVc: CardViewController
	public constructor(options: any) {
		super(options)
		this.cardVc = this.Controller('card', {})
	}

	public render(): Card {
		return this.cardVc.render()
	}
}

export default class AssertingInstanceOfTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		fancy: FancyCardViewController,
		activeSvc: ActiveRecordSkillViewController,
		activeCard: ActiveCard,
		dialogSvc: DialogSkillViewController,
		dialogCard: DialogCardViewController,
	}

	@test()
	protected static hasInstanceOf() {
		assert.isFunction(vcAssertUtil.assertControllerInstanceOf)
	}

	@test()
	protected static throwsWhenPassedNoInstanceOf() {
		const vc = this.Controller('card', {})
		assert.doesThrow(() =>
			vcAssertUtil.assertControllerInstanceOf(vc, FormViewController)
		)
	}

	@test()
	protected static knowsWhenPassedCorrectClassReference() {
		const vc = this.Controller('card', {})
		vcAssertUtil.assertControllerInstanceOf(vc, CardViewController)
	}

	@test()
	protected static knowsWhenVcDelegatesRender() {
		//@ts-ignore
		const vc = this.Controller('fancy', {}) as any

		vcAssertUtil.assertControllerInstanceOf(vc, FancyCardViewController)
	}

	@test()
	protected static looksUp1ParentToCheckInstanceOf() {
		//@ts-ignore
		const model = this.render(this.Controller('fancy', {}))

		vcAssertUtil.assertControllerInstanceOf(
			model.controller as any,
			FancyCardViewController
		)
	}

	@test()
	protected static canCheckIfRendersAsInstanceOf() {
		const vc = this.Controller('fancy', {}) as FancyCardViewController

		assert.doesThrow(() =>
			vcAssertUtil.assertRendersAsInstanceOf(vc, FormViewController)
		)

		const match1 = vcAssertUtil.assertRendersAsInstanceOf(
			vc,
			CardViewController
		)

		//@ts-ignore
		assert.isEqual(match1, vc.cardVc)

		const match2 = vcAssertUtil.assertRendersAsInstanceOf(
			vc,
			FancyCardViewController
		)

		assert.isEqual(match2, vc)
	}

	@test()
	protected static canGetCardFromSkillView() {
		//@ts-ignore
		const svc = this.Controller('activeSvc', {})
		//@ts-ignore
		const match = vcAssertUtil.assertSkillViewRendersCard(svc, 'active')
		vcAssertUtil.assertRendersAsInstanceOf(match, ActiveCard)
	}

	@test()
	protected static async canAssertDialogRendersAsInstanceOf() {
		//@ts-ignore
		const svc = this.Controller('dialogSvc', {}) as DialogSkillViewController
		const dialogVc = await vcAssertUtil.assertRendersDialog(svc, () =>
			svc.showDialog()
		)

		vcAssertUtil.assertRendersAsInstanceOf(dialogVc, DialogCardViewController)
	}
}
