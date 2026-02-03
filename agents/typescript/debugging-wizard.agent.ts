/**
 * Debugging Wizard Agent
 *
 * Use when investigating errors, analyzing stack traces, or finding root causes of unexpected behavior. Invoke for error investigation, troubleshooting, log analysis, root cause analysis.
 *
 * Role: specialist
 * Scope: analysis
 */

export const debugging_wizardAgent = {
  name: 'debugging-wizard',
  description: 'Use when investigating errors, analyzing stack traces, or finding root causes of unexpected behavior. Invoke for error investigation, troubleshooting, log analysis, root cause analysis.',

  triggers: [
    'debug',
    'error',
    'bug',
    'exception',
    'traceback',
    'stack trace',
    'troubleshoot',
    'not working',
    'crash',
    'fix issue',
  ],

  role: 'specialist',
  scope: 'analysis',

  /**
   * Execute the debugging-wizard skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/debugging-wizard/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'debugging-wizard',
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

export default debugging_wizardAgent;
