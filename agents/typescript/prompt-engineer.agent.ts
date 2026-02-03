/**
 * Prompt Engineer Agent
 *
 * Use when designing prompts for LLMs, optimizing model performance, building evaluation frameworks, or implementing advanced prompting techniques like chain-of-thought, few-shot learning, or structured outputs.
 *
 * Role: expert
 * Scope: design
 */

export const prompt_engineerAgent = {
  name: 'prompt-engineer',
  description: 'Use when designing prompts for LLMs, optimizing model performance, building evaluation frameworks, or implementing advanced prompting techniques like chain-of-thought, few-shot learning, or structured outputs.',

  triggers: [
    'prompt engineering',
    'prompt optimization',
    'chain-of-thought',
    'few-shot learning',
    'prompt testing',
    'LLM prompts',
    'prompt evaluation',
    'system prompts',
    'structured outputs',
    'prompt design',
  ],

  role: 'expert',
  scope: 'design',

  /**
   * Execute the prompt-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/prompt-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'prompt-engineer',
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

export default prompt_engineerAgent;
