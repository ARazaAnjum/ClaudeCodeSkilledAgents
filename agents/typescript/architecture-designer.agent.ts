/**
 * Architecture Designer Agent
 *
 * Use when designing new system architecture, reviewing existing designs, or making architectural decisions. Invoke for system design, architecture review, design patterns, ADRs, scalability planning.
 *
 * Role: expert
 * Scope: design
 */

export const architecture_designerAgent = {
  name: 'architecture-designer',
  description: 'Use when designing new system architecture, reviewing existing designs, or making architectural decisions. Invoke for system design, architecture review, design patterns, ADRs, scalability planning.',

  triggers: [
    'architecture',
    'system design',
    'design pattern',
    'microservices',
    'scalability',
    'ADR',
    'technical design',
    'infrastructure',
  ],

  role: 'expert',
  scope: 'design',

  /**
   * Execute the architecture-designer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/architecture-designer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'architecture-designer',
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

export default architecture_designerAgent;
