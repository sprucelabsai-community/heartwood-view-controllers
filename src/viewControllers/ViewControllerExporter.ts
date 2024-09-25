import pathUtil from 'path'
import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Compiler, Configuration, DefinePlugin, Stats, webpack } from 'webpack'
import SpruceError from '../errors/SpruceError'

export default class ViewControllerExporter {
    private cwd: string
    private compiler?: Compiler
    private isWatching: boolean | undefined = false
    private willIncrementallyBuildHandler?: WillIncrementallyBuildHandler
    private didIncrementallyBuildHandler?: DidIncrementallyBuildHandler

    private constructor(cwd: string) {
        this.cwd = cwd
    }
    private config: Configuration = {}

    public static Exporter(cwd: string) {
        assertOptions({ cwd }, ['cwd'])
        return new this(cwd)
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
        } = options

        this.assertValidSource(source)

        const { filename, dirname } = this.splitToFileAndDir(destination)

        this.assertValidDestinationFilename(filename)

        this.config = this.buildConfiguration({
            entry: source,
            destinationDirname: dirname,
            destinationFilename: filename,
            shouldProfile: !!profilerStatsDestination,
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

    public getConfig(): Configuration {
        return this.config
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

    private buildConfiguration(options: {
        entry: string
        destinationDirname: string
        destinationFilename: string
        shouldProfile?: boolean
        defines?: any
    }): Configuration {
        const {
            entry,
            destinationDirname,
            destinationFilename,
            shouldProfile,
            defines,
        } = options

        return {
            entry,
            context: this.cwd,
            stats: !!shouldProfile,
            resolve: {
                extensions: ['.ts', '.js'],
                fallback: {
                    path: false,
                    fs: false,
                    util: false,
                    stream: false,
                    child_process: false,
                    os: false,
                    constants: false,
                    http: false,
                    https: false,
                    crypto: false,
                    vm: false,
                    inspector: false,
                    worker_threads: false,
                    dns: false,
                    net: false,
                    mongodb: false,
                    tls: false,
                    zlib: false,
                    aws4: false,
                    'fs-extra': false,
                    url: false,
                    querystring: false,
                    buffer: false,
                    assert: false,
                    'mongodb-client-encryption': false,
                    tty: false,
                    timers: false,
                    process: false,
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
                                sourceMaps: false,
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
                minimize: true,
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
    defines?: any
    onDidIncrementallyBuild?: DidIncrementallyBuildHandler
    onWillIncrementallyBuild?: DidIncrementallyBuildHandler
    shouldWatch?: boolean
}

type Callback = (err?: null | Error, results?: Stats) => void

type WillIncrementallyBuildHandler = () => void
