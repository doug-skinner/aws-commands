const fs = require('fs')
const logger = require('../util/logger')

const openFile = async (filename) => {
	const currentDirectory = process.cwd()
	try {
		const fullFilename = `${currentDirectory}/${filename}`
		logger.log(fullFilename)
		const file = await fs.readFileSync(fullFilename, { encoding: 'utf-8' })
		return file
	} catch (err) {
		logger.error('There was an error opening the requested file', { err })
		return null
	}
}

module.exports = { openFile }
