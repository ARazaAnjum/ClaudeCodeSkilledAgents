/**
 * Code Documenter Agent
 *
 * Use when adding docstrings, creating API documentation, or building documentation sites. Invoke for OpenAPI/Swagger specs, JSDoc, doc portals, tutorials, user guides.
 *
 * Role: specialist
 * Scope: implementation
 */

export const code_documenterAgent = {
  name: 'code-documenter',
  description: 'Use when adding docstrings, creating API documentation, or building documentation sites. Invoke for OpenAPI/Swagger specs, JSDoc, doc portals, tutorials, user guides.',

  triggers: [
    'documentation',
    'docstrings',
    'OpenAPI',
    'Swagger',
    'JSDoc',
    'comments',
    'API docs',
    'tutorials',
    'user guides',
    'doc site',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the code-documenter skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/code-documenter/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'code-documenter',
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

export default code_documenterAgent;
