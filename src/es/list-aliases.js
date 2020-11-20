const axios = require('axios')
const AWS = require('aws-sdk')
const logger = require('../util/logger')
const program = require('commander')

program
    .option(
        '-e, --endpoint <endpoint>',
        'the endpoint to run this command against'
    )
    .parse(process.argv)

const { createSignedRequest } = require('../util/createSignedRequest')

const main = async (endpoint) => {
    const esEndpoint = new AWS.Endpoint(endpoint)

    const signedRequest = createSignedRequest({
        host: esEndpoint.host,
        path: '/_cat/aliases',
        url: `${esEndpoint.href}_cat/aliases`,
        method: 'GET',
    })

    const { data } = await axios(signedRequest)
    logger.log(data)
}

main(program.endpoint)
