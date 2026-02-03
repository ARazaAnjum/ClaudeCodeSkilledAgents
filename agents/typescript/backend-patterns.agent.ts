/**
 * Backend Patterns Agent
 *
 * Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.
 *
 * Role: undefined
 * Scope: undefined
 */

export const backend_patternsAgent = {
  name: 'backend-patterns',
  description: 'Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.',

  triggers: [

  ],

  role: 'undefined',
  scope: 'undefined',

  /**
   * Execute the backend-patterns skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/backend-patterns/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'backend-patterns',
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

export default backend_patternsAgent;
