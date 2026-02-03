/**
 * Sql Pro Agent
 *
 * Use when optimizing SQL queries, designing database schemas, or tuning database performance. Invoke for complex queries, window functions, CTEs, indexing strategies, query plan analysis.
 *
 * Role: specialist
 * Scope: implementation
 */

export const sql_proAgent = {
  name: 'sql-pro',
  description: 'Use when optimizing SQL queries, designing database schemas, or tuning database performance. Invoke for complex queries, window functions, CTEs, indexing strategies, query plan analysis.',

  triggers: [
    'SQL optimization',
    'query performance',
    'database design',
    'PostgreSQL',
    'MySQL',
    'SQL Server',
    'window functions',
    'CTEs',
    'query tuning',
    'EXPLAIN plan',
    'database indexing',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the sql-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/sql-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'sql-pro',
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

export default sql_proAgent;
