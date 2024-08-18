import { test, assert } from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import buildActiveRecordList from '../../../builders/buildActiveRecordList'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class BuildingAnActiveRecordListTest extends AbstractViewControllerTest {
    @test()
    protected static builderExists() {
        assert.isFunction(buildActiveRecordList)
    }

    @test()
    protected static listBuilderIsTyped() {
        buildActiveRecordList({
            eventName: 'list-organizations::v2020_12_25',
            responseKey: 'organizations',
            rowTransformer: () => ({ id: 'test', cells: [] }),
        })
    }

    @test()
    protected static cardBuilderIsTyped() {
        this.buildOptions()
    }

    @test()
    protected static async undefinedTargetAndPayloadIfNeitherAreDefined() {
        const vc = this.Controller('activeRecordList', this.buildOptions())
        //@ts-ignore
        assert.isUndefined(vc.fetcher.buildTargetAndPayload())
    }

    private static buildOptions() {
        return buildActiveRecordCard({
            eventName: 'list-organizations::v2020_12_25',
            rowTransformer: () => ({ id: 'test', cells: [] }),
            responseKey: 'organizations',
            header: {},
            footer: {},
        })
    }
}
