import { validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import renderUtil from '../../utilities/render.utility'
import CardViewController, {
	CardViewControllerOptions,
} from '../../viewControllers/Card.vc'

export default class ControllingACardTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: CardViewController
	private static cardTriggerRenderCount = 0
	private static footerTriggerRenderCount = 0
	private static headerTriggerRenderCount = 0
	private static sectionTriggerRenderCounts: number[] = []

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc({
			header: {
				title: 'A header',
			},
			body: {
				sections: [
					{
						text: { content: 'Hello world' },
					},
					{
						text: { content: 'Hello world 2' },
					},
					{
						text: { content: 'Hello world 3' },
					},
				],
			},
		})

		this.cardTriggerRenderCount = 0
		this.footerTriggerRenderCount = 0
		this.headerTriggerRenderCount = 0
		this.sectionTriggerRenderCounts = []
	}

	private static Vc(options: CardViewControllerOptions): CardViewController {
		const vc = this.Factory().Controller('card', options)
		vc.triggerRender = () => {
			this.cardTriggerRenderCount++
		}

		return vc
	}

	@test()
	protected static canCreateControllingACard() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static renderVc() {
		const model = this.renderCard()
		assert.isEqual(model.header?.title, 'A header')
	}

	protected static renderCard(vc = this.vc) {
		const card = renderUtil.render(vc)

		//@ts-ignore
		if (!vc._isTracking) {
			//@ts-ignore
			vc._isTracking = true
			this.beginTrackingFooterRender()
			this.beginTrackingHeaderRender()
			this.beginTrackingSectionRender()
		}

		return card as any
	}

	@test()
	protected static canUpdateFooterAndDoesNotCauseFullRender() {
		this.vc.setFooter({ buttons: [{ label: 'Stop team!' }] })

		const model = this.renderCard()

		assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
	}

	@test()
	protected static updatingFooterAfterRenderOnlyCallsRenderOnFooter() {
		this.renderCard()

		this.vc.setFooter({ buttons: [{ label: 'Stop team!' }] })

		const model = this.renderCard()

		assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 1)
		assert.isEqual(this.headerTriggerRenderCount, 0)
	}

	@test()
	protected static canUpdateHeaderTitleBeforeRender() {
		this.vc.setHeaderTitle('you got this')

		const model = this.renderCard()

		assert.isEqual(model.header?.title, 'you got this')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
	}

	@test()
	protected static canUpdateHeaderTitleAfterRender() {
		this.renderCard()

		this.vc.setHeaderTitle('you got this')

		const model = this.renderCard()

		assert.isEqual(model.header?.title, 'you got this')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
		assert.isEqual(this.headerTriggerRenderCount, 1)
	}

	@test()
	protected static canClearTitle() {
		this.vc.setHeaderTitle(null)
		const model = this.renderCard()
		assert.isFalsy(model.header)
	}

	@test()
	protected static canUpdateSectionBeforeRender() {
		let model = this.renderCard()
		assert.isEqual(model.body?.sections?.[0].text?.content, 'Hello world')

		this.vc.setSection(0, { text: { content: 'Goodbye world' } })

		model = this.renderCard()
		assert.isEqual(model.body?.sections?.[0].text?.content, 'Goodbye world')
	}

	@test()
	protected static onlyTriggersRenderInUpdatedSection() {
		this.renderCard()

		this.vc.setSection(0, { text: { content: 'Goodbye world' } })

		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
		assert.isEqual(this.headerTriggerRenderCount, 0)
		assert.isEqual(this.sectionTriggerRenderCounts[0], 1)
		assert.isUndefined(this.sectionTriggerRenderCounts[1])
	}

	@test()
	protected static async doesNotDropInABody() {
		const vc = this.Controller('card', { header: { title: 'Hey friend!' } })
		const model = vc.render()
		assert.isFalsy(model.body)
	}

	@test()
	protected static setHeaderSubtitle() {
		this.vc.setHeaderSubtitle('Waka waka')
		let model = this.renderCard()
		assert.isEqual(model.header?.subtitle, 'Waka waka')
		this.vc.setHeaderSubtitle(null)
		model = this.renderCard()
		assert.isNull(model.header?.subtitle)
	}

	@test()
	protected static canSetHeaderImage() {
		this.vc.setHeaderImage('test.jpg')
		const model = this.renderCard()
		assert.isEqual(model.header?.image, 'test.jpg')
	}

	@test()
	protected static canRemoveHeaderImage() {
		this.vc.setHeaderTitle(null)
		this.vc.setHeaderImage('test.jpg')
		this.vc.setHeaderImage(null)
		const model = this.renderCard()
		assert.isFalsy(model.header)
	}

	@test()
	protected static removingHeaderRetainstTitle() {
		this.vc.setHeaderSubtitle('Waka waka')
		this.vc.setHeaderImage('test.jpg')
		this.vc.setHeaderImage(null)
		const model = this.renderCard()
		assert.isTruthy(model.header)
		assert.isEqual(model.header.subtitle, 'Waka waka')
	}

	@test()
	protected static async viewModelValidates() {
		const model = this.renderCard()

		validateSchemaValues(cardSchema, model)
	}

	@test()
	protected static canAddFirstSectionByIndex() {
		const vc = this.Vc({
			header: {
				title: 'A header',
			},
		})

		vc.addSectionAtIndex(0, {
			title: 'Yes!',
		})

		const model = this.renderCard(vc)
		assert.isEqual(model.body?.sections?.[0].title, 'Yes!')
	}

	@test()
	protected static cantGetInvalidSection() {
		const err = assert.doesThrow(() => this.vc.getSection(-1))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static async canGetHeaderTitle() {
		assert.isEqual(this.vc.getHeaderTitle(), 'A header')
		this.vc.setHeaderTitle('A header again')
		assert.isEqual(this.vc.getHeaderTitle(), 'A header again')
		this.vc.setHeaderTitle(null)
		assert.isEqual(this.vc.getHeaderTitle(), undefined)
	}

	@test()
	protected static async canGetSubTitle() {
		assert.isEqual(this.vc.getHeaderSubtitle(), undefined)
		this.vc.setHeaderSubtitle('taco')
		assert.isEqual(this.vc.getHeaderSubtitle(), 'taco')
	}

	@test()
	protected static isLoadingOnCardBodyIsFalsyByDefault() {
		assert.isFalse(this.vc.isBodyLoading())
		const model = this.render(this.vc)
		assert.isFalsy(model.body?.isLoading)
	}

	@test()
	protected static canSetLoadingOnBody() {
		this.vc.setIsBodyLoading(true)
		assert.isEqual(this.cardTriggerRenderCount, 1)
		assert.isTrue(this.vc.isBodyLoading())
		const model = this.render(this.vc)
		assert.isTrue(model.body?.isLoading)
	}

	@test()
	protected static canGetAndSetCriticalError() {
		assert.isFalse(this.vc.getHasCriticalError())

		this.vc.setCriticalError({
			title: 'Hey there',
			message: 'Why is this happening?',
			buttons: [],
		})

		assert.isEqual(this.cardTriggerRenderCount, 1)
		assert.isTrue(this.vc.getHasCriticalError())

		this.vc.clearCriticalError()

		assert.isEqual(this.cardTriggerRenderCount, 2)
		assert.isFalse(this.vc.getHasCriticalError())
	}

	@test('can set critical error 1', { title: 'hey', message: 'oh no!' })
	@test('can set critical error 2', { title: 'hey2', message: 'oh no!222' })
	protected static criticalErrorCanBeSetToStartAndRenders(
		criticalError: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError
	) {
		const vc = this.Vc({ criticalError })
		assert.isTrue(vc.getHasCriticalError())

		let model = this.render(vc)

		assert.isEqualDeep(model.criticalError, criticalError)
		vc.clearCriticalError()

		model = this.render(vc)
		assert.isFalsy(model.criticalError)
	}

	@test('setting body 1', {
		shouldEnableSectionSwiping: true,
	})
	@test('setting body 2', {
		sections: [],
	})
	protected static canSetBody(body: any) {
		const vc = this.Vc({})
		vc.setBody(body)
		assert.isEqual(this.cardTriggerRenderCount, 1)
		const rendered = this.render(vc)
		assert.isEqualDeep(rendered.body, body)
	}

	@test()
	protected static canSetFooterToNull() {
		this.vc.setFooter({
			buttons: [],
		})

		this.vc.setFooter(null)

		assert.isEqual(this.cardTriggerRenderCount, 1)
	}

	private static beginTrackingFooterRender() {
		this.footerTriggerRenderCount = 0
		//@ts-ignore
		this.vc.triggerRenderFooter = () => {
			this.footerTriggerRenderCount++
		}
	}

	private static beginTrackingHeaderRender() {
		this.headerTriggerRenderCount = 0
		//@ts-ignore
		this.vc.triggerRenderHeader = () => {
			this.headerTriggerRenderCount++
		}
	}

	private static beginTrackingSectionRender() {
		//@ts-ignore
		this.vc.triggerRenderSections = this.vc.triggerRenderSections.map(
			(_, idx) => {
				return () => {
					if (!this.sectionTriggerRenderCounts[idx]) {
						this.sectionTriggerRenderCounts[idx] = 0
					}
					this.sectionTriggerRenderCounts[idx]++
				}
			}
		)
	}
}
