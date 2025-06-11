import fs from 'fs'
import pathUtil from 'path'
import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Compiler, Configuration, DefinePlugin, Stats, webpack } from 'webpack'
import SpruceError from '../errors/SpruceError'
const graceful = require('graceful-fs')

graceful.lstat = (
    path: string,
    cb: (err: Error | null, stats: any) => void
) => {
    fs.lstat(path, (err: Error | null, stats: any) => {
        if (err) {
            cb(err, stats)
            return
        }
        stats.ctime = stats.ctimeMs
        stats.mtime = stats.mtimeMs

        cb(null, stats)
    })
}

export default class ViewControllerExporter {
    public static Class?: typeof ViewControllerExporter

    private cwd: string
    private compiler?: Compiler
    private isWatching: boolean | undefined = false
    private willIncrementallyBuildHandler?: WillIncrementallyBuildHandler
    private didIncrementallyBuildHandler?: DidIncrementallyBuildHandler
    protected config: Configuration = {}

    protected constructor(cwd: string) {
        this.cwd = cwd
    }

    public static Exporter(cwd: string) {
        assertOptions({ cwd }, ['cwd'])
        return new (this.Class ?? this)(cwd)
    }

    public async export(options: ExportOptions): Promise<void> {
        this.assertValidExportOptions(options)

        const {
            source,
            destination,
            profilerStatsDestination,
            defines,
            shouldWatch,
            onDidIncrementallyBuild,
            onWillIncrementallyBuild,
            shouldBuildSourceMaps,
        } = options

        this.assertValidSource(source)

        const { filename, dirname } = this.splitToFileAndDir(destination)

        this.assertValidDestinationFilename(filename)

        this.config = this.buildConfiguration({
            entry: source,
            destinationDirname: dirname,
            destinationFilename: filename,
            shouldProfile: !!profilerStatsDestination,
            shouldBuildSourceMaps,
            defines,
        })

        this.compiler = this.Compiler()
        this.isWatching = shouldWatch

        this.willIncrementallyBuildHandler = onWillIncrementallyBuild
        this.didIncrementallyBuildHandler = onDidIncrementallyBuild

        await this.run({
            shouldWatch,
            profilerStatsDestination,
        })
    }

    public getCwd(): string {
        return this.cwd
    }

    private splitToFileAndDir(destination: string) {
        const dirname = pathUtil.dirname(destination)
        const filename = pathUtil.basename(destination)
        return { filename, dirname }
    }

    public async kill() {
        if (this.isWatching) {
            await new Promise((r) => {
                this.compiler?.close(r)
            })
        }
    }

    private run(options: {
        profilerStatsDestination?: string
        shouldWatch?: boolean
    }): Promise<Compiler> {
        const { profilerStatsDestination, shouldWatch } = options

        return new Promise((resolve: any, reject) => {
            let isFirst = true

            const cb: Callback = (err, stats) => {
                if (!isFirst) {
                    this.didIncrementallyBuildHandler?.(
                        //@ts-ignore
                        stats?.compilation?.errors?.[0]?.error ?? undefined
                    )
                    return
                }
                isFirst = false

                if (err) {
                    reject(err)
                    return
                }

                if (stats?.hasErrors()) {
                    reject(
                        new SpruceError({
                            code: 'EXPORT_FAILED',
                            originalError: stats?.compilation.errors[0],
                        })
                    )
                    return
                }

                if (!stats || stats?.compilation.emittedAssets.size === 0) {
                    reject(
                        new SpruceError({
                            code: 'EXPORT_FAILED',
                            originalError: stats?.compilation.errors[0],
                        })
                    )
                    return
                }

                if (profilerStatsDestination) {
                    const contents = JSON.stringify(stats.toJson())
                    diskUtil.writeFile(
                        diskUtil.resolvePath(
                            profilerStatsDestination,
                            'stats.json'
                        ),
                        contents
                    )
                }

                resolve(this.compiler)
            }

            if (shouldWatch) {
                this.compiler?.watch({}, cb)
                this.attachWillBuildHandler()
            } else {
                this.compiler?.run(cb)
            }
        })
    }

    private attachWillBuildHandler() {
        let firstRun = true
        this.compiler?.hooks.beforeCompile.tap('ViewPlugin', () => {
            if (!firstRun) {
                this.willIncrementallyBuildHandler?.()
            }
            firstRun = false
        })
    }

    private Compiler() {
        return webpack(this.config)
    }

    private buildConfiguration(
        options: BuildConfigurationOptions
    ): Configuration {
        const {
            entry,
            destinationDirname,
            destinationFilename,
            shouldProfile,
            defines,
            shouldBuildSourceMaps,
        } = options

        return {
            entry,
            mode: shouldBuildSourceMaps ? 'development' : 'production',
            context: this.cwd,
            stats: !!shouldProfile,
            devtool: shouldBuildSourceMaps ? 'inline-source-map' : false,
            resolve: {
                extensions: ['.ts', '.js'],
                fallback: {
                    'fs-extra': false,
                    'mongodb-client-encryption': false,
                    assert: false,
                    aws4: false,
                    buffer: false,
                    child_process: false,
                    constants: false,
                    crypto: false,
                    dns: false,
                    fs: false,
                    https: false,
                    inspector: false,
                    module: false,
                    mongodb: false,
                    net: false,
                    os: false,
                    path: false,
                    process: false,
                    querystring: false,
                    stream: false,
                    timers: false,
                    tls: false,
                    tty: false,
                    url: false,
                    util: false,
                    vm: false,
                    worker_threads: false,
                    zlib: false,
                },
                alias: {
                    'google-logging-utils': pathUtil.resolve(
                        __dirname,
                        'noop.js'
                    ),
                },
            },
            output: {
                path: destinationDirname,
                publicPath: '/',
                filename: destinationFilename,
            },
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: {
                            loader: `babel-loader`,
                            options: {
                                configFile: false,
                                sourceMaps: shouldBuildSourceMaps
                                    ? 'inline'
                                    : false,
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        { modules: false, loose: false },
                                    ],
                                    '@babel/preset-typescript',
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime',
                                    [
                                        '@babel/plugin-transform-class-properties',
                                        { loose: false },
                                    ],
                                    [
                                        'module-resolver',
                                        {
                                            root: ['./'],
                                            alias: {
                                                '#spruce': './src/.spruce',
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            optimization: {
                minimize: !shouldBuildSourceMaps,
                minimizer: [new TerserPlugin()],
            },
            plugins: [
                new DefinePlugin({
                    ...defines,
                }),
            ],
        }
    }

    private assertValidDestinationFilename(filename: string) {
        if (filename.substr(-3) !== '.js') {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['destination'],
                friendlyMessage: `Destination must be a javascript file (ending in .js).`,
            })
        }
    }

    private assertValidSource(entry: string) {
        const absolute = diskUtil.resolvePath(this.cwd, entry)

        if (!diskUtil.doesFileExist(absolute)) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['source'],
                friendlyMessage: `Source file must exist. Could not find ${absolute}.`,
            })
        }
    }

    private assertValidExportOptions(options: {
        source: string
        destination: string
        profilerStatsDestination?: string
    }) {
        assertOptions(options ?? {}, ['source', 'destination'])

        if (options.profilerStatsDestination) {
            if (!diskUtil.isDir(options.profilerStatsDestination)) {
                throw new SchemaError({
                    code: 'INVALID_PARAMETERS',
                    parameters: ['profilerStatsDestination'],
                    friendlyMessage:
                        'env.VIEW_PROFILER_STATS_DESTINATION_DIR must point to a directory that already exists.',
                })
            }
        }
    }
}

type DidIncrementallyBuildHandler = (err?: Error | undefined) => void

export interface ExportOptions {
    source: string
    destination: string
    profilerStatsDestination?: string
    defines?: Record<string, string>
    onDidIncrementallyBuild?: DidIncrementallyBuildHandler
    onWillIncrementallyBuild?: DidIncrementallyBuildHandler
    shouldWatch?: boolean
    shouldBuildSourceMaps?: boolean
}

type Callback = (err?: null | Error, results?: Stats) => void

type WillIncrementallyBuildHandler = () => void

interface BuildConfigurationOptions {
    entry: string
    destinationDirname: string
    destinationFilename: string
    shouldProfile?: boolean
    defines?: any
    shouldBuildSourceMaps?: boolean
}
