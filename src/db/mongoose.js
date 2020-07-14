const mongoose = require('mongoose')

// URL/database-name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
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

