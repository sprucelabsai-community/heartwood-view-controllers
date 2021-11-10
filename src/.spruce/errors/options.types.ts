import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface ViewAlreadyDestroyedErrorOptions extends SpruceErrors.HeartwoodViewControllers.ViewAlreadyDestroyed, ISpruceErrorOptions {
	code: 'VIEW_ALREADY_DESTROYED'
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
export interface DuplicateToolIdErrorOptions extends SpruceErrors.HeartwoodViewControllers.DuplicateToolId, ISpruceErrorOptions {
	code: 'DUPLICATE_TOOL_ID'
}
export interface DuplicateRowIdErrorOptions extends SpruceErrors.HeartwoodViewControllers.DuplicateRowId, ISpruceErrorOptions {
	code: 'DUPLICATE_ROW_ID'
}

type ErrorOptions =  | ViewAlreadyDestroyedErrorOptions  | MissingStorageErrorOptions  | InvalidViewControllerSourceErrorOptions  | InvalidViewControllerNameErrorOptions  | InvalidSkillViewControllerErrorOptions  | ExportFailedErrorOptions  | DuplicateToolIdErrorOptions  | DuplicateRowIdErrorOptions 

export default ErrorOptions
