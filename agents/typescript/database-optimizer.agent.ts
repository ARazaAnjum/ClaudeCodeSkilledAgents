/**
 * Database Optimizer Agent
 *
 * Use when investigating slow queries, analyzing execution plans, or optimizing database performance. Invoke for index design, query rewrites, configuration tuning, partitioning strategies, lock contention resolution.
 *
 * Role: specialist
 * Scope: optimization
 */

export const database_optimizerAgent = {
  name: 'database-optimizer',
  description: 'Use when investigating slow queries, analyzing execution plans, or optimizing database performance. Invoke for index design, query rewrites, configuration tuning, partitioning strategies, lock contention resolution.',

  triggers: [
    'database optimization',
    'slow query',
    'query performance',
    'database tuning',
    'index optimization',
    'execution plan',
    'EXPLAIN ANALYZE',
    'database performance',
    'PostgreSQL optimization',
    'MySQL optimization',
  ],

  role: 'specialist',
  scope: 'optimization',

  /**
   * Execute the database-optimizer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/database-optimizer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'database-optimizer',
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

export default database_optimizerAgent;
