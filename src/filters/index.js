
const getWord = (str, { word = 0 }) => {
    return str.split(' ')[word]
}

module.exports = {
    getWord
}