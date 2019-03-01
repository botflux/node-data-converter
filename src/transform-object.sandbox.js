const { createReadStream } = require('fs')
const csv = require('fast-csv')
const transformObject = require('./transform-object')

createReadStream('test/input.csv')
.pipe(csv({
    delimiter: ';',
    headers: true
}))
.pipe(transformObject({
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
        }, {
            name: 'ReversedFirstName',
            columns: [ 'first_name' ],
            afterFilters: [
                { name: 'reverse' }
            ]
        }
    ],
    filters: [
        {
            name: 'reverse',
            process (v) {
                return (Array
                    .from(v)
                    .reverse()
                    .join('')
                )
            }
        }, {
            name: 'getWord',
            process (v, { word = 0 }) {
                return v.split(' ')[word] || v
            }
        }
    ]
}))
.on('data', (data) => {
    console.log(data)
})
.on('end', () => console.log('end'))