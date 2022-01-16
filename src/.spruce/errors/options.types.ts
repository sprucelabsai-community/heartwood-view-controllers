import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface ViewAlreadyDestroyedErrorOptions extends SpruceErrors.HeartwoodViewControllers.ViewAlreadyDestroyed, ISpruceErrorOptions {
	code: 'VIEW_ALREADY_DESTROYED'
}
export interface ToolNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.ToolNotFound, ISpruceErrorOptions {
	code: 'TOOL_NOT_FOUND'
}
export interface PersonNotFoundErrorOptions extends SpruceErrors.HeartwoodViewControllers.PersonNotFound, ISpruceErrorOptions {
	code: 'PERSON_NOT_FOUND'
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

type ErrorOptions =  | ViewAlreadyDestroyedErrorOptions  | ToolNotFoundErrorOptions  | PersonNotFoundErrorOptions  | MissingStorageErrorOptions  | InvalidViewControllerSourceErrorOptions  | InvalidViewControllerNameErrorOptions  | InvalidSkillViewControllerErrorOptions  | ExportFailedErrorOptions  | EventNotFoundErrorOptions  | DuplicateToolIdErrorOptions  | DuplicateRowIdErrorOptions  | DuplicateEventIdErrorOptions 

export default ErrorOptions
