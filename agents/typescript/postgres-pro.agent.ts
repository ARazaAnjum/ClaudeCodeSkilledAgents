/**
 * Postgres Pro Agent
 *
 * Use when optimizing PostgreSQL queries, configuring replication, or implementing advanced database features. Invoke for EXPLAIN analysis, JSONB operations, extension usage, VACUUM tuning, performance monitoring.
 *
 * Role: specialist
 * Scope: implementation
 */

export const postgres_proAgent = {
  name: 'postgres-pro',
  description: 'Use when optimizing PostgreSQL queries, configuring replication, or implementing advanced database features. Invoke for EXPLAIN analysis, JSONB operations, extension usage, VACUUM tuning, performance monitoring.',

  triggers: [
    'PostgreSQL',
    'Postgres',
    'EXPLAIN ANALYZE',
    'pg_stat',
    'JSONB',
    'streaming replication',
    'logical replication',
    'VACUUM',
    'PostGIS',
    'pgvector',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the postgres-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/postgres-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'postgres-pro',
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

export default postgres_proAgent;
