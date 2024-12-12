// /// 1. print 1, 2, 3 after 1s

import { ajax1, ajax2, ajax3, ajax4 } from "./mock.mjs";

/**
 * @param {Array} arr 
 */
const printNum = (arr) => {
    let p = Promise.resolve();
    for (let i = 0; i < arr.length; i++) {
        p = p.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(arr[i]);
                    resolve();
                }, 1000);
            })
        })
    }

};
// printNum([1, 2, 3, 4]);

/// 2. red-yellow-green light
const red = () => console.log("red light");
const yellow = () => console.log("yellow light");
const green = () => console.log("green light");

const light = (fn, timer) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fn();
            resolve();
        }, timer);
    })
}
const step = () => {
    light(red, 3000).then(() => light(yellow, 2000)).then(() => light(green, 1000)).then(() => step())
};
// step();

/// 3. merge promise
/**
 * @param {Array} list 
 */
const mergePromise = (list) => {
    const res = [];
    let p = Promise.resolve();
    list.forEach(l => {
        p = p.then(l).then(r => {
            res.push(r);
            return res;
        })
    })
    return p;
}

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//     console.log("done");
//     console.log(data); // data 为 [1, 2, 3]
// });

/// 4. async load img
const loadImg = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log('load ready');
            resolve(img);
        }
        img.onerror(() => {
            reject(Error('error'))
        })
        img.src = url;
    });
}

/// 5. batch request
/**
 * @param {Array<Promise>} fetchList 
 */
const limitPromise = async (fetchList, max) => {
    const pool = [];
    for (let i = 0; i < fetchList.length; i++) {
        const task = fetchList[i]();
        task.then(res => {
            pool.splice(pool.indexOf(task), 1);
        });
        pool.push(task);
        if (pool.length === max) {
            await Promise.race(pool)
        }
    }
}
limitPromise([ajax2, ajax2, ajax3, ajax4], 2);

class HardMan {
    constructor(name) {
        this.promise = Promise.resolve().then(() => {
            console.log('0000');
            console.log(`Hi I am ${name}`);
        })
    }

    rest(t) {
        this.promise = this.promise.then(() => new Promise((resolve) => {
            console.log(`wait ${t}s`);
            setTimeout(() => {
                console.log(`start from ${t}s`);
                resolve();
            }, t * 1000);
        }));
        return this;
    }
    learn(str) {
        this.promise = this.promise.then(() => {
            console.log(`Learn ${str}`);
        });
        return this;
    }
    restFirst(t) {
        const a = this.promise;
        this.promise = new Promise(resolve => {
            console.log(`等待${t}秒`);
            setTimeout(() => {
                console.log(`Start learning after ${t} seconds`);
                resolve();
            }, t * 1000);
        });
        this.promise.then(() => a);
        return this;
    }
}

// new HardMan("jack")
// new HardMan("“jack").rest(5).learn("“computer")
new HardMan("jack").restFirst(6).learn("chinese")