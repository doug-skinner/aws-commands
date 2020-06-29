const AWS = require('aws-sdk')
const logger = require('../util/logger')

const main = async () => {
    const es = new AWS.ES({ region: 'us-east-1' })

    const { DomainNames } = await es.listDomainNames().promise()
    const unpackedDomainNames = DomainNames.map((name) => name.DomainName)
    const domainsDescriptions = await es.describeElasticsearchDomains({ DomainNames: unpackedDomainNames }).promise()

    const endpoints = domainsDescriptions.DomainStatusList.map((domain) => {
        return domain.Endpoints.vpc
    })

    logger.log(JSON.stringify(endpoints, null, 4))
}

