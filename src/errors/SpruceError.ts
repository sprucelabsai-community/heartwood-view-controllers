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
				}
				break

			default:
				message = super.friendlyMessage()
		}

		const fullMessage = options.friendlyMessage
			? options.friendlyMessage
			: message

		return fullMessage
	}
}
