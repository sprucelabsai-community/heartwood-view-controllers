import { assert } from '@sprucelabs/test'

const interactionUtil = {
	async click(onClick: (() => void | Promise<void>) | null | undefined) {
		assert.isFunction(onClick, 'Click handler does not exist.')
		//@ts-ignore
		await onClick({
			altKey: false,
			bubbles: true,
			button: 0,
			buttons: 0,
			cancelable: true,
			clientX: 269,
			clientY: 433,
			ctrlKey: false,
			currentTarget: `button.button.has_label`,
			defaultPrevented: false,
			detail: 9,
			eventPhase: 3,
			getModifierState: () => {},
			isDefaultPrevented: () => {},
			isPropagationStopped: () => {},
			isTrusted: true,
			metaKey: false,
			movementX: 0,
			movementY: 0,
			nativeEvent: {},
			pageX: 269,
			pageY: 433,
			relatedTarget: null,
			screenX: 2317,
			screenY: 612,
			shiftKey: false,
			target: `button.button.has_label`,
			timeStamp: 19915.5,
			title: 'Page 10',
			type: 'click',
			view: {},
		})
	},
}

export default interactionUtil
