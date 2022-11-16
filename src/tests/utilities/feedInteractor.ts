import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { Feed, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

const feedInteractor = {
	async submitMessage(vc: ViewController<Feed>, message: string) {
		assertOptions({ vc, message }, ['vc', 'message'])

		const { onSubmitMessage } = renderUtil.render(vc)

		assert.isTruthy(
			onSubmitMessage,
			`Make sure you set a handler for 'onSubmitMessage: () => boolean | Promise<boolean>'`
		)

		return await onSubmitMessage(message)
	},
}

export default feedInteractor
