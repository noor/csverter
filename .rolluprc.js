/* eslint-env node */
const { resolve } = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const includeLicense = require('rollup-plugin-license');
const uglify = require('rollup-plugin-uglify-es');
const packageInfo = require('./package');

const shouldMinify = process.env.MINIFY;
const shouldBuildAsCommonJsModule = process.env.TARGET === 'nodejs';
const BUILD_DIR = shouldBuildAsCommonJsModule ? 'build' : 'dist';
const excludedDependencies = shouldBuildAsCommonJsModule ? Object.keys(packageInfo.dependencies) : [];
const outputFileBaseName = shouldBuildAsCommonJsModule ? 'index' : packageInfo.name;
const outputFileExtension = shouldMinify ? '.min.js' : '.js';
const outputFileName = outputFileBaseName + outputFileExtension;

const licenseTemplate = `
    ${outputFileName}

    <%= pkg.name %> v<%= pkg.version %>
    <%= pkg.description %>
    <%= pkg.repository.url %>

    Copyright (c) <%= moment().format('YYYY') %>, <%= pkg.author %>

    This code is licensed under the <%= pkg.license %> license found
    in the LICENSE file in the root directory of the source tree.
`;

module.exports = {
    input: packageInfo.module,
    external: excludedDependencies,
    output: {
        file: resolve(BUILD_DIR, outputFileName),
        name: packageInfo.name,
        format: shouldBuildAsCommonJsModule ? 'cjs' : 'umd'
    },
    plugins: [
        nodeResolve(),
        shouldMinify ? uglify() : () => {},
        includeLicense({ banner: licenseTemplate }),
    ]
};
