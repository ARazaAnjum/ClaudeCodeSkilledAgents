/**
 * Pandas Pro Agent
 *
 * Use when working with pandas DataFrames, data cleaning, aggregation, merging, or time series analysis. Invoke for data manipulation, missing value handling, groupby operations, or performance optimization.
 *
 * Role: expert
 * Scope: implementation
 */

export const pandas_proAgent = {
  name: 'pandas-pro',
  description: 'Use when working with pandas DataFrames, data cleaning, aggregation, merging, or time series analysis. Invoke for data manipulation, missing value handling, groupby operations, or performance optimization.',

  triggers: [
    'pandas',
    'DataFrame',
    'data manipulation',
    'data cleaning',
    'aggregation',
    'groupby',
    'merge',
    'join',
    'time series',
    'data wrangling',
    'pivot table',
    'data transformation',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the pandas-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/pandas-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'pandas-pro',
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

export default pandas_proAgent;
