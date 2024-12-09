const fs = require('fs');
const path = require('path');
const { SyncHook } = require('tapable');
const t = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const { toUnixPath, tryExtensions, getSourceCode } = require('./utils');

class Compiler {
    constructor(options) {
        this.options = options;
        this.rootPath = this.options.context || toUnixPath(process.cwd());
        /** 入口模块对象  */
        this.entries = new Set();
        /**
         * 所有依赖模块对象
         * @type Set<{id: string, name: Array<string>, dependencies: Array<any>, _source: string}>
         */
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
        this.exportFile(callback);
    }

    exportFile(callback) {
        const output = this.options.output;
        this.chunks.forEach(c => {
            const parseFileName = output.filename.replace('[name]', c.name);
            this.assets[parseFileName] = getSourceCode(c);
        });
        this.hooks.emit.call();
        if (!fs.existsSync(output.path)) {
            fs.mkdirSync(output.path);
        }
        this.files = Object.keys(this.assets);
        Object.keys(this.assets).forEach(fileName => {
            const filePath = path.join(output.path, fileName);
            fs.writeFileSync(filePath, this.assets[fileName]);
        });
        this.hooks.done.call();
        callback?.(null, {
            toJSon: () => {
                return {
                    entries: this.entries,
                    modules: this.modules,
                    files: this.files,
                    chunks: this.chunks,
                    assets: this.assets
                }
            }
        })
    }

    buildEntryModule(entry) {
        Object.keys(entry).forEach(name => {
            const entryPath = entry[name];
            const entryObj = this.buildModule(name, entryPath);
            this.entries.add(entryObj);
            this.buildUpChunk(name, entryObj);
        });
    }

    buildUpChunk(entryName, entryObj) {
        const chunk = {
            name: entryName,
            entryModule: entryObj,
            modules: Array.from(this.modules).filter(i => i.name.includes(entryName))
        }
        this.chunks.add(chunk);
    }

    buildModule(moduleName, modulePath) {
        const originSourceCode = (this.originSourceCode = fs.readFileSync(modulePath, 'utf-8'));
        this.moduleCode = originSourceCode;
        this.handleLoader(modulePath);
        const module = this.handleWebpackCompiler(moduleName, modulePath);
        return module;
    }

    handleWebpackCompiler(moduleName, modulePath) {
        const id = './' + path.posix.relative(this.rootPath, modulePath);

        const module = { id, dependencies: new Set(), name: [moduleName] };
        const ast = parser.parse(this.moduleCode, { sourceType: 'module' });
        traverse(ast, {
            CallExpression: (nodePath) => {
                const node = nodePath.node;
                if (node.callee.name === 'require') {
                    const requirePath = node.arguments[0].value;
                    // ! now only consider own mod required
                    const moduleDir = path.posix.dirname(modulePath);

                    const absolutePath = tryExtensions(
                        path.posix.join(moduleDir, requirePath),
                        this.options.resolve.extensions,
                        moduleName,
                        moduleDir
                    );
                    const moduleId = './' + path.posix.relative(this.rootPath, absolutePath);
                    node.callee = t.identifier('__webpack_require__');
                    // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
                    node.arguments = [t.stringLiteral(moduleId)];
                    const alreadyMods = Array.from(this.modules).map(i => i.id);
                    if (!alreadyMods.includes(moduleId)) {
                        module.dependencies.add(moduleId);
                    } else {
                        this.modules.forEach(val => {
                            if (val.id === moduleId) {
                                val.name.push(moduleName);
                            }
                        })
                    }
                }
            }
        });
        const { code } = generator(ast);
        module._source = code;
        /** id-当前模块针对于 this.rootPath 的相对目录; dependencies-该模块以来的所有的模块的模块ID; name-该模块属于哪个入口文件; _source-经过 babel 编译后的字符串代码 */
        module.dependencies.forEach(d => {
            const depMod = this.buildModule(moduleName, d);
            this.modules.add(depMod);
        })
        return module;
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