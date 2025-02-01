import { test, generateId } from '@sprucelabs/test-utils'
import { ListRow } from '../../../types/heartwood.types'
import { ListPerson } from '../../support/EventFaker'
import AbstractClientSidePagingActiveRecordCard from './AbstractClientSidePagingActiveRecordCardTest'

export default class ActiveRecordCardNotUsingIdFieldAsRowIdTest extends AbstractClientSidePagingActiveRecordCard {
    @test()
    protected static async canCreateActiveRecordCardNotUsingIdFieldAsRowId() {
        const person: ListPerson = {
            id: generateId(),
            casualName: generateId(),
            dateCreated: 0,
        }
        await this.eventFaker.fakeListPeople(() => [person])

        this.setupCardWithPaging(
            {},
            {
                eventName: 'list-people::v2020_12_25',
                responseKey: 'people',
                rowTransformer: (person: ListPerson) => {
                    return {
                        id: person.casualName,
                        cells: [],
                    } as ListRow
                },
            }
        )

        await this.load()

        this.vc.deleteRow(person.casualName)
        this.vc.assertDoesNotRenderRow(person.casualName)
    }
}
