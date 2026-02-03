/**
 * Javascript Pro Agent
 *
 * Use when building JavaScript applications with modern ES2023+ features, async patterns, or Node.js development. Invoke for vanilla JavaScript, browser APIs, performance optimization, module systems.
 *
 * Role: specialist
 * Scope: implementation
 */

export const javascript_proAgent = {
  name: 'javascript-pro',
  description: 'Use when building JavaScript applications with modern ES2023+ features, async patterns, or Node.js development. Invoke for vanilla JavaScript, browser APIs, performance optimization, module systems.',

  triggers: [
    'JavaScript',
    'ES2023',
    'async await',
    'Node.js',
    'vanilla JavaScript',
    'Web Workers',
    'Fetch API',
    'browser API',
    'module system',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the javascript-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/javascript-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'javascript-pro',
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

export default javascript_proAgent;
