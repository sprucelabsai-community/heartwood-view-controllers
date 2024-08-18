import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'pager',
    name: 'Pager',
    fields: {
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager>',
            },
        },
        id: {
            type: 'id',
        },
        totalPages: {
            type: 'number',
        },
        currentPage: {
            type: 'number',
        },
        onChangePage: {
            type: 'raw',
            options: {
                valueType: '(page: number) => Promise<any> | any',
            },
        },
        setCurrentPage: {
            type: 'raw',
            isRequired: true,
            options: {
                valueType: '(page: number) => Promise<any> | any',
            },
        },
    },
})
