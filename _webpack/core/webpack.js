const Compiler = require("./compiler");

function webpack(config) {
    const mergeOptions = _mergeOptions(config);
    const compiler = new Compiler(mergeOptions);
    _loadPlugin(config.plugins, compiler);
    return compiler;
}

function _mergeOptions(options) {
    const shellOptions = process.argv.slice(2).reduce((option, arg) => {
        const [key, value] = arg.split('=');
        if (key && value) {
            // * --mode=production
            const parsedKey = key.slice(2);
            Object.assign(option, { [parsedKey]: value });
        }
        return option;
    }, {});
    return { ...options, ...shellOptions };
}

function _loadPlugin(plugins, compiler) {
    if (Array.isArray(plugins)) {
        plugins.forEach(p => p.apply(compiler))
    }
}

module.exports = webpack;