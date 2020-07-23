const express = require('express')
const Task = require('../models/task') // grabs the task model 
const router = new express.Router()


// POST: localhost:3000/tasks
// DESCRIPTION: Creates new task (description, complete)
// This endpoint uses Mongoose API
// Mongoose Queries: Model.save() where Model is Task (see requires)
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task) // send to the sender
    } catch (error) {
        res.status(400).send(error) // bad request.error
    }
})


// GET: localhost:3000/tasks
// DESCRIPTION: Obtain a list of tasks [ for specific user ]
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is Task (see requires)
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send() // internal service error.send nothing as it already send stuff
    } 
})

// GET: localhost:3000/tasks/:id (localhost:3000/tasks/123456789) 
// DESCRIPTION: Obtain a user from a given id [ for specific user ]
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is Task (see requires)
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id // params is an object with key value pairs created when you call the endpoint with params in the URL
    
    try {
        const task = await Task.find({_id})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.sendStatus(500).send()
    } 
})

// PATCH: localhost:3000/tasks/:id (localhost:3000/task/123456789)
// DESCRIPTION: Update a task from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findByIdAndUpdate() where Model is Task (see requires)
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id // params is an object with key value pairs created when you call the endpoint with params in the URL
    const newItems = req.body
    const updates = Object.keys(newItems)
    const allowedUpdates = ['description', 'complete']
    // loop through the user given new items and if it not in allowed updates then it is false
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){ // invalid update items
        return res.status(400).send({ error: 'invalid updates!' })
    }
    

    try{
        // const task = await Task.findByIdAndUpdate(_id, newItems, { new: true, runValidators: true })
        
        const task = await Task.findById(_id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()


        if (!task){ // no task was found
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

// DELETE: localhost:3000/task/:id (localhost:3000/tasks/123456789)
// DESCRIPTION: delete a task from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findByIdAndDelete() where Model is Task (see requires)
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete(_id)

        if (!task){ // no task found
            return res.status(404).send()
        }

        res.send(task)
    }catch(error){
        res.status(500).send()
    }
})

module.exports = router