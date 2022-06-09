import { execSync } from 'child_process';
import { writeFileSync, readFileSync, createWriteStream } from 'fs';
import { createInterface } from 'readline';
import standardChangelog from 'standard-changelog';
import pkg, { version as _version } from '../package.json';

const VERSION_REG = /\d+\.\d+\.\d+/;

function updateVersion() {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });

    rl.setPrompt(`当前 package.json 版本号为: ${_version}\n请输入本次要发布的版本号:(可按回车跳过)\n`);
    rl.prompt();

    // eslint-disable-next-line consistent-return
    rl.on('line', (input) => {
      let newVersion = '';
      if (!input) {
        newVersion = _version.replace(/(\d+\.\d+\.)(\d+)/, (version, $1, $2) => $1 + (Number($2) + 1));
      } else if (!VERSION_REG.test(input)) {
        console.log('\u001B[31m%s\u001B[0m', '\n⚡ 不要搞事年轻人，请输入正确版本号格式!\n');
        rl.prompt();
        return;
      } else {
        newVersion = input;
      }
      const newPkg = JSON.stringify({ ...pkg, version: newVersion }, null, 2);
      writeFileSync('package.json', `${newPkg}\n`, 'utf8');
      console.log('\u001B[32m%s\u001B[0m', '\n🎉 good job! package.json 文件已更新.\n');
      rl.close();
    });

    rl.on('close', resolve);
  });
}

function getLastChangeLogCommit() {
  const gitCommand = 'git blame CHANGELOG.md';
  const changeLogCommits = execSync(gitCommand, {
    cwd: process.cwd(),
    encoding: 'utf-8',
  }).split('\n');

  return changeLogCommits.find(cmt => VERSION_REG.test(cmt))?.slice(0, 8);
}

function getGitCommitMap(lastCommit) {
  const gitCommand = `git log --pretty=format:"%H:%cn" ${lastCommit}..HEAD`;
  const gitLogMap = execSync(gitCommand, { cwd: process.cwd(), encoding: 'utf-8' }).toString();
  writeFileSync('.gitlogmap', gitLogMap, 'utf8');
}

async function updateChangeLog() {
  await updateVersion();

  console.log('\u001B[32m%s\u001B[0m', '正在生成 changeLog... \n');

  const lastCommit = getLastChangeLogCommit();
  const initialChangelogStr = readFileSync('CHANGELOG.md', 'utf8');

  const pageDataStr = `${initialChangelogStr.match(/---[\S\s]+---/)[0]}\n`;
  const data = initialChangelogStr.split(/---[\S\s]+---/);
  data.unshift(pageDataStr);

  new Promise((resolve) => {
    standardChangelog({}, null, { from: lastCommit, to: 'HEAD' })
      .on('data', (chunk) => {
        let changeLogStr = chunk.toString().trim();
        changeLogStr = changeLogStr.replace(/\(([\d-]+)\)/g, '`$1`');
        changeLogStr = changeLogStr.replace(/^#\s/g, '## ').trim();
        data.splice(1, 0, `${changeLogStr}\n`);
      })
      .on('end', resolve);
  }).then(() => {
    getGitCommitMap(lastCommit);
    const writeStream = createWriteStream('CHANGELOG.md', 'utf8');
    writeStream.write(data.join('\n'));
    writeStream.end();

    console.log('\u001B[32m%s\u001B[0m', '已生成最新 changeLog... 请打开 CHANGELOG.md 确认');
  });
}

updateChangeLog();
