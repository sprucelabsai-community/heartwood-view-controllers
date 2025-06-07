import { test, suite, assert } from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import buildActiveRecordList from '../../../builders/buildActiveRecordList'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class BuildingAnActiveRecordListTest extends AbstractViewControllerTest {
    @test()
    protected builderExists() {
        assert.isFunction(buildActiveRecordList)
    }

    @test()
    protected listBuilderIsTyped() {
        buildActiveRecordList({
            eventName: 'list-organizations::v2020_12_25',
            responseKey: 'organizations',
            rowTransformer: () => ({ id: 'test', cells: [] }),
        })
    }

    @test()
    protected cardBuilderIsTyped() {
        this.buildOptions()
    }

    @test()
    protected async undefinedTargetAndPayloadIfNeitherAreDefined() {
        const vc = this.Controller('active-record-card', this.buildOptions())
        //@ts-ignore
        assert.isUndefined(vc.fetcher.buildTargetAndPayload())
    }

    private buildOptions() {
        return buildActiveRecordCard({
            eventName: 'list-organizations::v2020_12_25',
            rowTransformer: () => ({ id: 'test', cells: [] }),
            responseKey: 'organizations',
            header: {},
            footer: {},
        })
    }
}
