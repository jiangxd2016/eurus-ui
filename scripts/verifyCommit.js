// Invoked on the commit-msg git hook by yorkie.

import fs from 'fs';
const args = process.argv.slice(2);
const msg = fs.readFileSync(args[0], 'utf-8')
  .trim();

console.log(console.log('Verifying commit message...', msg));

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    ` ERROR invalid commit message format.
    \n
    'Proper commit message format is required for automated changelog generation. Examples:\n'
    'feat(compiler): add \'comments\' option'
    'fix(v-model): handle events on blur (close #28)'
     \n
     See .github/commit-convention.md for more details.\n`
  );
  process.exit(1);
}
