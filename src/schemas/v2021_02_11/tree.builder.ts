import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'tree',
    name: 'Tree',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.ViewController<HeartwoodTypes.Tree>',
            },
        },
        onClickNode: {
            type: 'raw',
            label: 'Node click handler',
            options: {
                valueType: '(nodeId: string) => void | Promise<void>',
            },
        },
        onClickDeleteNode: {
            type: 'raw',
            label: 'Delete node click handler',
            options: {
                valueType: '(nodeId: string) => void | Promise<void>',
            },
        },
        nodes: {
            type: 'schema',
            isArray: true,
            minArrayLength: 0,
            isRequired: true,
            options: {
                schema: buildSchema({
                    id: 'treeNode',
                    fields: {
                        id: {
                            type: 'id',
                            isRequired: true,
                        },
                        label: {
                            type: 'text',
                            isRequired: true,
                        },
                        childrenIds: {
                            type: 'id',
                            isArray: true,
                            minArrayLength: 0,
                        },
                        isSelected: {
                            type: 'boolean',
                        },
                        onClickDelete: {
                            type: 'raw',
                            label: 'Delete click handler',
                            options: {
                                valueType: '() => void | Promise<void>',
                            },
                        },
                        onClick: {
                            type: 'raw',
                            label: 'Node click handler',
                            options: {
                                valueType: '() => void | Promise<void>',
                            },
                        },
                    },
                }),
            },
        },
    },
})
