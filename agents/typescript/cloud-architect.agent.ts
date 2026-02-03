/**
 * Cloud Architect Agent
 *
 * Use when designing cloud architectures, planning migrations, or optimizing multi-cloud deployments. Invoke for Well-Architected Framework, cost optimization, disaster recovery, landing zones, security architecture, serverless design.
 *
 * Role: architect
 * Scope: infrastructure
 */

export const cloud_architectAgent = {
  name: 'cloud-architect',
  description: 'Use when designing cloud architectures, planning migrations, or optimizing multi-cloud deployments. Invoke for Well-Architected Framework, cost optimization, disaster recovery, landing zones, security architecture, serverless design.',

  triggers: [
    'AWS',
    'Azure',
    'GCP',
    'Google Cloud',
    'cloud migration',
    'cloud architecture',
    'multi-cloud',
    'cloud cost',
    'Well-Architected',
    'landing zone',
    'cloud security',
    'disaster recovery',
    'cloud native',
    'serverless architecture',
  ],

  role: 'architect',
  scope: 'infrastructure',

  /**
   * Execute the cloud-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/cloud-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'cloud-architect',
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

export default cloud_architectAgent;
