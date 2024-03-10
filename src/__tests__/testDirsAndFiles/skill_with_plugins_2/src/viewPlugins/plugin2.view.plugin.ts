export default class Plugin2 {
	public name = 'plugin2'

	public getValue() {
		return process.env.PLUGIN_2_VALUE
	}
}
