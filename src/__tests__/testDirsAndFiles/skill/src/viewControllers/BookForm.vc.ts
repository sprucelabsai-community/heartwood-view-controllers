export default class BookFormViewController {
	public static id = 'book-form'

	public render() {
		//@ts-ignore
		global.document = {
			//@ts-ignore
			__hack: true,
		}

		//@ts-ignore
		global.window = {
			//@ts-ignore
			__hack: true,
		}

		return {
			msg: 'what the?',
			//@ts-ignore
			globalHack2Value: global.__hack2,
		}
	}
}
