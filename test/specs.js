export default
[
    {
        spec: 'returns an empty string if the input is an empty string',
        input: '',
        expectedLines: [
            '',
        ],
    },
    {
        spec: 'returns the same string if the input is a string',
        input: 'any\nstring',
        expectedLines: [
            'any\nstring',
        ],
    },
    {
        spec: 'returns an empty string if the input is null',
        input: null,
        expectedLines: [
            '',
        ],
    },
    {
        spec: 'returns an empty string if the input is undefined',
        input: undefined,
        expectedLines: [
            '',
        ],
    },
    {
        spec: 'returns an empty string if the input is an empty object',
        input: {},
        expectedLines: [
            '',
        ],
    },
    {
        spec: 'returns the key and an empty string when an object with a single property and a null value',
        input: { col: null },
        expectedLines: [
            'col',
            '',
        ],
    },
    {
        spec: 'returns the key and an empty string when an object with a single property and an empty string value',
        input: { col: '' },
        expectedLines: [
            'col',
            '',
        ],
    },
    {
        spec: 'returns the keys as column headers and the values as rows when a single json object is passed instead of an array',
        input: { x: 1, y: 2, z: 3 },
        expectedLines: [
            'x,y,z',
            '1,2,3',
        ],
    },
    {
        spec: 'normalizes the json array',
        input: [
            { col1: '1/1', col2: '2/1' },
            { col1: '1/2', col3: '3/2' },
            { col4: '4/3' },
        ],
        expectedLines: [
            'col1,col2,col3,col4',
            '1/1,2/1,,',
            '1/2,,3/2,',
            ',,,4/3',
        ],
    },
    {
        spec: 'escapes double quotes in keys and wraps the key with double quotes',
        input: { 'col "one': 1, 'col "two"': 2, "col 'three'": 3 },
        expectedLines: [
            '"col ""one","col ""two""",col \'three\'',
            '1,2,3',
        ],
    },
    {
        spec: 'escapes double quotes in values and wraps the key with double quotes',
        input: { col1: '"', col2: '""' },
        expectedLines: [
            'col1,col2',
            '"""",""""""',
        ],
    },
    {
        spec: 'wraps keys and values in double quotes when they contain a tab character',
        input: { 'key\twith\ttabs': 'value\twith\ttabs' },
        expectedLines: [
            '"key\twith\ttabs"',
            '"value\twith\ttabs"',
        ],
    },
    {
        spec: 'wraps keys and values in double quotes when they contain a carriage return character',
        input: { 'key with\rcarriage\rreturns': 'value with\rcarriage\rreturns' },
        expectedLines: [
            '"key with\rcarriage\rreturns"',
            '"value with\rcarriage\rreturns"',
        ],
    },
    {
        spec: 'wraps keys and values in double quotes when they contain a line separator',
        input: {
            'key with//line//separator': 'value with//line//separator',
            'key2 with//line//separator': 'value with//line//separator',
        },
        settings: { lineSeparator: '//' },
        expectedLines: [
            '"key with//line//separator","key2 with//line//separator"',
            '"value with//line//separator","value with//line//separator"',
        ],
    },
    {
        spec: 'ends with the expected value when the line separator is more than one character long',
        input: { a: 1, b: 2 },
        settings: { lineSeparator: '---' },
        expectedLines: [
            'a,b',
            '1,2',
        ],
    },
    {
        spec: 'wraps keys and values in double quotes when they contain a the field separator',
        input: {
            'key.with.field.separator': 'value.with.field.separator',
            'key2.with.field.separator': 'value2.with.field.separator',
        },
        settings: { fieldSeparator: '.' },
        expectedLines: [
            '"key.with.field.separator"."key2.with.field.separator"',
            '"value.with.field.separator"."value2.with.field.separator"',
        ],
    },
    {
        spec: 'converts null values to empty strings',
        input: [
            { col1: null, col2: null },
            { col1: undefined, col2: '' },
        ],
        expectedLines: [
            'col1,col2',
            ',',
            ',',
        ],
    },
    {
        spec: 'converts null values to empty strings',
        input: { col1: null, col2: null },
        expectedLines: [
            'col1,col2',
            ',',
        ],
    },
    {
        spec: 'converts non-scalar values to strings',
        input: { col1: {a: 1, b: 2}, col2: [1, 2, 3], col3: function(){}, col4: undefined },
        expectedLines: [
            'col1,col2,col3,col4',
            '"{""a"": 1, ""b"": 2}","[1, 2, 3]",function(){},',
        ],
    },
    {
        spec: 'preserves leading and trailing spaces in output keys and values',
        input: [
            { '      col 1': '  value 1 ' },
            { 'col 1  ': ' value 2  ' },
            { '      col 1': '   ' },
        ],
        expectedLines: [
            '      col 1,col 1  ',
            '  value 1 ,',
            ', value 2  ',
            '   ,',
        ],
    },
];
