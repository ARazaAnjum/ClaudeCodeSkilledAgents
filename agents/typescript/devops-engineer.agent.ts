/**
 * Devops Engineer Agent
 *
 * Use when setting up CI/CD pipelines, containerizing applications, or managing infrastructure as code. Invoke for pipelines, Docker, Kubernetes, cloud platforms, GitOps.
 *
 * Role: engineer
 * Scope: implementation
 */

export const devops_engineerAgent = {
  name: 'devops-engineer',
  description: 'Use when setting up CI/CD pipelines, containerizing applications, or managing infrastructure as code. Invoke for pipelines, Docker, Kubernetes, cloud platforms, GitOps.',

  triggers: [
    'DevOps',
    'CI/CD',
    'deployment',
    'Docker',
    'Kubernetes',
    'Terraform',
    'GitHub Actions',
    'infrastructure',
    'platform engineering',
    'incident response',
    'on-call',
    'self-service',
  ],

  role: 'engineer',
  scope: 'implementation',

  /**
   * Execute the devops-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/devops-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'devops-engineer',
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

export default devops_engineerAgent;
