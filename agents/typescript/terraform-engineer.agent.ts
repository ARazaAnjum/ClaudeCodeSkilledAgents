/**
 * Terraform Engineer Agent
 *
 * Use when implementing infrastructure as code with Terraform across AWS, Azure, or GCP. Invoke for module development, state management, provider configuration, multi-environment workflows, infrastructure testing.
 *
 * Role: specialist
 * Scope: implementation
 */

export const terraform_engineerAgent = {
  name: 'terraform-engineer',
  description: 'Use when implementing infrastructure as code with Terraform across AWS, Azure, or GCP. Invoke for module development, state management, provider configuration, multi-environment workflows, infrastructure testing.',

  triggers: [
    'Terraform',
    'infrastructure as code',
    'IaC',
    'terraform module',
    'terraform state',
    'AWS provider',
    'Azure provider',
    'GCP provider',
    'terraform plan',
    'terraform apply',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the terraform-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/terraform-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'terraform-engineer',
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

export default terraform_engineerAgent;
