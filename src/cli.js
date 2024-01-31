#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.name('Mission School').description('CNRI Korea Mission School');

program.command('open')
    .description('Add a new class for CNRI Korea dev team')
    .argument('[className]', 'class name to open like m101')
    .option('-d, --directory [path]', 'set directory for class files', '.')
    .action((className, options) => {
        if (process.argv[4] === '--directory' || process.argv[4] === '-d') {
            console.log('directory option is set!');
            console.log('directory path is', options.directory);
        } else {
            console.log('directory option is not set!')
            console.log('directory path is', '.');
        }
        console.log(process.argv);
        console.log('open semester!', { className, options });
    });

program.parse();

// when you type this in terminal: yarn run hello world
// process.argv[0] => node interpreter (ex. /usr/local/bin/node)
// process.argv[1] => path to this file (ex. /Users/username/Projects/CLI/src/cli.js)
// process.argv[2] => first argument, command (ex. hello)
// process.argv[3] => second argument, parameter (ex. world)
