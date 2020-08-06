const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = { 
    name: 'Mike',
    email: 'mike@example.com',
    password: 'MyPass777!'
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
