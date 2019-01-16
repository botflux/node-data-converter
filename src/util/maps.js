const filters = require('../filters')

const getFilter = (name) => {
    return filters[name]
}

module.exports = {
    getFilter
}