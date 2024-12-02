export const time = (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}
export const ajax1 = () => time(2000).then(() => {
    console.log(1);
    return 1
})
export const ajax2 = () => time(1000).then(() => {
    console.log(2);
    return 2
})
export const ajax3 = () => time(1000).then(() => {
    console.log(3);
    return 3
});
export const ajax4 = () => time(1000).then(() => {
    console.log(4);
    return 4
})