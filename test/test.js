const typesUtil = require('../src/util/types')
const argsUtil = require('../src/util/args')
const mapUtil = require('../src/util/maps')
const { getWord, trim } = require('../src/filters')
const filesUtil = require('../src/util/files')

describe('types util', () => {
    describe('checkType', () => {
        it('returns true when the variable type match the given type (happy path)', () => {
            expect(typesUtil.checkType('a string', 'string')).toBe(true)
        })

        it('happy path for numbers', () => {
            expect(typesUtil.checkType(45654, 'number')).toBe(true)
        })

        it('returns true if the value can be a number even if it is a string', () => {
            expect(typesUtil.checkType('4564656', 'number')).toBe(true)
        })
    })

    describe('typeIsValid', () => {
        describe('happy path', () => {
            it('should returns true', () => {
                expect(typesUtil.typeIsValid('string')).toBe(true)
            })
        })

        describe('when typeIsValid gets a valid type but with the wrong case', () => {
            it('should returns true', () => {
                expect(typesUtil.typeIsValid('String')).toBe(true)
            })
        })

        describe('when typeIsValid gets a not valid type (NotAValidType)', () => {
            it('should returns false', () => {
                expect(typesUtil.typeIsValid('NotAValidType')).toBe(false)
            })
        })
    })
})

describe('args util', () => {
    describe ('parseArgument', () => {
        describe('happy path', () => {
            it('should returns arguments as an object', () => {
                expect(
                    JSON.stringify(
                        argsUtil.parseArgument('hello=world')
                    )
                ).toBe( 
                    JSON.stringify(
                        { hello: "world" }
                    )
                )
            })
        })

        describe('when argument are not separated by "="', () => {
            it('should returns arguments as an object with null value', () => {
                expect(
                    JSON.stringify(
                        argsUtil.parseArgument('hello')
                    )
                ).toBe(
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
                expect(JSON.stringify(argsUtil.getArguments(fakeArguments))).toBe(JSON.stringify({ hello: 'world' }))
            })
        }),
        describe('when passing skip option', () => {
            it('should returns all arguments', () => {
                expect(JSON.stringify(argsUtil.getArguments(fakeArguments, { skip: 0 }))).toBe(JSON.stringify({ node: null, "path/to/file": null, hello: "world" }))
            })
        })


    })
})

describe('maps util', () => {
    describe('getFilter', () => {
        describe('happy path', () => {
            it('should returns the filter', () => {
                expect(mapUtil.getFilter('getWord')).toBe(getWord)
            })
        })

        describe('unknown filter name', () => {
            it ('should returns undefined', () => {
                expect(mapUtil.getFilter('unknownFilter')).toBe(undefined)
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
                expect(filesUtil.getExtension('filename.xml')).toBe('xml')
            })
        })

        describe('filename without extension', () => {
            it('should returns empty string', () => {
                expect(filesUtil.getExtension('filename')).toBe('')
            })
        })
    })

    describe('jsonToXml', () => {
        describe('happy path', () => {
            it('should returns the json as an xml', () => {
                expect(filesUtil.jsonToXml(JSON.stringify({ hello: 'World' }))).toBe('<hello>World</hello>')
            })
        })
    })
})

describe('filters', () => {
    describe('getWord', () => {
        describe('happy path', () => {
            it('should returns the first word', () => {
                expect(getWord('Word1 Word2', { word: 0 })).toBe('Word1')
            })
        })

        describe('when n is out of range', () => {
            it('should returns an empty string', () => {
                expect(getWord('Word1', {word: 1})).toBe('')
            })
        })
    })

    describe('trim', () => {
        describe('happy path', () => {
            it('should returns the trimmed string', () => {
                expect(trim(' a string ', { character: ' ' })).toBe('a string')
            })
        })

        describe('when trim a | (pipe)', () => {
            it ('should returns the trimmed string', () => {
                expect(trim('|a string|', { character: '|' })).toBe('a string')
            })
        })

        describe('when trim a [', () => {
            it('should trim', () => {
                expect(trim('[a string', { character: '[' })).toBe('a string')
            })
        })

        describe('when trim a ]', () => {
            it('should trim', () => {
                expect(trim(']a string', { character: ']' })).toBe('a string')
            })
        })

        describe('when string doesn\'t to be trim', () => {
            it('should not modify it', () => {
                expect(trim('a string', { character: '/'})).toBe('a string')
            })
        })
    })
})