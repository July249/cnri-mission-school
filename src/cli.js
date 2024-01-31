#!/usr/bin/env node

console.log('HELLO');
console.log(process.argv);
// when you type this in terminal: yarn run hello world
// process.argv[0] => node interpreter (ex. /usr/local/bin/node)
// process.argv[1] => path to this file (ex. /Users/username/Projects/CLI/src/cli.js)
// process.argv[2] => first argument, command (ex. hello)
// process.argv[3] => second argument, parameter (ex. world)
