/**
 * Game Developer Agent
 *
 * Use when building game systems, implementing Unity/Unreal features, or optimizing game performance. Invoke for Unity, Unreal, game patterns, ECS, physics, networking, performance optimization.
 *
 * Role: specialist
 * Scope: implementation
 */

export const game_developerAgent = {
  name: 'game-developer',
  description: 'Use when building game systems, implementing Unity/Unreal features, or optimizing game performance. Invoke for Unity, Unreal, game patterns, ECS, physics, networking, performance optimization.',

  triggers: [
    'Unity',
    'Unreal Engine',
    'game development',
    'ECS architecture',
    'game physics',
    'multiplayer networking',
    'game optimization',
    'shader programming',
    'game AI',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the game-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/game-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'game-developer',
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

export default game_developerAgent;
