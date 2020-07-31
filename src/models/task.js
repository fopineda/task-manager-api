const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    // schema fields
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        // type will be an id that is typically stored in the database
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // references the name of the User model, which is 'User'
        ref: 'User'
    }
}, {
    // schema options
    timestamps: true
})

// Task model
const Task = mongoose.model('Task', taskSchema)

// export it so other files can use it
module.exports = Task