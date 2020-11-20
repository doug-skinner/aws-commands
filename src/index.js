#!/usr/bin/env node
const { Command } = require('commander')

const program = new Command()

// Setup all commandline options
program.command('es', 'run commands against AWS es', {
    executableFile: './es/index.js',
})

program.parse(process.argv)
