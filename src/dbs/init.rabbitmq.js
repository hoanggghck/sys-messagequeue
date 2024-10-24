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

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQTest
}