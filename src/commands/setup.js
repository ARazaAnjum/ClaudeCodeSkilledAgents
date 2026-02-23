'use strict';

const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const fse = require('fs-extra');

const { getSkills, getSkillDescription, filterSkills } = require('../utils/skills');
const { printHeader, printResult, printSummary } = require('../utils/display');
const { SKILLS_DIR, AI_WORKFLOW_DIR, CLAUDE_MD, CURSOR_MDC } = require('../config');

// ── Conflict resolution ───────────────────────────────────────────────────────
async function resolveConflict(name) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `${chalk.yellow('⚠')} "${name}" already exists. What would you like to do?`,
      choices: [
        { name: 'Overwrite  — replace the existing folder', value: 'overwrite' },
        { name: 'Skip       — leave the existing folder untouched', value: 'skip' },
        { name: 'Rename     — copy with a numeric suffix', value: 'rename' },
      ],
    },
  ]);
  return action;
}

// ── Find a non-colliding path ─────────────────────────────────────────────────
async function findFreeDest(dest) {
  let suffix = 1;
  let candidate = `${dest}-${suffix}`;
  while (await fse.pathExists(candidate)) {
    suffix += 1;
    candidate = `${dest}-${suffix}`;
  }
  return candidate;
}

// ── Copy with spinner ─────────────────────────────────────────────────────────
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

// ── Generic single-file/folder copy with conflict handling ────────────────────
async function copySingle(label, src, dest, options) {
  if (options.dryRun) {
    console.log(`  ${chalk.cyan('◎')} ${chalk.cyan(label)}  →  ${chalk.dim(dest)}  ${chalk.cyan('[dry-run]')}`);
    return;
  }

  const exists = await fse.pathExists(dest);

  if (exists && !options.force) {
    const action = await resolveConflict(label);
    if (action === 'skip') {
      console.log(`  ${chalk.gray('○')} ${chalk.gray(label)}  (skipped – already exists)`);
      return;
    }
    if (action === 'rename') {
      const freeDest = await findFreeDest(dest);
      const { ok, error } = await performCopy(src, freeDest);
      if (ok) console.log(`  ${chalk.yellow('↪')} ${chalk.yellow(label)}  →  ${chalk.dim(freeDest)}  ${chalk.yellow('(renamed)')}`);
      else    console.log(`  ${chalk.red('✗')} ${chalk.red(label)}: ${chalk.red(error)}`);
      return;
    }
  }

  const { ok, error } = await performCopy(src, dest);
  if (ok) console.log(`  ${chalk.green('✓')} ${chalk.green(label)}  →  ${chalk.dim(dest)}`);
  else    console.log(`  ${chalk.red('✗')} ${chalk.red(label)}: ${chalk.red(error)}`);
}

// ── Copy selected skills ──────────────────────────────────────────────────────
async function copySkills(skillsDir, skills, options) {
  if (options.search) {
    skills = filterSkills(skills, options.search);
    if (skills.length === 0) {
      console.log(chalk.yellow(`  No skills match "${options.search}".`));
      return;
    }
    console.log(chalk.dim(`  Showing ${skills.length} skill(s) matching "${options.search}"\n`));
  }

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

// ── Cursor flow ───────────────────────────────────────────────────────────────
async function cursorFlow(projectRoot, options) {
  // Step 1: copy cursor.mdc
  console.log(chalk.bold('\nStep 1 — cursor.mdc (Project Intelligence)'));
  console.log(chalk.dim(`  Tells Cursor AI how to discover and use your skills and rules.\n`));
  await copySingle('cursor.mdc', CURSOR_MDC, path.join(projectRoot, 'cursor.mdc'), options);

  // Step 2: base rules
  console.log('\n' + chalk.bold('Step 2 — Base rules & standards'));
  console.log(chalk.dim(`  Copies the ${chalk.white('ai-workflow/')} folder (coding rules + process files).\n`));

  const { copyRules } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copyRules',
      message: 'Copy base rules and standards (ai-workflow) into the project?',
      default: true,
    },
  ]);

  if (copyRules) {
    await copySingle('ai-workflow', AI_WORKFLOW_DIR, path.join(projectRoot, 'ai-workflow'), options);
  } else {
    console.log(chalk.dim('  Skipped.\n'));
  }

  // Step 3: ask if user wants skills
  console.log('\n' + chalk.bold('Step 3 — Skills'));
  console.log(chalk.dim(`  Copies selected skill folders into ${chalk.white('ai-workflow/skills/')} in your project.\n`));

  const { copySkillsChoice } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copySkillsChoice',
      message: 'Do you want to copy skills into ai-workflow/skills/?',
      default: true,
    },
  ]);

  if (!copySkillsChoice) {
    console.log(chalk.dim('  Skipped.\n'));
    return;
  }

  const skillsDir = path.join(projectRoot, 'ai-workflow', 'skills');

  let skills;
  try {
    skills = getSkills();
  } catch (err) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }

  if (skills.length === 0) {
    console.log(chalk.yellow('  No skills found.'));
    return;
  }

  await copySkills(skillsDir, skills, options);
}

// ── Claude flow ───────────────────────────────────────────────────────────────
async function claudeFlow(projectRoot, options) {
  const skillsDir = path.join(projectRoot, 'skills');

  // Step 1: copy CLAUDE.md
  console.log(chalk.bold('\nStep 1 — CLAUDE.md (Project Intelligence)'));
  console.log(chalk.dim(`  Tells Claude how to discover and use your skills and rules.\n`));
  await copySingle('CLAUDE.md', CLAUDE_MD, path.join(projectRoot, 'CLAUDE.md'), options);

  // Step 2: base rules
  console.log('\n' + chalk.bold('Step 2 — Base rules & standards'));
  console.log(chalk.dim(`  Copies the ${chalk.white('ai-workflow/')} folder (coding rules + process files).\n`));

  const { copyRules } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copyRules',
      message: 'Copy base rules and standards (ai-workflow) into the project?',
      default: true,
    },
  ]);

  if (copyRules) {
    await copySingle('ai-workflow', AI_WORKFLOW_DIR, path.join(projectRoot, 'ai-workflow'), options);
  } else {
    console.log(chalk.dim('  Skipped.\n'));
  }

  // Step 3: ask if user wants skills
  console.log('\n' + chalk.bold('Step 3 — Skills'));
  console.log(chalk.dim(`  Copies selected skill folders into ${chalk.white('skills/')} in your project.\n`));

  const { copySkillsChoice } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copySkillsChoice',
      message: 'Do you want to copy skills into skills/?',
      default: true,
    },
  ]);

  if (!copySkillsChoice) {
    console.log(chalk.dim('  Skipped.\n'));
    return;
  }

  let skills;
  try {
    skills = getSkills();
  } catch (err) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }

  if (skills.length === 0) {
    console.log(chalk.yellow('  No skills found.'));
    return;
  }

  await copySkills(skillsDir, skills, options);
}

// ── Main command handler ──────────────────────────────────────────────────────
module.exports = async function setupCommand(options) {
  const projectRoot = process.cwd();

  printHeader('AI Workflow Skills Setup');

  // ── Choose agent ────────────────────────────────────────────────────────────
  const { agent } = await inquirer.prompt([
    {
      type: 'list',
      name: 'agent',
      message: 'Which AI agent are you using?',
      choices: [
        { name: `${chalk.bold('Cursor')}   ${chalk.dim('— copies cursor.mdc + ai-workflow rules')}`, value: 'cursor' },
        { name: `${chalk.bold('Claude')}   ${chalk.dim('— copies CLAUDE.md + skills')}`, value: 'claude' },
      ],
    },
  ]);

  if (agent === 'cursor') {
    await cursorFlow(projectRoot, options);
  } else {
    await claudeFlow(projectRoot, options);
  }

  // ── Farewell ────────────────────────────────────────────────────────────────
  console.log();
  console.log(chalk.bold.cyan('  Code ends. Intelligence continues.'));
  console.log();
};
