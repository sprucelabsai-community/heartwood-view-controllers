import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

export default class RenderUtilTest extends AbstractViewControllerTest {
    @test()
    protected static async shouldMaintainInstancesOfClassesInCardBody() {
        const card = this.Controller('card', {
            body: {
                sections: [
                    {
                        //@ts-ignore
                        streamer: new StubStreamer(),
                    },
                ],
            },
        })

        const model = this.render(card)
        //@ts-ignore
        assert.isInstanceOf(model.body!.sections![0].streamer, StubStreamer)
    }
}

class StubStreamer {}
