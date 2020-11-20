#!/usr/bin/env node
const { Command } = require('commander')

const program = new Command()

program
    .command('es', 'run commands against AWS es', {
        executableFile: './es/index.js',
    })
    .command('sqs', 'run commands against AWS sqs', {
        executableFile: './sqs/index.js',
    })

program.parse(process.argv)
