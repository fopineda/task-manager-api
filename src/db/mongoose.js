const mongoose = require('mongoose')
const validator = require('validator')

// URL/database-name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// User model
// name, fields (fields can be objects)
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true, // built-in validators
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            // validation function
            if (value < 0){
                throw new Error('Age must be a positive number...')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            // validation function using validator library
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid...')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.includes("password")){
                throw new Error('Password cannot contain "password" in value...')
            }
        }
    }
})

// Tasks model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

// // Create new user
// const me = new User({name: 'Felipe', age: 25, email: 'yomomma12@gmail.com', password: 'felipe2'})
// // save it
// me.save().then(() =>{
//     console.log(me)
// }).catch((error) =>{
//     console.log('Error!', error)
// })

// // Create new task
// const money = new Task({description: 'Develop an money-making app', complete: false})
// // Save it
// money.save().then(() => {
//     console.log(money)
// }).catch((error) => {
//     console.log('Error!', error)
// })