class PluginB {
    apply(compiler) {
        compiler.hooks.done.tap('Plugin B', () => {
            console.log('call plugin b');
        });
    }
}

module.exports = PluginB;