'use strict';

const chalk = require('chalk');
const { getSkills, getSkillDescription, filterSkills } = require('../utils/skills');
const { printHeader } = require('../utils/display');

module.exports = function listCommand(options) {
  printHeader('Available ClaudeCode Skills');

  let skills;
  try {
    skills = getSkills();
  } catch (err) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }

  if (options.search) {
    skills = filterSkills(skills, options.search);
    if (skills.length === 0) {
      console.log(chalk.yellow(`No skills match "${options.search}".`));
      return;
    }
    console.log(chalk.dim(`Showing ${skills.length} skill(s) matching "${options.search}"\n`));
  }

  skills.forEach((name, i) => {
    const desc = getSkillDescription(name);
    const idx  = chalk.dim(String(i + 1).padStart(3) + '.');
    const label = chalk.bold(name.padEnd(32));
    const detail = desc ? chalk.dim(desc) : '';
    console.log(`${idx} ${label}${detail}`);
  });

  console.log(chalk.dim(`\n  Total: ${skills.length} skill(s)`));
  console.log(chalk.dim(`  Run ${chalk.cyan('skills copy')} to interactively select and copy skills.\n`));
};
