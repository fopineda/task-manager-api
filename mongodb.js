// CRUD: Create, Read, Update, Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb') // Same as above

// Connection variables for mongodb database
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Will automatically set the database to name

// Call back, if error exists then something went wrong. If client exists, then it went well and you are connected
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('unable to connect to database')
    }

     // database reference to use
    const db = client.db(databaseName)

    // deleted users with age 23
    // db.collection('users').deleteMany({
    //     'age': 23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // delete a single task
    db.collection('tasks').deleteOne({
        'task': 'Play Basketball'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    // Basic promise syntax
    // updatePromise.then((result) => {

    // }).catch((error) => {
        
    // })
})