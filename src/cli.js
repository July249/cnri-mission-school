#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.name('My CLI').description('My CLI description');

program.command('todo')
    .description('Add a new todo to Things app')
    .argument('<todo>', 'todo text to add')
    .option('-t, --today', 'is this for today?')
    .action((todo, options) => {
        console.log('todo!', { todo, options});
    });

program.parse();

// when you type this in terminal: yarn run hello world
// process.argv[0] => node interpreter (ex. /usr/local/bin/node)
// process.argv[1] => path to this file (ex. /Users/username/Projects/CLI/src/cli.js)
// process.argv[2] => first argument, command (ex. hello)
// process.argv[3] => second argument, parameter (ex. world)
