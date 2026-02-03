/**
 * Api Designer Agent
 *
 * Use when designing REST or GraphQL APIs, creating OpenAPI specifications, or planning API architecture. Invoke for resource modeling, versioning strategies, pagination patterns, error handling standards.
 *
 * Role: architect
 * Scope: design
 */

export const api_designerAgent = {
  name: 'api-designer',
  description: 'Use when designing REST or GraphQL APIs, creating OpenAPI specifications, or planning API architecture. Invoke for resource modeling, versioning strategies, pagination patterns, error handling standards.',

  triggers: [
    'API design',
    'REST API',
    'OpenAPI',
    'API specification',
    'API architecture',
    'resource modeling',
    'API versioning',
    'GraphQL schema',
    'API documentation',
  ],

  role: 'architect',
  scope: 'design',

  /**
   * Execute the api-designer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/api-designer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'api-designer',
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

export default api_designerAgent;
