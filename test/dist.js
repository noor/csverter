/* eslint import/no-unresolved: [2, { ignore: ['\/(dist|build)\/?'] }] */
import * as build from '../build';
import * as dist from '../dist/csverter';
import * as distmin from '../dist/csverter.min';
import runTestSuite from './runner';

const testModules = { build, dist, distmin };
Object.keys(testModules).forEach((testModuleName) => runTestSuite(testModuleName, testModules[testModuleName]));
