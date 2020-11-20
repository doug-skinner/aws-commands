const { Command } = require('commander')

const program = new Command()

// Setup all commandline options
program.command('move', 'move a message from one queue to another', {
    executableFile: './move.js',
})

program.parse(process.argv)
