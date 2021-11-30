import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRouter from '../../../tests/MockRouter'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'

export default class AssertingRedirectsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static async knowsWhenNotRedirecting() {
		const router = new MockRouter()
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router,
				action: () => {},
			})
		)
	}

	@test()
	protected static async knowsWhenRedirecting() {
		const router = new MockRouter()
		await vcAssertUtil.assertActionRedirects({
			router,
			action: async () => {
				//@ts-ignore
				await router.redirect('hey')
			},
		})
	}

	@test()
	protected static async passesThroughOriginalArgs() {
		const id = `${Math.random()}`
		const key = `${Math.random()}`
		const value = `${Math.random()}`
		const args = { [key]: value }

		const router = new MockRouter()
		await vcAssertUtil.assertActionRedirects({
			router,
			action: async () => {
				//@ts-ignore
				await router.redirect(id, args)
			},
		})

		assert.isEqualDeep(router.lastRedirect, {
			id,
			args,
		})
	}

	@test()
	protected static async finishesWithForeverAction() {
		const router = new MockRouter()
		await vcAssertUtil.assertActionRedirects({
			router,
			action: async () => {
				//@ts-ignore
				await router.redirect('hey')
				await new Promise(() => {})
			},
		})
	}

	@test()
	protected static async throwsWithMissmatchOnDestinationId() {
		const router = new MockRouter()
		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router,
				action: async () => {
					//@ts-ignore
					return router.redirect('taco')
				},
				destination: {
					id: 'tester',
				},
			})
		)
	}

	@test()
	protected static async passesWithDestinationIdMatch() {
		const router = new MockRouter()
		await vcAssertUtil.assertActionRedirects({
			router,
			action: async () => {
				//@ts-ignore
				await router.redirect('tester')
			},
			destination: {
				id: 'tester',
			},
		})
	}

	@test()
	protected static async throwsWhenNotPassedArgsButExpecting() {
		const router = new MockRouter()

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router,
				action: async () => {
					//@ts-ignore
					await router.redirect('tester')
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
		const router = new MockRouter()

		await vcAssertUtil.assertActionRedirects({
			router,
			action: async () => {
				//@ts-ignore
				await router.redirect('tester', { cheesy: 'burrito' })
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
		const router = new MockRouter()

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertActionRedirects({
				router,
				action: async () => {
					//@ts-ignore
					await router.redirect('tester', { cheesy: 'burrito', waka: 'taco' })
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
}
