import { execSync } from 'child_process';
import { writeFileSync, readFileSync, createWriteStream } from 'fs';
import standardChangelog from 'standard-changelog';
import { version as _version } from '../package.json';

const VERSION_REG = /\d+\.\d+\.\d+/;

function getLastChangeLogCommit() {
  const gitCommand = 'git blame CHANGELOG.md';
  const changeLogCommits = execSync(gitCommand, {
    cwd: process.cwd(),
    encoding: 'utf-8',
  }).split('\n');

  return changeLogCommits.find(cmt => VERSION_REG.test(cmt))?.slice(0, 8) ?? '';
}

function getGitCommitMap(lastCommit) {
  const gitCommand = `git log --pretty=format:"%H:%cn" ${lastCommit}..HEAD`;
  const gitLogMap = execSync(gitCommand, { cwd: process.cwd(), encoding: 'utf-8' }).toString();
  writeFileSync('.gitlogmap', gitLogMap, 'utf8');
}

async function updateChangeLog() {
  console.log('\u001B[32m%s\u001B[0m', `当前 package.json 版本号为: ${_version}\n`);
  console.log('\u001B[32m%s\u001B[0m', '正在生成 changeLog... \n');

  const lastCommit = getLastChangeLogCommit();
  const initialChangelogStr = readFileSync('CHANGELOG.md', 'utf8') || '';

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
