// Invoked on the commit-msg git hook by yorkie.

import fs from 'fs';
import chalk from 'chalk';
const args = process.argv.slice(2);
const msg = fs.readFileSync(args[0], 'utf-8')
  .trim();

console.log(chalk.green('Verifying commit message...', msg));

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      'invalid commit message format.'
    )}\n\n`
      + chalk.red(
        '  Proper commit message format is required for automated changelog generation. Examples:\n\n'
      )
      + `    ${chalk.green('feat(compiler): add \'comments\' option')}\n`
      + `    ${chalk.green(
        'fix(v-model): handle events on blur (close #28)'
      )}\n\n`
      + chalk.red('  See .github/commit-convention.md for more details.\n')
  );
  process.exit(1);
}
