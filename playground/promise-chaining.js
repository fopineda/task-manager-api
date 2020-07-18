require('../src/db/mongoose')
const User = require('../src/models/user')

// Promise chaining in Mongoose API

// Template
///////////////////////////////
// add(1,1).then((sum) => {
//     console.log(sum)
//     return add(sum, 4)
// }).then((sum2) => {
//     console.log(sum2)
// }).catch((error) => {
//     console.log(error)
// })
//////////////////////////////

// update user's age
User.findByIdAndUpdate('5f0deab3fb6d001ddb8246e6', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})