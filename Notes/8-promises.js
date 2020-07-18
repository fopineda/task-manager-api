// // Used in conjunction with callbacks.js

// // Arrow function inside Promise is called by the Promise API
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1,2,3,4])
//         reject('this is my error')
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('success', result)
// }).catch((error) => {
//     console.log('error', error)
// }) // When reject is called

// // Once a reject or resolve is called, it stops looking and promise is done




// task-manager project promise code
const add = (a,b) => {
    // Create the promise with some task
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// Normal promise call
// use that promise with a .then (successful) and a .catch (unsuccessful)
// add(1,2).then((sum) => {
//     console.log(sum)  
// }).catch ((error) => {
//     console.log(error)
// })

// Promise chaining in JavaScript
// first .then runs when add(1,1) is fulfilled
// second .then runs with add(sum, 4) is fulfilled
add(1,1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})