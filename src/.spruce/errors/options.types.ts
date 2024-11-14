import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface ViewAlreadyDestroyedErrorOptions extends SpruceErrors.HeartwoodViewControllers.ViewAlreadyDestroyed, ISpruceErrorOptions {
	code: 'VIEW_ALREADY_DESTROYED'
}
export interface ToolNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.ToolNotFound, ISpruceErrorOptions {
	code: 'TOOL_NOT_FOUND'
}
export interface StepNotCompleteErrorOptions extends SpruceErrors.HeartwoodViewControllers.StepNotComplete, ISpruceErrorOptions {
	code: 'STEP_NOT_COMPLETE'
}
export interface SlideNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.SlideNotFound, ISpruceErrorOptions {
	code: 'SLIDE_NOT_FOUND'
}
export interface RowDeletedErrorOptions extends SpruceErrors.HeartwoodViewControllers.RowDeleted, ISpruceErrorOptions {
	code: 'ROW_DELETED'
}
export interface PersonNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.PersonNotFound, ISpruceErrorOptions {
	code: 'PERSON_NOT_FOUND'
}
export interface NoFieldVcSetErrorOptions extends SpruceErrors.HeartwoodViewControllers.NoFieldVcSet, ISpruceErrorOptions {
	code: 'NO_FIELD_VC_SET'
}
export interface MissingStorageErrorOptions extends SpruceErrors.HeartwoodViewControllers.MissingStorage, ISpruceErrorOptions {
	code: 'MISSING_STORAGE'
}
export interface InvalidViewControllerSourceErrorOptions extends SpruceErrors.HeartwoodViewControllers.InvalidViewControllerSource, ISpruceErrorOptions {
	code: 'INVALID_VIEW_CONTROLLER_SOURCE'
}
export interface InvalidViewControllerNameErrorOptions extends SpruceErrors.HeartwoodViewControllers.InvalidViewControllerName, ISpruceErrorOptions {
	code: 'INVALID_VIEW_CONTROLLER_NAME'
}
export interface InvalidSkillViewControllerErrorOptions extends SpruceErrors.HeartwoodViewControllers.InvalidSkillViewController, ISpruceErrorOptions {
	code: 'INVALID_SKILL_VIEW_CONTROLLER'
}
export interface InvalidAppControllerErrorOptions extends SpruceErrors.HeartwoodViewControllers.InvalidAppController, ISpruceErrorOptions {
	code: 'INVALID_APP_CONTROLLER'
}
export interface ExportFailedErrorOptions extends SpruceErrors.HeartwoodViewControllers.ExportFailed, ISpruceErrorOptions {
	code: 'EXPORT_FAILED'
}
export interface EventNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.EventNotFound, ISpruceErrorOptions {
	code: 'EVENT_NOT_FOUND'
}
export interface DuplicateToolIdErrorOptions extends SpruceErrors.HeartwoodViewControllers.DuplicateToolId, ISpruceErrorOptions {
	code: 'DUPLICATE_TOOL_ID'
}
export interface DuplicateRowIdErrorOptions extends SpruceErrors.HeartwoodViewControllers.DuplicateRowId, ISpruceErrorOptions {
	code: 'DUPLICATE_ROW_ID'
}
export interface DuplicateEventIdErrorOptions extends SpruceErrors.HeartwoodViewControllers.DuplicateEventId, ISpruceErrorOptions {
	code: 'DUPLICATE_EVENT_ID'
}
export interface DateNotSelectedErrorOptions extends SpruceErrors.HeartwoodViewControllers.DateNotSelected, ISpruceErrorOptions {
	code: 'DATE_NOT_SELECTED'
}
export interface DateAlreadySelectedErrorOptions extends SpruceErrors.HeartwoodViewControllers.DateAlreadySelected, ISpruceErrorOptions {
	code: 'DATE_ALREADY_SELECTED'
}
export interface CellDeletedErrorOptions extends SpruceErrors.HeartwoodViewControllers.CellDeleted, ISpruceErrorOptions {
	code: 'CELL_DELETED'
}
export interface AppNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.AppNotFound, ISpruceErrorOptions {
	code: 'APP_NOT_FOUND'
}

type ErrorOptions =  | ViewAlreadyDestroyedErrorOptions  | ToolNotFoundErrorOptions  | StepNotCompleteErrorOptions  | SlideNotFoundErrorOptions  | RowDeletedErrorOptions  | PersonNotFoundErrorOptions  | NoFieldVcSetErrorOptions  | MissingStorageErrorOptions  | InvalidViewControllerSourceErrorOptions  | InvalidViewControllerNameErrorOptions  | InvalidSkillViewControllerErrorOptions  | InvalidAppControllerErrorOptions  | ExportFailedErrorOptions  | EventNotFoundErrorOptions  | DuplicateToolIdErrorOptions  | DuplicateRowIdErrorOptions  | DuplicateEventIdErrorOptions  | DateNotSelectedErrorOptions  | DateAlreadySelectedErrorOptions  | CellDeletedErrorOptions  | AppNotFoundErrorOptions 

export default ErrorOptions
