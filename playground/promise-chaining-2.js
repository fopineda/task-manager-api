require('../src/db/mongoose')
const Task = require('../src/models/task')

// Promise chaining in Mongoose API

// Two async operations: remove a given task by id and then get and print the total number of incomplete tasks
Task.findByIdAndDelete('5f108a2dd7d108460d767afe').then((task) => {
    console.log(task)
    return Task.countDocuments({complete: false})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})