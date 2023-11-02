// Invoked on the commit-msg git hook by simple-git-hooks.

import { readFileSync } from 'node:fs';

// get $1 from commit-msg script
const msgPath = process.argv[2];
const msg = readFileSync(msgPath, 'utf-8').trim();

const releaseRE = /^v\d/;
const commitRE =
	/^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/;

console.log('msg', msg);
if (!releaseRE.test(msg) && !commitRE.test(msg)) {
	console.log();
	console.error(
		` ERROR invalid commit message format.
    \n
    'Proper commit message format is required for automated changelog generation. Examples:\n'
    'feat(compiler): add \'comments\' option'
    'fix(v-model): handle events on blur (close #28)'
     \n
     See .github/commit-convention.md for more details.\n`,
	);
	process.exit(1);
}
