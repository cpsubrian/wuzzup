# Wuzzup

An experimental social node.js app.  Mainly a playground for node and 
backbone.js.

## Woefully inadequate installation instructions

1. Install node.js (I recommend the excellent nvm tool).
1. Install npm.
1. Setup mongodb on your machine.
1. Download and extract tarball of this project.
1. Run `npm install` to install all dependencies.
1. Copy 'conf-sample.js' to 'conf.js'.
1. Edit conf.js with your configuration options.

To run the app in one process use:
    node app.js

To run the app via cluster (multi-processor, auto reloading, etc.)
    node server.js

## Tests

Tests will be written and executed using vows.  Vows should be install with the
global flag (-g): `npm install vows -g'

To run the tests:
    npm test

Or:
    vows
