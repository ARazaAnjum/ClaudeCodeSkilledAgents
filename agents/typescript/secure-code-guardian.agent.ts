/**
 * Secure Code Guardian Agent
 *
 * Use when implementing authentication/authorization, securing user input, or preventing OWASP Top 10 vulnerabilities. Invoke for authentication, authorization, input validation, encryption, OWASP Top 10 prevention.
 *
 * Role: specialist
 * Scope: implementation
 */

export const secure_code_guardianAgent = {
  name: 'secure-code-guardian',
  description: 'Use when implementing authentication/authorization, securing user input, or preventing OWASP Top 10 vulnerabilities. Invoke for authentication, authorization, input validation, encryption, OWASP Top 10 prevention.',

  triggers: [
    'security',
    'authentication',
    'authorization',
    'encryption',
    'OWASP',
    'vulnerability',
    'secure coding',
    'password',
    'JWT',
    'OAuth',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the secure-code-guardian skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/secure-code-guardian/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'secure-code-guardian',
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

export default secure_code_guardianAgent;
