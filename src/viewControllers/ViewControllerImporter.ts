import SpruceError from '../errors/SpruceError'
import { ImportedViewController } from '../types/heartwood.types'

export default class ViewControllerImporter {
	public import(script: string): ImportedViewController[] {
		try {
			const exports = {}
			const globals = Object.keys(global)
			const resets = globals.map((name) => `var ${name} = {};`).join('\n')

			eval(`
${resets}
var global = {}

${script}`)

			this.validateImported(exports)

			return Object.values(exports) as any
		} catch (err) {
			throw new SpruceError({
				code: 'INVALID_VIEW_CONTROLLER_SOURCE',
				originalError: err,
			})
		}
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

	public static Importer() {
		return new this()
	}
}
