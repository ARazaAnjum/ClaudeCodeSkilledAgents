#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const pkg = require('../package.json');

program
  .name('skills')
  .description('Interactive CLI to copy ClaudeCode skills into your project')
  .version(pkg.version, '-v, --version');

// ── setup command (default) ───────────────────────────────────────────────────
program
  .command('setup', { isDefault: true })
  .description('Set up your project: copy base rules, select skills, and add CLAUDE.md')
  .option('--all', 'copy all skills without interactive prompt')
  .option('--dry-run', 'show what would be copied without actually copying')
  .option('--force', 'overwrite existing folders without asking')
  .option('--search <term>', 'filter the skill list by name before selecting')
  .action(require('../src/commands/setup'));

// ── list command ──────────────────────────────────────────────────────────────
program
  .command('list')
  .description('List all available skills')
  .option('--search <term>', 'filter by name')
  .action(require('../src/commands/list'));

program.parse(process.argv);
