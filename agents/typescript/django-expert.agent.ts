/**
 * Django Expert Agent
 *
 * Use when building Django web applications or REST APIs with Django REST Framework. Invoke for Django models, ORM optimization, DRF serializers, viewsets, authentication with JWT.
 *
 * Role: specialist
 * Scope: implementation
 */

export const django_expertAgent = {
  name: 'django-expert',
  description: 'Use when building Django web applications or REST APIs with Django REST Framework. Invoke for Django models, ORM optimization, DRF serializers, viewsets, authentication with JWT.',

  triggers: [
    'Django',
    'DRF',
    'Django REST Framework',
    'Django ORM',
    'Django model',
    'serializer',
    'viewset',
    'Python web',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the django-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/django-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'django-expert',
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

export default django_expertAgent;
