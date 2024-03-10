import SpruceError from '../errors/SpruceError'
import {
	ImportedViewController,
	ViewControllerPluginConstructor,
} from '../types/heartwood.types'

export default class ViewControllerImporter {
	public static Class?: typeof ViewControllerImporter

	protected constructor() {}

	public static Importer() {
		return new (this.Class ?? this)()
	}

	public import(script: string): {
		controllers: ImportedViewController[]
		plugins: Record<string, ViewControllerPluginConstructor>
	} {
		try {
			let exports = {}
			let plugins = {}

			const globals = Object.keys(global)
			const resets = globals
				.filter(
					(name) =>
						[
							'setTimeout',
							'clearTimeout',
							'setInterval',
							'clearInterval',
						].indexOf(name) === -1
				)
				.filter((name) => this.shouldOverideGlobalNamed(name))
				.map((name) => `var ${name} = {};`)
				.join('\n')

			const guargedScript = `

${resets}
var utils = {
	setTimeout,
	clearTimeout
}
var global = {}
var globalThis = {}
function heartwood(vcs, pluginClasses) {
	exports = vcs
	plugins = pluginClasses || {}
}


${script}`

			eval(guargedScript)

			this.validateImported(exports)

			const controllers = Object.values(exports).map((C: any) => {
				C.__imported = true
				return C
			}) as any

			return {
				controllers,
				plugins,
			}
		} catch (err: any) {
			throw new SpruceError({
				code: 'INVALID_VIEW_CONTROLLER_SOURCE',
				originalError: err,
			})
		}
	}

	private shouldOverideGlobalNamed(name: string): boolean {
		return name.search(/[^0-9a-zA-Z_]/) === -1 && name.search(/^\d/) === -1
	}

	private validateImported(exports: Record<string, any>) {
		if (Object.keys(exports).length === 0) {
			throw new Error(
				'View controller script does not set ViewController classes to exports.'
			)
		}

		Object.keys(exports).forEach((key: string) => {
			const Class = exports[key] as any
			if (!Class.id) {
				throw new Error(`${key} needs \`public static readonly id = 'my-id'\``)
			}
		})
	}
}
