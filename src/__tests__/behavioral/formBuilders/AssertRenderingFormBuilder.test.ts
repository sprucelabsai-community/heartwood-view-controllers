import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import {
	FormBuilderCardViewControllerImpl,
	SkillViewController,
	ViewControllerOptions,
} from '../../..'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert.utility'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

class GenericSkillViewController extends AbstractSkillViewController {
	private model: SkillView
	public constructor(options: ViewControllerOptions & SkillView) {
		super(options)
		this.model = removeUniversalViewOptions(options) as SkillView
	}

	public render(): SkillView {
		return this.model
	}
}

export default class AssertRenderingFormBuilderTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		generic: GenericSkillViewController,
		formBuilderCard: FormBuilderCardViewControllerImpl,
	}

	@test()
	protected static assertHasFunctionToAssertFormBuilder() {
		assert.isFunction(vcAssert.assertSkillViewRendersFormBuilder)
	}

	@test()
	protected static throwsWhenSkillViewNotRenderingFormBuilder() {
		const svc = this.Svc()
		assert.doesThrow(() => vcAssert.assertSkillViewRendersFormBuilder(svc))
	}

	@test()
	protected static canFindFormBuilderInFirstCardOfFirstLayout() {
		const builder = this.Controller('formBuilderCard', {
			shouldAllowEditing: true,
		})

		const svc = this.Svc({
			layouts: [
				{
					cards: [builder.render()],
				},
			],
		})

		vcAssert.assertSkillViewRendersFormBuilder(svc)
	}

	@test()
	protected static throwsWhenOnlyFindingCard() {
		const card = this.Controller('card', {})

		const svc = this.Svc({
			layouts: [
				{
					cards: [card.render()],
				},
			],
		})

		assert.doesThrow(() => vcAssert.assertSkillViewRendersFormBuilder(svc))
	}

	@test()
	protected static canFindInOtherLayoutAndCard() {
		const builder = this.Controller('formBuilderCard', {
			shouldAllowEditing: true,
		})

		const svc = this.Svc({
			layouts: [
				{},
				{
					cards: [{}, {}, builder.render()],
				},
			],
		})

		vcAssert.assertSkillViewRendersFormBuilder(svc)
	}

	@test()
	protected static throwsIfNotMatchingOnId() {
		const builder = this.Controller('formBuilderCard', {
			shouldAllowEditing: true,
			id: 'not-found',
		})

		const svc = this.Svc({
			layouts: [
				{},
				{
					cards: [{}, {}, builder.render()],
				},
			],
		})

		assert.doesThrow(() =>
			vcAssert.assertSkillViewRendersFormBuilder(svc, 'look')
		)
	}

	@test()
	protected static canMatchBasedOnId() {
		const builder = this.Controller('formBuilderCard', {
			shouldAllowEditing: true,
			id: 'look',
		})

		const svc = this.Svc({
			layouts: [
				{},
				{
					cards: [builder.render()],
				},
			],
		})

		vcAssert.assertSkillViewRendersFormBuilder(svc, 'look')
	}

	@test()
	protected static async returnFormBuilder() {
		const builder = this.Controller('formBuilderCard', {
			shouldAllowEditing: true,
			id: 'look',
		})

		const svc = this.Svc({
			layouts: [
				{
					cards: [builder.render()],
				},
			],
		})

		const vc = vcAssert.assertSkillViewRendersFormBuilder(svc, 'look')

		assert.isEqual(vc, builder)
	}

	private static Svc(options?: SkillView) {
		//@ts-ignore
		return this.Controller('generic', {
			layouts: [],
			...options,
		}) as SkillViewController
	}
}
