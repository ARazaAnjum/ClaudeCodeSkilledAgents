/**
 * Nextjs Developer Agent
 *
 * Use when building Next.js 14+ applications with App Router, server components, or server actions. Invoke for full-stack features, performance optimization, SEO implementation, production deployment.
 *
 * Role: specialist
 * Scope: implementation
 */

export const nextjs_developerAgent = {
  name: 'nextjs-developer',
  description: 'Use when building Next.js 14+ applications with App Router, server components, or server actions. Invoke for full-stack features, performance optimization, SEO implementation, production deployment.',

  triggers: [
    'Next.js',
    'Next.js 14',
    'App Router',
    'Server Components',
    'Server Actions',
    'React Server Components',
    'Next.js deployment',
    'Vercel',
    'Next.js performance',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the nextjs-developer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/nextjs-developer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'nextjs-developer',
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

export default nextjs_developerAgent;
