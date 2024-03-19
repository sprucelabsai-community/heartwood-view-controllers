import { assert } from '@sprucelabs/test-utils'
import {
	ViewController,
	ViewControllerPluginConstructor,
} from '../../types/heartwood.types'

const vcPluginAssert = {
	pluginIsInstalled: (
		vc: ViewController<any>,
		named: string,
		PluginClass?: ViewControllerPluginConstructor
	) => {
		//@ts-ignore
		const plugin = vc.plugins[named]
		assert.isTruthy(
			plugin,
			`Plugin '${named}' is not installed. Try running 'spruce create.plugin' to get started.`
		)

		if (PluginClass) {
			assert.isInstanceOf(plugin, PluginClass)
		}
	},
}

export default vcPluginAssert
