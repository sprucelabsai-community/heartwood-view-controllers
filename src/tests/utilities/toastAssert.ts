import { assert } from '@sprucelabs/test-utils'
import { ViewController } from '../../types/heartwood.types'

const toastAssert = {
	async rendersToast(vc: ViewController<any>, cb: () => void | Promise<void>) {
		let wasHit = false
		//@ts-ignore
		vc.toastHandler = () => {
			wasHit = true
		}

		await cb()

		assert.isTrue(
			wasHit,
			`No toast rendered. Try calling this.toast({...}) in your vc!`
		)
	},

	async doesNotRenderToast(
		vc: ViewController<any>,
		cb: () => void | Promise<void>
	) {
		try {
			await this.rendersToast(vc, cb)
		} catch {
			return
		}

		assert.fail('Toast was rendered when it should not have been.')
	},
}

export default toastAssert
