'use strict';

const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const fse = require('fs-extra');

const { getSkills, getSkillDescription, filterSkills } = require('../utils/skills');
const { printHeader, printResult, printSummary } = require('../utils/display');
const { SKILLS_DIR, CURSOR_DIR } = require('../config');

// ── Conflict resolution for a single item ─────────────────────────────────────
async function resolveConflict(name) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `${chalk.yellow('⚠')} "${name}" already exists. What would you like to do?`,
      choices: [
        { name: 'Overwrite  — replace the existing folder', value: 'overwrite' },
        { name: 'Skip       — leave the existing folder untouched', value: 'skip' },
        { name: 'Rename     — copy with a numeric suffix (e.g. react-expert-1)', value: 'rename' },
      ],
    },
  ]);
  return action;
}

// ── Find a non-colliding destination path ─────────────────────────────────────
async function findFreeDest(dest) {
  let suffix = 1;
  let candidate = `${dest}-${suffix}`;
  while (await fse.pathExists(candidate)) {
    suffix += 1;
    candidate = `${dest}-${suffix}`;
  }
  return candidate;
}

// ── Copy a path with a spinner ────────────────────────────────────────────────
async function performCopy(src, dest) {
  const spinner = ora({ text: 'Copying…', color: 'cyan' }).start();
  try {
    await fse.copy(src, dest, { overwrite: true });
    spinner.stop();
    return { ok: true };
  } catch (err) {
    spinner.stop();
    return { ok: false, error: err.message };
  }
}

// ── Step 1: copy .cursor folder to project root ───────────────────────────────
async function copyCursorFolder(projectRoot, options) {
  const dest = path.join(projectRoot, '.cursor');

  if (options.dryRun) {
    console.log(`  ${chalk.cyan('◎')} ${chalk.cyan('.cursor')}  →  ${chalk.dim(dest)}  ${chalk.cyan('[dry-run]')}`);
    return;
  }

  const exists = await fse.pathExists(dest);

  if (exists && !options.force) {
    const action = await resolveConflict('.cursor');
    if (action === 'skip') {
      console.log(`  ${chalk.gray('○')} ${chalk.gray('.cursor')}  (skipped – already exists)`);
      return;
    }
    if (action === 'rename') {
      const freeDest = await findFreeDest(dest);
      const { ok, error } = await performCopy(CURSOR_DIR, freeDest);
      if (ok) console.log(`  ${chalk.yellow('↪')} ${chalk.yellow('.cursor')}  →  ${chalk.dim(freeDest)}  ${chalk.yellow('(renamed)')}`);
      else    console.log(`  ${chalk.red('✗')} ${chalk.red('.cursor')}: ${chalk.red(error)}`);
      return;
    }
    // overwrite falls through
  }

  const { ok, error } = await performCopy(CURSOR_DIR, dest);
  if (ok) console.log(`  ${chalk.green('✓')} ${chalk.green('.cursor')}  →  ${chalk.dim(dest)}`);
  else    console.log(`  ${chalk.red('✗')} ${chalk.red('.cursor')}: ${chalk.red(error)}`);
}

// ── Step 2: copy selected skills into <root>/skills/ ─────────────────────────
async function copySkills(skillsDir, skills, options) {
  // Optional name filter
  if (options.search) {
    skills = filterSkills(skills, options.search);
    if (skills.length === 0) {
      console.log(chalk.yellow(`  No skills match "${options.search}".`));
      return;
    }
    console.log(chalk.dim(`  Showing ${skills.length} skill(s) matching "${options.search}"\n`));
  }

  // Select
  let selected;
  if (options.all) {
    selected = skills;
    console.log(chalk.dim(`  Selecting all ${skills.length} available skills…\n`));
  } else {
    const choices = skills.map(name => {
      const desc = getSkillDescription(name);
      return {
        name:  desc
          ? `${chalk.bold(name.padEnd(32))}${chalk.dim(desc)}`
          : chalk.bold(name),
        value: name,
        short: name,
      };
    });

    const { picked } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'picked',
        message: 'Select one or more skills to copy:',
        choices,
        pageSize: 20,
        loop: false,
        validate(answer) {
          return answer.length > 0 || 'Please select at least one skill (use SPACE to toggle).';
        },
      },
    ]);
    selected = picked;
  }

  if (selected.length === 0) {
    console.log(chalk.yellow('\n  No skills selected.'));
    return;
  }

  // Confirm (skip for --all / --dry-run)
  if (!options.all && !options.dryRun) {
    const { ok } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'ok',
        message: `Copy ${chalk.bold(String(selected.length))} skill(s) into ${chalk.cyan(skillsDir + path.sep)}?`,
        default: true,
      },
    ]);
    if (!ok) {
      console.log(chalk.yellow('\n  Skipped skills copy.'));
      return;
    }
  }

  console.log();

  if (!options.dryRun) await fse.ensureDir(skillsDir);

  const results = [];

  for (const skillName of selected) {
    const src  = path.join(SKILLS_DIR, skillName);
    const dest = path.join(skillsDir, skillName);

    if (options.dryRun) {
      const result = { status: 'dry-run', skillName, dest };
      results.push(result);
      printResult(result);
      continue;
    }

    const exists = await fse.pathExists(dest);

    if (exists && !options.force) {
      const action = await resolveConflict(skillName);

      if (action === 'skip') {
        const result = { status: 'skipped', skillName, dest };
        results.push(result);
        printResult(result);
        continue;
      }

      if (action === 'rename') {
        const freeDest = await findFreeDest(dest);
        const { ok, error } = await performCopy(src, freeDest);
        const result = ok
          ? { status: 'renamed', skillName, dest: freeDest }
          : { status: 'error',  skillName, dest: freeDest, error };
        results.push(result);
        printResult(result);
        continue;
      }
    }

    const { ok, error } = await performCopy(src, dest);
    const result = ok
      ? { status: 'copied', skillName, dest }
      : { status: 'error',  skillName, dest, error };
    results.push(result);
    printResult(result);
  }

  printSummary(results);

  if (results.some(r => r.status === 'error')) process.exit(1);
}

// ── Main command handler ──────────────────────────────────────────────────────
module.exports = async function copyCommand(options) {
  const projectRoot = process.cwd();
  const skillsDir   = path.join(projectRoot, 'skills');

  printHeader('ClaudeCode Skills Setup');

  // ── Step 1: base rules (.cursor) ────────────────────────────────────────────
  console.log(chalk.bold('Step 1 — Base rules & process files'));
  console.log(chalk.dim(`  Copies the ${chalk.white('.cursor/')} folder into your project root.\n`));

  const { copyRules } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copyRules',
      message: 'Copy base rules and process files (.cursor) into the project root?',
      default: true,
    },
  ]);

  if (copyRules) {
    await copyCursorFolder(projectRoot, options);
  } else {
    console.log(chalk.dim('  Skipped.\n'));
  }

  // ── Step 2: skills ───────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold('Step 2 — Skills'));
  console.log(chalk.dim(`  Copies selected skill folders into ${chalk.white('skills/')} in your project.\n`));

  let skills;
  try {
    skills = getSkills();
  } catch (err) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }

  if (skills.length === 0) {
    console.log(chalk.yellow('  No skills found.'));
    process.exit(0);
  }

  const { copySkillsAnswer } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copySkillsAnswer',
      message: 'Do you want to copy specific skills into your project?',
      default: true,
    },
  ]);

  if (copySkillsAnswer) {
    await copySkills(skillsDir, skills, options);
  } else {
    console.log(chalk.dim('  Skipped.\n'));
  }

  console.log(chalk.green.bold('\nDone!\n'));
};
