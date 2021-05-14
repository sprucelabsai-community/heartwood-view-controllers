/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





export declare namespace SpruceErrors.Heartwood {

	
	export interface MissingStorage {
		
	}

	export interface MissingStorageSchema extends SpruceSchema.Schema {
		id: 'missingStorage',
		namespace: 'Heartwood',
		name: 'Missing storage',
		    fields: {
		    }
	}

	export type MissingStorageEntity = SchemaEntity<SpruceErrors.Heartwood.MissingStorageSchema>

}



export declare namespace SpruceErrors.Heartwood {

	
	export interface InvalidViewControllerSource {
		
	}

	export interface InvalidViewControllerSourceSchema extends SpruceSchema.Schema {
		id: 'invalidViewControllerSource',
		namespace: 'Heartwood',
		name: 'Invalid view controller source',
		    fields: {
		    }
	}

	export type InvalidViewControllerSourceEntity = SchemaEntity<SpruceErrors.Heartwood.InvalidViewControllerSourceSchema>

}



export declare namespace SpruceErrors.Heartwood {

	
	export interface InvalidViewControllerName {
		
			/** Supplied name. */
			'name': string
			/** Valid names. */
			'validNames': string[]
	}

	export interface InvalidViewControllerNameSchema extends SpruceSchema.Schema {
		id: 'invalidViewControllerName',
		namespace: 'Heartwood',
		name: 'Invalid view controller name',
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

	export type InvalidViewControllerNameEntity = SchemaEntity<SpruceErrors.Heartwood.InvalidViewControllerNameSchema>

}



export declare namespace SpruceErrors.Heartwood {

	
	export interface InvalidSkillViewController {
		
			
			'id': string
	}

	export interface InvalidSkillViewControllerSchema extends SpruceSchema.Schema {
		id: 'invalidSkillViewController',
		namespace: 'Heartwood',
		name: 'Invalid skill view',
		    fields: {
		            /** . */
		            'id': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidSkillViewControllerEntity = SchemaEntity<SpruceErrors.Heartwood.InvalidSkillViewControllerSchema>

}



export declare namespace SpruceErrors.Heartwood {

	
	export interface ExportFailed {
		
	}

	export interface ExportFailedSchema extends SpruceSchema.Schema {
		id: 'exportFailed',
		namespace: 'Heartwood',
		name: 'Export failed',
		    fields: {
		    }
	}

	export type ExportFailedEntity = SchemaEntity<SpruceErrors.Heartwood.ExportFailedSchema>

}




