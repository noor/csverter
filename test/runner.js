/* eslint-env mocha */
import { strictEqual } from 'assert';
import specs from './specs';


function testSpecFactory({ convertJsonToCsv, DEFAULT_LINE_SEPARATOR }) {
    return function({ spec, input, settings = {}, expectedLines = [] }) {
        test(spec, function() {
            const lineSeparator = settings.hasOwnProperty('lineSeparator') ? settings.lineSeparator : DEFAULT_LINE_SEPARATOR;
            const expectedOutput = expectedLines.join(lineSeparator);
            const actualOutput = convertJsonToCsv(input, settings);
            strictEqual(expectedOutput, actualOutput);
        });
    };
}

export default function runTestSuite(testModuleName, testModule) {
    suite(`${testModuleName}: convertJsonToCsv`);
    specs.forEach(testSpecFactory(testModule));
}
