/**
 * Flutter Expert Agent
 *
 * Use when building cross-platform applications with Flutter 3+ and Dart. Invoke for widget development, Riverpod/Bloc state management, GoRouter navigation, platform-specific implementations, performance optimization.
 *
 * Role: specialist
 * Scope: implementation
 */

export const flutter_expertAgent = {
  name: 'flutter-expert',
  description: 'Use when building cross-platform applications with Flutter 3+ and Dart. Invoke for widget development, Riverpod/Bloc state management, GoRouter navigation, platform-specific implementations, performance optimization.',

  triggers: [
    'Flutter',
    'Dart',
    'widget',
    'Riverpod',
    'Bloc',
    'GoRouter',
    'cross-platform',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the flutter-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/flutter-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'flutter-expert',
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

export default flutter_expertAgent;
