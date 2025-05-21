import fsUtil from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, {
    test,
    suite,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import {
    buildCwdNodeModulesImport,
    importExportCwd,
    importExportSource,
    importExportSourceNodeModulesImport,
    importExportSourceSyntaxError,
    importExportSourceWithDefines,
} from '../../../tests/constants'
import SpyViewControllerExporter from '../../../tests/SpyViewControllerExporter'
import ViewControllerExporter, {
    ExportOptions,
} from '../../../viewControllers/ViewControllerExporter'

@suite()
export default class ViewControllerExporterTest extends AbstractSpruceTest {
    private readonly source = importExportSource
    private buildCwd = importExportCwd
    private destination!: string

    private exporter!: SpyViewControllerExporter
    private didIncremntallyBuildCount!: number
    private incrementalBuildError!: Error | undefined
    private willIncremntallyBuildCount!: number

    protected async beforeEach() {
        await super.beforeEach()

        this.destination = diskUtil.resolvePath(
            diskUtil.createRandomTempDir(),
            'bundle.js'
        )

        ViewControllerExporter.Class = SpyViewControllerExporter
        this.exporter = this.Exporter()
        this.didIncremntallyBuildCount = 0
        this.willIncremntallyBuildCount = 0
        this.incrementalBuildError = undefined
    }

    protected async afterEach(): Promise<void> {
        await super.beforeEach()
        await this.exporter.kill()
    }

    @test()
    protected throwsWhenMissingCwd() {
        //@ts-ignore
        assert.doesThrow(() => ViewControllerExporter.Exporter())
    }

    @test()
    protected canGetPackager() {
        assert.isTruthy(this.exporter)
    }

    @test()
    protected packagerCanGetCwd() {
        assert.isEqual(this.exporter.getCwd(), this.buildCwd)
    }

    @test()
    protected packagerNeedsToBeAbsolutePath() {
        assert.isTrue(this.exporter.getCwd()[0] === pathUtil.sep)
    }

    @test()
    protected async packagerThrowsMissingParams() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => this.exporter.export())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['source', 'destination'],
        })
    }

    @test()
    protected async packagerThrowsMissingDestination() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            this.exporter.export({ source: this.source })
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['destination'],
        })
    }

    @test()
    protected async destinationMustBeAJsFile() {
        const err = await assert.doesThrowAsync(() =>
            this.exporter.export({
                source: this.source,
                destination: this.resolvePath('test', 'taco'),
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['destination'],
        })
    }

    @test()
    protected async sourceFileMustExist() {
        const err = await assert.doesThrowAsync(() =>
            this.exporter.export({
                source: '../aoestuhasoetuh',
                destination: this.destination,
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['source'],
        })
    }

    @test()
    protected async throwsWithSyntaxError() {
        const err = await assert.doesThrowAsync(async () => {
            await this.exporter.export({
                source: importExportSourceSyntaxError,
                destination: this.destination,
            })
        })

        errorAssert.assertError(err, 'EXPORT_FAILED')
        assert.doesInclude(err.message, 'Unexpected keyword')
    }

    @test()
    protected async packagerPackages() {
        await this.export()

        assert.isTrue(diskUtil.doesFileExist(this.destination))
        assert.isAbove(fsUtil.statSync(this.destination).size, 0)

        const contents = diskUtil.readFile(this.destination)
        assert.doesInclude(contents, 'go-team')
    }

    @test()
    protected async canExportViewThatImportsSomethingFromNodeModules() {
        const destination = diskUtil.resolvePath(
            __dirname,
            '..',
            '..',
            '..',
            'src',
            '__tests__',
            'testDirsAndFiles',
            'skill_import_from_node_module',
            'node_modules',
            'test.ts'
        )
        const contents = `export type Test = 'test'`

        diskUtil.writeFile(destination, contents)

        this.exporter = ViewControllerExporter.Exporter(
            buildCwdNodeModulesImport
        ) as SpyViewControllerExporter

        await this.exporter.export({
            source: importExportSourceNodeModulesImport,
            destination: this.destination,
        })
    }

    @test()
    protected async profileStatsDestMustBeADirectory() {
        const err = await assert.doesThrowAsync(() =>
            this.exporter.export({
                source: this.source,
                destination: this.destination,
                profilerStatsDestination: this.resolvePath('test.ts'),
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['profilerStatsDestination'],
        })
    }

    @test()
    protected async canExportProfileStats() {
        const statsDestination = diskUtil.createRandomTempDir()

        await this.exporter.export({
            source: this.source,
            destination: this.destination,
            profilerStatsDestination: this.resolvePath(statsDestination),
        })

        const filepath = this.resolvePath(statsDestination, '/stats.json')
        assert.isTrue(
            diskUtil.doesFileExist(filepath),
            `Did not generate ${filepath}.`
        )
    }

    @test()
    protected async doesNotIncludeChalk() {
        await this.export()

        const contents = diskUtil.readFile(this.destination)
        assert.doesNotInclude(contents, 'chalk')
    }

    @test()
    protected async configNoopsGoogleLoggingUtils() {
        await this.export()
        const config = this.getConfig()

        assert.isEqual(
            //@ts-ignore
            config.resolve?.alias?.['google-logging-utils'],
            this.resolvePath('build/viewControllers/noop.js')
        )
    }

    @test()
    protected async exportCanBuildSourceMaps() {
        await this.export({ shouldBuildSourceMaps: true })
        const config = this.getConfig()
        assert.isEqual(config.mode, 'development')
        assert.isEqual(config.devtool, 'inline-source-map')
        assert.isFalse(config.optimization?.minimize)
        assert.isEqual(
            //@ts-ignore
            config.module?.rules?.[0]?.use?.options.sourceMaps,
            'inline'
        )
    }

    @test()
    protected async noSourceMapsByDefault() {
        await this.export()
        const config = this.getConfig()
        assert.isEqual(config.mode, 'production')
        assert.isFalsy(config.devtool)
        assert.isTrue(config.optimization?.minimize)
        //@ts-ignore
        assert.isFalsy(config.module?.rules?.[0]?.use?.options.sourceMaps)
    }

    @test()
    protected async haveNoopFileThatReturnsEmptyObject() {
        const { default: noop } = require('../../../viewControllers/noop')
        assert.isEqualDeep(noop, {})
    }

    @test('can use define webpack plugin 1', {
        'process.env.TACO': JSON.stringify('ninja'),
    })
    @test('can use define webpack plugin 2', {
        'process.env.TACO': JSON.stringify('salad'),
        'process.env.BURRITO': JSON.stringify('supreme'),
    })
    protected async canPassCustomWebpackDefinesToExporterConfig(
        definePlugin: any
    ) {
        await this.exporter.export({
            source: this.source,
            destination: this.destination,
            defines: definePlugin,
        })

        const config = this.getConfig()
        assert.doesInclude(config, {
            plugins: [{ definitions: definePlugin }],
        })
    }

    @test(
        'replace process.env.TACO with salad',
        'process.env.TACO',
        JSON.stringify('salad')
    )
    @test(
        'replace process.env.TACO with pizza',
        'process.env.TACO',
        JSON.stringify('pizza')
    )
    @test(
        'replace WIZARDS_NAME with Merlin',
        'WIZARDS_NAME',
        JSON.stringify('Merlin')
    )
    protected async exportedCustomDefinesAreReplaced(
        key: string,
        value: string
    ) {
        await this.exporter.export({
            source: importExportSourceWithDefines,
            destination: this.destination,
            defines: { [key]: value },
        })

        const contents = diskUtil.readFile(this.destination)

        assert.doesNotInclude(contents, key)
        assert.doesInclude(contents, value)
    }

    @test()
    protected async watchIsTrueIfEnvIsSetToTrue() {
        const compiler = this.dropInSpyCompiler()
        await this.export()
        assert.isFalse(compiler.wasWatchHit)
        assert.isTrue(compiler.wasRunHit)
    }

    @test()
    protected async watchIsTrueIfEnvIsSetToFalse() {
        const compiler = this.dropInSpyCompiler()
        await this.export({ shouldWatch: true })
        assert.isTrue(compiler.wasWatchHit)
        assert.isFalse(compiler.wasRunHit)
    }

    @test()
    protected async watchingTriggersCallbackOnChanges() {
        await this.buildAndWatchSkillAtRandomDir()

        await this.replaceInBookSvc('go-team', 'stop-dude')
        this.assertDidIncremntallyBuildHitCount(1)
        this.assertWillIncremntallyBuildHitCount(1)

        await this.replaceInBookSvc('stop-dude', 'what-the')

        let tries = 0
        while (this.didIncremntallyBuildCount === 1 && tries < 100) {
            await this.wait(100)
        }

        this.assertDidIncremntallyBuildHitCount(2)
        this.assertWillIncremntallyBuildHitCount(2)
    }

    @test()
    protected async incrementalBuildgetsErrors() {
        await this.buildAndWatchSkillAtRandomDir()
        await this.replaceInBookSvc('go-team', "stop-dude'\n\naoeuaou")

        let tries = 0
        while (!this.incrementalBuildError && tries < 100) {
            await this.wait(100)
        }
        assert.isTruthy(this.incrementalBuildError)
    }

    @test()
    protected async canSetSpyExporter() {
        const exporter = this.Exporter()
        assert.isTrue(exporter instanceof SpyViewControllerExporter)
        assert.isEqual(exporter, SpyViewControllerExporter.instance)
    }

    private getConfig() {
        return this.exporter.getConfig()
    }

    private assertWillIncremntallyBuildHitCount(expected: number) {
        assert.isEqual(this.willIncremntallyBuildCount, expected)
    }

    private assertDidIncremntallyBuildHitCount(expected: number) {
        assert.isEqual(this.didIncremntallyBuildCount, expected)
    }

    private async buildAndWatchSkillAtRandomDir() {
        await this.setupSkillAtRandomDir()
        await this.exportAndWatch()
    }

    private async exportAndWatch() {
        await this.export({
            shouldWatch: true,
            onWillIncrementallyBuild: () => {
                this.willIncremntallyBuildCount++
            },
            onDidIncrementallyBuild: (err) => {
                this.didIncremntallyBuildCount++
                this.incrementalBuildError = err
            },
        })
    }

    private async setupSkillAtRandomDir() {
        this.buildCwd = this.resolvePath(
            'build/__generated__/testDirsAndFiles',
            generateId()
        )

        await diskUtil.copyDir(importExportCwd, this.buildCwd)
        this.exporter = this.Exporter()
    }

    private dropInSpyCompiler() {
        const compiler = new SpyWebpackCompiler()

        //@ts-ignore
        this.exporter.Compiler = () => {
            return compiler
        }
        return compiler
    }

    private async replaceInBookSvc(search: string, replace: string) {
        const updatedFile = this.resolvePath(
            this.buildCwd,
            'src',
            'skillViewControllers',
            'Book.svc.ts'
        )

        const contents = diskUtil.readFile(updatedFile)
        const updated = contents.replace(search, replace)
        diskUtil.writeFile(updatedFile, updated)

        await this.wait(1000)
    }

    private Exporter(cwd?: string) {
        return ViewControllerExporter.Exporter(
            cwd ?? this.buildCwd
        ) as SpyViewControllerExporter
    }

    private async export(options?: Partial<ExportOptions>) {
        await this.exporter.export({
            source: this.source,
            destination: this.destination,
            ...options,
        })
    }
}

class SpyWebpackCompiler {
    public wasRunHit = false
    public wasWatchHit = false
    public run(cb: (err: any, stats: any) => void) {
        this.wasRunHit = true
        cb(null, this.stats())
    }
    public close(r: () => void) {
        r()
    }
    private stats(): any {
        return {
            hasErrors: () => false,
            compilation: {
                emittedAssets: {
                    size: 100,
                },
            },
        }
    }

    public watch(config: any, cb: (err: any, stats: any) => void) {
        this.wasWatchHit = true
        cb(null, this.stats())
    }
}
