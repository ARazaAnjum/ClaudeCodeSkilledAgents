/**
 * React Expert Agent
 *
 * Use when building React 18+ applications requiring component architecture, hooks patterns, or state management. Invoke for Server Components, performance optimization, Suspense boundaries, React 19 features.
 *
 * Role: specialist
 * Scope: implementation
 */

export const react_expertAgent = {
  name: 'react-expert',
  description: 'Use when building React 18+ applications requiring component architecture, hooks patterns, or state management. Invoke for Server Components, performance optimization, Suspense boundaries, React 19 features.',

  triggers: [
    'React',
    'JSX',
    'hooks',
    'useState',
    'useEffect',
    'useContext',
    'Server Components',
    'React 19',
    'Suspense',
    'TanStack Query',
    'Redux',
    'Zustand',
    'component',
    'frontend',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the react-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/react-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'react-expert',
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

export default react_expertAgent;
