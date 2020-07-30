const express = require('express')
const Task = require('../models/task') // grabs the task model
const auth = require('../middleware/auth') 
const router = new express.Router()


// POST: localhost:3000/tasks
// DESCRIPTION: Creates new task (description, complete) for an authenticated user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (save)
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        // copies over all the elements in req.body
        ...req.body,
        // id of the owner
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task) 
    } catch (error) {
        res.status(400).send(error) 
    }
})


// GET: localhost:3000/tasks
// DESCRIPTION: Obtain a list of tasks for an authenticated user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (find) in commented out alternative solution
router.get('/tasks', auth, async (req, res) => {
    try {
        // ALSO WORKS
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
        
    } catch (error) {
        // internal service error.send nothing as it already send stuff
        res.status(500).send() 
    } 
})

// GET: localhost:3000/tasks/:id (localhost:3000/tasks/123456789) 
// DESCRIPTION: Obtain a task for an authenticated user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (findOne)
router.get('/tasks/:id', auth, async (req, res) => {    
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.sendStatus(500).send()
    } 
})

// PATCH: localhost:3000/tasks/:id (localhost:3000/task/123456789)
// DESCRIPTION: Update a task for an authenticated user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (findOne, save)
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'complete']
    // loop through the user given new items and if it not in allowed updates then it is false
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // invalid update items
    if (!isValidOperation){ 
        return res.status(400).send({ error: 'invalid updates!' })
    }
    

    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        // no task was found
        if (!task){ 
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

// DELETE: localhost:3000/task/:id (localhost:3000/tasks/123456789)
// DESCRIPTION: delete a task for a authenticated user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (findOneAndDelete)
router.delete('/tasks/:id', auth, async (req, res) => {

    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        
        // no task found
        if (!task){ 
            return res.status(404).send()
        }

        res.send(task)
    }catch(error){
        res.status(500).send()
    }
})

module.exports = router