/**
 * Chaos Engineer Agent
 *
 * Use when designing chaos experiments, implementing failure injection frameworks, or conducting game day exercises. Invoke for chaos experiments, resilience testing, blast radius control, game days, antifragile systems.
 *
 * Role: specialist
 * Scope: implementation
 */

export const chaos_engineerAgent = {
  name: 'chaos-engineer',
  description: 'Use when designing chaos experiments, implementing failure injection frameworks, or conducting game day exercises. Invoke for chaos experiments, resilience testing, blast radius control, game days, antifragile systems.',

  triggers: [
    'chaos engineering',
    'resilience testing',
    'failure injection',
    'game day',
    'blast radius',
    'chaos experiment',
    'fault injection',
    'Chaos Monkey',
    'Litmus Chaos',
    'antifragile',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the chaos-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/chaos-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'chaos-engineer',
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

export default chaos_engineerAgent;
