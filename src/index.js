import {
    compose,
    concat,
    defaultTo,
    flip,
    isEmpty,
    isNil,
    join,
    keys,
    map,
    mergeAll,
    pipe,
    props,
    replace,
    toString,
} from 'ramda';


const uniqueKeys = compose(keys, mergeAll);

function wrapWithDoubleQuotes(fieldSeparator, lineSeparator) {
    return function(x) {
        return RegExp(`(${fieldSeparator}|${lineSeparator}|"|\\t|\\r)`).test(x) ? `"${x}"` : x;
    };
}

function isScalar(x) {
    return /string|number|boolean/.test(typeof x);
}

function convertToString(x) {
    return isScalar(x) ? String(x) : toString(x);
}

function formatField(fieldSeparator, lineSeparator) {
    return pipe(
        defaultTo(''),
        convertToString,
        replace(/"/g, '""'),
        wrapWithDoubleQuotes(fieldSeparator, lineSeparator)
    );
}

function convertArrayToCsvLine(fieldSeparator, lineSeparator) {
    return pipe(
        map(formatField(fieldSeparator, lineSeparator)),
        join(fieldSeparator),
        flip(concat)(lineSeparator)
    );
}

function convertRowToCsvLine(fieldSeparator, lineSeparator, headerFields) {
    return pipe(
        props(headerFields),
        convertArrayToCsvLine(fieldSeparator, lineSeparator)
    );
}

function convertRows(fieldSeparator, lineSeparator, headerFields) {
    return pipe(
        map(convertRowToCsvLine(fieldSeparator, lineSeparator, headerFields)),
        join('')
    );
}

export const DEFAULT_FIELD_SEPARATOR = ',';
export const DEFAULT_LINE_SEPARATOR = '\n';

export function convertJsonToCsv(inputJson, {
    fieldSeparator = DEFAULT_FIELD_SEPARATOR,
    lineSeparator = DEFAULT_LINE_SEPARATOR,
} = {}) {
    if (isEmpty(inputJson) || isNil(inputJson)) {
        return '';
    }
    if (typeof inputJson === 'string') {
        return inputJson;
    }
    const inputJsonArray = Array.isArray(inputJson) ? inputJson : [inputJson];
    const headerFields = uniqueKeys(inputJsonArray);
    const headerRow = convertArrayToCsvLine(fieldSeparator, lineSeparator)(headerFields);
    const dataRows = convertRows(fieldSeparator, lineSeparator, headerFields)(inputJsonArray);
    return headerRow + dataRows.substr(0, dataRows.length - lineSeparator.length);
}
