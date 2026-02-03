/**
 * Security Reviewer Agent
 *
 * Use when conducting security audits, reviewing code for vulnerabilities, or analyzing infrastructure security. Invoke for SAST scans, penetration testing, DevSecOps practices, cloud security reviews.
 *
 * Role: specialist
 * Scope: review
 */

export const security_reviewerAgent = {
  name: 'security-reviewer',
  description: 'Use when conducting security audits, reviewing code for vulnerabilities, or analyzing infrastructure security. Invoke for SAST scans, penetration testing, DevSecOps practices, cloud security reviews.',

  triggers: [
    'security review',
    'vulnerability scan',
    'SAST',
    'security audit',
    'penetration test',
    'code audit',
    'security analysis',
    'infrastructure security',
    'DevSecOps',
    'cloud security',
    'compliance audit',
  ],

  role: 'specialist',
  scope: 'review',

  /**
   * Execute the security-reviewer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/security-reviewer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'security-reviewer',
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

export default security_reviewerAgent;
