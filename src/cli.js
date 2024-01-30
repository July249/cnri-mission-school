#!/usr/bin/env node

const { program } = require('commander'); // commander 라이브러리를 사용하기 위해 import
const fs = require('fs'); // 파일 시스템에 접근할 수 있는 라이브러리
const path = require('path'); // 경로를 쉽게 조작하도록 도와주는 라이브러리
const inquirer = require('inquirer'); // 터미널에서 입력받는 라이브러리
const chalk = require('chalk'); // 터미널에 컬러를 넣어주는 라이브러터

const userName = ['seongmo', 'jihyeong', 'jeongyoon'];

const indexTemplate = `
  console.log('hello world');
`;

const problemTemplate = `
  # 문제

`;

const tsconfigTemplate = `
{
  "compilerOptions": {
    "target": "esnext",
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "commonjs",
    "outDir": "./dist",
  },
  "exclude": [
    "node_modules"
  ]
}
`;

// 해당 디렉토리에 파일이 존재하는지 확인하는 함수
const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

// 해당 디렉토리가 존재하지 않는다면 디렉토리를 생성하는 함수
const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((_, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      userName.forEach((name) => {
        fs.mkdirSync(`${name}/${pathBuilder}`);
      });
    }
  });
};

const makeTemplate = (directory, name) => {
  mkdirp(directory);
  const pathToTypeScriptFile = path.join(directory, `${name}.ts`);
  const pathToTSConfigFile = path.join(directory, `${name}.ts`);
  const pathToMarkdownFile = path.join(directory, `${name}.ts`);
  if (exist(pathToFile)) {
    console.error(chalk.bold.red('Already exists file'));
  } else {
    fs.writeFileSync(pathToTypeScriptFile, indexTemplate);
    fs.writeFileSync(pathToMarkdownFile, problemTemplate);
    fs.writeFileSync(pathToTSConfigFile, tsconfigTemplate);
    console.log(chalk.green(pathToFile, 'Create Complete'));
  }
};

program
  .version('0.0.1', '-v, --version')
  .name('cli');

program
  .command('template')
  .usage('--filename [filename] --path [path]')
  .description('Create template')
  .alias('tmpl')
  .option('-f, --filename [filename]', 'Enter file name:', 'index')
  .option('-d, --directory [path]', 'Enter file path:', '.')
  .action((options, command) => {
    Promise.all([userName.map((name) => {
      makeTemplate(options.directory, options.filename, name);
    }), userName.map((name) => {
      execSync('yarn tsc init')
    })]).then(() => {
      execSync('yarn install');
      console.log(chalk.rgb(128, 128, 128)('Complete! Happy Coding :)'));
    });
  });

// program
//   .action((options, command) => {
//     if (command.args.length !== 0) {
//       console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
//       program.help();
//     } else {
//       inquirer.prompt([{
//         type: 'list',
//         name: 'type',
//         message: '템플릿 종류를 선택하세요.',
//         choices: ['html', 'express-router'],
//       }, {
//         type: 'input',
//         name: 'name',
//         message: '파일의 이름을 입력하세요.',
//         default: 'index',
//       }, {
//         type: 'input',
//         name: 'directory',
//         message: '파일이 위치할 폴더의 경로를 입력하세요.',
//         default: '.',
//       }, {
//         type: 'confirm',
//         name: 'confirm',
//         message: '생성하시겠습니까?',
//       }])
//         .then((answers) => {
//           if (answers.confirm) {
//             makeTemplate(answers.type, answers.name, answers.directory);
//             console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
//           }
//         });
//     }
//   })
//   .parse(process.argv);