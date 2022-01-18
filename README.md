#### Notes (to self):

* this code is based on [v3.3.1 of the PrivacyPass web extension](https://github.com/warren-bank/fork-crx-PrivacyPass-challenge-bypass/tree/v3.3.1)
  - the minified ES5 bundle still contained ES6+
    - which appears to come from modules:
      * `buffer`
      * `keccak`
    - which are external dependencies under *node_modules/*
    - which are imported by the [`voprf` library](https://github.com/warren-bank/fork-crx-PrivacyPass-challenge-bypass/blob/v3.3.1/src/background/crypto/voprf.js)

#### Important Configs:

* [_webpack.config.js_](./webpack.config.js)
  - "tsloader" is the name given to a rule that is used by the demo module
    * its `test` regex
      - needs to include both typescript and javascript files
    * its `exclude` regex
      - is usually: `/node_modules/`
      - needs to include a negative lookahead assertion that will include the `buffer` and `keccak` modules
      - absolute paths will contain `path.sep`, which is platform dependent and the regex needs to account for this
* [_tsconfig.json_](./tsconfig.json)
  - `allowJs` needs to be _true_
  - `checkJs` needs to be _false_

#### Notes (additional):
* [_webpack.config.js_](./webpack.config.js)
  - [`allowTsInNodeModules`](https://github.com/TypeStrong/ts-loader/blob/main/README.md#allowtsinnodemodules) is another "tsloader" option
    * is _not_ needed by this demo
    * would be very important if any npm module were to contain typescript files that need to be processed by the compiler
      - requires a whitelist that explicitly includes which files to process
