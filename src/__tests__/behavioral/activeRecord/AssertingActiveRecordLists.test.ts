import { EventName } from '@sprucelabs/mercury-types'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import activeListAssert from '../../../tests/utilities/activeListAssert'
import { ListRow } from '../../../types/heartwood.types'
import ActiveRecordListViewController from '../../../viewControllers/activeRecord/ActiveRecordList.vc'

@suite()
export default class AssertingActiveRecordListsTest extends AbstractViewControllerTest {
    @test()
    protected async cardRendersActiveRecordListThrowsIfMissing() {
        const vc = this.Controller('card', {})
        assert.doesThrow(
            () => activeListAssert.cardRendersActiveRecordList(vc),
            'could not find'
        )
    }

    @test()
    protected async doesNotThrowIfActiveRecordListInFirstSection() {
        const vc = this.Vc()

        activeListAssert.cardRendersActiveRecordList(vc)
    }

    @test()
    protected async doesNotThrowIfActiveRecordListInSecondSection() {
        const vc = this.VcWithListOnSecondSection()

        activeListAssert.cardRendersActiveRecordList(vc)
    }

    @test()
    protected async throwsIfIdDoesNotMatch() {
        const id = generateId()
        const vc = this.Vc(id)
        const wrongId = generateId()

        assert.doesThrow(
            () => activeListAssert.cardRendersActiveRecordList(vc, wrongId),
            `${wrongId}`
        )
    }

    @test()
    protected async doesNotThrowIfIdMatches() {
        const id = generateId()
        const vc = this.Vc(id)

        activeListAssert.cardRendersActiveRecordList(vc, id)
    }

    @test()
    protected async doesNotThrowWhenMatchIdListInSecondSection() {
        const id = generateId()
        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        list: this.renderActiveRecordList(),
                    },
                    {
                        list: this.renderActiveRecordList(id),
                    },
                ],
            },
        })

        activeListAssert.cardRendersActiveRecordList(vc, id)
    }

    @test()
    protected async doesNotThrowIfIdMatchesInSecondSection() {
        const id = generateId()
        const vc = this.VcWithListOnSecondSection(id)

        activeListAssert.cardRendersActiveRecordList(vc, id)
    }

    @test()
    protected async cardRendersActiveRecordListReturnsActiveRecordList() {
        const vc = this.Vc()

        const list = activeListAssert.cardRendersActiveRecordList(vc)
        assert.isInstanceOf(list, ActiveRecordListViewController)
    }

    @test()
    protected async cardDoesNotRenderActiveRecordListThrowsIfMissing() {
        const vc = this.Vc()
        assert.doesThrow(
            () => activeListAssert.cardDoesNotRendersActiveRecordList(vc),
            'I found'
        )
    }

    @test()
    protected async cardDoesNotRenderActiveRecordListDoesNotThrowIfMissing() {
        const vc = this.Controller('card', {})
        activeListAssert.cardDoesNotRendersActiveRecordList(vc)
    }

    @test()
    protected async cardDoesNotRenderActiveRecordListThrowIfMissing() {
        const vc = this.VcWithListOnSecondSection()
        assert.doesThrow(
            () => activeListAssert.cardDoesNotRendersActiveRecordList(vc),
            'I found'
        )
    }

    @test()
    protected async cardDoesNotRenderActiveRecordListDoesNotThrowIfMissingInAllSections() {
        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        title: 'First section',
                    },
                    {
                        title: 'First section',
                    },
                ],
            },
        })

        activeListAssert.cardDoesNotRendersActiveRecordList(vc)
    }

    @test()
    protected async throwsIfListIsNotActiveRecordList() {
        const vc = this.VcWithList()

        assert.doesThrow(
            () => activeListAssert.cardRendersActiveRecordList(vc),
            'I could not find an active record list'
        )
    }

    @test()
    protected async doesNotRenderActiveRecordListIgnoresStandardList() {
        const vc = this.VcWithList()
        activeListAssert.cardDoesNotRendersActiveRecordList(vc)
    }

    private VcWithList() {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        list: this.Controller('list', {
                            rows: [],
                        }).render(),
                    },
                ],
            },
        })
    }

    private VcWithListOnSecondSection(id?: string) {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        title: 'First section',
                    },
                    {
                        list: this.renderActiveRecordList(id),
                    },
                ],
            },
        })
    }

    private Vc(activeRecordListId?: string) {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        list: this.renderActiveRecordList(
                            activeRecordListId ?? generateId()
                        ),
                    },
                ],
            },
        })
    }

    private renderActiveRecordList(id?: string) {
        return this.Controller('active-record-list', {
            id: id ?? generateId(),
            eventName: generateId() as EventName,
            rowTransformer: (_record: unknown) => ({}) as ListRow,
            responseKey: generateId(),
        }).render()
    }
}
