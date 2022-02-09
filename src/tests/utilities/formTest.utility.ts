import { assert } from '@sprucelabs/test'
import FormViewController from '../../viewControllers/Form.vc'

let shouldPatchSubmitToThrow = true

const formTestUtil = {
	patchSubmitToThrow() {
		//@ts-ignore
		if (!FormViewController.prototype._originalSubmit) {
			//@ts-ignore
			FormViewController.prototype._originalSubmit =
				FormViewController.prototype.submit

			//@ts-ignore
			FormViewController.prototype.submit = function () {
				if (shouldPatchSubmitToThrow) {
					assert.fail(
						`You can't submit a form directly! You gotta use 'interactor.submitForm()' instead!`
					)
				} else {
					//@ts-ignore
					return this._originalSubmit()
				}
			}
		}
	},

	disablePatchingSubmitToThrow() {
		shouldPatchSubmitToThrow = false
	},
}

export default formTestUtil
