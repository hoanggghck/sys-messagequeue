'use strict'

const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        if (!connection) throw new Error();

        const channel = await connection.createChannel();

        return { channel, connection }
    } catch (error) {
        throw error;
    }
}

const connectToRabbitMQTest = async () => {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const queue = 'test-queue';
        const message = 'hello, my name is Goldz';
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));
        connection.close();
    } catch (error) {
        throw error;
    }
}

const consmuerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, { durable: true})
        console.log(`waitting for message: ....`);
        channel.consume( queueName, msg => {
            console.log(`Received message: ${queueName}::`, msg.content.toString());
            // 1. Find User following that shop
            // 2. Send Message to user
            // 3. yes, ok => success
            // 4. error, setup DLX....

        },  {   
            noAck: true
        })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQTest,
    consmuerQueue
}