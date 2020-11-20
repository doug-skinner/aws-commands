const logger = require('../util/logger')
const program = require('commander')
const sqsWrapper = require('../services/sqs')

program
    .option('-f, --from <queue>', 'the queue to pull messages from')
    .option('-t, --to <queue>', 'the queue to put messages on')
    .parse(process.argv)

const main = async (from, to) => {
    const messages = await sqsWrapper.getMessages(from)
    await sqsWrapper.sendMessages(to, messages)
}

main(program.from, program.to)
