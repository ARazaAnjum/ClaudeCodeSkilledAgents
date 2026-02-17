#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load all agent configurations
const agentsPath = path.join(__dirname, '../agents/json/index.json');
const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));
// Create MCP server
const server = new Server({
    name: 'claudecode-skills-server',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
// List all available tools (skills)
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = agents.map((agent) => ({
        name: agent.name,
        description: `${agent.description}\n\nRole: ${agent.role}\nScope: ${agent.scope}\nTriggers: ${agent.triggers.join(', ')}`,
        inputSchema: {
            type: 'object',
            properties: {
                task: {
                    type: 'string',
                    description: 'The task or request for this skill',
                },
                context: {
                    type: 'object',
                    description: 'Additional context for the skill execution',
                },
            },
            required: ['task'],
        },
    }));
    return { tools };
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: skillName, arguments: args } = request.params;
    // Find the agent
    const agent = agents.find((a) => a.name === skillName);
    if (!agent) {
        throw new Error(`Skill not found: ${skillName}`);
    }
    // Load the skill content
    const skillPath = path.join(__dirname, '..', agent.skillPath);
    const skillContent = fs.readFileSync(skillPath, 'utf-8');
    // Get task and context with defaults
    const task = args?.task || 'No task specified';
    const context = args?.context;
    // Return the skill content with context
    return {
        content: [
            {
                type: 'text',
                text: `# ${agent.name} Skill Activated\n\n${skillContent}\n\n---\n\n**Task**: ${task}\n${context ? `**Context**: ${JSON.stringify(context, null, 2)}` : ''}`,
            },
        ],
    };
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('ClaudeCode Skills MCP Server running on stdio');
}
main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map