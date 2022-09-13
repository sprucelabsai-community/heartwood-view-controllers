import { assert } from '@sprucelabs/test-utils'
import AbstractViewController from '../../viewControllers/Abstract.vc'

const dialogTestPatcher = {
	patchDialogToThrow(vc: AbstractViewController<any>) {
		//@ts-ignore
		vc._originalRenderInDialog = vc.renderInDialog?.bind(vc)

		//@ts-ignore
		vc.renderInDialog = () => {
			assert.fail(
				`You unexpectedly rendered a dialog. If this was on purpose, use await vcAssert.assertRendersDialog(). If this was a mistake, remember, there are only happy accidents. Also, stop this dialog from rendering.`
			)
		}
	},
}

export default dialogTestPatcher
