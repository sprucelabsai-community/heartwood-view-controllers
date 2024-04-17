export default class Plugin1 {
    public name = 'plugin1'

    public getValue() {
        return process.env.PLUGIN_1_VALUE
    }
}
