[![Build Status](https://travis-ci.org/DavidBabel/check-flow-annotation.svg?branch=master)](https://travis-ci.org/DavidBabel/check-flow-annotation)
[![codecov](https://codecov.io/gh/DavidBabel/check-flow-annotation/branch/master/graph/badge.svg)](https://codecov.io/gh/DavidBabel/check-flow-annotation)


[![npm](http://img.shields.io/npm/v/check-flow-annotation.svg)](https://www.npmjs.com/package/check-flow-annotation)
[![License](https://img.shields.io/npm/l/check-flow-annotation.svg)](LICENSE)
[![Downloads/month](https://img.shields.io/npm/dm/check-flow-annotation.svg)](http://www.npmtrends.com/check-flow-annotation)

# check-flow-annotation

This is a very simple package to check your flow annotation coverage over your project.

This one is made to be included in your CI to prevent to forget some type annotations. It's very fast, and allow some customisations.

```bash
# install
yarn add check-flow-annotation -D
npm install check-flow-annotation --save-dev

# usages in your CI config
check-flow-annotation ./my/path ./my/other/path
check-flow-annotation ./my/path --strict
check-flow-annotation ./my/path --exclude ['build*', '.src/static/*']
check-flow-annotation ./my/path --check '@flow weak'
```

```bash
# help
check-flow-annotation -h

Usage: check-flow-annotation.js [options] path1 path2 path3 etc
  by default it checks every ".js" and ".jsx" in your project, but you can filter it with exclude option

  --help, -h
    Displays help information about this script
    'index.js -h' or 'index.js --help'

  --version
    Displays version info
    index.js --version

  --strict, -s
    Force to check for "@flow strict"

  --exclude, -x
    Allow to exclude certain paths or extensions
    example: ['build*', '.src/static/*', '*.jsx']
                will be merged with default: ['node_modules*', '.git*', 'flow-typed*', '.*', '!*.+(js|jsx)']

  --check, -c
    Set a custom check
    '@flow weak' or '@no flow'

```

