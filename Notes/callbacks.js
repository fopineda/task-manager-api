// Used in conjunction with 9-promises.js

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('this is my error', undefined) // for error
        callback(undefined, [1,2,3,4]) // for result
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }
    console.log(result)
})