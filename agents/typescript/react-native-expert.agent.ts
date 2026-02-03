/**
 * React Native Expert Agent
 *
 * Use when building cross-platform mobile applications with React Native or Expo. Invoke for navigation patterns, platform-specific code, native modules, FlatList optimization.
 *
 * Role: specialist
 * Scope: implementation
 */

export const react_native_expertAgent = {
  name: 'react-native-expert',
  description: 'Use when building cross-platform mobile applications with React Native or Expo. Invoke for navigation patterns, platform-specific code, native modules, FlatList optimization.',

  triggers: [
    'React Native',
    'Expo',
    'mobile app',
    'iOS',
    'Android',
    'cross-platform',
    'native module',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the react-native-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/react-native-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'react-native-expert',
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

export default react_native_expertAgent;
