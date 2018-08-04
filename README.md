CSVerter
========

A simple JSON to CSV converter.


Installation
------------

Using npm:
```
npm i csverter
```

then in your js file:
```javascript
const csverter = require('csverter');
```


or directly in your html:

```html
<script src="dist/csverter.min.js"></script>
```


Usage
-----

```javascript
var jsonData = [
    { x: 1, y: 2, z: 3 },
    { z: 4 }
];

var csv = csverter.convertJsonToCsv(jsonData);

console.log(csv);

var tabDelimitedCsv = csverter.convertJsonToCsv(jsonData, {
    // with a custom field separator - defaults to ','
    fieldSeparator: '\t',
    // with a custom line separator - defaults to '\n'
    lineSeparator: '\r\n'
});

console.log(tabDelimitedCsv);
```
