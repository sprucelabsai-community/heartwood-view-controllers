import { assert } from '@sprucelabs/test'

const interactionUtil = {
	async click(onClick: (() => void | Promise<void>) | null | undefined) {
		assert.isFunction(onClick, 'Click handler does not exist.')
		//@ts-ignore
		await onClick({})
	},
}

export default interactionUtil
