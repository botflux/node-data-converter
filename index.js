const { Transform } = require('stream')
const mapsUtil = require('./src/util/maps')

const mergeColumns = (columns, concatenation, csvRow) => columns.reduce(
    (prev, cur, i) => `${ prev }${ i === 0 ? '': concatenation }${csvRow[cur]}`, 
    ''
)

// console.log(mergeColumns(['firstName', 'lastName'], ' ', { 'firstName': 'Victor', 'lastName': 'Mendele' }))

const resolveCSV = ({ documentRoot = 'Root', collectionRoot = 'Element', fields }) => {
    return new Transform({
        objectMode: true,
        transform (csvRow, encoding, callback) {

            // console.log(csvRow)

            let processedRow = fields.reduce((prev, cur) => {
                const { name, columns = [], concatenation, afterFilters = [], type }  = cur

                // if there is only one columns, we simply assign the column otherwise we merge columns with concatenation character
                let fieldResolved = (columns.length === 1) ? csvRow[columns[0]] : mergeColumns(columns, concatenation, csvRow)

                let fieldFiltered = afterFilters.reduce(
                    (prev, cur) => mapsUtil.getFilter(cur.name)(prev, cur.args), 
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