const mongoose = require('mongoose')
const validator = require('validator')

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

// export it so other files can use it
module.exports = User