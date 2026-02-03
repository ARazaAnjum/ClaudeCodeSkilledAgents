/**
 * Playwright Expert Agent
 *
 * Use when writing E2E tests with Playwright, setting up test infrastructure, or debugging flaky browser tests. Invoke for browser automation, E2E tests, Page Object Model, test flakiness, visual testing.
 *
 * Role: specialist
 * Scope: testing
 */

export const playwright_expertAgent = {
  name: 'playwright-expert',
  description: 'Use when writing E2E tests with Playwright, setting up test infrastructure, or debugging flaky browser tests. Invoke for browser automation, E2E tests, Page Object Model, test flakiness, visual testing.',

  triggers: [
    'Playwright',
    'E2E test',
    'end-to-end',
    'browser testing',
    'automation',
    'UI testing',
    'visual testing',
  ],

  role: 'specialist',
  scope: 'testing',

  /**
   * Execute the playwright-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/playwright-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'playwright-expert',
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

export default playwright_expertAgent;
