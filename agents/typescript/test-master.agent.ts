/**
 * Test Master Agent
 *
 * Use when writing tests, creating test strategies, or building automation frameworks. Invoke for unit tests, integration tests, E2E, coverage analysis, performance testing, security testing.
 *
 * Role: specialist
 * Scope: testing
 */

export const test_masterAgent = {
  name: 'test-master',
  description: 'Use when writing tests, creating test strategies, or building automation frameworks. Invoke for unit tests, integration tests, E2E, coverage analysis, performance testing, security testing.',

  triggers: [
    'test',
    'testing',
    'QA',
    'unit test',
    'integration test',
    'E2E',
    'coverage',
    'performance test',
    'security test',
    'regression',
    'test strategy',
    'test automation',
    'test framework',
    'quality metrics',
    'defect',
    'exploratory',
    'usability',
    'accessibility',
    'localization',
    'manual testing',
    'shift-left',
    'quality gate',
    'flaky test',
    'test maintenance',
  ],

  role: 'specialist',
  scope: 'testing',

  /**
   * Execute the test-master skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/test-master/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'test-master',
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

export default test_masterAgent;
