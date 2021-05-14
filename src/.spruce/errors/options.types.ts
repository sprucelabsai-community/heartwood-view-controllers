import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface MissingStorageErrorOptions extends SpruceErrors.Heartwood.MissingStorage, ISpruceErrorOptions {
	code: 'MISSING_STORAGE'
}
export interface InvalidViewControllerSourceErrorOptions extends SpruceErrors.Heartwood.InvalidViewControllerSource, ISpruceErrorOptions {
	code: 'INVALID_VIEW_CONTROLLER_SOURCE'
}
export interface InvalidViewControllerNameErrorOptions extends SpruceErrors.Heartwood.InvalidViewControllerName, ISpruceErrorOptions {
	code: 'INVALID_VIEW_CONTROLLER_NAME'
}
export interface InvalidSkillViewControllerErrorOptions extends SpruceErrors.Heartwood.InvalidSkillViewController, ISpruceErrorOptions {
	code: 'INVALID_SKILL_VIEW_CONTROLLER'
}
export interface ExportFailedErrorOptions extends SpruceErrors.Heartwood.ExportFailed, ISpruceErrorOptions {
	code: 'EXPORT_FAILED'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | MissingStorageErrorOptions  | InvalidViewControllerSourceErrorOptions  | InvalidViewControllerNameErrorOptions  | InvalidSkillViewControllerErrorOptions  | ExportFailedErrorOptions 

export default ErrorOptions
