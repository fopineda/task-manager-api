// CRUD: Create, Read, Update, Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

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

     // Database Name: task manager
     // Collection: users
    // db.collection('users').insertOne({
    //     name: 'Erica',
    //     age: 21
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert user!')
    //     }

    //     console.log(result.ops) // results.ops contains all the documents that were inserted 
    // })


    // Insert many (takes an array of documents)
    // db.collection('users').insertMany([
    //     {
    //         name: 'Janet',
    //         Age: 30
    //     },
    //     {
    //         name: 'Miguel',
    //         Age: 33
    //     }
    // ], (error, result) => {
    //     if (error){ 
    //         return console.log('unable to insert users')
    //     }

    //     console.log(result.ops)
    // })



    // Tasks Collection
    db.collection('tasks').insertMany([
        {
            task: 'Taking Rosie on a walk.',
            Completed: true
        },
        {
            task: 'Play Basketball',
            Completed: true
        },
        {
            task: 'Finishing up NodeJS Udemy course.',
            Completed: false
        }
    ], (error, result) => {
        if (error){ 
            return console.log('unable to insert tasks')
        }

        console.log(result.ops)
    })
})