const axios = require('axios')
const AWS = require('aws-sdk')
const logger = require('../util/logger')
const program = require('commander')

const { openFile } = require('../util/openFile')

program
    .option(
        '-e, --endpoint <endpoint>',
        'the endpoint to run this command against'
    )
    .option('-i, --index <index>', 'the index to run the command against')
    .option(
        '-m, --mappingFile <mappingFile>',
        'the file that contains the new document mapping to upload to the index'
    )
    .parse(process.argv)

const { createSignedRequest } = require('../util/createSignedRequest')

const main = async (endpoint, index, mappingFile) => {
    if (!endpoint || !index || !mappingFile) {
        logger.error(
            'You are missing one of [endpoint, index, mappingFile], please make sure all arguments are populated',
            { endpoint, index, mappingFile }
        )
        return
    }

    const file = await openFile(mappingFile)
    const parsedFile = JSON.parse(file)

    const esEndpoint = new AWS.Endpoint(endpoint)

    const signedRequest = createSignedRequest({
        host: esEndpoint.host,
        path: `/${index}/_mapping/_doc`,
        url: `${esEndpoint.href}${index}/_mapping/_doc`,
        method: 'PUT',
        body: parsedFile,
    })

    try {
        const { data } = await axios(signedRequest)
        logger.log(data)
    } catch (err) {
        logger.log(err.response.statusText)
    }
}

main(program.endpoint, program.index, program.mappingFile)
