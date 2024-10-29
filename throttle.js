function throttle(func, ms) {
    let isThrottle = false, savedThis, savedArgs;
    function f(...args) {
        if (isThrottle) {
            savedArgs = args;
            savedThis = this;
            return;
        }
        func.apply(this, args);
        isThrottle = true;

        setTimeout(() => {
            isThrottle = false;
            if (savedArgs) {
                f.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return f;
}

function a(x, y) {
    console.log('x, y', x, y);
}
let tt = throttle(a, 1000);
tt(0, 0);
tt(0, 5);
tt(0, 6);