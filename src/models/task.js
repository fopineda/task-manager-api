const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    complete: {
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
})

// export it so other files can use it
module.exports = Task