const AWS = require('aws-sdk')
const { config } = require('../config')

let sqs

const getSqs = () => {
    if (sqs === undefined) {
        sqs = new AWS.SQS({ region: config.defaultRegion })
    }
    return sqs
}

const getMessages = async (queueName) => {
    const sqs = getSqs()

    const params = {
        QueueUrl: queueName,
        AttributeNames: ['All'],
        MaxNumberOfMessages: config.sqs.defaultBatchSize,
    }

    const { Messages: messages } = await sqs.receiveMessage(params).promise()

    return messages
}

const sendMessage = async (queueName, message) => {
    const sqs = getSqs()

    const { Body: body } = message
    const params = {
        QueueUrl: queueName,
        MessageBody: body,
    }
    return sqs.sendMessage(params).promise()
}

const sendMessages = async (queueName, messages) => {
    const uploadPromises = messages.map((message) =>
        sendMessage(queueName, message)
    )

    await Promise.all(uploadPromises)
}

module.exports = { getMessages, sendMessage, sendMessages }
