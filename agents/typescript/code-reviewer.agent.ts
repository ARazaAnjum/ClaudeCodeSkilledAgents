/**
 * Code Reviewer Agent
 *
 * Use when reviewing pull requests, conducting code quality audits, or identifying security vulnerabilities. Invoke for PR reviews, code quality checks, refactoring suggestions.
 *
 * Role: specialist
 * Scope: review
 */

export const code_reviewerAgent = {
  name: 'code-reviewer',
  description: 'Use when reviewing pull requests, conducting code quality audits, or identifying security vulnerabilities. Invoke for PR reviews, code quality checks, refactoring suggestions.',

  triggers: [
    'code review',
    'PR review',
    'pull request',
    'review code',
    'code quality',
  ],

  role: 'specialist',
  scope: 'review',

  /**
   * Execute the code-reviewer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/code-reviewer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'code-reviewer',
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

export default code_reviewerAgent;
