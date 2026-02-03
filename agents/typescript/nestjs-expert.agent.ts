/**
 * Nestjs Expert Agent
 *
 * Use when building NestJS applications requiring modular architecture, dependency injection, or TypeScript backend development. Invoke for modules, controllers, services, DTOs, guards, interceptors, TypeORM/Prisma.
 *
 * Role: specialist
 * Scope: implementation
 */

export const nestjs_expertAgent = {
  name: 'nestjs-expert',
  description: 'Use when building NestJS applications requiring modular architecture, dependency injection, or TypeScript backend development. Invoke for modules, controllers, services, DTOs, guards, interceptors, TypeORM/Prisma.',

  triggers: [
    'NestJS',
    'Nest',
    'Node.js backend',
    'TypeScript backend',
    'dependency injection',
    'controller',
    'service',
    'module',
    'guard',
    'interceptor',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the nestjs-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/nestjs-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'nestjs-expert',
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

export default nestjs_expertAgent;
