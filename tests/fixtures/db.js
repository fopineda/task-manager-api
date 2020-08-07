const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// Dummy user one
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

// Dummy user two
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Andrew',
    email: 'Andrew@example.com',
    password: '95what!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}


// Dummy tasks
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    owner: userOne._id
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    owner: userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async () => {
    // deletes all users and tasks in the database
    await User.deleteMany()
    await Task.deleteMany()
    // adds dummy users and tasks from above to database so tests can have a dummy user and dummy tasks
    await new User(userOne).save()
    await new User(userTwo).save()
    await Task(taskOne).save()
    await Task(taskTwo).save()
    await Task(taskThree).save()
}


module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}