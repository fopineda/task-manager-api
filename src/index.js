const express = require('express')
require('./db/mongoose') // executes the mongoose file, thus making sure that mongoose connects to the database
const User = require('./models/user') // grabs the user model 
const Task = require('./models/task') // grabs the task model

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

// ----- API Endpoints ----
// path, callback (req, res)

// POST: localhost:3000/users
// DESCRIPTION: Creates new user (name, email, password)
app.post('/users', (req, res) => {
    const user = new User(req.body)

    // saves the document
    user.save().then(() =>{
        res.status.apply(201).send(user) // sent to the sender
    }).catch((error) => {
        res.status(400).send(error) // bad request.error
    })
})

// GET: localhost:3000/users
// DESCRIPTION: Obtain a list of users
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is User (see requires)
app.get('/users', (req, res) => {
    // fetch all user in the database, we can access to those via the promise. Promise is fulfilled with the users, or be rejected with an error
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((error) => {
        res.status(500).send() // internal service error.send nothing as it already send stuff
    })  
})

// GET: localhost:3000/users/:id (localhost:3000/users/123456789)
// DESCRIPTION: Obtain a user from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findOne() where Model is User (see requires)
app.get('/users/:id', (req, res) => {
    const _id = req.params.id // params is an object with key value pairs created when you call the endpoint with params in the URL
    
    // find user
    User.find({_id}).then((user) =>{
        if (!user){
            return res.status(404).send()
        }
        res.send(user) // will not be changing the status code
    }).catch((error) => {
        res.sendStatus(500).send()
    })  
})


// POST: localhost:3000/tasks
// DESCRIPTION: Creates new task (description, complete)
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    // saves the document
    task.save().then(() => {
        res.status(201).send(task) // send to the sender
    }).catch((error) => {
        res.status(400).send(error) // bad request.error
    })
})


// GET: localhost:3000/tasks
// DESCRIPTION: Obtain a list of tasks [ for specific user ]
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is Task (see requires)
app.get('/tasks', (req, res) => {
    // fetch all user in the database, we can access to those via the promise. Promise is fulfilled with the users, or be rejected with an error
    Task.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send() // internal service error.send nothing as it already send stuff
    })  
})

// GET: localhost:3000/tasks/:id (localhost:3000/tasks/123456789) 
// DESCRIPTION: Obtain a user from a given id [ for specific user ]
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findOne() where Model is Task (see requires)
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id // params is an object with key value pairs created when you call the endpoint with params in the URL
    
    // find task
    Task.find({_id}).then((task) =>{
        if (!task){
            return res.status(404).send()
        }
        res.send(task) // will not be changing the status code
    }).catch((error) => {
        res.sendStatus(500).send()
    })  
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


