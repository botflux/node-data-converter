const filters = require('../filters')

/**
 * Returns the filter matching this name.
 * 
 * @param {String} name Filter name
 */
const getFilter = (name) => {
    return filters[name]
}

module.exports = {
    getFilter
}