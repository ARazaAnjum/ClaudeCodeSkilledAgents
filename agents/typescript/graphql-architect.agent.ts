/**
 * Graphql Architect Agent
 *
 * Use when designing GraphQL schemas, implementing Apollo Federation, or building real-time subscriptions. Invoke for schema design, resolvers with DataLoader, query optimization, federation directives.
 *
 * Role: architect
 * Scope: design
 */

export const graphql_architectAgent = {
  name: 'graphql-architect',
  description: 'Use when designing GraphQL schemas, implementing Apollo Federation, or building real-time subscriptions. Invoke for schema design, resolvers with DataLoader, query optimization, federation directives.',

  triggers: [
    'GraphQL',
    'Apollo Federation',
    'GraphQL schema',
    'API graph',
    'GraphQL subscriptions',
    'Apollo Server',
    'schema design',
    'GraphQL resolvers',
    'DataLoader',
  ],

  role: 'architect',
  scope: 'design',

  /**
   * Execute the graphql-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/graphql-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'graphql-architect',
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

export default graphql_architectAgent;
