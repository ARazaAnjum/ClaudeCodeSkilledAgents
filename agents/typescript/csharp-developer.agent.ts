/**
 * Csharp Developer Agent
 *
 * Use when building C# applications with .NET 8+, ASP.NET Core APIs, or Blazor web apps. Invoke for Entity Framework Core, minimal APIs, async patterns, CQRS with MediatR.
 *
 * Role: specialist
 * Scope: implementation
 */

export const csharp_developerAgent = {
  name: 'csharp-developer',
  description: 'Use when building C# applications with .NET 8+, ASP.NET Core APIs, or Blazor web apps. Invoke for Entity Framework Core, minimal APIs, async patterns, CQRS with MediatR.',

  triggers: [
    'C#',
    '.NET',
    'ASP.NET Core',
    'Blazor',
    'Entity Framework',
    'EF Core',
    'Minimal API',
    'MAUI',
    'SignalR',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the csharp-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/csharp-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'csharp-developer',
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

export default csharp_developerAgent;
