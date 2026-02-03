/**
 * Vue Expert Agent
 *
 * Use when building Vue 3 applications with Composition API, Nuxt 3, or Quasar. Invoke for Pinia, TypeScript, PWA, Capacitor mobile apps, Vite configuration.
 *
 * Role: specialist
 * Scope: implementation
 */

export const vue_expertAgent = {
  name: 'vue-expert',
  description: 'Use when building Vue 3 applications with Composition API, Nuxt 3, or Quasar. Invoke for Pinia, TypeScript, PWA, Capacitor mobile apps, Vite configuration.',

  triggers: [
    'Vue 3',
    'Composition API',
    'Nuxt',
    'Pinia',
    'Vue composables',
    'reactive',
    'ref',
    'Vue Router',
    'Vite Vue',
    'Quasar',
    'Capacitor',
    'PWA',
    'service worker',
    'Fastify SSR',
    'sourcemap',
    'Vite config',
    'build optimization',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the vue-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/vue-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'vue-expert',
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

export default vue_expertAgent;
