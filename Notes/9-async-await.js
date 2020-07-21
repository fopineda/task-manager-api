// promise function
const add = (a,b) => {
    // Create the promise with some task
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0){
                return reject('Number must be non-negative')
            }
            resolve(a + b)
        }, 2000)
    })
}


// async function
const doWork = async () => {
    const sum = await add(1,99) // calls the promise add promise function using async-await
    const sum2 = await add(sum,50)
    const sum3 = await add(sum2,50)
    return sum3
}

// console.log(doWork())

doWork().then((result) => {
    console.log('result', result)
}).catch((error) => {
    console.log('error', error)
})