/**
 * Vue Expert Js Agent
 *
 * Use when building Vue 3 applications with JavaScript only (no TypeScript). Invoke for JSDoc typing, vanilla JS composables, .mjs modules.
 *
 * Role: specialist
 * Scope: implementation
 */

export const vue_expert_jsAgent = {
  name: 'vue-expert-js',
  description: 'Use when building Vue 3 applications with JavaScript only (no TypeScript). Invoke for JSDoc typing, vanilla JS composables, .mjs modules.',

  triggers: [
    'Vue JavaScript',
    'Vue without TypeScript',
    'Vue JSDoc',
    'Vue JS only',
    'Vue vanilla JavaScript',
    '.mjs Vue',
    'Vue no TS',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the vue-expert-js skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/vue-expert-js/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'vue-expert-js',
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

export default vue_expert_jsAgent;
