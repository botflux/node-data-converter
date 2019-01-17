const assert = require('assert')
const typesUtil = require('../src/util/types')

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