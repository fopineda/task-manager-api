const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

// Supertest (request) makes the request without needing to run application
// Jest is the testing library (expect)

// JEST SET UP: lifecycle methods (ex: beforeEach, afterEach, beforeAll, afterAll, etc.)
beforeEach(setupDatabase)


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

test('Should get tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    
    const tasks = await Task.findById(response.body._id)
    expect(response.body.length).toEqual(2)
})

test('Should not delete task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})