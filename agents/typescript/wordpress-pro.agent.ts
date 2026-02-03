/**
 * Wordpress Pro Agent
 *
 * Use when developing WordPress themes, plugins, customizing Gutenberg blocks, implementing WooCommerce features, or optimizing WordPress performance and security.
 *
 * Role: expert
 * Scope: implementation
 */

export const wordpress_proAgent = {
  name: 'wordpress-pro',
  description: 'Use when developing WordPress themes, plugins, customizing Gutenberg blocks, implementing WooCommerce features, or optimizing WordPress performance and security.',

  triggers: [
    'WordPress',
    'WooCommerce',
    'Gutenberg',
    'WordPress theme',
    'WordPress plugin',
    'custom blocks',
    'ACF',
    'WordPress REST API',
    'hooks',
    'filters',
    'WordPress performance',
    'WordPress security',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the wordpress-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/wordpress-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'wordpress-pro',
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

export default wordpress_proAgent;
