import { assert } from '@sprucelabs/test-utils'
import {
	ViewController,
	ViewControllerPlugin,
} from '../../types/heartwood.types'

const vcPluginAssert = {
	pluginIsInstalled<Plugin extends ViewControllerPlugin>(
		vc: ViewController<any>,
		named: string,
		PluginClass?: new (options: any) => Plugin
	): Plugin {
		//@ts-ignore
		const plugin = vc.plugins[named]
		assert.isTruthy(
			plugin,
			`Plugin '${named}' is not installed. Try running 'spruce create.plugin' to get started.`
		)

		if (PluginClass) {
			assert.isInstanceOf(plugin, PluginClass)
		}

		return plugin
	},
}

export default vcPluginAssert
