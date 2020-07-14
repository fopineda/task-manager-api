const express = require('express')
require('./db/mongoose') // executes the mongoose file, thus making sure that mongoose connects to the database
const User = require('./models/user') // grabs the user model 

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// ----- API ----
// path, callback (req, res)

// localhost:3000/users
// Creates new user (name, email, password)
app.post('/users', (req, res) => {
    const user = new User(req.body)

    // callback
    user.save().then(() =>{
        res.send(user) // sent to the sender
    }).catch((error) => {
        res.status(400).send(error) // bad request.error
    })
})





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


