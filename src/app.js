const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') // grabs user router file
const taskRouter = require('./routers/task') // grabs task router file

const app = express()

app.use(express.json())
app.use(userRouter) // loads user routes
app.use(taskRouter) // loads task routes

module.exports = app

// so you can load in the app into other files such as test suites. index.js still calls the listen and runs the server