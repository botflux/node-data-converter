const { Transform } = require('stream')
const mergeColumns = require('./merge-columns')

const resolveCSV = ({ fields = [], filters }) => {
    return new Transform({
        objectMode: true,
        transform (csvRow, encoding, callback) {

            let processedRow = fields.reduce((prev, cur) => {
                const { name, columns = [], concatenation, afterFilters = [], type, value = '' }  = cur

                // if there is only one columns, we simply assign the column otherwise we merge columns with concatenation character
                // if there is no columns then we use the static value field
                let fieldResolved = (columns.length === 0) ? value : (columns.length === 1) ? csvRow[columns[0]] : mergeColumns(columns, concatenation, csvRow)

                let fieldFiltered = afterFilters.reduce(
                    (prev, cur) => {
                        let filter = filters.find(f => f.name === cur.name)

                        if (filter) {
                            return filter.process(prev, cur.args)
                        }

                        return prev
                    }, 
                    fieldResolved
                )

                return {
                    ...prev,
                    [name]: fieldFiltered
                }
            }, {})

            this.push(processedRow)
            callback()
        }
    })   
}

module.exports = resolveCSV