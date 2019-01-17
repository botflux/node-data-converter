const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'

/**
 * A Collection with all the valid types.
 */
const allowedTypes = [
    STRING_TYPE,
    NUMBER_TYPE
]

/**
 * Check if the type is valid.
 * 
 * @param {String} t Type as a string
 * @returns {Boolean} typeIsValid
 */
const typeIsValid = (t) => {
    return allowedTypes.reduce((prev, curr) => {
        if (curr === t.toLowerCase()) return true

        return prev
    }, false)
}

/**
 * Check if the variable v is of type t.
 * 
 * @param {String} v Variable to test
 * @param {String} t Type as a string
 */
const checkType = (v, t) => {
    return t.toLowerCase() === typeof v
}

module.exports = {
    checkType,
    typeIsValid
}