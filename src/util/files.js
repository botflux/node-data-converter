const fs = require('fs')
const csv = require('fast-csv')

const getFileContent = (path) => {
    return fs.readFileSync(path)
}

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