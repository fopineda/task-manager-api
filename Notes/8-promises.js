// Used in conjunction with callbacks.js

// Arrow function inside Promise is called by the Promise API
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1,2,3,4])
        reject('this is my error')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('success', result)
}).catch((error) => {
    console.log('error', error)
}) // When reject is called

// Once a reject or resolve is called, it stops looking and promise is done