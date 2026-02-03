#!/usr/bin/env node

/**
 * Agent Generator for ClaudeCodeSkills
 *
 * This script reads all SKILL.md files and generates corresponding agent command files
 * that can be used directly in Claude or the Claude Agent SDK.
 */

const fs = require('fs');
const path = require('path');

// Parse YAML frontmatter
function parseYAML(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const lines = yaml.split('\n');
  const data = {};
  let currentKey = null;
  let currentArray = [];

  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      // Array item
      currentArray.push(line.trim().substring(1).trim());
    } else if (line.includes(':')) {
      // Save previous array if exists
      if (currentKey && currentArray.length > 0) {
        data[currentKey] = currentArray;
        currentArray = [];
      }

      // New key-value pair
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();

      if (value) {
        data[currentKey] = value;
      }
    }
  }

  // Save last array if exists
  if (currentKey && currentArray.length > 0) {
    data[currentKey] = currentArray;
  }

  return data;
}

// Generate agent TypeScript content
function generateAgentFile(skillData, skillName) {
  const { name, description, triggers = [], role, scope } = skillData;

  return `/**
 * ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Agent
 *
 * ${description}
 *
 * Role: ${role}
 * Scope: ${scope}
 */

export const ${name.replace(/-/g, '_')}Agent = {
  name: '${name}',
  description: '${description.replace(/'/g, "\\'")}',

  triggers: [
${triggers.map(t => `    '${t}',`).join('\n')}
  ],

  role: '${role}',
  scope: '${scope}',

  /**
   * Execute the ${name} skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/${name}/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: '${name}',
      content: skillContent,
      context,
      status: 'loaded'
    };
  },

  /**
   * Check if this agent should be triggered for the given input
   * @param input - User input or context
   * @returns boolean indicating if agent should activate
   */
  shouldTrigger(input: string): boolean {
    const lowerInput = input.toLowerCase();
    return this.triggers.some(trigger =>
      lowerInput.includes(trigger.toLowerCase())
    );
  }
};

export default ${name.replace(/-/g, '_')}Agent;
`;
}

// Generate simple JSON config version
function generateAgentJSON(skillData, skillName) {
  const { name, description, triggers = [], role, scope, 'output-format': outputFormat } = skillData;

  return JSON.stringify({
    name,
    description,
    triggers,
    role,
    scope,
    outputFormat,
    skillPath: `../skills/${name}/SKILL.md`
  }, null, 2);
}

// Main execution
async function main() {
  const skillsDir = path.join(__dirname, 'skills');
  const agentsDir = path.join(__dirname, 'agents');

  // Create agents directory if it doesn't exist
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }

  // Create subdirectories
  const tsDir = path.join(agentsDir, 'typescript');
  const jsonDir = path.join(agentsDir, 'json');

  [tsDir, jsonDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Read all skill directories
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let generatedCount = 0;
  const errors = [];

  console.log(`Found ${skillDirs.length} skill directories\n`);

  for (const skillName of skillDirs) {
    const skillFile = path.join(skillsDir, skillName, 'SKILL.md');

    if (!fs.existsSync(skillFile)) {
      errors.push(`❌ ${skillName}: No SKILL.md found`);
      continue;
    }

    try {
      const content = fs.readFileSync(skillFile, 'utf-8');
      const skillData = parseYAML(content);

      if (!skillData) {
        errors.push(`❌ ${skillName}: Failed to parse YAML frontmatter`);
        continue;
      }

      // Generate TypeScript agent
      const tsContent = generateAgentFile(skillData, skillName);
      const tsFile = path.join(tsDir, `${skillName}.agent.ts`);
      fs.writeFileSync(tsFile, tsContent);

      // Generate JSON config
      const jsonContent = generateAgentJSON(skillData, skillName);
      const jsonFile = path.join(jsonDir, `${skillName}.json`);
      fs.writeFileSync(jsonFile, jsonContent);

      generatedCount++;
      console.log(`✓ Generated agent for: ${skillName}`);

    } catch (error) {
      errors.push(`❌ ${skillName}: ${error.message}`);
    }
  }

  // Generate index files
  console.log('\nGenerating index files...');

  // TypeScript index
  const tsIndexContent = skillDirs
    .filter(name => fs.existsSync(path.join(tsDir, `${name}.agent.ts`)))
    .map(name => {
      const varName = name.replace(/-/g, '_') + 'Agent';
      return `export { ${varName} } from './${name}.agent';`;
    })
    .join('\n') + '\n';

  fs.writeFileSync(path.join(tsDir, 'index.ts'), tsIndexContent);
  console.log('✓ Generated TypeScript index');

  // JSON index
  const jsonIndexContent = JSON.stringify(
    skillDirs
      .filter(name => fs.existsSync(path.join(jsonDir, `${name}.json`)))
      .map(name => JSON.parse(fs.readFileSync(path.join(jsonDir, `${name}.json`), 'utf-8'))),
    null,
    2
  );

  fs.writeFileSync(path.join(jsonDir, 'index.json'), jsonIndexContent);
  console.log('✓ Generated JSON index');

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`✓ Successfully generated ${generatedCount} agents`);
  console.log(`  - TypeScript files: agents/typescript/`);
  console.log(`  - JSON configs: agents/json/`);

  if (errors.length > 0) {
    console.log(`\n⚠ Errors (${errors.length}):`);
    errors.forEach(err => console.log(`  ${err}`));
  }

  console.log(`${'='.repeat(60)}\n`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
