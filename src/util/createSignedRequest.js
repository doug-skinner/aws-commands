const AWS = require('aws-sdk')
const aws4 = require('aws4')

const {
    accessKeyId,
    secretAccessKey,
    sessionToken,
} = new AWS.SharedIniFileCredentials()

const creds = {
    accessKeyId,
    secretAccessKey,
    sessionToken,
}

const createSignedRequest = ({ host, path, url, method, body }) => {
    const options = {
        host,
        path,
        method,
        url,
    }

    if (method === 'POST' || method === 'PUT') {
        options.headers = {
            'presigned-expires': false,
            'Content-Type': 'application/json',
        }
        options.data = body
        options.body = JSON.stringify(body)
    }

    return aws4.sign(options, creds)
}

module.exports = { createSignedRequest }
