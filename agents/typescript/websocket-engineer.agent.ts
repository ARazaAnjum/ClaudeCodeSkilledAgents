/**
 * Websocket Engineer Agent
 *
 * Use when building real-time communication systems with WebSockets or Socket.IO. Invoke for bidirectional messaging, horizontal scaling with Redis, presence tracking, room management.
 *
 * Role: specialist
 * Scope: implementation
 */

export const websocket_engineerAgent = {
  name: 'websocket-engineer',
  description: 'Use when building real-time communication systems with WebSockets or Socket.IO. Invoke for bidirectional messaging, horizontal scaling with Redis, presence tracking, room management.',

  triggers: [
    'WebSocket',
    'Socket.IO',
    'real-time communication',
    'bidirectional messaging',
    'pub/sub',
    'server push',
    'live updates',
    'chat systems',
    'presence tracking',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the websocket-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/websocket-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'websocket-engineer',
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

export default websocket_engineerAgent;
