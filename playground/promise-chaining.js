require('../src/db/mongoose')
const User = require('../src/models/user')

// Promise chaining in Mongoose API

// creating an async function to await Mongoose API
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    return count
}

updateAgeAndCount('5f0deab3fb6d001ddb8246e6', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})

// two async operations: update user's age and then count # of users with age 1
// User.findByIdAndUpdate('5f0deab3fb6d001ddb8246e6', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })