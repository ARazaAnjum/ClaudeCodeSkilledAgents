/**
 * Feature Forge Agent
 *
 * Use when defining new features, gathering requirements, or writing specifications. Invoke for feature definition, requirements gathering, user stories, EARS format specs.
 *
 * Role: specialist
 * Scope: design
 */

export const feature_forgeAgent = {
  name: 'feature-forge',
  description: 'Use when defining new features, gathering requirements, or writing specifications. Invoke for feature definition, requirements gathering, user stories, EARS format specs.',

  triggers: [
    'requirements',
    'specification',
    'feature definition',
    'user stories',
    'EARS',
    'planning',
  ],

  role: 'specialist',
  scope: 'design',

  /**
   * Execute the feature-forge skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/feature-forge/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'feature-forge',
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

export default feature_forgeAgent;
