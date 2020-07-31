const express = require('express')
const Task = require('../models/task') // grabs the task model
const auth = require('../middleware/auth') 
const router = new express.Router()


// POST: localhost:3000/tasks
// DESCRIPTION: Creates new task (description, completed) for an authenticated user
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


// GET: localhost:3000/tasks (all tasks no filtering)
// GET: localhost:3000/tasks?completed=true (all completed tasks)
// GET: localhost:3000/tasks?limit=10&skip=10 (only get 10 per page, but skip the first 10)
// GET: localhost:3000/tasks?sortBy=createdAt:desc (sort tasks by createdAt field at a descending manner)
// DESCRIPTION: Obtain a list of tasks (may be filtered) for an authenticated user 
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (find) in commented out alternative solution
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        // field: 1 (asc) || -1 (desc)
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // virtually create the 'tasks' field on user and populate it with the tasks that belong to that user
        await req.user.populate({
            path: 'tasks',
            // send back only that match the criteria
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        // send tasks located in that virtual field 'tasks'
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
    const allowedUpdates = ['description', 'completed']
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