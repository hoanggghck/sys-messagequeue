'use strict'

const mongoose = require('mongoose')

const connectString = 'mongodb+srv://hoanggghck:L9915173l@test.wf0nqom.mongodb.net/'

const testSchema = new mongoose.Schema({ name: String })
const Test = mongoose.model('Test', testSchema)

describe( 'Test Mongo', () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose.connect(connectString)
    })

    afterAll(async () => {
        await connection.disconnect()
    })

    it('connect to moongo', () => {
        expect(mongoose.connection.readyState).toBe(1)
    })

    it('should have document', async () => {
        const user = new Test({ name: 'Goldz'})
        await user.save()
        expect(user.isNew).toBe(false)
    })

    it('should have document', async () => {
        const user = await Test.findOne({ name: 'Goldz'})
        expect(user).toBeDefined();
        expect(user.name).toBe('Goldz')
    })
})