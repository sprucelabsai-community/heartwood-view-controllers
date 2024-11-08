import SpruceError from '../errors/SpruceError'
import {
    AppViewControllerConstructor,
    ImportedViewController,
    ViewControllerPluginsByName,
} from '../types/heartwood.types'

export default class ViewControllerImporter {
    public static Class?: typeof ViewControllerImporter

    protected constructor() {}

    public static Importer() {
        return new (this.Class ?? this)()
    }

    public import(script: string): ImportResults {
        try {
            let exports = {}
            let plugins = {}
            let AppClass: AppViewControllerConstructor | undefined

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
function heartwood(...args) {
    const { vcs, pluginsByName, App } = args[0].vcs ? args[0] : { vcs: args[0], pluginsByName: args[1] }

    AppClass = App
	exports = vcs
	plugins = pluginsByName || {}
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
                App: AppClass,
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
                throw new Error(
                    `${key} needs \`public static readonly id = 'my-id'\``
                )
            }
        })
    }
}

interface ImportResults {
    controllers: ImportedViewController[]
    App?: AppViewControllerConstructor
    plugins: ViewControllerPluginsByName
}
