const mergeColumns = require('./merge-columns')

describe('merge-columns', () => {
    it ('merges objects fields (happy path)', () => {
        expect(mergeColumns(
            [ 'firstName', 'lastName' ],
            ' ',
            { firstName: 'John', lastName: 'Doe' }
        )).toBe('John Doe')
    })
})