/**
 * Shopify Expert Agent
 *
 * Use when building Shopify themes, apps, custom storefronts, or e-commerce solutions. Invoke for Liquid templating, Storefront API, app development, checkout customization, Shopify Plus features.
 *
 * Role: expert
 * Scope: implementation
 */

export const shopify_expertAgent = {
  name: 'shopify-expert',
  description: 'Use when building Shopify themes, apps, custom storefronts, or e-commerce solutions. Invoke for Liquid templating, Storefront API, app development, checkout customization, Shopify Plus features.',

  triggers: [
    'Shopify',
    'Liquid',
    'Storefront API',
    'Shopify Plus',
    'Hydrogen',
    'Shopify app',
    'checkout extensions',
    'Shopify Functions',
    'App Bridge',
    'theme development',
    'e-commerce',
    'Polaris',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the shopify-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/shopify-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'shopify-expert',
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

export default shopify_expertAgent;
