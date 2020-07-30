const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') // grabs user router file
const taskRouter = require('./routers/task') // grabs task router file

const app = express()
const port = process.env.PORT || 3000

// register middleware
// app.use((req, res, next) => {
//     // request is a GET request
//     if(req.method == 'GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// maintenance middlware
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter) // loads user routes
app.use(taskRouter) // loads task routes

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // task -> user
    // const task = await Task.findById('5f22fbd0bfc5ac211ef7d26b') // finds task
    // await task.populate('owner').execPopulate() // populates owner field in task with the user object of that associating user id (reference task model)
    // console.log(task)
    // console.log('-------------------------')
    // console.log(task.owner)

    // user -> all tasks
    // const user = await User.findById('5f22fb96bfc5ac211ef7d269') // finds user
    // await user.populate('tasks').execPopulate() // populates the virtual tasks field added to the user, virtual because field doesn't exist in the data, just code (reference user mode)
    // console.log(user)
    // console.log('-------------------------')
    // console.log(user.tasks)
}

// main()