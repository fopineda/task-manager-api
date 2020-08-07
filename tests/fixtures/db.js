const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

// Dummy user
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


const setupDatabase = async () => {
    // deletes all users in the database
    await User.deleteMany()
    // adds dummy user from above to database so tests can have a dummy user
    await new User(userOne).save()
}


module.exports = {
    userOneId,
    userOne,
    setupDatabase
}