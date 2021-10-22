import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import Authenticator from '../../auth/Authenticator'
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

	private static LoginVc() {
		return this.Controller('login', {})
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
}
