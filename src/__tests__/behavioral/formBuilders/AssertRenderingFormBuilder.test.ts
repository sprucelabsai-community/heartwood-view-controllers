import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import {
    SkillViewController,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

class GenericSkillViewController extends AbstractSkillViewController {
    private model!: SkillView
    public constructor(options: ViewControllerOptions & SkillView) {
        super(options)
        this.model = removeUniversalViewOptions(options) as SkillView
    }

    public render(): SkillView {
        return this.model
    }
}

@suite()
export default class AssertRenderingFormBuilderTest extends AbstractViewControllerTest {
    protected controllerMap = {
        generic: GenericSkillViewController,
        'form-builder-card': FormBuilderCardViewController,
    }

    @test()
    protected assertHasFunctionToAssertFormBuilder() {
        assert.isFunction(formAssert.skillViewRendersFormBuilder)
    }

    @test()
    protected throwsWhenSkillViewNotRenderingFormBuilder() {
        const svc = this.Svc()
        assert.doesThrow(() => formAssert.skillViewRendersFormBuilder(svc))
    }

    @test()
    protected canFindFormBuilderInFirstCardOfFirstLayout() {
        const builder = this.Controller('form-builder-card', {
            shouldAllowEditing: true,
        })

        const svc = this.Svc({
            layouts: [
                {
                    cards: [builder.render()],
                },
            ],
        })

        formAssert.skillViewRendersFormBuilder(svc)
    }

    @test()
    protected throwsWhenOnlyFindingCard() {
        const card = this.Controller('card', {})

        const svc = this.Svc({
            layouts: [
                {
                    cards: [card.render()],
                },
            ],
        })

        assert.doesThrow(() => formAssert.skillViewRendersFormBuilder(svc))
    }

    @test()
    protected canFindInOtherLayoutAndCard() {
        const builder = this.Controller('form-builder-card', {
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

        formAssert.skillViewRendersFormBuilder(svc)
    }

    @test()
    protected throwsIfNotMatchingOnId() {
        const builder = this.Controller('form-builder-card', {
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
            formAssert.skillViewRendersFormBuilder(svc, 'look')
        )
    }

    @test()
    protected canMatchBasedOnId() {
        const builder = this.Controller('form-builder-card', {
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

        formAssert.skillViewRendersFormBuilder(svc, 'look')
    }

    @test()
    protected async returnFormBuilder() {
        const builder = this.Controller('form-builder-card', {
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

        const vc = formAssert.skillViewRendersFormBuilder(svc, 'look')

        assert.isEqual(vc, builder)
    }

    private Svc(options?: SkillView) {
        //@ts-ignore
        return this.Controller('generic', {
            layouts: [],
            ...options,
        }) as SkillViewController
    }
}
