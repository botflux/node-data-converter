const assert = require('assert')
const typesUtil = require('../src/util/types')
const argsUtil = require('../src/util/args')
const mapUtil = require('../src/util/maps')
const { getWord, trim } = require('../src/filters')
const filesUtil = require('../src/util/files')

describe('types util', () => {

    describe('typeIsValid', () => {

        describe('when typeIsValid gets a valid type (String)', () => {
            it('should returns true', () => {
                assert.equal(typesUtil.typeIsValid('string'), true)
            })
        })

        describe('when typeIsValid gets a valid type but with the wrong case', () => {
            it('should returns true', () => {
                assert.equal(typesUtil.typeIsValid('String'), true)
            })
        })

        describe('when typeIsValid gets a not valid type (NotAValidType)', () => {
            it('should returns false', () => {
                assert.equal(typesUtil.typeIsValid('NotAValidType'), false)
            })
        })

    })
    
})

describe('args util', () => {
    describe ('parseArgument', () => {
        describe('happy path', () => {
            it('should returns arguments as an object', () => {
                assert.equal(
                    JSON.stringify(
                        argsUtil.parseArgument('hello=world')
                    ), 
                    JSON.stringify(
                        { hello: "world" }
                    )
                )
            })
        })

        describe('when argument are not separated by "="', () => {
            it('should returns arguments as an object with null value', () => {
                assert.strictEqual(
                    JSON.stringify(
                        argsUtil.parseArgument('hello')
                    ),
                    JSON.stringify({
                        hello: null
                    })
                )
            })
        })
    })

    describe('getArguments', () => {

        const fakeArguments = [
            'node',
            'path/to/file',
            'hello=world'
        ]

        describe('happy path', () => {
            it ('should returns parsed arguments', () => {
                assert.strictEqual(
                    JSON.stringify(argsUtil.getArguments(fakeArguments)),
                    JSON.stringify({
                        hello: 'world'
                    })
                )
            })
        }),
        describe('when passing skip option', () => {
            it('should returns all arguments', () => {
                assert.strictEqual(
                    JSON.stringify(argsUtil.getArguments(fakeArguments, { skip: 0 })),
                    JSON.stringify({
                        node: null,
                        "path/to/file": null,
                        hello: "world"
                    })
                )
            })
        })


    })
})

describe('maps util', () => {
    describe('getFilter', () => {
        describe('happy path', () => {
            it('should returns the filter', () => {
                assert.equal(
                    mapUtil.getFilter('getWord'),
                    getWord
                )
            })
        })

        describe('unknown filter name', () => {
            it ('should returns undefined', () => {
                assert.strictEqual(
                    mapUtil.getFilter('unknownFilter'),
                    undefined
                )
            })
        })
    })
})

describe('files utils', () => {
    describe('readCSV', () => {
    })
})

describe('filters', () => {
    describe('trim', () => {
        describe('happy path', () => {
            it('should returns the trimmed string', () => {
                assert.strictEqual(trim(' a string ', { character: ' ' }), 'a string')
            })
        })

        describe('when trim a | (pipe)', () => {
            it ('should returns the trimmed string', () => {
                assert.strictEqual(trim('|a string|', { character: '|' }), 'a string')
            })
        })

        describe('when trim a [', () => {
            it('should trim', () => {
                assert.strictEqual(trim('[a string', { character: '[' }), 'a string')
            })
        })

        describe('when trim a ]', () => {
            it('should trim', () => {
                assert.strictEqual(trim(']a string', { character: ']' }), 'a string')
            })
        })

        describe('when string doesn\'t to be trim', () => {
            it('should not modify it', () => {
                assert.strictEqual(trim('a string', { character: '/'}), 'a string')
            })
        })
    })
})