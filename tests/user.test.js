const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

// lifecycle methods (ex: beforeEach, afterEach, beforeAll, afterAll, etc.)
beforeEach(async () => {
    // runs before each test case
    await User.deleteMany()
    await new User(userOne).save()
})


// POST: Creating a new user
// test('Should signup a new user', async () => {
//     await request(app).post('/users').send({
//         name: 'Felipe Pineda',
//         email: 'fopineda95@gmail.com',
//         password: 'MyPass777!'
//     }).expect(201)
// })

// POST: login user
test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

// POST: login user
test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'bad-email',
        password: 'bad-password'
    }).expect(400)
})


// GET: get user profile
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// GET: get user profile
test('Should not get profile for user for unauthenticated user', async () => {
    // send without authentication token
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// DELETE: delete user account
test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// DELETE: delete user account
test('Should not delete account for unauthenticated user', async () => {
    // send without authentication token. Also, expecting 401 as not authenticated even though route says 500 is sent
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})