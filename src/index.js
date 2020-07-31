const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') // grabs user router file
const taskRouter = require('./routers/task') // grabs task router file

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        // 1000000 = 1 megabyte
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word document...'))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})


app.use(express.json())
app.use(userRouter) // loads user routes
app.use(taskRouter) // loads task routes

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})