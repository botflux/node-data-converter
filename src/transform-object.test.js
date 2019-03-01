const transformObject = require('./transform-object')
const { Readable } = require('stream')

const makeReadableStream = () => {
    const readable = new Readable({
        objectMode: true
    })

    readable.push({
        firstName: 'John Mickael',
        lastName: 'Doe',
        age: 25
    })

    readable.push(null)

    return readable
}

describe('transform-object', () => {
    it ('transforms an object', done => {
        const fakeStream = makeReadableStream()

        fakeStream
            .pipe(transformObject({
                fields: [ {
                        name: 'firstName',
                        columns: [ 'firstName' ],
                        afterFilters: [
                            { name: 'getWord', args: { word: 1 } }
                        ]
                    }, {
                        name: 'lastName',
                        columns: [ 'lastName' ]
                    }, {
                        name: 'fullName',
                        columns: [ 'firstName', 'lastName' ],
                        concatenation: ' '
                    }, {
                        name: 'id',
                        value: 1
                    }
                ],
                filters: [
                    {
                        process: ( v = '', { word = 0 }) => v.split(' ') [word] || '',
                        name: 'getWord',
                        args: {
                            word: 0
                        }
                    }
                ]
            }))
            .once('data', data => {
                Object.is(data, {
                    firstName: 'Mickael',
                    lastName: 'Doe',
                    fullName: 'John Mickael Doe',
                    id: 1
                })
                done()
            })
    })
})