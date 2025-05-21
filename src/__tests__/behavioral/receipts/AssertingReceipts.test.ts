import { assertOptions } from '@sprucelabs/schema'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { pluckFirstFromCard } from '../../../tests/utilities/assertSupport'
import {
    Card,
    CardSection,
    ViewController,
} from '../../../types/heartwood.types'
import renderUtil from '../../../utilities/render.utility'

@suite()
export default class AssertingReceiptsTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => receiptAssert.cardRendersReceipt())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsIfNoReceipt() {
        assert.doesThrow(() => this.assertRendersReceipt([]), 'not find')
    }

    @test()
    protected async passesIfReceiptIsInTheFirstSection() {
        this.assertRendersReceipt([
            {
                receipt: {},
            },
        ])
    }

    @test()
    protected async passesIfInSecondSection() {
        this.assertRendersReceipt([
            {},
            {
                receipt: {},
            },
        ])
    }

    @test()
    protected async throwsWithMissingOnAssertingLineItems() {
        //@ts-ignore
        const err = assert.doesThrow(() => receiptAssert.cardRendersReceipt())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    private assertRendersReceipt(sections: CardSection[]) {
        const vc = this.Controller('card', {
            body: {
                sections,
            },
        })
        receiptAssert.cardRendersReceipt(vc)
    }
}

const receiptAssert = {
    cardRendersReceipt: (vc: ViewController<Card>) => {
        assertOptions({ vc }, ['vc'])
        const model = renderUtil.render(vc)
        assert.isTruthy(
            pluckFirstFromCard(model, 'receipt'),
            `I could not find a receipt in the card you passed!`
        )
    },
}
