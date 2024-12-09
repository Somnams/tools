
(() => {
    var __webpack_modules__ = {
        './../example/src/module.js': (m) => {
            const name = "Test Name";
            module.exports = {
                name
            };
            const loader2 = 'loader2';
            const loader1 = 'loader1';
        }
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
        const depMod = __webpack_require__("./../example/src/module.js");
        // const a = require('url');
        console.log('dep', depMod);
        console.log('this is entry 1 js');
        const loader2 = 'loader2';
        const loader1 = 'loader1';
    })();
})();