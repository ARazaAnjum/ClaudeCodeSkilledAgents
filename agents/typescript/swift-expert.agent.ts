/**
 * Swift Expert Agent
 *
 * Use when building iOS/macOS applications with Swift 5.9+, SwiftUI, or async/await concurrency. Invoke for protocol-oriented programming, SwiftUI state management, actors, server-side Swift.
 *
 * Role: specialist
 * Scope: implementation
 */

export const swift_expertAgent = {
  name: 'swift-expert',
  description: 'Use when building iOS/macOS applications with Swift 5.9+, SwiftUI, or async/await concurrency. Invoke for protocol-oriented programming, SwiftUI state management, actors, server-side Swift.',

  triggers: [
    'Swift',
    'SwiftUI',
    'iOS development',
    'macOS development',
    'async/await Swift',
    'Combine',
    'UIKit',
    'Vapor',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the swift-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/swift-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'swift-expert',
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

export default swift_expertAgent;
