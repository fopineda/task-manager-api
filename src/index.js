const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') // grabs user router file
const taskRouter = require('./routers/task') // grabs task router file

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter) // loads user routes
app.use(taskRouter) // loads task routes

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // unique identifier is the id, and it returns your token
    const token = jwt.sign( { _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 seconds'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

// myFunction()