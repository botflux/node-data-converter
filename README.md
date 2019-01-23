## Map

Maps are declared is a JSON file like below.

```json
{
  "map": {
    "documentRoot": "Root",
    "collectionRoot": "Element",
    "fields": [
      {
        "name": "Year",
        "columns": ["year"],
        "type": "string"
      }, {
        "name": "FullName",
        "columns": ["first_name", "last_name"],
        "type": "string",
        "concatenation": " "
      }, {
        "name": "FirstName",
        "columns": ["names"],
        "type": "string",
        "afterFilters": [
          {
            "name": "getWord",
            "args": { "word": 0 }
          }
        ]
      }
    ]
  }
}
```

|Name|Description|Type|
|-|-|-|
|documentRoot|Defines the name of the root element, usefull when using XML.|string|
|collectionRoot|Defines the name of the collection.|string|
|documentAttributes|Defines attributes for the root element usefull for XML-based format.|Object|
|documentDeclaration|Defines declaration for the document.|Object|
|fields|Describes the fields needed in the result file|array|

### Fields

|Name|Description|Type|
|-|-|-|
|name|Defines the fields name|string
|columns|Defines columns used for constructing the field|array
|type|Defines the type of this field. The type will be used for validating the data.|string
|concatenation|Defines how columns need to be merge|string
|afterFilters|Defines which filter need to be applied on the resulting data|array

## How does it works ?

1. Takes the file and read each row
2. For each row it itirate though all map fields
3. For each map field it process specified columns
   1. Firstly it merge columns of there is multiple
   2. Secondly it apply filters defined in after filter
   3. It checks the type
4. When all rows are process it converts the content into XML.

## Commande 

Lancer le project

```shell
node app.js inputPath=/path/to/input.csv mapPath=/path/to/map.json outputPath=/path/to/output.xml
```

## TODO

- Test for files util
- Message bag
- Refactor message-bag so it can be fonctionnal