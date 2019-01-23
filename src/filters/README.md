# Filters

Filters are just function that transforms a data into another data, they allow you to format data.
This directory stores all the filters used in the app.

## Example

For example we have a filter named getWord which get a string and return the i word of the string.

```js
let str = "Jean Paul"
getWord(str, { word: 0 }) // Jean
getWord(str, { word: 1 }) // Paul
```

## Build a filter

Filters need to be defined or at least exports from filters/index.js.

### Signature

The first argument is the **value** you need to process.
The second argument is an object filled with **arguments**. Those arguments are specified in the map.json with the key args of filters.

```js
const myFilter = (value, args) => {
    ...
}
```

Filters need to return a value.