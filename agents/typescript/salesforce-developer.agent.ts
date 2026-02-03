/**
 * Salesforce Developer Agent
 *
 * Use when developing Salesforce applications, Apex code, Lightning Web Components, SOQL queries, triggers, integrations, or CRM customizations. Invoke for governor limits, bulk processing, platform events, Salesforce DX.
 *
 * Role: expert
 * Scope: implementation
 */

export const salesforce_developerAgent = {
  name: 'salesforce-developer',
  description: 'Use when developing Salesforce applications, Apex code, Lightning Web Components, SOQL queries, triggers, integrations, or CRM customizations. Invoke for governor limits, bulk processing, platform events, Salesforce DX.',

  triggers: [
    'Salesforce',
    'Apex',
    'Lightning Web Components',
    'LWC',
    'SOQL',
    'SOSL',
    'Visualforce',
    'Salesforce DX',
    'governor limits',
    'triggers',
    'platform events',
    'CRM integration',
    'Sales Cloud',
    'Service Cloud',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the salesforce-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/salesforce-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'salesforce-developer',
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

export default salesforce_developerAgent;
