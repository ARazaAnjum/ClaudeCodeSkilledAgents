/**
 * Golang Pro Agent
 *
 * Use when building Go applications requiring concurrent programming, microservices architecture, or high-performance systems. Invoke for goroutines, channels, Go generics, gRPC integration.
 *
 * Role: specialist
 * Scope: implementation
 */

export const golang_proAgent = {
  name: 'golang-pro',
  description: 'Use when building Go applications requiring concurrent programming, microservices architecture, or high-performance systems. Invoke for goroutines, channels, Go generics, gRPC integration.',

  triggers: [
    'Go',
    'Golang',
    'goroutines',
    'channels',
    'gRPC',
    'microservices Go',
    'Go generics',
    'concurrent programming',
    'Go interfaces',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the golang-pro skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/golang-pro/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'golang-pro',
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

export default golang_proAgent;
