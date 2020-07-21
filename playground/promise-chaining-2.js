require('../src/db/mongoose')
const Task = require('../src/models/task')

// Promise chaining in Mongoose API

const deleteTaskAndCount = async (id, complete) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ complete: complete })
    return count
}

deleteTaskAndCount('5f108a60d7d108460d767b00', false).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})

// Two async operations: remove a given task by id and then get and print the total number of incomplete tasks
// Task.findByIdAndDelete('5f108a2dd7d108460d767afe').then((task) => {
//     console.log(task)
//     return Task.countDocuments({complete: false})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })