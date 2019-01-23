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

/**
 * Returns the trimed string
 * 
 * @param {String} str String you need to trim
 * @param {{}} param1 Options
 */
const trim = (str, { character = ' ' }) => {
    if (character ===']') character = '\\]'
    if (character === "\\") character = '\\\\'
    
    return str.replace(new RegExp(
        `^[${character}]+|[${character}]+$`,
        'g'
    ), '')
}

module.exports = {
    getWord,
    trim
}