/**
 * Returns the arguments split as an object
 *
 * @param str
 * @returns {{}}
 */
const parseArgument = (str) => {
    const split = str.split('=')
    return { [split[0]]: split[1] || null }
}

/**
 * Get command arguments
 *
 * @author Victor Mendele <victor.mendele68@gmail.com>
 * @param {Object} arguments
 * @param argv
 * @returns {{}} argumentsArray
 */
const getArguments = (argv = process.argv, { skip = 2 } = {}) => {
    return argv.reduce((prev, curr, i) => {

        if (i < skip) return prev

        return curr.includes('=') ? {...prev, ...parseArgument(curr)} : {...prev, ...{[curr]: null}}
    }, {})
}

module.exports = {
    getArguments,
    parseArgument
}