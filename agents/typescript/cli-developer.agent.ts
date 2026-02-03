/**
 * Cli Developer Agent
 *
 * Use when building CLI tools, implementing argument parsing, or adding interactive prompts. Invoke for CLI design, argument parsing, interactive prompts, progress indicators, shell completions.
 *
 * Role: specialist
 * Scope: implementation
 */

export const cli_developerAgent = {
  name: 'cli-developer',
  description: 'Use when building CLI tools, implementing argument parsing, or adding interactive prompts. Invoke for CLI design, argument parsing, interactive prompts, progress indicators, shell completions.',

  triggers: [
    'CLI',
    'command-line',
    'terminal app',
    'argument parsing',
    'shell completion',
    'interactive prompt',
    'progress bar',
    'commander',
    'click',
    'typer',
    'cobra',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the cli-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/cli-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'cli-developer',
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

export default cli_developerAgent;
