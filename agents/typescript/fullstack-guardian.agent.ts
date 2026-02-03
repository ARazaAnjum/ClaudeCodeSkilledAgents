/**
 * Fullstack Guardian Agent
 *
 * Use when implementing features across frontend and backend, building APIs with UI, or creating end-to-end data flows. Invoke for feature implementation, API development, UI building, cross-stack work.
 *
 * Role: expert
 * Scope: implementation
 */

export const fullstack_guardianAgent = {
  name: 'fullstack-guardian',
  description: 'Use when implementing features across frontend and backend, building APIs with UI, or creating end-to-end data flows. Invoke for feature implementation, API development, UI building, cross-stack work.',

  triggers: [
    'fullstack',
    'implement feature',
    'build feature',
    'create API',
    'frontend and backend',
    'full stack',
    'new feature',
    'implement',
    'microservices',
    'websocket',
    'real-time',
    'deployment pipeline',
    'monorepo',
    'architecture decision',
    'technology selection',
    'end-to-end',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the fullstack-guardian skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/fullstack-guardian/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'fullstack-guardian',
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

export default fullstack_guardianAgent;
