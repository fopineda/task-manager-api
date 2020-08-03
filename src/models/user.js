const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    // schema fields
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
        unique: true,
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
    },
    // array of objects, each has a token property
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    // for avatar images
    avatar: {
        type: Buffer
    }
}, {
    // schema options
    timestamps: true
})

// virtual field, not stored in the database
// meant to reference Task virtually, not to actually have a field in the database
// relationship creator
userSchema.virtual('tasks', {
    // mode name
    ref: 'Task',
    // where the local data is stored
    localField: '_id',
    // name of the field on the other thing (Task), that'll create relationship
    foreignField: 'owner'
})

// makes the user object modifiable and removes the non-public elements of the object so it can be sent to the users 
// overwrites the toJSON method that is already being ran on the objects
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    // users will not have passwords or tokens being sent to them
    delete userObject.password
    delete userObject.tokens

    return userObject
}

// generates and adds the token to the user object (being passed in from the router)
// object instance use this
userSchema.methods.generateAuthToken =  async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    // adding the token generated to the object for storing in the database
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


// creates the findByCredentials methods for the router to use
// Models use this
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    // user not found from email given
    if (!user) { 
        throw new Error('Unable to login...')
    }

    // checks if the hash of the password matches the hash stored in the 
    const isMatch = await bcrypt.compare(password, user.password)

    // password did not match
    if (!isMatch) { 
        throw new Error('Unable to login...')
    }

    return user
}


// Middleware
// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this // user allows you access all the items the request provided

    // hashing password - true when user is first created and true when password for user is modified
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    // next() acts as a sign that the async function is done, otherwise it'll hang
    next() 
})

// Middleware
// Delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

// User model
const User = mongoose.model('User', userSchema)

// export it so other files can use it
module.exports = User