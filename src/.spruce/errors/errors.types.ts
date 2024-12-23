import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

























export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface ViewAlreadyDestroyed {
		
			
			'viewId': string
	}

	export interface ViewAlreadyDestroyedSchema extends SpruceSchema.Schema {
		id: 'viewAlreadyDestroyed',
		namespace: 'HeartwoodViewControllers',
		name: 'View already destroyed',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'viewId': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type ViewAlreadyDestroyedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.ViewAlreadyDestroyedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface ToolNotFound {
		
			
			'id': string
	}

	export interface ToolNotFoundSchema extends SpruceSchema.Schema {
		id: 'toolNotFound',
		namespace: 'HeartwoodViewControllers',
		name: 'Tool not found',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type ToolNotFoundEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.ToolNotFoundSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface StepNotComplete {
		
			
			'stepId': string
	}

	export interface StepNotCompleteSchema extends SpruceSchema.Schema {
		id: 'stepNotComplete',
		namespace: 'HeartwoodViewControllers',
		name: ' Step not complete',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'stepId': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type StepNotCompleteEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.StepNotCompleteSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface SlideNotFound {
		
			
			'id'?: string | undefined | null
	}

	export interface SlideNotFoundSchema extends SpruceSchema.Schema {
		id: 'slideNotFound',
		namespace: 'HeartwoodViewControllers',
		name: 'Slide not found',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                options: undefined
		            },
		    }
	}

	export type SlideNotFoundEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.SlideNotFoundSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface RowDeleted {
		
			
			'row': string
	}

	export interface RowDeletedSchema extends SpruceSchema.Schema {
		id: 'rowDeleted',
		namespace: 'HeartwoodViewControllers',
		name: 'row deleted',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'row': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type RowDeletedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.RowDeletedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface PersonNotFound {
		
			
			'personId': string
	}

	export interface PersonNotFoundSchema extends SpruceSchema.Schema {
		id: 'personNotFound',
		namespace: 'HeartwoodViewControllers',
		name: 'Person not found',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'personId': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type PersonNotFoundEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.PersonNotFoundSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface NoFieldVcSet {
		
			
			'fieldName': string
	}

	export interface NoFieldVcSetSchema extends SpruceSchema.Schema {
		id: 'noFieldVcSet',
		namespace: 'HeartwoodViewControllers',
		name: 'No field vc set',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'fieldName': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type NoFieldVcSetEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.NoFieldVcSetSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface MissingStorage {
		
	}

	export interface MissingStorageSchema extends SpruceSchema.Schema {
		id: 'missingStorage',
		namespace: 'HeartwoodViewControllers',
		name: 'Missing storage',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		    }
	}

	export type MissingStorageEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.MissingStorageSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface InvalidViewControllerSource {
		
	}

	export interface InvalidViewControllerSourceSchema extends SpruceSchema.Schema {
		id: 'invalidViewControllerSource',
		namespace: 'HeartwoodViewControllers',
		name: 'Invalid view controller source',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		    }
	}

	export type InvalidViewControllerSourceEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.InvalidViewControllerSourceSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface InvalidViewControllerName {
		
			/** Supplied name. */
			'name': string
			/** Valid names. */
			'validNames': string[]
	}

	export interface InvalidViewControllerNameSchema extends SpruceSchema.Schema {
		id: 'invalidViewControllerName',
		namespace: 'HeartwoodViewControllers',
		name: 'Invalid view controller name',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** Supplied name. */
		            'name': {
		                label: 'Supplied name',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		            /** Valid names. */
		            'validNames': {
		                label: 'Valid names',
		                type: 'text',
		                isRequired: true,
		                isArray: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidViewControllerNameEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.InvalidViewControllerNameSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface InvalidSkillViewController {
		
			
			'id': string
	}

	export interface InvalidSkillViewControllerSchema extends SpruceSchema.Schema {
		id: 'invalidSkillViewController',
		namespace: 'HeartwoodViewControllers',
		name: 'Invalid skill view',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidSkillViewControllerEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.InvalidSkillViewControllerSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface InvalidAppController {
		
			
			'id': string
	}

	export interface InvalidAppControllerSchema extends SpruceSchema.Schema {
		id: 'invalidAppController',
		namespace: 'HeartwoodViewControllers',
		name: 'Invalid app controller',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidAppControllerEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.InvalidAppControllerSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface ExportFailed {
		
	}

	export interface ExportFailedSchema extends SpruceSchema.Schema {
		id: 'exportFailed',
		namespace: 'HeartwoodViewControllers',
		name: 'Export failed',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		    }
	}

	export type ExportFailedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.ExportFailedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface EventNotFound {
		
			
			'id': string
	}

	export interface EventNotFoundSchema extends SpruceSchema.Schema {
		id: 'eventNotFound',
		namespace: 'HeartwoodViewControllers',
		name: 'Event not found',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type EventNotFoundEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.EventNotFoundSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface DuplicateToolId {
		
			
			'id': string
	}

	export interface DuplicateToolIdSchema extends SpruceSchema.Schema {
		id: 'duplicateToolId',
		namespace: 'HeartwoodViewControllers',
		name: 'Dulicate tool id',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DuplicateToolIdEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.DuplicateToolIdSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface DuplicateRowId {
		
			
			'rowId': string
	}

	export interface DuplicateRowIdSchema extends SpruceSchema.Schema {
		id: 'duplicateRowId',
		namespace: 'HeartwoodViewControllers',
		name: 'Duplicate row id',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'rowId': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DuplicateRowIdEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.DuplicateRowIdSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface DuplicateEventId {
		
			
			'id': string
	}

	export interface DuplicateEventIdSchema extends SpruceSchema.Schema {
		id: 'duplicateEventId',
		namespace: 'HeartwoodViewControllers',
		name: 'Duplicate event id',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'id': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DuplicateEventIdEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.DuplicateEventIdSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface DateNotSelected {
		
			
			'year': number
			
			'month': number
			
			'day': number
	}

	export interface DateNotSelectedSchema extends SpruceSchema.Schema {
		id: 'dateNotSelected',
		namespace: 'HeartwoodViewControllers',
		name: 'Date not selected',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'year': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'month': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'day': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DateNotSelectedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.DateNotSelectedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface DateAlreadySelected {
		
			
			'year': number
			
			'month': number
			
			'day': number
	}

	export interface DateAlreadySelectedSchema extends SpruceSchema.Schema {
		id: 'dateAlreadySelected',
		namespace: 'HeartwoodViewControllers',
		name: 'Date already selected',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'year': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'month': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'day': {
		                type: 'number',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DateAlreadySelectedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.DateAlreadySelectedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface CellDeleted {
		
	}

	export interface CellDeletedSchema extends SpruceSchema.Schema {
		id: 'cellDeleted',
		namespace: 'HeartwoodViewControllers',
		name: 'Cell deleted',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		    }
	}

	export type CellDeletedEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.CellDeletedSchema>

}


export declare namespace SpruceErrors.HeartwoodViewControllers {

	
	export interface AppNotFound {
		
			
			'namespace': string
	}

	export interface AppNotFoundSchema extends SpruceSchema.Schema {
		id: 'appNotFound',
		namespace: 'HeartwoodViewControllers',
		name: 'App not found',
		moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
		    fields: {
		            /** . */
		            'namespace': {
		                type: 'id',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type AppNotFoundEntity = SchemaEntity<SpruceErrors.HeartwoodViewControllers.AppNotFoundSchema>

}




