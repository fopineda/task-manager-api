const express = require('express')
const User = require('../models/user') // grabs the user model 
const router = new express.Router()


// POST: localhost:3000/users
// DESCRIPTION: Creates new user (name, email, password)
// This endpoint uses Mongoose API
// Mongoose Queries: Model.save() where Model is User (see requires)
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// POST: localhost:3000/users/login
// DESCRIPTION: logins user
// endpoint uses method defined in model user
router.post('/users/login', async (req, res) => {
    try {
        // email and password are given when logging in
        const user = await  User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

// GET: localhost:3000/users
// DESCRIPTION: Obtain a list of users
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is User (see requires)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        // internal service error.send nothing as it already send stuff
        res.status(500).send() 
    } 
})

// GET: localhost:3000/users/:id (localhost:3000/users/123456789)
// DESCRIPTION: Obtain a user from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.find() where Model is User (see requires)
router.get('/users/:id', async (req, res) => {
    // params is an object with key value pairs created when you call the endpoint with params in the URL
    const _id = req.params.id 
    
    try {
        const user = await User.find({_id})
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    } 
})


// PATCH: localhost:3000/users/:id (localhost:3000/users/123456789)
// DESCRIPTION: Update a user from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findByIdAndUpdate() where Model is User (see requires)
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id 
    const newItems = req.body
    const updates = Object.keys(newItems)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // loop through the user given new items and if it not in allowed updates then it is false
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // invalid update items
    if (!isValidOperation){ 
        return res.status(400).send({ error: 'invalid updates!' })
    }
    

    try{
        // const user = await User.findByIdAndUpdate(_id, newItems, { new: true, runValidators: true })

        const user = await User.findById(_id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        if (!user){ // no user was found
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

// DELETE: localhost:3000/users/:id (localhost:3000/users/123456789)
// DESCRIPTION: delete a user from a given id
// This endpoint uses Mongoose API
// Mongoose Queries: Model.findByIdAndDelete() where Model is User (see requires)
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete(_id)

        // no user found
        if (!user){ 
            return res.status(404).send()
        }

        res.send(user)
    }catch(error){
        res.status(500).send()
    }
})


module.exports = router