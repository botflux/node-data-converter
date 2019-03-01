/**
 * Merge data from an object by passing it columns name and a concatenation character.
 * 
 * @param {[]} columns Name of fields to merge
 * @param {String} concatenation Character to use for merging columns
 * @param {{}} data Data
 */
const mergeColumns = (columns, concatenation, data) => columns.reduce(
    (prev, cur, i) => `${ prev }${ i === 0 ? '': concatenation }${data[cur]}`, 
    ''
)

module.exports = mergeColumns