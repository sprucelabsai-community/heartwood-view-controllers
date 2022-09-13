import { assert } from '@sprucelabs/test-utils'
import { Router } from '../..'

const routerTestPatcher = {
	patchRedirectToThrow(router: Router) {
		//@ts-ignore
		router._originalRedirect = router.redirect.bind(router)
		//@ts-ignore
		router.redirect = (id: string) => {
			assert.fail(`You were unexpectedly redirected to '${id}'!`)
		}
	},
}

export default routerTestPatcher
