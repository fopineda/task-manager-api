// To run: node <FILENAME>

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
     db.collection('users').insertOne({
         name: 'Felipe',
         age: 23
     })
})