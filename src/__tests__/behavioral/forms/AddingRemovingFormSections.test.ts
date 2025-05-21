import { buildSchema } from '@sprucelabs/schema'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import { FormViewController } from '../../../types/heartwood.types'

@suite()
export default class AddingRemovingFormSectionsTest extends AbstractViewControllerTest {
    private vc!: FormViewController<FormSchema>
    private sectionIds!: string[]

    protected async beforeEach() {
        await super.beforeEach()
        this.sectionIds = [generateId(), generateId()]
        this.vc = this.Vc()
    }

    @test()
    protected async canRemoveFirstSectionById() {
        this.removeSection(0)
        this.assertDoesNotRenderSection(0)
        this.assertRendersSection(1)
    }

    @test()
    protected async canRemoveOtherSections() {
        this.removeSection(1)
        this.assertDoesNotRenderSection(1)
    }

    @test()
    protected async canRemoveByIdx() {
        this.vc.removeSection(0)
        this.assertDoesNotRenderSection(0)
    }

    @test()
    protected throwsWhenTryingToRemoveBadSection() {
        const err = assert.doesThrow(() => this.vc.removeSection(generateId()))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test()
    protected async canGetSectionByString() {
        const expected = this.vc.getSection(0)
        const actual = this.getSection(0)
        assert.isEqualDeep(actual, expected)
    }

    @test()
    protected canSectionByString() {
        const section = {
            text: {
                content: generateId(),
            },
        }

        this.assertSettingSectionByStringSetsCorrectly(0, section)
        this.assertSettingSectionByStringSetsCorrectly(1, section)
    }

    private assertSettingSectionByStringSetsCorrectly(
        idx: number,
        section: { text: { content: string } }
    ) {
        this.setSection(idx, section)
        const actual = this.getSection(idx)
        assert.isEqualDeep(actual, { ...section, id: this.sectionId(idx) })
    }

    private setSection(
        sectionIdx: number,
        section: { text: { content: string } }
    ) {
        this.vc.updateSection(this.sectionId(sectionIdx), section)
    }

    private assertRendersSection(idx: number) {
        formAssert.formRendersSection(this.vc, this.sectionId(idx))
    }

    private assertDoesNotRenderSection(idx: number) {
        formAssert.formDoesNotRendersSection(this.vc, this.sectionId(idx))
    }

    private getSection(idx: number) {
        return this.vc.getSection(this.sectionId(idx))
    }

    private removeSection(idx: number) {
        this.vc.removeSection(this.sectionId(idx))
    }

    private sectionId(idx: number): string {
        return this.sectionIds[idx]
    }

    private Vc(): FormViewController<FormSchema> {
        return this.Controller(
            'form',
            buildForm({
                schema: formSchema,
                sections: [
                    {
                        id: this.sectionId(0),
                    },
                    {
                        id: this.sectionId(1),
                    },
                ],
            })
        )
    }
}

const formSchema = buildSchema({
    id: 'schema',
    fields: {
        firstName: {
            type: 'text',
        },
        lastName: {
            type: 'text',
        },
    },
})

type FormSchema = typeof formSchema
