/**
 * Mcp Developer Agent
 *
 * Use when building MCP servers or clients that connect AI systems with external tools and data sources. Invoke for MCP protocol compliance, TypeScript/Python SDKs, resource providers, tool functions.
 *
 * Role: specialist
 * Scope: implementation
 */

export const mcp_developerAgent = {
  name: 'mcp-developer',
  description: 'Use when building MCP servers or clients that connect AI systems with external tools and data sources. Invoke for MCP protocol compliance, TypeScript/Python SDKs, resource providers, tool functions.',

  triggers: [
    'MCP',
    'Model Context Protocol',
    'MCP server',
    'MCP client',
    'Claude integration',
    'AI tools',
    'context protocol',
    'JSON-RPC',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the mcp-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/mcp-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'mcp-developer',
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

export default mcp_developerAgent;
