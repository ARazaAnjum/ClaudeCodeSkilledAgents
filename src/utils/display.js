'use strict';

const chalk = require('chalk');

// ── Icons ─────────────────────────────────────────────────────────────────────
const ICONS = {
  success: chalk.green('✓'),
  error:   chalk.red('✗'),
  warning: chalk.yellow('⚠'),
  skip:    chalk.gray('○'),
  dry:     chalk.cyan('◎'),
  rename:  chalk.yellow('↪'),
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function printHeader(title) {
  const bar = chalk.bold.cyan('━'.repeat(52));
  console.log('\n' + bar);
  console.log(chalk.bold.cyan(`  ${title}`));
  console.log(bar + '\n');
}

function printResult(result) {
  const destShort = chalk.dim(result.dest);

  switch (result.status) {
    case 'copied':
      console.log(`  ${ICONS.success} ${chalk.green(result.skillName)}  →  ${destShort}`);
      break;
    case 'skipped':
      console.log(`  ${ICONS.skip} ${chalk.gray(result.skillName)}  (skipped – already exists)`);
      break;
    case 'dry-run':
      console.log(`  ${ICONS.dry} ${chalk.cyan(result.skillName)}  →  ${destShort}  ${chalk.cyan('[dry-run]')}`);
      break;
    case 'renamed':
      console.log(`  ${ICONS.rename} ${chalk.yellow(result.skillName)}  →  ${destShort}  ${chalk.yellow('(renamed)')}`);
      break;
    case 'error':
      console.log(`  ${ICONS.error} ${chalk.red(result.skillName)}: ${chalk.red(result.error)}`);
      break;
  }
}

function printSummary(results) {
  const counts = {
    copied:  results.filter(r => r.status === 'copied').length,
    renamed: results.filter(r => r.status === 'renamed').length,
    skipped: results.filter(r => r.status === 'skipped').length,
    errors:  results.filter(r => r.status === 'error').length,
    dryRun:  results.filter(r => r.status === 'dry-run').length,
  };

  const bar = chalk.bold('─'.repeat(52));
  console.log('\n' + bar);

  if (counts.dryRun > 0) {
    console.log(chalk.cyan(`  ${counts.dryRun} skill(s) would be copied  [dry-run — nothing written]`));
  } else {
    if (counts.copied  > 0) console.log(chalk.green(`  ${ICONS.success} ${counts.copied} skill(s) copied`));
    if (counts.renamed > 0) console.log(chalk.yellow(`  ${ICONS.rename} ${counts.renamed} skill(s) renamed and copied`));
    if (counts.skipped > 0) console.log(chalk.gray(`  ${ICONS.skip} ${counts.skipped} skill(s) skipped`));
    if (counts.errors  > 0) console.log(chalk.red(`  ${ICONS.error} ${counts.errors} error(s) – check output above`));
    if (Object.values(counts).every(c => c === 0)) {
      console.log(chalk.gray('  Nothing to do.'));
    }
  }

  console.log(bar + '\n');
}

module.exports = { ICONS, printHeader, printResult, printSummary };
