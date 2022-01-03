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
				message = `Couldn't find a view controller called "${
					options.name
				}". Try one of the following:\n\n${options.validNames.join('\n')}`
				break

			case 'INVALID_VIEW_CONTROLLER_SOURCE':
				message = `View controller source is not valid. The original error was:\n\n${options.originalError?.stack}`
				break

			case 'EXPORT_FAILED':
				message = 'Exporting view controllers failed.'

				if (options.originalError) {
					message += ' Original error:\n\n' + options.originalError.stack
				} else {
					message += ' No webpack error was provided!'
				}
				break

			case 'INVALID_SKILL_VIEW_CONTROLLER':
				message = `The controller with id '${options.id}' you created is not valid:\n\n${options.friendlyMessage}`
				break

			case 'DUPLICATE_ROW_ID':
				message = `A row with the id '${options.rowId}' already exists.`
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

			default:
				message = super.friendlyMessage()
		}

		return message
	}
}
