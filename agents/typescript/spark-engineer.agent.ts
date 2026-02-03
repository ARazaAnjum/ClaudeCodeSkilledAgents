/**
 * Spark Engineer Agent
 *
 * Use when building Apache Spark applications, distributed data processing pipelines, or optimizing big data workloads. Invoke for DataFrame API, Spark SQL, RDD operations, performance tuning, streaming analytics.
 *
 * Role: expert
 * Scope: implementation
 */

export const spark_engineerAgent = {
  name: 'spark-engineer',
  description: 'Use when building Apache Spark applications, distributed data processing pipelines, or optimizing big data workloads. Invoke for DataFrame API, Spark SQL, RDD operations, performance tuning, streaming analytics.',

  triggers: [
    'Apache Spark',
    'PySpark',
    'Spark SQL',
    'distributed computing',
    'big data',
    'DataFrame API',
    'RDD',
    'Spark Streaming',
    'structured streaming',
    'data partitioning',
    'Spark performance',
    'cluster computing',
    'data processing pipeline',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the spark-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/spark-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'spark-engineer',
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

export default spark_engineerAgent;
