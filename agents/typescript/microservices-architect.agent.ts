/**
 * Microservices Architect Agent
 *
 * Use when designing distributed systems, decomposing monoliths, or implementing microservices patterns. Invoke for service boundaries, DDD, saga patterns, event sourcing, service mesh, distributed tracing.
 *
 * Role: architect
 * Scope: system-design
 */

export const microservices_architectAgent = {
  name: 'microservices-architect',
  description: 'Use when designing distributed systems, decomposing monoliths, or implementing microservices patterns. Invoke for service boundaries, DDD, saga patterns, event sourcing, service mesh, distributed tracing.',

  triggers: [
    'microservices',
    'service mesh',
    'distributed systems',
    'service boundaries',
    'domain-driven design',
    'event sourcing',
    'CQRS',
    'saga pattern',
    'Kubernetes microservices',
    'Istio',
    'distributed tracing',
  ],

  role: 'architect',
  scope: 'system-design',

  /**
   * Execute the microservices-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/microservices-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'microservices-architect',
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

export default microservices_architectAgent;
