/**
 * Sre Engineer Agent
 *
 * Use when defining SLIs/SLOs, managing error budgets, or building reliable systems at scale. Invoke for incident management, chaos engineering, toil reduction, capacity planning.
 *
 * Role: specialist
 * Scope: implementation
 */

export const sre_engineerAgent = {
  name: 'sre-engineer',
  description: 'Use when defining SLIs/SLOs, managing error budgets, or building reliable systems at scale. Invoke for incident management, chaos engineering, toil reduction, capacity planning.',

  triggers: [
    'SRE',
    'site reliability',
    'SLO',
    'SLI',
    'error budget',
    'incident management',
    'chaos engineering',
    'toil reduction',
    'on-call',
    'MTTR',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the sre-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/sre-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'sre-engineer',
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

export default sre_engineerAgent;
