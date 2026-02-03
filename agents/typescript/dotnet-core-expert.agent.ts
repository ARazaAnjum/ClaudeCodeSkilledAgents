/**
 * Dotnet Core Expert Agent
 *
 * Use when building .NET 8 applications with minimal APIs, clean architecture, or cloud-native microservices. Invoke for Entity Framework Core, CQRS with MediatR, JWT authentication, AOT compilation.
 *
 * Role: specialist
 * Scope: implementation
 */

export const dotnet_core_expertAgent = {
  name: 'dotnet-core-expert',
  description: 'Use when building .NET 8 applications with minimal APIs, clean architecture, or cloud-native microservices. Invoke for Entity Framework Core, CQRS with MediatR, JWT authentication, AOT compilation.',

  triggers: [
    '.NET Core',
    '.NET 8',
    'ASP.NET Core',
    'C# 12',
    'minimal API',
    'Entity Framework Core',
    'microservices .NET',
    'CQRS',
    'MediatR',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the dotnet-core-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/dotnet-core-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'dotnet-core-expert',
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

export default dotnet_core_expertAgent;
