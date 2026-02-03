/**
 * Rails Expert Agent
 *
 * Use when building Rails 7+ web applications with Hotwire, real-time features, or background job processing. Invoke for Active Record optimization, Turbo Frames/Streams, Action Cable, Sidekiq.
 *
 * Role: specialist
 * Scope: implementation
 */

export const rails_expertAgent = {
  name: 'rails-expert',
  description: 'Use when building Rails 7+ web applications with Hotwire, real-time features, or background job processing. Invoke for Active Record optimization, Turbo Frames/Streams, Action Cable, Sidekiq.',

  triggers: [
    'Rails',
    'Ruby on Rails',
    'Hotwire',
    'Turbo Frames',
    'Turbo Streams',
    'Action Cable',
    'Active Record',
    'Sidekiq',
    'RSpec Rails',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the rails-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/rails-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'rails-expert',
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

export default rails_expertAgent;
