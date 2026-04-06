import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { TreeNode } from '../../../types/heartwood.types'
import TreeViewController, {
    TreeViewControllerOptions,
} from '../../../viewControllers/trees/Tree.vc'

@suite()
export default class ControllingTreesTest extends AbstractViewControllerTest {
    private vc!: TreeViewController
    private lastClickedNodeId?: string
    private lastClickDeleteNodeId?: string

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setup()
    }

    @test()
    protected async throwsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.Controller('tree', {}))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['nodes'],
        })
    }

    @test()
    protected async rendersNodesPassedToConstructor() {
        const expected = this.generateRandomNodeValues()
        this.setup({ nodes: [expected] })

        const model = this.render(this.vc)
        assert.isEqualDeep(
            model.nodes.map((node) => {
                delete node.onClick
                delete node.onClickDelete
                return node
            }),
            [expected],
            'Nodes should match what was passed to constructor'
        )
    }

    @test()
    protected async triggeringOnClickOnNodePassesThroughToConstructorCallback() {
        const node = this.generateRandomNodeValues()
        this.setup({
            nodes: [node],
        })

        await this.clickFirstNode()
        assert.isEqual(
            this.lastClickedNodeId,
            node.id,
            'onClick should have been called with the node id'
        )
    }

    @test()
    protected async onClickOnNodeTriggersNodeCallback() {
        const node = this.generateRandomNodeValues()
        let wasHit = false

        node.onClick = () => {
            wasHit = true
        }

        this.setup({
            nodes: [node],
        })

        assert.isFalse(wasHit, 'Node onClick should not have been called yet')

        await this.clickFirstNode()

        assert.isTrue(wasHit, 'onClick should have been called')
    }

    @test()
    protected async clickingDeleteOnNodePassesThroughToConstructorCallback() {
        const node = this.generateRandomNodeValues()

        this.setup({
            nodes: [node],
        })

        await this.renderAndClickDeleteOnFirstNode()

        assert.isEqual(
            this.lastClickDeleteNodeId,
            node.id,
            'onClickDeleteNode should have been called with the node id'
        )
    }

    @test()
    protected async clickingDeleteOnNodePassesToOnClickDeleteOnNode() {
        const node = this.generateRandomNodeValues()

        let wasHit = false
        node.onClickDelete = () => {
            wasHit = true
        }

        this.setup({
            nodes: [node],
        })

        await this.renderAndClickDeleteOnFirstNode()

        assert.isTrue(wasHit, 'onClickDelete on node should have been called')
    }

    private async renderAndClickDeleteOnFirstNode() {
        const { nodes } = this.render(this.vc)
        await nodes[0].onClickDelete?.()
    }

    private async clickFirstNode() {
        const model = this.render(this.vc)
        assert.isTruthy(
            model.nodes[0],
            'First node should exist to click it yo!'
        )
        await model.nodes[0].onClick?.()
    }

    private generateRandomNodeValues(values?: Partial<TreeNode>): TreeNode {
        return {
            id: generateId(),
            label: generateId(),
            childrenIds: [],
            ...values,
        }
    }

    private setup(options?: Partial<TreeViewControllerOptions>) {
        this.vc = this.Controller('tree', {
            nodes: [],
            onClickNode: async (nodeId) => {
                this.lastClickedNodeId = nodeId
            },
            onClickDeleteNode: async (nodeId) => {
                this.lastClickDeleteNodeId = nodeId
            },
            ...options,
        })
    }
}
