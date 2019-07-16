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

    // findone takes two parameters, search object and callback function
    // user parameter in callback can be renamed to anything
    // Note: searching for an item and not finding one is not error. Everything work just nothing was found
    // Note: ObjectIDs must be search through an objectid object
    // db.collection('users').findOne({_id: new ObjectID('5d19b420c8167ebb96ee14e3')}, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     }
    //     console.log(user)
    // })

    // Note: No collback for find
    // Note: returns a cursor back, the cursor is the data asked for it is a pointer to that data
    // Cursor has many functions that can be run, like maybe limiting the max number of data
    // toArray(...) has a callback
    // db.collection('users').find({age: 21}).toArray((error, users) => {
    //     console.log(users)
    // })

    // Count
    // db.collection('users').find({age: 21}).count((error, count) => {
    //     console.log(count)
    // })


    db.collection('tasks').findOne({_id: new ObjectID("5d25393829009ec64967a290")}, (error, task) => {
        if (error) {
            return console.log('unable to find')
        }
        console.log(task)
    })

    db.collection('tasks').find({Completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })
    


})