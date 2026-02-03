/**
 * Fine Tuning Expert Agent
 *
 * Use when fine-tuning LLMs, training custom models, or optimizing model performance for specific tasks. Invoke for parameter-efficient methods, dataset preparation, or model adaptation.
 *
 * Role: expert
 * Scope: implementation
 */

export const fine_tuning_expertAgent = {
  name: 'fine-tuning-expert',
  description: 'Use when fine-tuning LLMs, training custom models, or optimizing model performance for specific tasks. Invoke for parameter-efficient methods, dataset preparation, or model adaptation.',

  triggers: [
    'fine-tuning',
    'fine tuning',
    'LoRA',
    'QLoRA',
    'PEFT',
    'adapter tuning',
    'transfer learning',
    'model training',
    'custom model',
    'LLM training',
    'instruction tuning',
    'RLHF',
    'model optimization',
    'quantization',
  ],

  role: 'expert',
  scope: 'implementation',

  /**
   * Execute the fine-tuning-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/fine-tuning-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'fine-tuning-expert',
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

export default fine_tuning_expertAgent;
