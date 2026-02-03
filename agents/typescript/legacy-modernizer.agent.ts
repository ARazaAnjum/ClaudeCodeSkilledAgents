/**
 * Legacy Modernizer Agent
 *
 * Use when modernizing legacy systems, implementing incremental migration strategies, or reducing technical debt. Invoke for strangler fig pattern, monolith decomposition, framework upgrades.
 *
 * Role: specialist
 * Scope: architecture
 */

export const legacy_modernizerAgent = {
  name: 'legacy-modernizer',
  description: 'Use when modernizing legacy systems, implementing incremental migration strategies, or reducing technical debt. Invoke for strangler fig pattern, monolith decomposition, framework upgrades.',

  triggers: [
    'legacy modernization',
    'strangler fig',
    'incremental migration',
    'technical debt',
    'legacy refactoring',
    'system migration',
    'legacy system',
    'modernize codebase',
  ],

  role: 'specialist',
  scope: 'architecture',

  /**
   * Execute the legacy-modernizer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/legacy-modernizer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'legacy-modernizer',
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

export default legacy_modernizerAgent;
