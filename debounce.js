function debounce(func, ms) {
    let timer;
    function f(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
           func.apply(this, args); 
        }, ms);
    }

    return f;
}

function a(x) {
    console.log('A - x', x);
}
let dt = debounce(a, 1000);
dt(0);
dt(1);
dt(2);
dt(3);