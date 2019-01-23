const assert = require('assert')
const typesUtil = require('../src/util/types')
const argsUtil = require('../src/util/args')
const mapUtil = require('../src/util/maps')
const { getWord, trim } = require('../src/filters')
const filesUtil = require('../src/util/files')

describe('types util', () => {
    describe('checkType', () => {
        describe('happy path', () => {
            it('should return true', () => {
                assert.strictEqual(typesUtil.checkType('a string', 'string'), true)
            })
        })

        describe('when it receive a number', () => {
            it('should returns true', () => {
                assert.strictEqual(typesUtil.checkType(45654, 'number'), true)
            })
        })

        describe('when it receive a number as a string', () => {
            it ('should returns true', () => {
                assert.strictEqual(typesUtil.checkType('4564656', 'number'), true)
            })
        })
    })

    describe('typeIsValid', () => {
        describe('happy path', () => {
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

    describe('getExtension', () => {
        describe('happy path', () => {
            it('should returns file extension', () => {
                assert.strictEqual(filesUtil.getExtension('filename.xml'), 'xml')
            })
        })

        describe('filename without extension', () => {
            it('should returns empty string', () => {
                assert.strictEqual(filesUtil.getExtension('filename'), '')
            })
        })
    })

    describe('jsonToXml', () => {
        describe('happy path', () => {
            it('should returns the json as an xml', () => {
                assert.strictEqual(
                    filesUtil.jsonToXml(JSON.stringify({ hello: 'World' })),
                    '<hello>World</hello>'
                )
            })
        })
    })
})

describe('filters', () => {
    describe('getWord', () => {
        describe('happy path', () => {
            it('should returns the first word', () => {
                assert.strictEqual(getWord('Word1 Word2', { word: 0 }), 'Word1')
            })
        })

        describe('when n is out of range', () => {
            it('should returns an empty string', () => {
                assert.strictEqual(getWord('Word1', {word: 1}), '')
            })
        })
    })

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