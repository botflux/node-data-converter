const { createReadStream } = require('fs')
const csv = require('fast-csv')
const resolveCSV = require('./index')

createReadStream('test/input.csv')
.pipe(csv({
    delimiter: ';',
    headers: true
}))
.pipe(resolveCSV({
    fields: [
        {
            name: 'FullName',
            columns: [ 'first_name', 'last_name' ],
            concatenation: ' '
        }, {
            name: 'FirstName',
            columns: [ 'names' ],
            afterFilters: [
                { name: 'getWord', args: { word: 0 } }
            ]
        }, {
            name: 'LastName',
            columns: [ 'last_name' ]
        }
    ]
}))
.on('data', (data) => {
    console.log(data)
})
.on('end', () => console.log('end'))