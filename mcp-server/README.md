# ClaudeCode Skills MCP Server

This MCP (Model Context Protocol) server exposes all 69 ClaudeCodeSkills as invokable tools in Claude Code.

## Setup

### 1. Install Dependencies

```bash
cd mcp-server
npm install
```

### 2. Build the Server

```bash
npm run build
```

### 3. Configure Claude Code

Add the MCP server to your Claude Code configuration. Edit your global `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "claudecode-skills": {
      "command": "node",
      "args": ["C:\\Projects\\ClaudeCode\\mcp-server\\dist\\index.js"]
    }
  }
}
```

Or for the project-specific configuration, edit `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "claudecode-skills": {
      "command": "node",
      "args": ["C:\\Projects\\ClaudeCode\\mcp-server\\dist\\index.js"]
    }
  },
  "permissions": {
    "allow": [
      "Bash(ls:*)"
    ]
  }
}
```

### 4. Restart Claude Code

After configuring, restart Claude Code to load the MCP server.

## Usage

Once configured, you can use any of the 69 skills in your Claude conversations:

### Using the Skill Tool

Claude will automatically detect when to use your skills based on the context. You can also explicitly invoke them:

```
Use the react-expert skill to help me build a responsive navbar
```

### Available Skills

All 69 skills are available:

**Frontend**: react-expert, vue-expert, angular-architect, nextjs-developer, typescript-pro, javascript-pro, etc.

**Backend**: python-pro, fastapi-expert, django-expert, nestjs-expert, golang-pro, java-architect, etc.

**DevOps**: devops-engineer, kubernetes-specialist, terraform-engineer, cloud-architect, etc.

**Database**: postgres-pro, database-optimizer, sql-pro, etc.

**Testing**: test-master, playwright-expert, code-reviewer, security-reviewer, etc.

**Architecture**: architecture-designer, api-designer, microservices-architect, etc.

**AI/ML**: prompt-engineer, rag-architect, ml-pipeline, fine-tuning-expert

**Specialized**: mcp-developer, cli-developer, game-developer, websocket-engineer, etc.

## How It Works

1. The MCP server reads all agent configurations from `agents/json/index.json`
2. Each skill is exposed as a tool with its name, description, triggers, and metadata
3. When a tool is called, the server loads the corresponding SKILL.md file
4. The skill content is returned to Claude Code with your task context
5. Claude uses the skill instructions to help you

## Development

### Watch Mode

```bash
npm run watch
```

### Rebuild

```bash
npm run build
```

## Troubleshooting

### Server Not Starting

- Check that Node.js is installed: `node --version`
- Verify the build completed: check for `dist/index.js`
- Check the path in settings.json is absolute and correct

### Skills Not Appearing

- Restart Claude Code completely
- Check MCP server logs in Claude Code debug panel
- Verify `agents/json/index.json` exists and is valid

### Skill Not Working

- Ensure the corresponding SKILL.md file exists in `skills/[skill-name]/SKILL.md`
- Check that the `skillPath` in the agent JSON is correct
- Rebuild the agents: `node generate-agents.js`

## File Structure

```
mcp-server/
├── index.ts           # Main MCP server
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── dist/              # Compiled output
│   └── index.js
└── README.md          # This file
```

## License

MIT
