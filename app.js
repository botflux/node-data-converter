/**
 * TODO: Add a check type system,
 * TODO: Add a error system
 * TODO: Doc for map
 * TODO: Test for filter
 * TODO: Doc for filter
 */

const argsUtil = require('./src/util/args')
const fileUtil = require('./src/util/files')
const mapsUtil = require('./src/util/maps')
const typesUtil = require('./src/util/types')
const messageBag = require('./src/messages/message-bag')

const args = argsUtil.getArguments()

const { inputPath, mapPath, outputPath, encoding = 'utf-8' } = args
//console.log(inputPath, mapPath, outputPath, options)

// TODO: Check if files exists

const mapJson = fileUtil.getFileContent(mapPath)
const map = JSON.parse(mapJson).map

// TODO: Check map integrity

const { fields = [] } = map

let buffer = []

let rowIndex = 2

fileUtil.readCSV(inputPath, { encoding }, data => {

    let row = fields.reduce((prev, curr) => {
        const { name, columns, concatenation, afterFilters, type } = curr

        let x = null

        // If there is only one row involved in the data resolve we simply assign it to x.
        if (columns.length === 1) {
            x = data[columns[0]]
        }
        // if the data is a composed data
        else if (columns.length > 1) {
            // Then we do a concatenation between all the the involved fields.
            // A character can be added between each element during concatenation.
            x = columns.reduce((prev, curr, i) => {
                return `${prev}${(i === 0) ? '' : concatenation}${data[curr]}`
            }, '')
        }
        // TODO: ELSE

        // if there is filters to apply after the concatenation we just execute them.
        let afterFiltered = (afterFilters !== undefined) ? afterFilters.reduce((prev, curr) => {
            return mapsUtil.getFilter(curr.name)(prev, curr.args)
        }, x) : x

        // TODO: CHECK TYPE

        /**
         * Check if the type is known.
         */
        if (!typesUtil.typeIsValid(type)) {
            messageBag.getMessageBag().addMessage(
                new messageBag.Message({
                    text: `The given type ${type} is undefined.`,
                    type: messageBag.MESSAGE_ERROR
                })
            )
        }
        
        /**
         * Check if the result type match the map field type.
         */
        if (!typesUtil.checkType(afterFiltered, type)) {
            messageBag.getMessageBag().addMessage (
                new messageBag.Message({ 
                    text: `The result type of ${name} at the row ${rowIndex}; The type expected for this field is ${type} but ${typeof afterFiltered} given.`, 
                    type: messageBag.MESSAGE_WARNING 
                })
            )
        }

        let o = { [name]: afterFiltered }

        rowIndex ++;
        return {
            ...prev,
            ...o
        }
    }, {})

    buffer = [...buffer, ...[row]]
}, () => {

    const result = {
        [map.documentRoot]: {
            [map.collectionRoot]: buffer
        }
    }

    //console.log(result)
    messageBag.getMessageBag().showMessages()
    

    fileUtil.writeFile(outputPath, JSON.stringify(result, false, 2), { encoding }, (e) => {
        if (e)
        console.log(e)
    })
})



