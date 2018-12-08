[![Build Status](https://travis-ci.org/DavidBabel/check-flow-annotation.svg?branch=master)](https://travis-ci.org/DavidBabel/check-flow-annotation)

<!-- [![codecov](https://codecov.io/gh/DavidBabel/check-flow-annotation/branch/master/graph/badge.svg)](https://codecov.io/gh/DavidBabel/check-flow-annotation) -->

[![npm](http://img.shields.io/npm/v/check-flow-annotation.svg)](https://www.npmjs.com/package/check-flow-annotation)
[![License](https://img.shields.io/npm/l/check-flow-annotation.svg)](LICENSE)
[![Downloads/month](https://img.shields.io/npm/dm/check-flow-annotation.svg)](http://www.npmtrends.com/check-flow-annotation)

# check-flow-annotation

This is a very fast and simple package to check your flow annotation coverage over your project.

It basically test if your files all starts with a `// @flow` or `// @flow strict`.

It's made to be included in your CI to prevent to forget some type annotations. It's very fast, and allow some customisations.

```bash
# install with yarn
yarn add check-flow-annotation -D
# install with npm
npm install check-flow-annotation --save-dev

# usages in your CI config
check-flow-annotation ./my/path ./my/other/path

# with options
check-flow-annotation ./my/path --strict
check-flow-annotation --strict ./my/path # same

# exclude some paths
check-flow-annotation ./my/path --exclude='build*','.src/static/*'
check-flow-annotation ./my/path -x 'build*','.src/static/*' #same, small version
check-flow-annotation ./my/path -x 'build*' -x '.src/static/*' #same

# exclude jsx files
check-flow-annotation ./my/path --exclude='*.jsx'

# check another anotation on first line
check-flow-annotation ./my/path --check='@flow weak'
```

```bash
# help
check-flow-annotation -h

Usage: check-flow-annotation.js [options] path1 path2 path3 etc

  By default it checks every ".js", ".jsx" and ".mjs" in your project,
  but you can filter it with exclude option

  Note that options are written "--option=value"
  but short versions are written "-o value"

  --help, -h
    Displays help information about this script
    'index.js -h' or 'index.js --help'

  --version
    Displays version info
    index.js --version

  --strict, -s
    Force to check "@flow strict"

  --exclude, -x
    Allow to exclude certain paths or extensions,
                  it‘s a comma separated value
    example: 'build*','.src/static/*'
                  will be merged with default array:
                  ['node_modules*', '.git*', 'flow-typed*', '.*', '!*.+(js|jsx|mjs)']

  --check, -c
    Set a custom check
    '@flow weak' or '@no flow'

```
