const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost',
})
const { window } = jsdom

function copyProps(src, target) {
	Object.defineProperties(target, {
		...Object.getOwnPropertyDescriptors(src),
		...Object.getOwnPropertyDescriptors(target),
	})
}

global.window = window
global.document = window.document
global.navigator = {
	userAgent: 'node.js',
}
global.location = { pathname: null }
global.XMLHttpRequest = function XMLHttpRequest() {
	this.open = () => {}
	this.send = () => {}
}
// global.requestAnimationFrame = function (callback) {
// 	return setTimeout(callback, 0)
// }
// global.cancelAnimationFrame = function (id) {
// 	clearTimeout(id)
// }
copyProps(window, global)
