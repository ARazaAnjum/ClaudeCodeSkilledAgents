/**
 * Spec Miner Agent
 *
 * Use when understanding legacy or undocumented systems, creating documentation for existing code, or extracting specifications from implementations. Invoke for legacy analysis, code archaeology, undocumented features.
 *
 * Role: specialist
 * Scope: review
 */

export const spec_minerAgent = {
  name: 'spec-miner',
  description: 'Use when understanding legacy or undocumented systems, creating documentation for existing code, or extracting specifications from implementations. Invoke for legacy analysis, code archaeology, undocumented features.',

  triggers: [
    'reverse engineer',
    'legacy code',
    'code analysis',
    'undocumented',
    'understand codebase',
    'existing system',
  ],

  role: 'specialist',
  scope: 'review',

  /**
   * Execute the spec-miner skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/spec-miner/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'spec-miner',
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

export default spec_minerAgent;
