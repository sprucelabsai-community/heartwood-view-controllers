import { buildSchema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import Authenticator from '../../auth/Authenticator'
import buildBigForm from '../../builders/buildBigForm'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER, DEMO_NUMBER2 } from '../../tests/constants'
import interactionUtil from '../../tests/utilities/interaction.utility'
import { SkillViewController } from '../../types/heartwood.types'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

class GoodSkillViewController implements SkillViewController {
	private model: SkillView
	public constructor(model: SkillView) {
		this.model = model
	}

	public renderToolBelt() {
		return null
	}

	public async load() {}
	public triggerRender() {}

	public render() {
		return this.model
	}
}

export default class InteractionUtilTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		good: GoodSkillViewController,
	}

	@test()
	protected static async canCreateInteractionUtil() {
		assert.isTruthy(interactionUtil)
	}

	@test()
	protected static async loginFailsWithBadNumber() {
		await assert.doesThrowAsync(() =>
			interactionUtil.submitLoginForm(this.LoginVc(), '666-000-0000')
		)
	}

	@test(`can login with ${DEMO_NUMBER}`, DEMO_NUMBER)
	@test(`can login with ${DEMO_NUMBER2}`, DEMO_NUMBER2)
	protected static async loginPassesWithGoodDemoNumber(phone: string) {
		let loggedInPersonId: string | undefined
		const auth = Authenticator.getInstance()

		auth.addEventListener('did-login', ({ person }) => {
			loggedInPersonId = person.id
		})

		const { person } = await this.MercuryFixture().loginAsDemoPerson(phone)

		await interactionUtil.submitLoginForm(this.LoginVc(), phone)

		assert.isTrue(auth.isLoggedIn())
		assert.isEqual(loggedInPersonId, person.id)
	}

	@test()
	protected static async cantClickFooterActionInFormWithoutOne() {
		const formVc = this.Controller('form', {
			shouldShowSubmitControls: false,
			schema: {
				id: 'test',
				fields: {},
			},
			sections: [],
		})

		await assert.doesThrowAsync(() =>
			interactionUtil.clickPrimaryInFooter(formVc)
		)
	}

	@test()
	protected static async submitsFormIfThereIsASubmitButton() {
		const formVc = this.Controller('form', {
			schema: {
				id: 'test',
				fields: {},
			},
			sections: [],
		})

		await interactionUtil.clickPrimaryInFooter(formVc)
	}

	@test('can submit big form with 2 sections', [
		{
			fields: ['first'],
		},
		{
			fields: ['second'],
		},
	])
	@test('can submit big form with 3 sections', [
		{
			fields: ['first'],
		},
		{
			fields: ['second'],
		},
		{
			fields: ['third'],
		},
	])
	protected static async canSubmitBigFormAllAtOnce(sections: any) {
		let wasHit = false

		const bigFormVc = this.Controller(
			'bigForm',
			buildBigForm({
				onSubmit: () => {
					wasHit = true
				},
				schema: buildSchema({
					id: 'test',
					fields: {
						first: {
							type: 'text',
						},
						second: {
							type: 'text',
						},
						third: {
							type: 'text',
						},
					},
				}),
				sections,
			})
		)

		await interactionUtil.submitForm(bigFormVc)

		assert.isTrue(wasHit)
	}

	@test()
	protected static async canClickButtonInRow() {
		const vc = this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [
						{
							button: {
								id: 'edit',
								onClick: () => {},
							},
						},
					],
				},
				{
					id: 'second',
					cells: [
						{
							button: {
								id: 'stamp',
								onClick: () => {},
							},
						},
						{
							button: {
								id: 'champ',
								onClick: () => {},
							},
						},
					],
				},
			],
		})

		await assert.doesThrowAsync(() =>
			interactionUtil.clickButtonInRow(vc, 5, 'edit')
		)
		await assert.doesThrowAsync(() =>
			interactionUtil.clickButtonInRow(vc, 0, 'stamp')
		)
		await assert.doesThrowAsync(() =>
			interactionUtil.clickButtonInRow(vc, 0, 'champ')
		)
		await assert.doesThrowAsync(() =>
			interactionUtil.clickButtonInRow(vc, 'first', 'champ')
		)

		await interactionUtil.clickButtonInRow(vc, 0, 'edit')
		await interactionUtil.clickButtonInRow(vc, 'first', 'edit')
		await interactionUtil.clickButtonInRow(vc, 1, 'stamp')
		await interactionUtil.clickButtonInRow(vc, 1, 'champ')
		await interactionUtil.clickButtonInRow(vc, 'second', 'champ')
	}

	@test()
	protected static async clickingButtonInRowTriggersCallback() {
		let wasHit = false
		const vc = this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [
						{
							button: {
								id: 'edit',
								onClick: () => {
									wasHit = true
								},
							},
						},
					],
				},
			],
		})

		await interactionUtil.clickButtonInRow(vc, 'first', 'edit')

		assert.isTrue(wasHit)
	}

	@test()
	protected static async canClickButtonsInCard() {
		const badButton = `${new Date().getTime() * Math.random()}`
		const button1Id = `${new Date().getTime() * Math.random()}`
		const button2Id = `${new Date().getTime() * Math.random()}`
		const button3Id = `${new Date().getTime() * Math.random()}`
		const button4Id = `${new Date().getTime() * Math.random()}`

		const vc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [
							{
								id: button1Id,
								onClick: () => {},
							},
							{
								id: button2Id,
								onClick: () => {},
							},
						],
					},
					{
						buttons: [
							{
								id: button3Id,
								onClick: () => {},
							},
						],
					},
				],
			},

			footer: {
				buttons: [
					{
						id: button4Id,
						onClick: () => {},
					},
				],
			},
		})

		await assert.doesThrowAsync(() =>
			interactionUtil.clickButton(vc, badButton)
		)

		await interactionUtil.clickButton(vc, button1Id)
		await interactionUtil.clickButton(vc, button2Id)
		await interactionUtil.clickButton(vc, button3Id)
		await interactionUtil.clickButton(vc, button4Id)
	}

	@test()
	protected static async clickingButtonWaitsUntilFinished() {
		const button1Id = `${new Date().getTime() * Math.random()}`
		let wasHit = false
		let lateHit = false

		const vc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [
							{
								id: button1Id,
								onClick: async () => {
									wasHit = true
									await new Promise((resolve) => setTimeout(resolve, 10))
									lateHit = true
								},
							},
						],
					},
				],
			},
		})

		const promise = interactionUtil.clickButton(vc, button1Id)
		assert.isFalse(lateHit)
		assert.isTrue(wasHit)

		await promise

		assert.isTrue(lateHit)
	}

	private static LoginVc() {
		return this.Controller('login', {})
	}
}
