const fs = require('fs')
const csv = require('fast-csv')

/**
 * Returns the content of the file with the specified path.
 * 
 * @param {String} path The file path
 */
const getFileContent = (path) => {
    return fs.readFileSync(path)
}

/**
 * Reads a CSV as a stream and performs an action for each row.
 * 
 * @param {String} path Path to CSV
 * @param {Callable} operation The operation for each row
 * @param {Callable} end The operation when all rows are processed
 */
const readCSV = (path, operation, end = () => {}) => {
    fs
        .createReadStream(path)
        .pipe(csv({
            delimiter: ';',
            headers: true
        }))
        .on('data', data => {
            operation(data)
        })
        .on('end', end)
}

module.exports = {
    getFileContent,
    readCSV
}