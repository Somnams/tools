const fs = require('fs');

function toUnixPath(path) {
    return path.replace(/\\/g, '/')
}

/**
 * @param {string} modulePath 
 * @param {Array<string>} extensions 
 * @param {string} moduleName 
 * @param {string} moduleContext 
 */
function tryExtensions(modulePath, extensions, moduleName, moduleContext) {
    extensions.unshift('');

    for (let extension of extensions) {
        console.log(modulePath + extension);
        if (fs.existsSync(modulePath + extension)) {
            return modulePath + extension;
        }
    }
    throw new Error(`No module, Error: Can't resolve ${moduleName} in ${moduleContext}`);
}

/**
 * @param {{name: string, entryModule: Record<string, any>, modules: Array<string>}} chunk 
 */
function getSourceCode(chunk) {
    const { name, entryModule, modules } = chunk;
    return `
(() => {
    var __webpack_modules__ = {
    ${modules.map(m => {
        return `'${m.id}': (m) => {${m._source}}`
    }).join(',')}
    };
    // The module cache
    var _webpack_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
        var cacheModule = _webpack_cache__[moduleId];    
        if (cacheModule !== undefined) {
            return cacheModule.exports;
        }
        // Create a new module (and put it into the cache)
        var module = (__webpack_module_cache__[moduleId] = {
            // no module.id needed
            // no module.loaded needed
            exports: {},
        });
        // Execute the module function
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // Return the exports of the module
        return module.exports;
    }
        var __webpack_exports__ = {};
(() => {
    ${entryModule._source}
})();
})();`
}

module.exports = { toUnixPath, tryExtensions, getSourceCode };