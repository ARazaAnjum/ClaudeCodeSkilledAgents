/**
 * Angular Architect Agent
 *
 * Use when building Angular 17+ applications with standalone components or signals. Invoke for enterprise apps, RxJS patterns, NgRx state management, performance optimization, advanced routing.
 *
 * Role: specialist
 * Scope: implementation
 */

export const angular_architectAgent = {
  name: 'angular-architect',
  description: 'Use when building Angular 17+ applications with standalone components or signals. Invoke for enterprise apps, RxJS patterns, NgRx state management, performance optimization, advanced routing.',

  triggers: [
    'Angular',
    'Angular 17',
    'standalone components',
    'signals',
    'RxJS',
    'NgRx',
    'Angular performance',
    'Angular routing',
    'Angular testing',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the angular-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/angular-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'angular-architect',
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

export default angular_architectAgent;
