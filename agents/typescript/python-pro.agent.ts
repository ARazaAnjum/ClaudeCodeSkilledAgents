/**
 * Python Pro Agent
 *
 * Use when building Python 3.11+ applications requiring type safety, async programming, or production-grade patterns. Invoke for type hints, pytest, async/await, dataclasses, mypy configuration.
 *
 * Role: specialist
 * Scope: implementation
 */

export const python_proAgent = {
  name: 'python-pro',
  description: 'Use when building Python 3.11+ applications requiring type safety, async programming, or production-grade patterns. Invoke for type hints, pytest, async/await, dataclasses, mypy configuration.',

  triggers: [
    'Python development',
    'type hints',
    'async Python',
    'pytest',
    'mypy',
    'dataclasses',
    'Python best practices',
    'Pythonic code',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the python-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/python-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'python-pro',
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

export default python_proAgent;
