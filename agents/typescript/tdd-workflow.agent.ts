/**
 * Tdd Workflow Agent
 *
 * Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.
 *
 * Role: undefined
 * Scope: undefined
 */

export const tdd_workflowAgent = {
  name: 'tdd-workflow',
  description: 'Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.',

  triggers: [

  ],

  role: 'undefined',
  scope: 'undefined',

  /**
   * Execute the tdd-workflow skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/tdd-workflow/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'tdd-workflow',
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

export default tdd_workflowAgent;
