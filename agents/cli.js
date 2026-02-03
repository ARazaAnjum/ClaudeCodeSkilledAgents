#!/usr/bin/env node

/**
 * ClaudeCodeSkills Agent CLI
 *
 * Command-line interface for interacting with agents
 */

const fs = require('fs');
const path = require('path');

// Load agents registry
const agentsRegistry = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'json', 'index.json'), 'utf-8')
);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function color(text, colorCode) {
  return `${colorCode}${text}${colors.reset}`;
}

// ============================================================================
// Command: list
// ============================================================================

function listAgents(filter = {}) {
  let agents = agentsRegistry;

  // Apply filters
  if (filter.role) {
    agents = agents.filter(a => a.role === filter.role);
  }
  if (filter.scope) {
    agents = agents.filter(a => a.scope === filter.scope);
  }
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    agents = agents.filter(a =>
      a.name.includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower) ||
      a.triggers.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  if (agents.length === 0) {
    console.log(color('No agents found matching your criteria.', colors.yellow));
    return;
  }

  console.log(color(`\nFound ${agents.length} agent(s):\n`, colors.bright));

  agents.forEach(agent => {
    console.log(color(agent.name, colors.cyan));
    console.log(`  ${color('Role:', colors.dim)} ${agent.role}`);
    console.log(`  ${color('Scope:', colors.dim)} ${agent.scope}`);
    console.log(`  ${color('Description:', colors.dim)} ${agent.description.substring(0, 80)}...`);
    console.log('');
  });
}

// ============================================================================
// Command: info
// ============================================================================

function showAgentInfo(agentName) {
  const agent = agentsRegistry.find(a => a.name === agentName);

  if (!agent) {
    console.log(color(`Agent "${agentName}" not found.`, colors.red));
    console.log(color('Use "list" command to see all available agents.', colors.dim));
    return;
  }

  console.log(color(`\n${agent.name}`, colors.bright + colors.cyan));
  console.log(color('='.repeat(agent.name.length), colors.cyan));
  console.log('');

  console.log(color('Description:', colors.bright));
  console.log(`  ${agent.description}`);
  console.log('');

  console.log(color('Metadata:', colors.bright));
  console.log(`  ${color('Role:', colors.dim)} ${agent.role}`);
  console.log(`  ${color('Scope:', colors.dim)} ${agent.scope}`);
  console.log(`  ${color('Output Format:', colors.dim)} ${agent.outputFormat}`);
  console.log('');

  console.log(color('Triggers:', colors.bright));
  agent.triggers.forEach(trigger => {
    console.log(`  - ${trigger}`);
  });
  console.log('');

  console.log(color('Skill Path:', colors.bright));
  console.log(`  ${agent.skillPath}`);
  console.log('');
}

// ============================================================================
// Command: search
// ============================================================================

function searchAgents(query) {
  const queryLower = query.toLowerCase();
  const matches = [];

  agentsRegistry.forEach(agent => {
    const matchedTriggers = agent.triggers.filter(t =>
      t.toLowerCase().includes(queryLower)
    );

    if (
      agent.name.includes(queryLower) ||
      agent.description.toLowerCase().includes(queryLower) ||
      matchedTriggers.length > 0
    ) {
      matches.push({
        agent,
        matchedTriggers,
        score: matchedTriggers.length * 10 + (agent.name.includes(queryLower) ? 50 : 0)
      });
    }
  });

  if (matches.length === 0) {
    console.log(color(`\nNo agents found for "${query}".`, colors.yellow));
    return;
  }

  // Sort by score
  matches.sort((a, b) => b.score - a.score);

  console.log(color(`\nFound ${matches.length} agent(s) for "${query}":\n`, colors.bright));

  matches.forEach((match, index) => {
    console.log(`${color(`${index + 1}.`, colors.dim)} ${color(match.agent.name, colors.cyan)}`);
    console.log(`   ${color('Role:', colors.dim)} ${match.agent.role} | ${color('Scope:', colors.dim)} ${match.agent.scope}`);

    if (match.matchedTriggers.length > 0) {
      console.log(`   ${color('Matched triggers:', colors.green)} ${match.matchedTriggers.join(', ')}`);
    }

    console.log('');
  });
}

// ============================================================================
// Command: stats
// ============================================================================

function showStats() {
  const roles = {};
  const scopes = {};
  const formats = {};

  agentsRegistry.forEach(agent => {
    roles[agent.role] = (roles[agent.role] || 0) + 1;
    scopes[agent.scope] = (scopes[agent.scope] || 0) + 1;
    formats[agent.outputFormat] = (formats[agent.outputFormat] || 0) + 1;
  });

  console.log(color('\nAgent Statistics:', colors.bright));
  console.log(color('='.repeat(50), colors.dim));
  console.log('');

  console.log(color('Total Agents:', colors.bright));
  console.log(`  ${agentsRegistry.length}`);
  console.log('');

  console.log(color('By Role:', colors.bright));
  Object.entries(roles)
    .sort((a, b) => b[1] - a[1])
    .forEach(([role, count]) => {
      const bar = '█'.repeat(Math.floor(count / 2));
      console.log(`  ${role.padEnd(15)} ${color(bar, colors.cyan)} ${count}`);
    });
  console.log('');

  console.log(color('By Scope:', colors.bright));
  Object.entries(scopes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([scope, count]) => {
      const bar = '█'.repeat(Math.floor(count / 2));
      console.log(`  ${scope.padEnd(15)} ${color(bar, colors.green)} ${count}`);
    });
  console.log('');

  console.log(color('By Output Format:', colors.bright));
  Object.entries(formats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([format, count]) => {
      const bar = '█'.repeat(Math.floor(count / 2));
      console.log(`  ${format.padEnd(15)} ${color(bar, colors.magenta)} ${count}`);
    });
  console.log('');
}

// ============================================================================
// Command: recommend
// ============================================================================

function recommend(scenario) {
  const recommendations = {
    'web-app': ['fullstack-guardian', 'architecture-designer', 'react-expert', 'tdd-workflow'],
    'api': ['api-designer', 'fastapi-expert', 'database-optimizer', 'test-master'],
    'frontend': ['react-expert', 'vue-expert', 'frontend-design', 'typescript-pro'],
    'backend': ['python-pro', 'fastapi-expert', 'database-optimizer', 'api-designer'],
    'devops': ['devops-engineer', 'kubernetes-specialist', 'terraform-engineer', 'monitoring-expert'],
    'testing': ['test-master', 'tdd-workflow', 'playwright-expert', 'code-reviewer'],
    'security': ['security-reviewer', 'secure-code-guardian', 'code-reviewer'],
    'architecture': ['architecture-designer', 'microservices-architect', 'api-designer'],
    'ai-ml': ['prompt-engineer', 'ml-pipeline', 'rag-architect', 'fine-tuning-expert'],
    'database': ['database-optimizer', 'postgres-pro', 'sql-pro'],
  };

  const agents = recommendations[scenario];

  if (!agents) {
    console.log(color(`\nNo recommendations for scenario "${scenario}".`, colors.yellow));
    console.log(color('\nAvailable scenarios:', colors.dim));
    Object.keys(recommendations).forEach(s => console.log(`  - ${s}`));
    return;
  }

  console.log(color(`\nRecommended agents for "${scenario}":\n`, colors.bright));

  agents.forEach((agentName, index) => {
    const agent = agentsRegistry.find(a => a.name === agentName);
    if (agent) {
      console.log(`${color(`${index + 1}.`, colors.dim)} ${color(agent.name, colors.cyan)}`);
      console.log(`   ${agent.description.substring(0, 80)}...`);
      console.log('');
    }
  });
}

// ============================================================================
// Main CLI
// ============================================================================

function showHelp() {
  console.log(color('\nClaudeCodeSkills Agent CLI', colors.bright + colors.cyan));
  console.log(color('='.repeat(50), colors.dim));
  console.log('');

  console.log(color('Usage:', colors.bright));
  console.log('  agent <command> [options]');
  console.log('');

  console.log(color('Commands:', colors.bright));
  console.log('  list [--role=<role>] [--scope=<scope>] [--search=<query>]');
  console.log('    List all agents with optional filters');
  console.log('');
  console.log('  info <agent-name>');
  console.log('    Show detailed information about a specific agent');
  console.log('');
  console.log('  search <query>');
  console.log('    Search for agents by keyword');
  console.log('');
  console.log('  stats');
  console.log('    Show agent statistics');
  console.log('');
  console.log('  recommend <scenario>');
  console.log('    Get agent recommendations for common scenarios');
  console.log('    Scenarios: web-app, api, frontend, backend, devops, testing,');
  console.log('               security, architecture, ai-ml, database');
  console.log('');
  console.log('  help');
  console.log('    Show this help message');
  console.log('');

  console.log(color('Examples:', colors.bright));
  console.log('  agent list');
  console.log('  agent list --role=architect');
  console.log('  agent list --search=react');
  console.log('  agent info react-expert');
  console.log('  agent search kubernetes');
  console.log('  agent stats');
  console.log('  agent recommend web-app');
  console.log('');
}

function parseArgs(args) {
  const parsed = { command: '', options: {}, args: [] };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (i === 0) {
      parsed.command = arg;
    } else if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      parsed.options[key] = value || true;
    } else {
      parsed.args.push(arg);
    }
  }

  return parsed;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    return;
  }

  const { command, options, args: cmdArgs } = parseArgs(args);

  switch (command) {
    case 'list':
      listAgents(options);
      break;

    case 'info':
      if (cmdArgs.length === 0) {
        console.log(color('Error: Agent name required.', colors.red));
        console.log(color('Usage: agent info <agent-name>', colors.dim));
      } else {
        showAgentInfo(cmdArgs[0]);
      }
      break;

    case 'search':
      if (cmdArgs.length === 0) {
        console.log(color('Error: Search query required.', colors.red));
        console.log(color('Usage: agent search <query>', colors.dim));
      } else {
        searchAgents(cmdArgs.join(' '));
      }
      break;

    case 'stats':
      showStats();
      break;

    case 'recommend':
      if (cmdArgs.length === 0) {
        console.log(color('Error: Scenario required.', colors.red));
        console.log(color('Usage: agent recommend <scenario>', colors.dim));
      } else {
        recommend(cmdArgs[0]);
      }
      break;

    case 'help':
      showHelp();
      break;

    default:
      console.log(color(`Unknown command: ${command}`, colors.red));
      showHelp();
  }
}

// Run CLI
main();
