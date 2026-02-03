/**
 * Frontend Design Agent
 *
 * Create distinctive, production-grade frontend interfaces with high design quality. Use when building web components, pages, or applications requiring exceptional aesthetics and creative direction. Generates polished code that avoids generic patterns.
 *
 * Role: specialist
 * Scope: implementation
 */

export const frontend_designAgent = {
  name: 'frontend-design',
  description: 'Create distinctive, production-grade frontend interfaces with high design quality. Use when building web components, pages, or applications requiring exceptional aesthetics and creative direction. Generates polished code that avoids generic patterns.',

  triggers: [
    'frontend design',
    'UI design',
    'web design',
    'creative frontend',
    'interface design',
    'visual design',
    'aesthetic design',
    'design system',
    'unique design',
    'brand identity',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the frontend-design skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/frontend-design/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'frontend-design',
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

export default frontend_designAgent;
