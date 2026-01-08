import { LoggableType, buildLog } from '@sprucelabs/spruce-skill-utils'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { Card, ViewControllerId } from '../../types/heartwood.types'
import AbstractViewController from '../../viewControllers/Abstract.vc'

@suite()
export default class LoggingInAViewTest extends AbstractViewControllerTest {
    @test()
    protected async canSetLog() {
        let errors: LoggableType[] = []

        this.views = this.Factory({
            log: {
                error: (...msg) => {
                    errors.push(...msg)
                    return ''
                },
                buildLog,
                info: () => '',
                warn: () => '',
                prefix: generateId(),
                stopTrackingHistory: () => {},
                getIsTrackingHistory: () => false,
                getHistoryLimit: () => 0,
                startTrackingHistory: () => {},
            },
        })

        this.views.setController('logging', LoggingViewController)

        const vc = this.Controller(
            'logging' as ViewControllerId,
            {}
        ) as LoggingViewController

        vc.getLog().error('test')
        assert.isEqualDeep(errors, ['test'])
    }
}

class LoggingViewController extends AbstractViewController<Card> {
    public getLog() {
        return this.log
    }
    public render(): Card {
        return {}
    }
}
