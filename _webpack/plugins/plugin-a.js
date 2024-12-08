class PluginA {
    apply(compiler) {
        compiler.hooks.run.tap('Plugin A', () => {
            console.log('call plugin a');

        });
    }
}

module.exports = PluginA;