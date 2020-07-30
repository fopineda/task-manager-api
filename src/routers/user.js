const express = require('express')
const User = require('../models/user') // grabs the user model 
const auth = require('../middleware/auth') // grabs the auth middleware
const router = new express.Router()


// POST: localhost:3000/users
// DESCRIPTION: Creates new user (name, email, password) 
// REQUIRES AUTHENTICATION: No
// NOTE: endpoint uses methods defined in model user and Mongoose methods (save)
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})


// POST: localhost:3000/users/login
// DESCRIPTION: logins user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses methods defined in model user
router.post('/users/login', async (req, res) => {
    try {
        // email and password are given when logging in
        // method created for model (schema.statics.) in user model
        const user = await  User.findByCredentials(req.body.email, req.body.password)
        // method created for user instance (schema.methods.) in user model
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})


// POST: localhost:3000/users/logout
// DESCRIPTION: logs out user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (save)
router.post('/users/logout', auth, async (req, res) => {
    // "logs" out that token and not any other ones as they may be other forms of authentication (maybe on a different device)
    try {
        // does it for every token in the array
            // (true) if the user's token does not match the current token being scanned, then keep it in the array 
            // (false) if the user's token does match the current token being scanned, then remove it from the array
        // Basically removing all instances of that token from the array
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        // saves the req body to the database, thus updating the database
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


// POST: localhost:3000/users/logoutAll
// DESCRIPTION: logs out all instances of a user
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (save)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // clears tokens array, thus all tokens, thus all instances of users logged in
        req.user.tokens = []

        // saves the req body to the database, thus updating the database
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


// GET: localhost:3000/users/me
// DESCRIPTION: obtains user
// Requires Authentication: Yes
router.get('/users/me', auth, async (req, res) => {
    // because of the /me, the route will only run if the user is authenticated and will only send that user's data
    res.send(req.user)
})


// PATCH: localhost:3000/users/:id (localhost:3000/users/me)
// DESCRIPTION: Updates a user 
// REQUIRES AUTHENTICATION: Yes
// NOTE: endpoint uses Mongoose methods (save)
router.patch('/users/me', auth, async (req, res) => {
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
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()

        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }
})


// DELETE: localhost:3000/users/:id (localhost:3000/users/me)
// DESCRIPTION: deletes a user account
// Requires Authentication: Yes
router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()

        res.send(req.user)
    }catch(error){
        res.status(500).send()
    }
})


module.exports = router