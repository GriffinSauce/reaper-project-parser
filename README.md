# Reaper Project Parser

A parser for for [Reaper DAW](https://www.reaper.fm/) .rpp files written in TypeScript.

The goal: facilitate JS/TS scripts and (web)apps to read the RPP file format and potentially to write back to RRP in the future as well. Stay simple and close to the RPP file structure to ensure stability with future versions of Reaper.

Features:

- Returns a a tree close to the original project file structure
- Values will be parsed as well as possible and raw values are always passed as a fallback
- Currently zero dependencies
- Output is serialisable to JSON

TODO for MVP:

- Parse values correctly
- Determine best output format
- Release to NPM

**WARNING:**

This library currently does not parse node values correctly yet and may have other errors and deficiencies, the output format _will_ change. Use at your own risk until v1.0.

If any feature is missing or you have other ideas, please [create an issue](https://github.com/GriffinSauce/reaper-project-parser/issues)!

## Development

### Watch and build

Watch and build the library on change:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `yarn build`.

### Tests

To run jest tests, use `yarn test`.

All [jest options](https://jestjs.io/docs/en/cli) are passed on, use `yarn test --watch` to run tests in watch mode.

### Structure

The folder structure of the repo:

```txt
/src
  /lib
    util1.ts
    util1.test.ts
    util2.ts
    util2.test.ts
  index.tsx
  index.test.tsx  # Tests are co-located with their subjects
/test             # Test fixtures and other test utils
  /__fixtures__
    example.rpp
.gitignore
package.json
README.md         # You are here :)
tsconfig.json
```

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `yarn size` and visualize the bundle with `yarn analyze`.

## Continuous Integration

Two GitHub Actions are implemented:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of the library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## TSDX Notes

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

### Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.
