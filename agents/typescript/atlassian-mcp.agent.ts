/**
 * Atlassian Mcp Agent
 *
 * Use when querying Jira issues, searching Confluence pages, creating tickets, updating documentation, or integrating Atlassian tools via MCP protocol.
 *
 * Role: expert
 * Scope: implementation
 */

export const atlassian_mcpAgent = {
  name: 'atlassian-mcp',
  description: 'Use when querying Jira issues, searching Confluence pages, creating tickets, updating documentation, or integrating Atlassian tools via MCP protocol.',

  triggers: [
    'Jira',
    'Confluence',
    'Atlassian',
    'MCP',
    'tickets',
    'issues',
    'wiki',
    'JQL',
    'CQL',
    'sprint',
    'backlog',
    'project management',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the atlassian-mcp skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/atlassian-mcp/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'atlassian-mcp',
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

export default atlassian_mcpAgent;
