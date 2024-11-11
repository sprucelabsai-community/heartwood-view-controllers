import AbstractSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends AbstractSpruceError<ErrorOptions> {
    public friendlyMessage(): string {
        const { options } = this
        let message

        switch (options?.code) {
            case 'MISSING_STORAGE':
                message = `Storage mechanism not set on the Authenticator. Authenticator.setStorage() is the answer.`
                break

            case 'INVALID_VIEW_CONTROLLER_NAME':
                options.validNames.sort()
                message = `Couldn't find a view controller called "${
                    options.name
                }". Try one of the following (or run 'spruce create.view' if testing!):\n\n${options.validNames.join(
                    '\n'
                )}`
                break

            case 'INVALID_VIEW_CONTROLLER_SOURCE':
                message = `View controller source is not valid. The original error was:\n\n${options.originalError?.stack}`
                break

            case 'EXPORT_FAILED':
                message = 'Exporting view controllers failed.'

                if (options.originalError) {
                    message +=
                        ' Original error:\n\n' + options.originalError.stack
                } else {
                    message += ' No webpack error was provided!'
                }
                break

            case 'INVALID_SKILL_VIEW_CONTROLLER':
                message = `The controller with id '${options.id}' you created is not valid:\n\n${options.friendlyMessage}`
                break

            case 'DUPLICATE_ROW_ID':
                message = `A row with the id '${options.rowId}' already exists in your list view.`
                break

            case 'DUPLICATE_TOOL_ID':
                message = `A tool with the id '${options.id}' already exists!`
                break

            case 'VIEW_ALREADY_DESTROYED':
                message = 'That view has already been destroyed'
                break

            case 'DUPLICATE_EVENT_ID':
                message = `An event with the id '${options.id}' already exists!`
                break

            case 'EVENT_NOT_FOUND':
                message = `I could not find an event with the id '${options.id}'!`
                break

            case 'TOOL_NOT_FOUND':
                message = `I could not find a tool with the id '${options.id}'!`
                break

            case 'PERSON_NOT_FOUND':
                message = `I could not find that person!!`
                break

            case 'DATE_ALREADY_SELECTED':
                message = `You already selected ${options.year}-${options.month}-${options.day}!`
                break

            case 'DATE_NOT_SELECTED':
                message = `${options.year}-${options.month}-${options.day}! cannot be deselected because it's not selected!`
                break

            case 'ROW_DELETED':
                message = `Row ${options.row} has been deleted and can't be rendered!`
                break

            case 'SLIDE_NOT_FOUND':
                message = 'A Slide not found just happened!'
                break

            case 'CELL_DELETED':
                message = `The cell you tried to render has been deleted!`
                break

            case 'NO_FIELD_VC_SET':
                message = `You tried to get a view controller for '${options.fieldName}', but one was not set!`
                break

            case 'STEP_NOT_COMPLETE':
                message = `You tried to open step '${options.stepId}', but it's not complete!`
                break

            case 'APP_NOT_FOUND':
                message = `I could not find an App with the namespace '${options.namespace}'!`
                break

            default:
                message = super.friendlyMessage()
        }

        return message
    }
}
