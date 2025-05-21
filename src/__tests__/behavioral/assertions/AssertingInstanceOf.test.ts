import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import {
    AbstractSkillViewController,
    AbstractViewController,
    ActiveRecordCardViewController,
    SkillViewControllerId,
    ViewControllerId,
    vcAssert,
} from '../../..'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/card/Card.vc'
import FormViewController from '../../../viewControllers/form/Form.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class FancyCardViewController extends AbstractViewController<Card> {
    public cardVc!: any
    public constructor(options: any) {
        super(options)
        this.cardVc = this.Controller('card', {})
    }

    public render(): Card {
        return this.cardVc.render()
    }
}

class ActiveCard extends AbstractViewController<Card> {
    private activeRecordVc!: ActiveRecordCardViewController
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
    private activeCardVc!: ActiveCard
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
    private dialogCardVc!: DialogCardViewController
    public constructor(options: any) {
        super(options)
        this.dialogCardVc = this.Controller(
            'dialogCard' as ViewControllerId,
            {}
        ) as any
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
    private cardVc!: CardViewController
    public constructor(options: any) {
        super(options)
        this.cardVc = this.Controller('card', {})
    }

    public render(): Card {
        return this.cardVc.render()
    }
}

class NoControllerViewController extends AbstractViewController<Card> {
    public render() {
        return {}
    }
}

@suite()
export default class AssertingInstanceOfTest extends AbstractViewControllerTest {
    protected controllerMap = {
        fancy: FancyCardViewController,
        activeSvc: ActiveRecordSkillViewController,
        activeCard: ActiveCard,
        dialogSvc: DialogSkillViewController,
        dialogCard: DialogCardViewController,
        noController: NoControllerViewController,
    }

    @test()
    protected hasInstanceOf() {
        assert.isFunction(vcAssert.assertControllerInstanceOf)
    }

    @test()
    protected throwsWhenPassedNoInstanceOf() {
        const vc = this.Controller('card', {})
        assert.doesThrow(() =>
            vcAssert.assertControllerInstanceOf(vc, FormViewController)
        )
    }

    @test()
    protected throwsWhenPassedNull() {
        const err = assert.doesThrow(() =>
            vcAssert.assertControllerInstanceOf(null, FormViewController)
        )
        assert.doesInclude(err.message, 'Expected a vc')
    }

    @test()
    protected knowsWhenPassedCorrectClassReference() {
        const vc = this.Controller('card', {})
        vcAssert.assertControllerInstanceOf(vc, CardViewController)
    }

    @test()
    protected knowsWhenVcDelegatesRender() {
        //@ts-ignore
        const vc = this.Controller('fancy', {}) as any

        vcAssert.assertControllerInstanceOf(vc, FancyCardViewController)
    }

    @test()
    protected looksUp1ParentToCheckInstanceOf() {
        //@ts-ignore
        const model = this.render(this.Controller('fancy', {}))

        vcAssert.assertControllerInstanceOf(
            model.controller as any,
            FancyCardViewController
        )
    }

    @test()
    protected canCheckIfRendersAsInstanceOf() {
        const vc = this.FancyVc()

        assert.doesThrow(() =>
            vcAssert.assertRendersAsInstanceOf(vc, FormViewController)
        )

        const match1 = vcAssert.assertRendersAsInstanceOf(
            vc,
            CardViewController
        )

        //@ts-ignore
        assert.isEqual(match1, vc.cardVc)

        const match2 = vcAssert.assertRendersAsInstanceOf(
            vc,
            FancyCardViewController
        )

        assert.isEqual(match2, vc)
    }

    @test()
    protected canGetCardFromSkillView() {
        const svc = this.Controller('activeSvc' as SkillViewControllerId, {})
        const match = vcAssert.assertSkillViewRendersCard(svc, 'active')
        vcAssert.assertRendersAsInstanceOf(match, ActiveCard)
    }

    @test()
    protected async canAssertDialogRendersAsInstanceOf() {
        const svc = this.Controller(
            'dialogSvc' as ViewControllerId,
            {}
        ) as DialogSkillViewController
        const dialogVc = await vcAssert.assertRendersDialog(svc, () =>
            svc.showDialog()
        )

        vcAssert.assertRendersAsInstanceOf(dialogVc, DialogCardViewController)
    }

    @test()
    protected async instanceOfKnowsIfNoControllerReturned() {
        const vc = this.Controller(
            'noController' as any,
            {}
        ) as NoControllerViewController

        assert.doesThrow(
            () => vcAssert.assertRendersAsInstanceOf(vc, CardViewController),
            'does not return'
        )
    }

    @test()
    protected async canMatchInstanceOfSeveralLevelsDeep() {
        const vc = this.FancyVc()
        vc.cardVc = vc.Controller('activeCard' as ViewControllerId, {})
        const match = vcAssert.assertRendersAsInstanceOf(
            vc.cardVc,
            FancyCardViewController
        )

        assert.isEqual(match, vc)
    }

    private FancyVc() {
        return this.Controller('fancy', {}) as FancyCardViewController
    }
}
