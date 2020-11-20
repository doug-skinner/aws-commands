const { Command } = require('commander')

const program = new Command()

// Setup all commandline options
program
	.command('get-mapping', 'get the mapping of an index document', { executableFile: './get-mapping.js' })
	.command('list-aliases', 'List all current aliases against an elasticsearch endpoint', {
		executableFile: './list-aliases',
	})
	.command('list-endpoints', 'List all current endpoints for the aws account', { executableFile: './list-endpoints' })
	.command('list-indices', 'List all current indices against an elasticsearch endpoint', {
		executableFile: './list-indices',
	})
	.command('update-mapping', 'update the mapping of an index document', { executableFile: './update-mapping.js' })

program.parse(process.argv)
