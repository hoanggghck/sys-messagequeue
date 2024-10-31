'use strict'

const {
    consmuerQueue,
    connectToRabbitMQ
} = require('../dbs/init.rabbitmq')

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consmuerQueue(channel, queueName);
        } catch (error) {
            throw error;
        }
    },
    // case processing
    consumerToQueueNormal: async () => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notiQueue = 'notificationQueueProcess'
            channel.consume( notiQueue, msg => {
                console.log(`SEND notification successfully::`, msg.content.toString());
                channel.ack(msg) //
            })

        } catch (error) {
            throw error;
        }
    },
    consumerToQueueFailed: async () => {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationExchangeDLX = 'notificationExDLX'
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'
            const notiQueueHandler = 'notificationQueuHotFix'
            await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            })
            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            })

            await channel.bindQueue( queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)
            await channel.consume( queueResult.queue, msgFailed => {
                console.log(`This notification Erorr: `, msgFailed.content.toString());
            }, {
                noAck: true
            })
        } catch (error) {
            
        }
    }
}

module.exports = messageService;