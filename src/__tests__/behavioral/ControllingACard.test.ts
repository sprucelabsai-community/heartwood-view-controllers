import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
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
		const model = this.render()
		assert.isEqual(model.header?.title, 'A header')
	}

	private static render(
		vc?: CardViewController
	): SpruceSchemas.Heartwood.v2021_02_11.Card {
		const thisVc = vc ?? this.vc
		const model = thisVc.render()

		const card = {
			...model,
			header: model.header?.controller?.render(),
			footer: model.footer?.controller?.render(),
			body: {
				...model.body,
				sections: model.body?.sections?.map((s) => s.controller?.render()),
			},
		}

		//@ts-ignore
		if (!thisVc._isTracking) {
			//@ts-ignore
			thisVc._isTracking = true
			this.beginTrackingFooterRender()
			this.beginTrackingHeaderRender()
			this.beginTrackingSectionRender()
		}

		return card as any
	}

	@test()
	protected static canUpdateFooterAndDoesNotCauseFullRender() {
		this.vc.updateFooter({ buttons: [{ label: 'Stop team!' }] })

		const model = this.render()

		assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
	}

	@test()
	protected static updatingFooterAfterRenderOnlyCallsRenderOnFooter() {
		this.render()

		this.vc.updateFooter({ buttons: [{ label: 'Stop team!' }] })

		const model = this.render()

		assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 1)
		assert.isEqual(this.headerTriggerRenderCount, 0)
	}

	@test()
	protected static canUpdateHeaderTitleBeforeRender() {
		this.vc.setHeaderTitle('you got this')

		const model = this.render()

		assert.isEqual(model.header?.title, 'you got this')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
	}

	@test()
	protected static canUpdateHeaderTitleAfterRender() {
		this.render()

		this.vc.setHeaderTitle('you got this')

		const model = this.render()

		assert.isEqual(model.header?.title, 'you got this')
		assert.isEqual(this.cardTriggerRenderCount, 0)
		assert.isEqual(this.footerTriggerRenderCount, 0)
		assert.isEqual(this.headerTriggerRenderCount, 1)
	}

	@test()
	protected static canClearTitle() {
		this.vc.setHeaderTitle(null)
		const model = this.render()
		assert.isFalsy(model.header)
	}

	@test()
	protected static updatingANewSectionAddsIt() {
		const vc = this.Vc({ header: { title: 'go' } })

		vc.updateSection(1, { text: { content: 'Goodbye world' } })

		const model = this.render(vc)
		assert.isEqual(model.body?.sections?.[1].text?.content, 'Goodbye world')
	}

	@test()
	protected static canUpdateSectionBeforeRender() {
		let model = this.render()
		assert.isEqual(model.body?.sections?.[0].text?.content, 'Hello world')

		this.vc.updateSection(0, { text: { content: 'Goodbye world' } })

		model = this.render()
		assert.isEqual(model.body?.sections?.[0].text?.content, 'Goodbye world')
	}

	@test()
	protected static onlyTriggersRenderInUpdatedSection() {
		this.render()

		this.vc.updateSection(0, { text: { content: 'Goodbye world' } })

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
		const model = this.render()
		assert.isEqual(model.header?.subtitle, 'Waka waka')
	}

	@test()
	protected static canSetHeaderImage() {
		this.vc.setHeaderImage('test.jpg')
		const model = this.render()
		assert.isEqual(model.header?.image, 'test.jpg')
	}

	@test()
	protected static canRemoveHeaderImage() {
		this.vc.setHeaderTitle(null)
		this.vc.setHeaderImage('test.jpg')
		this.vc.setHeaderImage(null)
		const model = this.render()
		assert.isFalsy(model.header)
	}

	@test()
	protected static removingHeaderRetainstTitle() {
		this.vc.setHeaderSubtitle('Waka waka')
		this.vc.setHeaderImage('test.jpg')
		this.vc.setHeaderImage(null)
		const model = this.render()
		assert.isTruthy(model.header)
		assert.isEqual(model.header.subtitle, 'Waka waka')
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
