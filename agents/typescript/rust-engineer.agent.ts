/**
 * Rust Engineer Agent
 *
 * Use when building Rust applications requiring memory safety, systems programming, or zero-cost abstractions. Invoke for ownership patterns, lifetimes, traits, async/await with tokio.
 *
 * Role: specialist
 * Scope: implementation
 */

export const rust_engineerAgent = {
  name: 'rust-engineer',
  description: 'Use when building Rust applications requiring memory safety, systems programming, or zero-cost abstractions. Invoke for ownership patterns, lifetimes, traits, async/await with tokio.',

  triggers: [
    'Rust',
    'Cargo',
    'ownership',
    'borrowing',
    'lifetimes',
    'async Rust',
    'tokio',
    'zero-cost abstractions',
    'memory safety',
    'systems programming',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the rust-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/rust-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'rust-engineer',
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

export default rust_engineerAgent;
