const P = 'PENDING';
const F = 'FULL_FILLED';
const R = 'REJECTED';

class MyPromise {
    #state = P;
    #result = undefined;
    #handlers = [];

    constructor(exec) {
        const resolve = (data) => {
            this.#setState(F, data);
        };
        const reject = (reason) => {
            this.#setState(R, reason);
        };

        try {
            exec(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    #isThenable(value) {
        if (value !== null && (typeof value === 'function' || typeof value === 'object')) {
            return typeof value.then === 'function';
        }

        return false;
    }

    #insertMicroTask(func) {
        // browser
        if (typeof MutationObserver === 'function') {
            const ob = new MutationObserver(func);
            const t = document.createTextNode(1);
            ob.observe(t, {
                characterData: true
            });
            t.data = 2;
        } else if (typeof process === 'object' && typeof process.nextTick === 'function') {
            console.log('node env');
            process.nextTick(func)
        } else {
            setTimeout(() => {
                func();
            }, 0);
        }
    }

    #runOne(callback, resolve, reject) {
        this.#insertMicroTask(() => {
            if (typeof callback === 'function') {
                try {
                    const data = callback(this.#result);
    
                    if (this.#isThenable(data)) {
                       data.then(resolve, reject);
                    } else {
                        resolve(data);
                    }
                    
                } catch (error) {
                    reject(error)
                }
    
            } else {
                const settled = this.#state === F ? resolve : reject;
                settled(this.#result);
            }
        })
       
    }

    #run() {
        if (this.#state === P) return;
        while (this.#handlers.length) {
            const handler = this.#handlers.shift();
            const { onFullFilled, onRejected, resolve, reject } = handler;
            if (this.#state === F) {
                this.#runOne(onFullFilled, resolve, reject);
            }
            if (this.#state === R) {
                this.#runOne(onRejected, resolve, reject);
            }
        }
    }

    #setState(state, res) {
        if (this.#state === P) {
            this.#state = state;
            this.#result = res;
            this.#run();
        }
    }

    then(onFullFilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.#handlers.push({
                onFullFilled, onRejected, resolve, reject
            });
            this.#run();
        })
    }
}

const p = new MyPromise((r, r2) => {
    r2(123)
});
// p.then(2222, (e) => {
//     console.log('outer err', e);
// }).then(a => {
//     console.log('second then ', a);
// });

p.then((d) => {
    console.log('outer data 1', d * 2);
}, (e) => {
    console.log('outer err 1', e);
    return e;
}).then(a => {
    console.log('aaaaa', a);
});

console.log('sync script');


// const p1 = new Promise((r1, r2) => {
//     r2(23333)
// })
// p1.then(a => {
//     console.log('normal promise', a);
// }, e => {
//     console.log('normal promise e', e);
// }).then(b => {
//     console.log('res?', b);
    
// })
// console.log(p);

