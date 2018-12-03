#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies,no-console */

const readDir = require('recursive-readdir');
const firstline = require('firstline');
const argv = require('argv');
const flatten = require('array-flatten');
require('colors');

function exec(inputArgs = argv) {
  const args = inputArgs
    .info(
      `Usage: check-flow-annotation.js [options] path1 path2 path3 etc

  By default it checks every ".js" and ".jsx" in your project, but you can filter it with exclude option

  Note that options are written "--option=value" but short versions are written "-o value"`
    )
    .version('v1.0')
    .option([
      {
        name: 'strict',
        short: 's',
        type: 'boolean',
        description: 'Force to check for "@flow strict"'
      },
      {
        name: 'exclude',
        short: 'x',
        type: 'list,csv',
        description:
          'Allow to exclude certain paths or extensions, it‘s a comma separated value',
        example: `example: 'build*','.src/static/*'
                will be merged with default array: ['node_modules*', '.git*', 'flow-typed*', '.*', '!*.+(js|jsx|mjs)']`
      },
      {
        name: 'check',
        short: 'c',
        type: 'string',
        description: 'Set a custom check',
        example: "'@flow weak' or '@no flow'"
      }
    ])
    .run();

  const {
    targets: argsTargets,
    options: { strict = false, check = '@flow', exclude = [] }
  } = args;

  const annotation = strict ? '@flow strict' : check;
  const checkRegexp = new RegExp(annotation);
  const targets = argsTargets.length ? argsTargets : ['./'];
  let pathsLeft = targets.length;

  const promises = [];
  const printResult = () => {
    Promise.all(promises)
      .then(results => {
        const flowMissing = results.filter(x => x);
        if (flowMissing.length === 0) {
          process.exit(0);
        } else {
          flowMissing.forEach(fm => {
            console.log(fm);
          });
          process.exit(1);
        }
        return '';
      })
      .catch(e => {
        console.error(e);
      });
  };

  const excludeDirs = [
    'node_modules*',
    '.git*',
    'flow-typed*',
    '.*',
    '!*.+(js|jsx|mjs)',
    ...flatten(exclude)
  ];

  targets.forEach(target => {
    readDir(target, excludeDirs, (err, files) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      promises.push(
        ...files.map(async file => {
          const line = await firstline(file);
          if (!checkRegexp.test(line)) {
            return `${`missing ${annotation} annotation:`.red} ${file}`;
          }
          return null;
        })
      );

      pathsLeft--;
      if (pathsLeft === 0) {
        printResult();
      }
    });
  });
}

if (process.env !== 'test') {
  exec();
}

module.exports = exec;
