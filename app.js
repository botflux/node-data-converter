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

const args = argsUtil.getArguments()

const { inputPath, mapPath, outputPath, options = {} } = args
//console.log(inputPath, mapPath, outputPath, options)

// TODO: Check if files exists

const mapJson = fileUtil.getFileContent(mapPath)
const map = JSON.parse(mapJson).map

// TODO: Check map integrity

console.log(map)

const { fields = [] } = map

let a = []

let rowIndex = 2

fileUtil.readCSV(inputPath, data => {

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
        if (type !== typeof afterFiltered) {
            throw `The result type of ${name} at the row ${rowIndex}; The type expected for this field is ${type} but ${typeof afterFiltered} given.`
        }


        let o = { [name]: afterFiltered}

        rowIndex ++;
        return {
            ...prev,
            ...o
        }
    }, {})

    a = [...a, ...[row]]
}, () => console.log(a))



