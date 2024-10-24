'use strict'

const {
    connectToRabbitMQTest
} = require('../dbs/init.rabbitmq')

describe('RabbitMQ Connection', () => {
    it('should connect success', async () => {
        const result = await connectToRabbitMQTest();
        expect(result).toBeUndefined();
    })
})