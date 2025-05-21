import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

@suite()
export default class AssertingTogglesInListsTest extends AbstractViewControllerTest {
    protected controllerMap = {}

    @test()
    protected hasAssertListRendersToggle() {
        assert.isFunction(vcAssert.assertRowRendersToggle)
        assert.isFunction(vcAssert.assertRowDoesNotRenderToggle)
    }

    @test()
    protected knowsIfRowNotFound() {
        const listVc = this.ListVc()
        assert.doesThrow(() => vcAssert.assertRowRendersToggle(listVc, 'edit'))
        vcAssert.assertRowDoesNotRenderToggle(listVc, 'edit')
    }

    @test()
    protected canFindToggle() {
        const listVc = this.ListVc()
        vcAssert.assertRowRendersToggle(listVc, 'save')
        assert.doesThrow(() =>
            vcAssert.assertRowDoesNotRenderToggle(listVc, 'save')
        )
    }

    @test()
    protected throwsIfToggleByNameNotFound() {
        const listVc = this.ListVc()
        assert.doesThrow(() =>
            vcAssert.assertRowRendersToggle(listVc, 'save', 'taco')
        )
        vcAssert.assertRowDoesNotRenderToggle(listVc, 'save', 'taco')
    }

    @test()
    protected canFindToggleByName() {
        const listVc = this.ListVc({ rowId: 'create', toggleName: 'test' })
        vcAssert.assertRowRendersToggle(listVc, 'create', 'test')
        assert.doesThrow(() =>
            vcAssert.assertRowDoesNotRenderToggle(listVc, 'create', 'test')
        )
    }

    @test()
    protected canFindToggleInLaterRows() {
        const listVc = this.ListVc({ rowId: 'create', toggleName2: 'testing' })
        vcAssert.assertRowRendersToggle(listVc, 'create', 'testing')
        assert.doesThrow(() =>
            vcAssert.assertRowDoesNotRenderToggle(listVc, 'create', 'testing')
        )
    }

    @test()
    protected async knowsIfNoToggleIsRender() {
        const listVc = this.ListVc()

        assert.doesThrow(() =>
            vcAssert.assertRowRendersToggle(listVc, 'editing')
        )
        vcAssert.assertRowDoesNotRenderToggle(listVc, 'editing')
    }

    private ListVc(options?: {
        rowId?: string
        toggleName?: string
        toggleName2?: string
        toggleName3?: string
    }) {
        return this.Controller('list', {
            rows: [
                {
                    id: options?.rowId ?? 'save',
                    cells: [
                        {
                            toggleInput: {
                                name: options?.toggleName ?? 'test',
                            },
                        },
                        {
                            toggleInput: {
                                name: options?.toggleName2 ?? 'test2',
                            },
                        },
                        {
                            toggleInput: {
                                name: options?.toggleName3 ?? 'test3',
                            },
                        },
                    ],
                },
                {
                    id: 'editing',
                    cells: [
                        {
                            text: {
                                content: 'hey!',
                            },
                        },
                    ],
                },
            ],
        })
    }
}
