'use strict'

const {consumerToQueue, consumerToQueueFailed, consumerToQueueNormal}  = require('./src/services/consumerQueue.service')
const queueName = 'test-topic'
// consumerToQueue(queueName).then(() => {
//     console.log(`Message to ${queueName}`);
// }).catch((err) => { throw err});
consumerToQueueFailed(queueName).then(() => {
    console.log(`Message consumerToQueueFailed ${queueName}`);
}).catch((err) => { throw err});

consumerToQueueNormal(queueName).then(() => {
    console.log(`Message consumerToQueueNormal ${queueName}`);
}).catch((err) => { throw err});


