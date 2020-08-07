const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

// Supertest (request) makes the request without needing to run application
// Jest is the testing library (expect)

// JEST SET UP: lifecycle methods (ex: beforeEach, afterEach, beforeAll, afterAll, etc.)
beforeEach(setupDatabase)


// POST: create task
test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
    expect(task.description).toBe('From my test')
})