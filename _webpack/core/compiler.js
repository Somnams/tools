const { SyncHook } = require('tapable');
const path = require('path');
const fs = require('fs');

class Compiler {
    constructor(options) {
        this.options = options;
        this.rootPath = this.options.context || toUnixPath(process.cwd());
        /** 入口模块对象  */
        this.entries = new Set();
        /** 所有依赖模块对象 */
        this.modules = new Set();
        /** 所有代码块对象 */
        this.chunks = new Set();
        /** 本次产出的文件对象 */
        this.assets = new Set();
        /** 本次编译所有产出的文件名 */
        this.files = new Set();
        this.hooks = {
            /** 开始编译 */
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
    }

    run(callback) {
        this.hooks.run.call();
        const entry = this.getEntry();
        this.buildEntryModule(entry);
    }

    buildEntryModule(entry) {
        Object.keys(entry).forEach(name => {
            const entryPath = entry[name];
            const entryObj = this.buildModule(name, entryPath);
            this.entries.add(entryObj);
        })
    }

    buildModule(moduleName, modulePath) {
        const originSourceCode = ((this.originSourceCode = fs.readFileSync(modulePath)), 'utf-8');
        this.moduleCode = originSourceCode;
    }

    handleLoader(modulePath) {
        const rules = this.options.module.rules;
        const matchLoaders = [];
        rules.forEach(loader => {
            const testRule = loader.test;
            if (testRule.test(modulePath)) {
                // customer loader, loader1, loader2
                if (loader.loader) {
                    matchLoaders.push(loader.loader);
                } else {
                    // rules: [{test: '', use: []}]
                    matchLoaders.push(...loader.use);
                }
            }

            // right => left
            for (let i = matchLoaders.length - 1; i >= 0; i--) {
                const loaderFn = require(matchLoaders[i]);
                this.moduleCode = loaderFn(this.moduleCode);
            }
        })
    }

    /**
     * @returns Record<string, string>
     */
    getEntry() {
        let entry = Object.create(null);
        const { entry: optionEntry } = this.options;
        if (typeof optionEntry === 'string') {
            entry['main'] = optionEntry;
        } else {
            entry = optionEntry;
        }
        // absolutely path
        Object.keys(entry).forEach(key => {
            const val = entry[key];
            if (!path.isAbsolute(val)) {
                entry[key] = toUnixPath(path.join(this.rootPath, val));
            }
        });
        return entry;
    }
}

module.exports = Compiler;