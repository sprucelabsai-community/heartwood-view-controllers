import { assert } from '@sprucelabs/test'
import { AbstractViewController } from '../..'

const confirmTestPatcher = {
	patchConfirmToThrow(vc: AbstractViewController<any>) {
		//@ts-ignore
		vc.confirm = async () => {
			assert.fail(`Your view controller unexpectedly rendered a confirm!`)
		}
	},
}

export default confirmTestPatcher
