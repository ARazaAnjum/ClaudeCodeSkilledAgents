/**
 * Typescript Pro Agent
 *
 * Use when building TypeScript applications requiring advanced type systems, generics, or full-stack type safety. Invoke for type guards, utility types, tRPC integration, monorepo setup.
 *
 * Role: specialist
 * Scope: implementation
 */

export const typescript_proAgent = {
  name: 'typescript-pro',
  description: 'Use when building TypeScript applications requiring advanced type systems, generics, or full-stack type safety. Invoke for type guards, utility types, tRPC integration, monorepo setup.',

  triggers: [
    'TypeScript',
    'generics',
    'type safety',
    'conditional types',
    'mapped types',
    'tRPC',
    'tsconfig',
    'type guards',
    'discriminated unions',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the typescript-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/typescript-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'typescript-pro',
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

export default typescript_proAgent;
