import { test, suite, assert } from '@sprucelabs/test-utils'
import { Router, SkillViewControllerId } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import SpyRouter from '../../../tests/SpyRouter'
import routerTestPatcher from '../../../tests/utilities/routerTestPatcher'
import vcAssert from '../../../tests/utilities/vcAssert.utility'

@suite()
export default class AssertingRedirectsTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private router!: Router

    protected async beforeEach() {
        await super.beforeEach()
        this.router = new SpyRouter()
    }

    @test()
    protected async knowsWhenNotRedirecting() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionRedirects({
                router: this.router,
                action: () => {},
            })
        )
    }

    @test()
    protected async knowsWhenRedirecting() {
        const options = {
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect('hey')
            },
        }
        await vcAssert.assertActionRedirects(options)
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionDoesNotRedirect(options)
        )
    }

    @test()
    protected async passesThroughOriginalArgs() {
        const id = `${Math.random()}`
        const key = `${Math.random()}`
        const value = `${Math.random()}`
        const args = { [key]: value }

        await vcAssert.assertActionRedirects({
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect(id, args)
            },
        })

        //@ts-ignore
        assert.isEqualDeep(this.router.lastRedirect, {
            id,
            args,
        })
    }

    @test()
    protected async finishesWithForeverAction() {
        await vcAssert.assertActionRedirects({
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect('hey')
                await new Promise(() => {})
            },
        })
    }

    @test()
    protected async throwsWithMissmatchOnDestinationId() {
        const options = {
            router: this.router,
            action: async () => {
                //@ts-ignore
                return this.router.redirect('taco')
            },
            destination: {
                id: 'tester' as SkillViewControllerId,
            },
        }
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionRedirects(options)
        )

        await vcAssert.assertActionDoesNotRedirect(options)
    }

    @test()
    protected async passesWithDestinationIdMatch() {
        await vcAssert.assertActionRedirects({
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect('tester')
            },
            destination: {
                id: 'tester' as SkillViewControllerId,
            },
        })
    }

    @test()
    protected async throwsWhenNotPassedArgsButExpecting() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionRedirects({
                router: this.router,
                action: async () => {
                    //@ts-ignore
                    await this.router.redirect('tester')
                },
                destination: {
                    id: 'tester' as SkillViewControllerId,
                    args: {
                        cheesy: 'burrito',
                    },
                },
            })
        )
    }

    @test()
    protected async matchesArgs() {
        await vcAssert.assertActionRedirects({
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect('tester', { cheesy: 'burrito' })
            },
            destination: {
                id: 'tester' as SkillViewControllerId,
                args: {
                    cheesy: 'burrito',
                },
            },
        })
    }

    @test()
    protected async throwsWithMissMatchedArgs() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionRedirects({
                router: this.router,
                action: async () => {
                    //@ts-ignore
                    await this.router.redirect('tester', {
                        cheesy: 'burprito',
                        waka: 'taco',
                    })
                },
                destination: {
                    id: 'tester' as SkillViewControllerId,
                    args: {
                        cheesy: 'burrito',
                    },
                },
            })
        )
    }

    @test()
    protected async canPatchRedirectToThrow() {
        routerTestPatcher.patchRedirectToThrow(this.router)
        await assert.doesThrowAsync(() =>
            //@ts-ignore
            this.router.redirect('heartwood.root')
        )
    }

    @test()
    protected async assertRedirectOnPatchedRouterWorks() {
        routerTestPatcher.patchRedirectToThrow(this.router)
        await vcAssert.assertActionRedirects({
            router: this.router,
            action: async () => {
                //@ts-ignore
                await this.router.redirect('heartwood.root')
            },
        })
    }

    @test()
    protected async redirectPassesBackReturnObject() {
        const mockResponse = {
            hello: `${new Date().getTime() * Math.random()}`,
        }
        SpyRouter.redirectResponse = mockResponse

        const vc = await vcAssert.assertActionRedirects({
            router: this.router,
            //@ts-ignore
            action: async () => this.router.redirect('heartwood.root'),
        })

        assert.isTruthy(vc)

        assert.isEqualDeep(vc, mockResponse)
    }
}
