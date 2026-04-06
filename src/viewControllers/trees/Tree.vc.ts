import { assertOptions } from '@sprucelabs/schema'
import { Tree, ViewControllerOptions } from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class TreeViewController extends AbstractViewController<Tree> {
    private model: Tree

    public constructor(
        options: ViewControllerOptions & TreeViewControllerOptions
    ) {
        super(options)
        this.model = removeUniversalViewOptions(
            assertOptions(options, ['nodes'])
        )
    }

    public render(): Tree {
        return {
            nodes: this.model.nodes.map((node) => ({
                ...node,
                onClick: async () => {
                    await node.onClick?.()
                    await this.model.onClickNode?.(node.id)
                },
                onClickDelete: async () => {
                    await node.onClickDelete?.()
                    await this.model.onClickDeleteNode?.(node.id)
                },
            })),
        }
    }
}

export type TreeViewControllerOptions = Omit<Tree, 'controller'>
