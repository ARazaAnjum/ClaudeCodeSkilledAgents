/**
 * Kotlin Specialist Agent
 *
 * Use when building Kotlin applications requiring coroutines, multiplatform development, or Android with Compose. Invoke for Flow API, KMP projects, Ktor servers, DSL design, sealed classes.
 *
 * Role: specialist
 * Scope: implementation
 */

export const kotlin_specialistAgent = {
  name: 'kotlin-specialist',
  description: 'Use when building Kotlin applications requiring coroutines, multiplatform development, or Android with Compose. Invoke for Flow API, KMP projects, Ktor servers, DSL design, sealed classes.',

  triggers: [
    'Kotlin',
    'coroutines',
    'Kotlin Multiplatform',
    'KMP',
    'Jetpack Compose',
    'Ktor',
    'Flow',
    'Android Kotlin',
    'suspend function',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the kotlin-specialist skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/kotlin-specialist/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'kotlin-specialist',
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

export default kotlin_specialistAgent;
