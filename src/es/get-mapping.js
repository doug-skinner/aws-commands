const axios = require('axios')
const AWS = require('aws-sdk')
const logger = require('../util/logger')
const program = require('commander')

program
    .option(
        '-e, --endpoint <endpoint>',
        'the endpoint to run this command against'
    )
    .option('-i, --index <index>', 'the index to run the command against')
    .parse(process.argv)

const { createSignedRequest } = require('../util/createSignedRequest')

const main = async (endpoint, index) => {
    if (!endpoint || !index) {
        logger.error(
            'You are missing one of [endpoint, index], please make sure all arguments are populated',
            {
                endpoint,
                index,
            }
        )
        return
    }

    const esEndpoint = new AWS.Endpoint(endpoint)

    const signedRequest = createSignedRequest({
        host: esEndpoint.host,
        path: `/${index}/_mapping`,
        url: `${esEndpoint.href}${index}/_mapping`,
        method: 'GET',
    })

    const { data } = await axios(signedRequest)
    logger.log(JSON.stringify(data, null, 4))
}

main(program.endpoint, program.index)
