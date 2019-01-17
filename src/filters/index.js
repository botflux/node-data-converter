/**
 * TODO: Add types check to filters
 */

/**
 * Returns the 'word' word of the string str
 * 
 * @param {String} str String you need to process
 * @param {{}} options Options
 * @returns {String} The string processed
 */
const getWord = (str, { word = 0 }) => {
    return str.split(' ')[word]
}

module.exports = {
    getWord
}