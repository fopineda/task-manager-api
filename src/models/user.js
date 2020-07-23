const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function(next) {
    const user = this // user allows you access all the items the request provided

    // hashing password - true when user is first created and true when password for user is modified
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() // next() acts as a sign that the async function is done, otherwise it'll hang
})

// User model
// name, fields (fields can be objects)
const User = mongoose.model('User', userSchema)

// export it so other files can use it
module.exports = User