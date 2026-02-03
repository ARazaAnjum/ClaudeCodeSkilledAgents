/**
 * Ml Pipeline Agent
 *
 * Use when building ML pipelines, orchestrating training workflows, automating model lifecycle, implementing feature stores, or managing experiment tracking systems.
 *
 * Role: expert
 * Scope: implementation
 */

export const ml_pipelineAgent = {
  name: 'ml-pipeline',
  description: 'Use when building ML pipelines, orchestrating training workflows, automating model lifecycle, implementing feature stores, or managing experiment tracking systems.',

  triggers: [
    'ML pipeline',
    'MLflow',
    'Kubeflow',
    'feature engineering',
    'model training',
    'experiment tracking',
    'feature store',
    'hyperparameter tuning',
    'pipeline orchestration',
    'model registry',
    'training workflow',
    'MLOps',
    'model deployment',
    'data pipeline',
    'model versioning',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the ml-pipeline skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/ml-pipeline/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'ml-pipeline',
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

export default ml_pipelineAgent;
