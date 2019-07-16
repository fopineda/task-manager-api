// CRUD: Create, Read, Update, Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb') // Same as above

// Connection variables for mongodb database
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Will automatically set the database to name

// Call back, if error exists then something went wrong. If client exists, then it went well and you are connected
MongoClient.connect(connectionURL, {userNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('unable to connect to database')
    }

     // database reference to use
    const db = client.db(databaseName)

    // Updating a user
    // Note: Updates uses operators (like $set) which are used for update operations
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('5d253ef23fa784c6a3b361b1')
    }, {
        $set: {
            name: 'Virginia',
            age: 61
        }
    })
    // using the methods on the promise
    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // // Updating a user
    // // Note: Updates uses operators (like $set) which are used for update operations
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5d253ef23fa784c6a3b361b1')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    // // using the methods on the promise
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })



    // Update many
    // complete all tasks, all true
    // Updating a task
    // Note: Updates uses operators (like $set) which are used for update operations
    const updatePromiseTask = db.collection('tasks').updateMany({
        Completed: false
    }, {
        $set: {
            Completed: true
        }
    })
    // using the methods on the promise
    updatePromiseTask.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })






    // Basic promise syntax
    // updatePromise.then((result) => {

    // }).catch((error) => {
        
    // })
})