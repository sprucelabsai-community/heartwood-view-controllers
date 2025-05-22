import { validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    TriggerRenderHandler,
    ViewController,
} from '../../../types/heartwood.types'
import renderUtil from '../../../utilities/render.utility'
import CardViewController, {
    CardViewControllerOptions,
} from '../../../viewControllers/card/Card.vc'

@suite()
export default class ControllingACardTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: CardViewController
    private cardTriggerRenderCount = 0
    private footerTriggerRenderCount = 0
    private headerTriggerRenderCount = 0
    private sectionTriggerRenderCounts: number[] = []

    protected async beforeEach() {
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

    private Vc(options: CardViewControllerOptions): CardViewController {
        const vc = this.Factory().Controller('card', options)
        vc.triggerRender = () => {
            this.cardTriggerRenderCount++
        }

        return vc
    }

    @test()
    protected canCreateControllingACard() {
        assert.isTruthy(this.vc)
    }

    @test()
    protected renderVc() {
        const model = this.renderCard()
        assert.isEqual(model.header?.title, 'A header')
    }

    @test()
    protected canUpdateFooterAndDoesNotCauseFullRender() {
        const vc = this.Vc({ footer: { buttons: [{ label: 'hey' }] } })
        vc.setFooter({ buttons: [{ label: 'Stop team!' }] })

        const model = this.renderCard(vc)

        assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
        assert.isEqual(this.cardTriggerRenderCount, 0)
        assert.isEqual(this.footerTriggerRenderCount, 0)
    }

    @test()
    protected updatingFooterAfterRenderOnlyCallsRenderOnFooter() {
        const vc = this.Vc({ footer: { buttons: [{ label: 'hey' }] } })
        this.renderCard(vc)

        vc.setFooter({ buttons: [{ label: 'Stop team!' }] })

        const model = this.renderCard(vc)

        assert.isEqual(model.footer?.buttons?.[0].label, 'Stop team!')
        assert.isEqual(this.cardTriggerRenderCount, 0)
        assert.isEqual(this.footerTriggerRenderCount, 1)
        this.assertHeaderTriggerRenderCountEquals(0)
    }

    @test()
    protected canUpdateHeaderTitleBeforeRender() {
        this.setHeaderTitle('you got this')

        const model = this.renderCard()

        assert.isEqual(model.header?.title, 'you got this')
        assert.isEqual(this.cardTriggerRenderCount, 0)
        assert.isEqual(this.footerTriggerRenderCount, 0)
    }

    @test()
    protected canUpdateHeaderTitleAfterRender() {
        this.renderCard()

        this.setHeaderTitle('you got this')

        const model = this.renderCard()

        assert.isEqual(model.header?.title, 'you got this')
        assert.isEqual(this.cardTriggerRenderCount, 0)
        assert.isEqual(this.footerTriggerRenderCount, 0)
        this.assertHeaderTriggerRenderCountEquals(1)
    }

    @test()
    protected canClearTitle() {
        this.setHeaderTitle(null)
        const model = this.renderCard()
        assert.isFalsy(model.header)
    }

    @test()
    protected canUpdateSectionBeforeRender() {
        let model = this.renderCard()
        assert.isEqual(model.body?.sections?.[0].text?.content, 'Hello world')

        this.vc.setSection(0, { text: { content: 'Goodbye world' } })

        model = this.renderCard()
        assert.isEqual(model.body?.sections?.[0].text?.content, 'Goodbye world')
    }

    @test()
    protected onlyTriggersRenderInUpdatedSection() {
        this.renderCard()

        this.vc.setSection(0, { text: { content: 'Goodbye world' } })

        assert.isEqual(this.cardTriggerRenderCount, 0)
        assert.isEqual(this.footerTriggerRenderCount, 0)
        this.assertHeaderTriggerRenderCountEquals(0)
        assert.isEqual(this.sectionTriggerRenderCounts[0], 1)
        assert.isUndefined(this.sectionTriggerRenderCounts[1])
    }

    @test()
    protected triggersRenderOnCardWhenSectionsAreSet() {
        this.renderCard()
        this.vc.setSections([])
        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected async doesNotDropInABody() {
        const vc = this.Controller('card', { header: { title: 'Hey friend!' } })
        const model = vc.render()
        assert.isFalsy(model.body)
    }

    @test()
    protected canSetHeaderSubtitle() {
        this.vc.setHeaderSubtitle('Waka waka')
        let model = this.renderCard()
        assert.isEqual(model.header?.subtitle, 'Waka waka')
        this.vc.setHeaderSubtitle(null)
        model = this.renderCard()
        assert.isNull(model.header?.subtitle)
    }

    @test()
    protected canSetHeaderImage() {
        const image = generateId()
        this.setHeaderImage(image)
        const model = this.renderCard()
        assert.isEqual(model.header?.image, image)
    }

    @test()
    protected canRemoveHeaderImage() {
        this.setHeaderTitle(null)
        this.setHeaderImage('test.jpg')
        this.setHeaderImage(null)
        const model = this.renderCard()
        assert.isFalsy(model.header)
    }

    @test()
    protected removingHeaderRetainsTitle() {
        this.vc.setHeaderSubtitle('Waka waka')
        this.setHeaderImage('test.jpg')
        this.setHeaderImage(null)
        const model = this.renderCard()
        assert.isTruthy(model.header)
        assert.isEqual(model.header.subtitle, 'Waka waka')
    }

    @test()
    protected async viewModelValidates() {
        const model = this.renderCard()

        validateSchemaValues(cardSchema, model)
    }

    @test()
    protected canAddFirstSectionByIndex() {
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
    protected cantGetInvalidSection() {
        const err = assert.doesThrow(() => this.vc.getSection(-1))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdx'],
        })
    }

    @test()
    protected async canGetHeaderTitle() {
        assert.isEqual(this.vc.getHeaderTitle(), 'A header')
        this.setHeaderTitle('A header again')
        assert.isEqual(this.vc.getHeaderTitle(), 'A header again')
        this.setHeaderTitle(null)
        assert.isEqual(this.vc.getHeaderTitle(), undefined)
    }

    @test()
    protected async canGetSubTitle() {
        assert.isEqual(this.vc.getHeaderSubtitle(), undefined)
        this.vc.setHeaderSubtitle('taco')
        assert.isEqual(this.vc.getHeaderSubtitle(), 'taco')
    }

    @test()
    protected isLoadingOnCardBodyIsFalsyByDefault() {
        assert.isFalse(this.vc.isBusy())
        const model = this.render(this.vc)
        assert.isFalsy(model.body?.isBusy)
    }

    @test()
    protected canSetBusyOnBody() {
        this.vc.setIsBusy(true)
        assert.isEqual(this.cardTriggerRenderCount, 1)
        assert.isTrue(this.vc.isBusy())
        const model = this.render(this.vc)
        assert.isTrue(model.body?.isBusy)
    }

    @test()
    protected canGetAndSetCriticalError() {
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
    protected criticalErrorCanBeSetToStartAndRenders(
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
    protected canSetBody(body: any) {
        const vc = this.Vc({})
        vc.setBody(body)
        assert.isEqual(this.cardTriggerRenderCount, 1)
        const rendered = this.render(vc)
        assert.isEqualDeep(rendered.body, body)
    }

    @test()
    protected canSetFooterToNull() {
        const vc = this.Vc({ footer: { buttons: [] } })
        vc.setFooter({
            buttons: [],
        })

        vc.setFooter(null)

        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected settingFooterToSomethingFromNothingTriggersRenderForTheWholeCard() {
        const vc = this.Vc({})

        vc.setFooter({ buttons: [{ label: 'hey!' }] })

        assert.isEqual(this.cardTriggerRenderCount, 1)
        assert.isEqual(this.footerTriggerRenderCount, 0)
    }

    @test('can set header 1', {
        title: 'hey!',
        subtitle: 'there!',
    })
    @test('can set header 2', {
        title: 'what!?',
        subtitle: 'the!!!!',
    })
    protected canSetHeader(newHeader: any) {
        const vc = this.Vc({})

        vc.setHeader(newHeader)

        const model = this.renderCard(vc)

        delete model.header?.controller
        assert.isEqualDeep(model.header, newHeader)
    }

    @test()
    protected updatingHeaderTriggersHeaderRender() {
        const vc = this.Vc({
            header: {
                title: 'hey',
            },
        })

        this.renderCard(vc)

        vc.setHeader({ title: 'wha!?' })

        this.assertHeaderTriggerRenderCountEquals(1)
        assert.isEqual(this.cardTriggerRenderCount, 0)
    }

    @test()
    protected settingHeaderToNullTriggersRenderOnCard() {
        const vc = this.Vc({
            header: {
                title: 'hey',
            },
        })

        this.renderCard(vc)
        vc.setHeader(null)

        this.assertHeaderTriggerRenderCountEquals(0)
        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected addingAHeaderTriggersBodyRender() {
        const vc = this.Vc({})

        this.renderCard(vc)
        vc.setHeader({
            title: 'hey',
        })

        this.assertHeaderTriggerRenderCountEquals(0)
        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected canSetFooterAsBusy() {
        const vc = this.Vc({ footer: { buttons: [{ id: 'go' }] } })

        assert.isFalse(vc.getIsFooterBusy(), `Footer should not be busy`)
        vc.setFooterIsBusy(true)
        assert.isTrue(this.render(vc).footer?.isBusy)
        assert.isTrue(vc.getIsFooterBusy(), `Footer should be busy`)

        vc.setFooterIsBusy(false)
        assert.isFalse(this.render(vc).footer?.isBusy)
        assert.isFalse(vc.getIsFooterBusy(), `Footer should not be busy`)
    }

    @test()
    protected settingFooterBusyTriggersRender() {
        const vc = this.Vc({ footer: { buttons: [{ id: 'go' }] } })
        vc.setFooterIsBusy(true)
        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected async canSetBodyToNull() {
        const vc = this.Vc({ body: { sections: [] } })
        vc.setBody(null)
        assert.isNull(this.render(vc).body)
    }

    @test()
    protected async canSetHeaderToNull() {
        const vc = this.Vc({ header: {} })
        vc.setHeader(null)
        assert.isNull(this.render(vc).header)
    }

    @test()
    protected async updatingBadSectionThrows() {
        const vc = this.Vc({})
        const err = assert.doesThrow(() =>
            vc.updateSection(`${new Date().getTime()}`, {})
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['section'],
        })
    }

    @test('can trigger render on first section', 'test')
    @test('can trigger render on first section', 'new')
    protected async updatingSectionTriggersRender(id: string) {
        const vc = this.Vc({
            body: {
                sections: [
                    {
                        id: 'test',
                    },
                    {
                        id: 'new',
                    },
                ],
            },
        })

        this.renderCard(vc)
        vc.updateSection(id, {})

        vcAssert.assertTriggerRenderCount(vc.getSectionVc(id), 1)
    }

    @test('can get expected section 1', 0, 'first')
    @test('can get expected section 2', 1, 'second')
    protected canGetExpectedSection(idx: number, id: string) {
        this.setVcWith3Sections()

        const beforeRender = this.vc.getSectionVc(id)

        const model = this.renderCard()

        //@ts-ignore
        const sectionVc = this.vc.sectionVcs[idx]

        assert.isEqual(sectionVc, model.body.sections[idx].controller)
        assert.isEqual(sectionVc, this.vc.getSectionVc(idx))
        assert.isEqual(sectionVc, this.vc.getSectionVc(id))
        assert.isEqual(sectionVc, beforeRender)
    }

    @test('overridden section controller persists 1', 0)
    @test('overridden section controller persists 1', 1)
    protected async overriddenSectionControllersPersist(sectionIdx: number) {
        this.setVcWith3Sections()
        const sectionVc = new SectionVc()
        this.vc.updateSection(sectionIdx, sectionVc.render())
        assert.isEqual(this.vc.getSectionVc(sectionIdx), sectionVc)
    }

    @test()
    protected async overridingControllerAfterRenderPersists() {
        this.setVcWith3Sections()
        const originalVc = this.vc.getSectionVc(0)
        const sectionVc = new SectionVc()
        this.vc.updateSection(0, sectionVc.render())
        assert.isEqual(this.vc.getSectionVc(0), sectionVc)
        assert.isEqual(this.render(originalVc).controller, sectionVc)
    }

    @test()
    protected overriddenSectionControllerTriggersRenderOnEntireCard() {
        this.setVcWith3Sections()
        const sectionVc = new SectionVc()

        this.vc.updateSection(0, sectionVc.render())
        assert.isEqual(this.cardTriggerRenderCount, 1)
    }

    @test()
    protected async updatingSectionWithoutControllerDoesNotTriggerRenderOnCard() {
        this.vc.updateSection(0, {})
        assert.isEqual(this.cardTriggerRenderCount, 0)
    }

    @test()
    protected async settingHeaderImageTriggersRender() {
        this.beginTrackingHeaderRender()
        this.setHeaderImage(generateId())

        assert.isEqual(this.cardTriggerRenderCount, 0)
        this.assertHeaderTriggerRenderCountEquals(1)

        this.setHeaderImage(null)
        this.assertHeaderTriggerRenderCountEquals(2)
    }

    @test()
    protected async settingHeaderTitleTriggersRenderOnCardIfNoHeaderPreviously() {
        this.vc = this.Vc({})
        this.beginTrackingHeaderRender()
        this.setHeaderTitle(generateId())
        this.assertTriggerRenderCountEquals(1)
        this.assertHeaderTriggerRenderCountEquals(0)
    }

    private assertTriggerRenderCountEquals(expected: number) {
        assert.isEqual(
            this.cardTriggerRenderCount,
            expected,
            'Trigger render count missmatch'
        )
    }

    private setHeaderTitle(title: null | string) {
        this.vc.setHeaderTitle(title)
    }

    private setHeaderImage(image: string | null) {
        this.vc.setHeaderImage(image)
    }

    private assertHeaderTriggerRenderCountEquals(expected: number) {
        assert.isEqual(
            this.headerTriggerRenderCount,
            expected,
            'trigger header render count missmatch'
        )
    }

    private setVcWith3Sections() {
        this.vc = this.Vc({
            body: {
                sections: [
                    {
                        id: 'first',
                    },
                    {
                        id: 'second',
                    },
                    {
                        id: 'third',
                    },
                ],
            },
        })
    }

    private beginTrackingFooterRender(vc = this.vc) {
        this.footerTriggerRenderCount = 0
        //@ts-ignore
        vc.triggerRenderFooter = () => {
            this.footerTriggerRenderCount++
        }
    }

    private beginTrackingHeaderRender(vc = this.vc) {
        this.headerTriggerRenderCount = 0
        //@ts-ignore
        vc.triggerRenderHeader = () => {
            this.headerTriggerRenderCount++
        }
    }

    private beginTrackingSectionRender(vc = this.vc) {
        //@ts-ignore
        vc.triggerRenderSections = this.vc.triggerRenderSections.map(
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

    protected renderCard(vc = this.vc) {
        const card = renderUtil.render(vc)

        //@ts-ignore
        if (!vc._isTracking) {
            //@ts-ignore
            vc._isTracking = true
            this.beginTrackingFooterRender(vc)
            this.beginTrackingHeaderRender(vc)
            this.beginTrackingSectionRender(vc)
        }

        return card as any
    }
}

class SectionVc
    implements
        ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>
{
    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection {
        return {
            controller: this,
        }
    }
    public triggerRender = () => {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }
}
