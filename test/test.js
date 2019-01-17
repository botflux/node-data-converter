const assert = require('assert')
const typesUtil = require('../src/util/types')

describe('types util', () => {

    describe('typeIsValid', () => {

        describe('when type is valid get a valid type (String)', () => {
            it('should returns true', () => {
                assert.equal(typesUtil.typeIsValid('string'), true)
            })
        })

        describe('when type is valid get a not valid type (NotAValidType)', () => {
            it('should returns false', () => {
                assert.equal(typesUtil.typeIsValid('NotAValidType'), false)
            })
        })

    })
    
})