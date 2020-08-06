const request = require('supertest')
const app = require('../src/app')


// POST: Creating a new user
test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Felipe Pineda',
        email: 'fopineda95@gmail.com',
        password: 'MyPass777!'
    }).expect(201)
})