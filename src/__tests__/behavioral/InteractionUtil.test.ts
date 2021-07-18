import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { Authenticator } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../tests/constants'
import interactionUtil from '../../tests/utilities/interaction.utility'
import { SkillViewController } from '../../types/heartwood.types'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

class GoodSkillViewController implements SkillViewController {
	private model: SkillView
	public constructor(model: SkillView) {
		this.model = model
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
			interactionUtil.submitLoginForm(this.LoginVc(), 'Taco')
		)
	}

	private static LoginVc() {
		return this.Controller('login', {})
	}

	@test()
	protected static async loginPassesWithGoodDemoNumber() {
		let loggedInPersonId: string | undefined
		const auth = Authenticator.getInstance()

		auth.addEventListener('did-login', ({ person }) => {
			loggedInPersonId = person.id
		})

		const { person } = await this.MercuryFixture().loginAsDemoPerson()

		await interactionUtil.submitLoginForm(this.LoginVc(), DEMO_NUMBER)

		assert.isTrue(auth.isLoggedIn())
		assert.isEqual(loggedInPersonId, person.id)
	}
}
