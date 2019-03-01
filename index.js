const { Transform } = require('stream')
const mapsUtil = require('./src/util/maps')
const defaultFilters = require('./src/filters')

const mergeColumns = (columns, concatenation, csvRow) => columns.reduce(
    (prev, cur, i) => `${ prev }${ i === 0 ? '': concatenation }${csvRow[cur]}`, 
    ''
)

// console.log(mergeColumns(['firstName', 'lastName'], ' ', { 'firstName': 'Victor', 'lastName': 'Mendele' }))

const resolveCSV = ({ fields = [], filters }) => {
    console.log(filters)

    return new Transform({
        objectMode: true,
        transform (csvRow, encoding, callback) {

            // console.log(csvRow)

            let processedRow = fields.reduce((prev, cur) => {
                const { name, columns = [], concatenation, afterFilters = [], type, value = '' }  = cur

                // if there is only one columns, we simply assign the column otherwise we merge columns with concatenation character
                // if there is no columns then we use the static value field
                let fieldResolved = (columns.length === 0) ? value : (columns.length === 1) ? csvRow[columns[0]] : mergeColumns(columns, concatenation, csvRow)

                let fieldFiltered = afterFilters.reduce(
                    (prev, cur) => {
                        let filter = filters.find(f => f.name === cur.name)

                        if (filter) {
                            return filter.process(prev, filter.args)
                        }

                        return prev
                    } /* (filters[cur.name] ? filters[cur.name].call(prev, cur.args) : mapsUtil.getFilter(cur.name)(prev, cur.args)) */, 
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
module.exports.filters = defaultFilters