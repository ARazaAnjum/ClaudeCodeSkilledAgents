/**
 * Fastapi Expert Agent
 *
 * Use when building high-performance async Python APIs with FastAPI and Pydantic V2. Invoke for async SQLAlchemy, JWT authentication, WebSockets, OpenAPI documentation.
 *
 * Role: specialist
 * Scope: implementation
 */

export const fastapi_expertAgent = {
  name: 'fastapi-expert',
  description: 'Use when building high-performance async Python APIs with FastAPI and Pydantic V2. Invoke for async SQLAlchemy, JWT authentication, WebSockets, OpenAPI documentation.',

  triggers: [
    'FastAPI',
    'Pydantic',
    'async Python',
    'Python API',
    'REST API Python',
    'SQLAlchemy async',
    'JWT authentication',
    'OpenAPI',
    'Swagger Python',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the fastapi-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/fastapi-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'fastapi-expert',
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

export default fastapi_expertAgent;
