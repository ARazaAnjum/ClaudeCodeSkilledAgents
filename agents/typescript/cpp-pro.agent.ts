/**
 * Cpp Pro Agent
 *
 * Use when building C++ applications requiring modern C++20/23 features, template metaprogramming, or high-performance systems. Invoke for concepts, ranges, coroutines, SIMD optimization, memory management.
 *
 * Role: specialist
 * Scope: implementation
 */

export const cpp_proAgent = {
  name: 'cpp-pro',
  description: 'Use when building C++ applications requiring modern C++20/23 features, template metaprogramming, or high-performance systems. Invoke for concepts, ranges, coroutines, SIMD optimization, memory management.',

  triggers: [
    'C++',
    'C++20',
    'C++23',
    'modern C++',
    'template metaprogramming',
    'systems programming',
    'performance optimization',
    'SIMD',
    'memory management',
    'CMake',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the cpp-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/cpp-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'cpp-pro',
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

export default cpp_proAgent;
