import { test, assert } from '@sprucelabs/test'
import { Router } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRouter from '../../../tests/MockRouter'
import routerTestPatcher from '../../../tests/utilities/routerTestPatcher'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'

export default class AssertingRedirectsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static router: Router

	protected static async beforeEach() {
		await super.beforeEach()
		this.router = new MockRouter()
	}

	@test()
	protected static async knowsWhenNotRedirecting() {
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router: this.router,
				action: () => {},
			})
		)
	}

	@test()
	protected static async knowsWhenRedirecting() {
		const options = {
			router: this.router,
			action: async () => {
				//@ts-ignore
				await this.router.redirect('hey')
			},
		}
		await vcAssertUtil.assertActionRedirects(options)
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionDoesNotRedirect(options)
		)
	}

	@test()
	protected static async passesThroughOriginalArgs() {
		const id = `${Math.random()}`
		const key = `${Math.random()}`
		const value = `${Math.random()}`
		const args = { [key]: value }

		await vcAssertUtil.assertActionRedirects({
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
	protected static async finishesWithForeverAction() {
		await vcAssertUtil.assertActionRedirects({
			router: this.router,
			action: async () => {
				//@ts-ignore
				await this.router.redirect('hey')
				await new Promise(() => {})
			},
		})
	}

	@test()
	protected static async throwsWithMissmatchOnDestinationId() {
		const options = {
			router: this.router,
			action: async () => {
				//@ts-ignore
				return this.router.redirect('taco')
			},
			destination: {
				id: 'tester',
			},
		}
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects(options)
		)

		await vcAssertUtil.assertActionDoesNotRedirect(options)
	}

	@test()
	protected static async passesWithDestinationIdMatch() {
		await vcAssertUtil.assertActionRedirects({
			router: this.router,
			action: async () => {
				//@ts-ignore
				await this.router.redirect('tester')
			},
			destination: {
				id: 'tester',
			},
		})
	}

	@test()
	protected static async throwsWhenNotPassedArgsButExpecting() {
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router: this.router,
				action: async () => {
					//@ts-ignore
					await this.router.redirect('tester')
				},
				destination: {
					id: 'tester',
					args: {
						cheesy: 'burrito',
					},
				},
			})
		)
	}

	@test()
	protected static async matchesArgs() {
		await vcAssertUtil.assertActionRedirects({
			router: this.router,
			action: async () => {
				//@ts-ignore
				await this.router.redirect('tester', { cheesy: 'burrito' })
			},
			destination: {
				id: 'tester',
				args: {
					cheesy: 'burrito',
				},
			},
		})
	}

	@test()
	protected static async throwsWithMissMatchedArgs() {
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router: this.router,
				action: async () => {
					//@ts-ignore
					await this.router.redirect('tester', {
						cheesy: 'burrito',
						waka: 'taco',
					})
				},
				destination: {
					id: 'tester',
					args: {
						cheesy: 'burrito',
					},
				},
			})
		)
	}

	@test()
	protected static async canPatchRedirectToThrow() {
		routerTestPatcher.patchRedirectToThrow(this.router)
		await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.router.redirect('heartwood.root')
		)
	}

	@test()
	protected static async assertRedirectOnPatchedRouterWorks() {
		routerTestPatcher.patchRedirectToThrow(this.router)
		await vcAssertUtil.assertActionRedirects({
			router: this.router,
			action: async () => {
				//@ts-ignore
				await this.router.redirect('heartwood.root')
			},
		})
	}
}
